import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import { useState, useEffect } from 'react'
import { drizzle } from 'drizzle-orm/d1'
import { desc, eq, inArray, sql } from 'drizzle-orm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { posts, users, postImages } from '../db/schema'
import { login, logout, isAuthenticated, requireAuth, getCurrentUser } from '../services/auth.server'

export const meta: MetaFunction = () => {
  return [
    { title: '周りの近況 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

type Post = typeof posts.$inferSelect & {
  userName: string
  userPhotoUrl: string | null
  images: { id: string; imageUrl: string }[]
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const db = drizzle(context.cloudflare.env.DB)

  // Join posts with users to get author names
  const postsData = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      title: posts.title,
      content: posts.content,
      imageUrl: posts.imageUrl, // Keep for backward compatibility if needed, or ignore
      tags: posts.tags,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      userName: users.name,
      userPhotoUrl: users.photoUrl,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt))
    .all()

  const postIds = postsData.map((p) => p.id)
  let images: typeof postImages.$inferSelect[] = []

  if (postIds.length > 0) {
    images = await db.select().from(postImages).where(inArray(postImages.postId, postIds)).all()
  }

  const allPosts: Post[] = postsData.map((post) => ({
    ...post,
    userName: post.userName || '不明なユーザー',
    images: images
      .filter((img) => img.postId === post.id)
      .map((img) => ({ id: img.id, imageUrl: img.imageUrl })),
  }))

  // Extract all unique tags from posts
  const allTagsSet = new Set<string>()
  postsData.forEach((post) => {
    if (post.tags) {
      // Split tags by space or comma and clean them
      const tagList = post.tags.split(/[\s,]+/).filter(tag => tag.startsWith('#') && tag.length > 1)
      tagList.forEach(tag => allTagsSet.add(tag))
    }
  })
  const availableTags = Array.from(allTagsSet).sort()

  const authenticated = await isAuthenticated(request)
  const currentUser = await getCurrentUser(request)

  return json({
    posts: allPosts,
    availableTags,
    isAuthenticated: authenticated,
    currentUser,
  })
}

type ActionData =
  | { success: true; type: 'login' }
  | { success: true; type: 'post' }
  | { success: true; type: 'edit' }
  | { success: true; type: 'logout' }
  | { success: false; error: string }

export async function action({ request, context }: ActionFunctionArgs): Promise<Response> {
  // multipart/form-data の場合は request.formData() でファイルも取得できる
  const formData = await request.formData()
  const actionType = formData.get('action')?.toString()

  if (actionType === 'login') {
    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    const db = drizzle(context.cloudflare.env.DB)
    const result = await login(email, password, db, context.cloudflare.env)
    if (result.success) {
      return json<ActionData>({ success: true, type: 'login' }, { headers: result.headers })
    } else {
      return json<ActionData>({ success: false, error: result.error || 'ログインに失敗しました' }, { status: 401 })
    }
  }

  if (actionType === 'logout') {
    const result = await logout()
    return json<ActionData>({ success: true, type: 'logout' }, { headers: result.headers })
  }

  if (actionType === 'post' || actionType === 'edit') {
    const user = await requireAuth(request)
    const db = drizzle(context.cloudflare.env.DB)

    const title = formData.get('title')?.toString() || ''
    const content = formData.get('content')?.toString() || ''
    const tags = formData.get('tags')?.toString() || ''
    const dateStr = formData.get('date')?.toString() || ''
    const imageFiles = formData.getAll('imageFile') as File[]
    const deleteImageIds = formData.getAll('deleteImageId') as string[]

    if (!title || !content) {
      return json<ActionData>({ success: false, error: 'タイトルと本文は必須です' }, { status: 400 })
    }

    let createdAt = new Date()
    if (dateStr) {
      createdAt = new Date(dateStr)
    }

    let postId = crypto.randomUUID() as string

    if (actionType === 'edit') {
      postId = formData.get('postId')?.toString() || ''
      if (!postId) {
        return json<ActionData>({ success: false, error: '投稿IDが指定されていません' }, { status: 400 })
      }

      // Check ownership
      const existingPost = await db.select().from(posts).where(eq(posts.id, postId)).get()
      if (!existingPost) {
        return json<ActionData>({ success: false, error: '投稿が見つかりません' }, { status: 404 })
      }
      if (existingPost.userId !== user.userId && !user.isAdmin) {
        return json<ActionData>({ success: false, error: '編集権限がありません' }, { status: 403 })
      }

      // Update post details
      await db.update(posts)
        .set({
          title,
          content,
          tags,
          createdAt: createdAt, // Allow updating creation date
          updatedAt: new Date()
        })
        .where(eq(posts.id, postId))
        .execute()

      // Handle image deletions
      if (deleteImageIds.length > 0) {
        // In a real app, we should also delete from R2, but for now just DB
        // Fetch images to get keys if we want to delete from R2
        // const imagesToDelete = await db.select().from(postImages).where(inArray(postImages.id, deleteImageIds)).all()
        // for (const img of imagesToDelete) { ... delete from R2 ... }

        await db.delete(postImages).where(inArray(postImages.id, deleteImageIds)).execute()
      }
    } else {
      // Create new post
      await db.insert(posts).values({
        id: postId,
        userId: user.userId,
        title,
        content,
        imageUrl: '', // Deprecated, but keep empty string
        tags: tags || '#農業活動',
        createdAt: createdAt,
      })
    }

    // Handle new image uploads
    // Check total images limit (max 5)
    const currentImagesCount = await db.select({ count: sql<number>`count(*)` }).from(postImages).where(eq(postImages.postId, postId)).get()
    const currentCount = currentImagesCount?.count || 0
    const newImagesCount = imageFiles.filter(f => f.size > 0).length

    if (currentCount + newImagesCount > 5) {
      return json<ActionData>({ success: false, error: '画像は最大5枚までです' }, { status: 400 })
    }

    for (const imageFile of imageFiles) {
      if (imageFile.size > 0) {
        const key = crypto.randomUUID()
        await context.cloudflare.env.IMAGES.put(key, imageFile, {
          httpMetadata: {
            contentType: imageFile.type || 'image/jpeg'
          }
        })
        const imageUrl = `/images/${key}`

        await db.insert(postImages).values({
          id: crypto.randomUUID(),
          postId,
          imageUrl,
        })

        // Update main image URL if it's the first one (for backward compatibility)
        if (actionType === 'post' && imageFiles.indexOf(imageFile) === 0) {
          await db.update(posts).set({ imageUrl }).where(eq(posts.id, postId)).execute()
        }
      }
    }

    return redirect('/community')
  }

  return json<ActionData>({ success: false, error: '不正なリクエストです' }, { status: 400 })
}

type LoaderData = {
  posts: Post[]
  availableTags: string[]
  isAuthenticated: boolean
  currentUser: { userId: string; email: string; name: string; isAdmin?: boolean } | null
}

// Calendar Component
interface CalendarProps {
  posts: Post[]
  searchDate: Date | null
  setSearchDate: (date: Date | null) => void
}

const Calendar = ({ posts, searchDate, setSearchDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const isSelected = searchDate?.toDateString() === date.toDateString()
    const hasPosts = posts.some(p => {
      if (!p.createdAt) return false
      const pDate = new Date(p.createdAt)
      return pDate.getFullYear() === year && pDate.getMonth() === month && pDate.getDate() === day
    })

    days.push(
      <button
        key={day}
        onClick={() => setSearchDate(isSelected ? null : date)}
        className={`p-2 w-full text-center text-sm rounded-full hover:bg-green-100 transition
          ${isSelected ? 'bg-green-600 text-white hover:bg-green-700' : ''}
          ${hasPosts && !isSelected ? 'font-bold text-green-800' : ''}
          ${!hasPosts && !isSelected ? 'text-gray-400' : ''}
        `}
      >
        {day}
      </button>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="text-gray-600 hover:text-green-600">
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="font-bold text-gray-800">{year}年 {month + 1}月</h3>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="text-gray-600 hover:text-green-600">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      {searchDate && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setSearchDate(null)}
            className="text-sm text-red-500 hover:underline"
          >
            日付選択を解除
          </button>
        </div>
      )}
    </div>
  )
}

export default function Community() {
  const { posts, availableTags, isAuthenticated, currentUser } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showPostForm, setShowPostForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingPostId, setEditingPostId] = useState('')
  const [existingImages, setExistingImages] = useState<{ id: string; imageUrl: string }[]>([])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [postFormData, setPostFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState('')
  // State for newly selected image previews
  const [previewFiles, setPreviewFiles] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  // Search/Filter State
  const [searchDate, setSearchDate] = useState<Date | null>(null)
  const [searchTag, setSearchTag] = useState<string | null>(null)

  useEffect(() => {
    if (actionData?.success && actionData.type === 'login') {
      setShowLoginForm(false)
      setEmail('')
      setPassword('')
    }
    // Since we redirect, we might not need this for post/edit success,
    // but keeping it for login or if redirect fails/is changed.
    // Actually, redirect will cause a full reload/navigation, so state will reset anyway.
  }, [actionData]);

  // Generate and cleanup preview URLs when previewFiles changes
  useEffect(() => {
    if (previewFiles.length === 0) {
      setPreviewImages([]);
      return;
    }
    const urls = previewFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewFiles]);

  const handleEditClick = (post: Post) => {
    setIsEditing(true)
    setEditingPostId(post.id)
    setPostFormData({
      title: post.title,
      content: post.content,
      date: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    })
    // Parse existing tags
    const existingTags = post.tags ? post.tags.split(/[\s,]+/).filter(tag => tag.startsWith('#') && tag.length > 1) : []
    setSelectedTags(existingTags)
    setExistingImages(post.images)
    setShowPostForm(true)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingPostId('')
    setExistingImages([])
    setPostFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0] })
    setSelectedTags([])
    setNewTagInput('')
    setPreviewFiles([])
    setShowPostForm(false)
  }

  // Filter posts based on searchDate and searchTag
  const filteredPosts = posts.filter(post => {
    let matchesDate = true
    let matchesTag = true

    if (searchDate) {
      if (!post.createdAt) {
        matchesDate = false
      } else {
        const postDate = new Date(post.createdAt)
        matchesDate = postDate.getFullYear() === searchDate.getFullYear() &&
          postDate.getMonth() === searchDate.getMonth() &&
          postDate.getDate() === searchDate.getDate()
      }
    }

    if (searchTag) {
      matchesTag = post.tags?.includes(searchTag) || false
    }

    return matchesDate && matchesTag
  })

  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="community" />

      {/* メインコンテンツ */}
      <main className="pt-20">
        {/* ヒーローセクション */}
        <section className="relative py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">周りの近況</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">鳥取で農業を始めた仲間たちの活動の記録を共有します。</p>
          </div>
        </section>

        {/* 管理者ログイン・投稿セクション */}
        {!isAuthenticated && (
          <section className="py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowLoginForm(!showLoginForm)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition"
                >
                  <i className="fas fa-lock mr-1"></i>
                  管理者ログイン
                </button>
              </div>
              {showLoginForm && (
                <div className="max-w-md mx-auto mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">管理者ログイン</h3>
                  <form method="post" className="space-y-4">
                    <input type="hidden" name="action" value="login" />
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="メールアドレスを入力"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        パスワード
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="パスワードを入力"
                      />
                    </div>
                    {actionData && !actionData.success && actionData.error && (
                      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded">
                        <p className="text-red-800 text-sm">{actionData.error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
                    >
                      {isSubmitting ? 'ログイン中...' : 'ログイン'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 投稿フォーム */}
        {isAuthenticated && (
          <section className="py-8 bg-green-50 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-green-800">{currentUser?.name}さん: 農業活動を投稿</h2>
                  <form method="post">
                    <input type="hidden" name="action" value="logout" />
                    <button
                      type="submit"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>ログアウト
                    </button>
                  </form>
                </div>
                {showPostForm && (
                  <form method="post" encType="multipart/form-data" className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <input type="hidden" name="action" value={isEditing ? 'edit' : 'post'} />
                    {isEditing && <input type="hidden" name="postId" value={editingPostId} />}

                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-700">{isEditing ? '投稿を編集' : '新しい投稿'}</h3>
                      <button type="button" onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-times"></i> キャンセル
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                          タイトル <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={postFormData.title}
                          onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="例: 梨の剪定作業を開始"
                        />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                          投稿日
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={postFormData.date}
                          onChange={(e) => setPostFormData({ ...postFormData, date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                        本文 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={postFormData.content}
                        onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                        required
                        style={{ minHeight: '700px' }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical"
                        placeholder="農業活動の内容を記入してください"
                      />
                    </div>

                    {/* Existing Images (Edit Mode) */}
                    {isEditing && existingImages.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          現在の画像 (削除するにはチェックを入れてください)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {existingImages.map((img) => (
                            <div key={img.id} className="relative group">
                              <img src={img.imageUrl} alt="Existing" className="w-full h-24 object-cover rounded-md" />
                              <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all flex items-center justify-center rounded-md">
                                <label className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                                  <input type="checkbox" name="deleteImageId" value={img.id} className="form-checkbox text-red-600" />
                                  <span className="text-sm text-red-600 font-bold">削除</span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                        画像アップロード (最大5枚)
                      </label>
                      <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        multiple
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setPreviewFiles(files);
                        }}
                      />
                      {/* Image Previews */}
                      {previewImages.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {previewImages.map((src, idx) => (
                            <img key={idx} src={src} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded-md" />
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-1">※ 複数の画像を選択できます</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        タグ
                      </label>

                      {/* Selected Tags Display */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedTags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {tag}
                            <button
                              type="button"
                              onClick={() => setSelectedTags(selectedTags.filter((_, i) => i !== index))}
                              className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Available Tags Selection */}
                      {availableTags.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-2">よく使われるタグ:</p>
                          <div className="flex flex-wrap gap-2">
                            {availableTags.filter(tag => !selectedTags.includes(tag)).map((tag, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedTags([...selectedTags, tag])}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                              >
                                {tag}
                                <i className="fas fa-plus ml-2 text-xs"></i>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* New Tag Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              let tag = newTagInput.trim()
                              if (tag && !tag.startsWith('#')) {
                                tag = '#' + tag
                              }
                              if (tag.length > 1 && !selectedTags.includes(tag)) {
                                setSelectedTags([...selectedTags, tag])
                                setNewTagInput('')
                              }
                            }
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="新しいタグを入力 (例: 梨栽培)"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            let tag = newTagInput.trim()
                            if (tag && !tag.startsWith('#')) {
                              tag = '#' + tag
                            }
                            if (tag.length > 1 && !selectedTags.includes(tag)) {
                              setSelectedTags([...selectedTags, tag])
                              setNewTagInput('')
                            }
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      {/* Hidden input to submit tags */}
                      <input type="hidden" name="tags" value={selectedTags.join(' ')} />
                    </div>
                    {actionData && !actionData.success && actionData.error && (
                      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded">
                        <p className="text-red-800 text-sm">{actionData.error}</p>
                      </div>
                    )}
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition"
                      >
                        {isSubmitting ? '送信中...' : (isEditing ? '更新する' : '投稿する')}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                        >
                          キャンセル
                        </button>
                      )}
                    </div>
                  </form>
                )}
                {!showPostForm && (
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setEditingPostId('')
                      setExistingImages([])
                      setPostFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0] })
                      setSelectedTags([])
                      setNewTagInput('')
                      setPreviewFiles([])
                      setShowPostForm(true)
                    }}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    新しい投稿を作成
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 近況投稿セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">最新の近況</h2>

            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* サイドバー (カレンダー & タグ検索) */}
              <div className="lg:col-span-1 space-y-8 sticky top-24 self-start">
                {/* カレンダー */}
                <section>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    <i className="far fa-calendar-alt mr-2 text-green-600"></i>
                    日付で検索
                  </h3>
                  <Calendar posts={posts} searchDate={searchDate} setSearchDate={setSearchDate} />
                </section>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    <i className="fas fa-tags mr-2 text-green-600"></i>
                    タグで検索
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTag(searchTag === tag ? null : tag)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition
                          ${searchTag === tag
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                          }
                        `}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {searchTag && (
                    <div className="mt-2">
                      <button
                        onClick={() => setSearchTag(null)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        タグ選択を解除
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 投稿一覧 */}
              <div className="lg:w-2/3 space-y-8">
                {/* Filter Status */}
                {(searchDate || searchTag) && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-green-800 mr-2">検索条件:</span>
                      {searchDate && (
                        <span className="inline-block bg-white px-2 py-1 rounded border border-green-300 text-sm mr-2">
                          <i className="far fa-calendar mr-1"></i>
                          {searchDate.toLocaleDateString('ja-JP')}
                        </span>
                      )}
                      {searchTag && (
                        <span className="inline-block bg-white px-2 py-1 rounded border border-green-300 text-sm">
                          <i className="fas fa-tag mr-1"></i>
                          {searchTag}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSearchDate(null)
                        setSearchTag(null)
                      }}
                      className="text-sm text-gray-500 hover:text-red-500"
                    >
                      <i className="fas fa-times mr-1"></i>
                      クリア
                    </button>
                  </div>
                )}

                {filteredPosts.length === 0 ? (
                  <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p>条件に一致する投稿がありません。</p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 bg-green-100 flex items-center justify-center">
                              {post.userPhotoUrl ? (
                                <img src={post.userPhotoUrl} alt={post.userName} className="w-full h-full object-cover" />
                              ) : (
                                <i className="fas fa-user text-green-600 text-xl"></i>
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
                              <p className="text-sm text-gray-500">
                                {post.userName} • {post.createdAt ? new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                              </p>
                            </div>
                          </div>
                          {/* Edit Button */}
                          {currentUser && (currentUser?.userId === post.userId) && (
                            <button
                              onClick={() => handleEditClick(post)}
                              className="text-gray-400 hover:text-green-600 transition"
                              title="編集"
                            >
                              <i className="fas fa-edit text-xl"></i>
                            </button>
                          )}
                        </div>

                        {/* Image Gallery */}
                        {post.images && post.images.length > 0 && (
                          <div className={`mb-4 grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {post.images.map((img) => (
                              <img key={img.id} src={img.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-lg" />
                            ))}
                          </div>
                        )}

                        {/* Fallback for legacy imageUrl if no images in post_images table yet (though migration should handle it) */}
                        {(!post.images || post.images.length === 0) && post.imageUrl && (
                          <div className="mb-4">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg" />
                          </div>
                        )}

                        <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4">
                            {/* いいね・コメント機能は将来実装予定 */}
                          </div>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {post.tags && post.tags.split(/[\s,]+/).filter(tag => tag.startsWith('#') && tag.length > 1).map((tag, i) => (
                              <button
                                key={i}
                                onClick={() => setSearchTag(tag)}
                                className="text-sm text-green-600 hover:text-green-800 hover:underline"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

