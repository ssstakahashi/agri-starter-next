import type { ActionFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useActionData, useNavigation } from '@remix-run/react'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: 'このサイトについて | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}


type ActionData = { success: true } | { success: false; error: string }

export async function action({ request }: ActionFunctionArgs): Promise<Response> {

  const formData = await request.formData()
  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const category = formData.get('category')?.toString() || 'inquiry'
  const subject = formData.get('subject')?.toString() || ''
  const message = formData.get('message')?.toString() || ''

  // 問い合わせ種別の日本語変換
  const categoryLabels: Record<string, string> = {
    inquiry: 'お問い合わせ',
    request: 'ご要望',
    other: 'その他'
  }

  // Google Chatに送信するメッセージを構築
  const chatMessage = `新しいお問い合わせが届きました

**お名前:** ${name}
**メールアドレス:** ${email}
**お問い合わせ種別:** ${categoryLabels[category] || category}
**件名:** ${subject || '（件名なし）'}
**メッセージ:**
${message}`

  try {
    if (process.env.GOOGLE_CHAT_WEBHOOK_URL) { throw new Error('GOOGLE_CHAT_WEBHOOK_URL is not set') }
    const response = await fetch(process.env.GOOGLE_CHAT_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: chatMessage
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return json({ success: true })
  } catch (error) {
    console.error('Google Chatへの送信エラー:', error)
    return json({ success: false, error: '送信に失敗しました' }, { status: 500 })
  }
}

export default function AboutUs() {
  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'inquiry',
    subject: '',
    message: ''
  })

  // 送信成功時にフォームをリセット
  useEffect(() => {
    if (actionData?.success) {
      setFormData({
        name: '',
        email: '',
        category: 'inquiry',
        subject: '',
        message: ''
      })
    }
  }, [actionData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitStatus = actionData?.success ? 'success' : actionData?.error ? 'error' : 'idle'
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about-us" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/e9f5e9/ffffff?text=About+this+site\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">このサイトについて</h1>
            <p className="mt-4 text-lg text-green-100">鳥取で農業を志す、すべての仲間たちへ。</p>
          </div>
        </section>

        {/* 運営者メッセージ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/3 text-center">
                <img
                  src="https://ssstakahashi-storage.studiofoods.net/logo/s-takahashi_photo.svg"
                  alt="運営者プロフィール"
                  className="rounded-full shadow-lg w-48 h-48 object-cover mx-auto"
                />
                <h3 className="mt-4 text-xl font-bold">サイト運営者</h3>
                <p className="text-gray-500">Tottori Farmer</p>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-green-800 mb-4">はじめまして。</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  このサイトに訪れていただき、ありがとうございます。
                  私自身、鳥取県で新たに農業を始めようとしている一人です。
                  鳥取県立農業大学校のアグリチャレンジ科の30期生として、農業を学び、鳥取県の倉吉市に引っ越ししてまいりました。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農業を始めようと決意したとき、まず直面したのが情報収集の壁でした。支援制度、農地の探し方、栽培技術…。大切な情報はたくさんあるのに、あちこちに散らばっていて、全体像を掴むのにとても苦労したのを覚えています。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  「これから農業を始める人が、自分と同じ苦労をしなくても済むように」。
                  このサイトは、そんな想いからつくりました。私が実際に研修先で先輩方から教わったこと、役場や生産部会で聞いた話、自分で調べてまとめたノートが、このサイトの原型です。
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  このサイトが、あなたの「はじめの一歩」を少しでも後押しできたら。そして、鳥取県で一緒に汗を流す仲間が一人でも増えたら、これほど嬉しいことはありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex">
                <div className="py-1"><i className="fas fa-exclamation-triangle text-yellow-500 mr-4"></i></div>
                <div>
                  <p className="text-yellow-800">
                    <strong>ご利用にあたっての注意</strong><br />
                    当サイトの情報は、運営者の経験や調査に基づき作成しておりますが、その正確性を保証するものではありません。特に支援制度などの情報は変更される場合がありますので、必ず公式サイトや担当窓口で最新の情報をご確認ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 問い合わせ・要望フォーム */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">お問い合わせ・ご要望</h2>
              <p className="text-gray-600">ご質問やご要望がございましたら、お気軽にお問い合わせください。</p>
            </div>

            <form method="post" className="bg-green-50 rounded-lg shadow-md p-8 space-y-6">
              {/* 送信ステータスメッセージ */}
              {submitStatus === 'success' && (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-green-800">
                    <i className="fas fa-check-circle mr-2"></i>
                    お問い合わせを受け付けました。ありがとうございます。
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-red-800">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {(actionData && 'error' in actionData ? actionData.error : '送信に失敗しました。もう一度お試しください。')}
                  </p>
                </div>
              )}

              {/* 名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="山田 太郎"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              {/* 問い合わせ種別 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="inquiry">お問い合わせ</option>
                  <option value="request">ご要望</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* 件名 */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  件名
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="件名を入力してください"
                />
              </div>

              {/* メッセージ */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                  placeholder="お問い合わせ内容やご要望をご記入ください"
                />
              </div>

              {/* 送信ボタン */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <span>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      送信中...
                    </span>
                  ) : (
                    <span>
                      <i className="fas fa-paper-plane mr-2"></i>
                      送信する
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
