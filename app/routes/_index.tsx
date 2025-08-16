import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取県就農支援サイト「はじめの一歩」' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare
  return json({ myVar: env.MY_VAR })
}

export default function Index() {

  useEffect(() => {
    // モバイルメニューのトグル機能
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')

    if (mobileMenuButton && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle('hidden')
      }
      mobileMenuButton.addEventListener('click', handleClick)
      return () => mobileMenuButton.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="home" />

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <section className="relative h-[60vh] min-h-[400px]">
          {/* 背景画像 */}
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(\'https://placehold.co/1600x900/a0d2a4/333333?text=Tottori+Farm+Landscape\')' }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">鳥取で、農家になろう。</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">豊かな自然と、温かいサポートが、あなたの「はじめの一歩」を応援します。</p>
            <a href="#steps" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition transform hover:scale-105 duration-300">
              まずは何から？ 就農ステップを見る
            </a>
          </div>
        </section>

        {/* お知らせセクション */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-green-800">お知らせ</h2>
            <p className="text-center text-gray-600 mb-8">就農に関する最新情報やイベント情報をお届けします。</p>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4 hover:bg-green-50 transition duration-150 ease-in-out">
                  <a href="#" className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">2025.08.15</span>
                    <span className="font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">イベント</span>
                    <p className="text-gray-800 flex-1">新規就農者向けオンライン相談会の参加者募集を開始しました。</p>
                  </a>
                </li>
                <li className="p-4 hover:bg-green-50 transition duration-150 ease-in-out">
                  <a href="#" className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">2025.08.01</span>
                    <span className="font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs">支援制度</span>
                    <p className="text-gray-800 flex-1">令和7年度の農業次世代人材投資事業の公募要領を公開しました。</p>
                  </a>
                </li>
                <li className="p-4 hover:bg-green-50 transition duration-150 ease-in-out">
                  <a href="#" className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">2025.07.20</span>
                    <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">その他</span>
                    <p className="text-gray-800 flex-1">先輩農家インタビューに新しい記事を追加しました。</p>
                  </a>
                </li>
              </ul>
              <div className="text-center p-4 bg-gray-50">
                <a href="#" className="text-green-600 font-semibold hover:underline">もっと見る &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        {/* 便利なツールセクション */}
        <section id="tools" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-green-800">就農を助ける便利なツール</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">農作業の計画や管理に役立つ無料ツールをご利用いただけます。スマートフォンからも簡単アクセス。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 農薬検索ツール */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                <img src="https://placehold.co/600x400/d1e7dd/333333?text=農薬検索" alt="農薬検索ツール" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">農薬検索ツール</h3>
                  <p className="text-gray-600 mb-4">作物名や病害虫名から、登録のある農薬を簡単検索。使用基準や注意事項も確認できます。</p>
                  <a href="#" className="inline-block bg-green-600 text-white font-bold py-2 px-5 rounded-md hover:bg-green-700 transition">ツールを使ってみる</a>
                </div>
              </div>
              {/* 農地面積測定ツール */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                <img src="https://placehold.co/600x400/d4e2d4/333333?text=面積測定" alt="農地面積測定ツール" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">農地面積測定ツール</h3>
                  <p className="text-gray-600 mb-4">地図上で農地を囲むだけで、おおよその面積や周回距離を計測。圃場管理に役立ちます。</p>
                  <a href="#" className="inline-block bg-green-600 text-white font-bold py-2 px-5 rounded-md hover:bg-green-700 transition">ツールを使ってみる</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 就農までのステップセクション */}
        <section id="steps" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">ゼロから始める就農までの4ステップ</h2>
            <div className="relative">
              {/* 破線 */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-green-300 -translate-y-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* ステップ1 */}
                <div className="text-center p-6 bg-green-50 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-bold text-lg mb-2">相談・情報収集</h3>
                  <p className="text-sm text-gray-600">まずは相談窓口へ。就農へのイメージを具体的にしていきましょう。</p>
                </div>
                {/* ステップ2 */}
                <div className="text-center p-6 bg-green-50 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-bold text-lg mb-2">研修・技術習得</h3>
                  <p className="text-sm text-gray-600">農業法人や研修制度を利用して、実践的な技術と知識を学びます。</p>
                </div>
                {/* ステップ3 */}
                <div className="text-center p-6 bg-green-50 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-bold text-lg mb-2">計画・農地確保</h3>
                  <p className="text-sm text-gray-600">営農計画を作成し、資金や農地、機械、住居を確保します。</p>
                </div>
                {/* ステップ4 */}
                <div className="text-center p-6 bg-green-50 rounded-lg shadow-md">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h3 className="font-bold text-lg mb-2">営農開始</h3>
                  <p className="text-sm text-gray-600">いよいよ就農！開始後も継続的なサポートがありますのでご安心ください。</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <a href="#" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition">各ステップの詳細を見る</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
