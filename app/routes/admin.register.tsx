import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useActionData, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import { users } from '../db/schema'
import { hashPassword } from '../services/auth.server'

export const meta: MetaFunction = () => {
  return [
    { title: '管理者登録 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  // Check if secret key matches
  const ADMIN_REGISTRATION_SECRET = (context.cloudflare.env as any).ADMIN_REGISTRATION_SECRET || 'change-me-in-production'

  if (secret !== ADMIN_REGISTRATION_SECRET) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/community' }
    })
  }

  return json({ secretValid: true })
}

type ActionData =
  | { success: true; message: string }
  | { success: false; error: string }

export async function action({ request, context }: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData()
  const secret = formData.get('secret')?.toString() || ''

  // Verify secret key
  const ADMIN_REGISTRATION_SECRET = (context.cloudflare.env as any).ADMIN_REGISTRATION_SECRET || 'change-me-in-production'

  if (secret !== ADMIN_REGISTRATION_SECRET) {
    return json<ActionData>({ success: false, error: 'シークレットキーが正しくありません' }, { status: 403 })
  }

  const email = formData.get('email')?.toString() || ''
  const name = formData.get('name')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  const isAdmin = formData.get('isAdmin') === 'true'

  if (!email || !name || !password) {
    return json<ActionData>({ success: false, error: 'すべてのフィールドを入力してください' }, { status: 400 })
  }

  const db = drizzle(context.cloudflare.env.DB)

  // Check if user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email)).get()

  if (existingUser) {
    return json<ActionData>({ success: false, error: 'このメールアドレスは既に登録されています' }, { status: 400 })
  }

  // Create new user
  const passwordHash = await hashPassword(password)

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email,
    name,
    passwordHash,
    isAdmin: isAdmin,
  })

  return json<ActionData>({ success: true, message: `ユーザー「${name}」を登録しました` })
}

export default function AdminRegister() {
  const { secretValid } = useLoaderData<typeof loader>()
  const actionData = useActionData<ActionData>()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  // Get secret from URL
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const secret = urlParams.get('secret') || ''

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ユーザー登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            新しいユーザーアカウントを作成します
          </p>
        </div>

        <form method="post" className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
          <input type="hidden" name="secret" value={secret} />

          {actionData && actionData.success && (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-800">{actionData.message}</p>
            </div>
          )}

          {actionData && !actionData.success && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{actionData.error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="山田太郎"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="8文字以上"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                value="true"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                管理者権限を付与
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition"
          >
            ユーザーを登録
          </button>
        </form>

        <div className="text-center">
          <a href="/community" className="text-sm text-green-600 hover:text-green-800">
            ← コミュニティページに戻る
          </a>
        </div>
      </div>
    </div>
  )
}
