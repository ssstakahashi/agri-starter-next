import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '肥料を知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Fertilizers() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/e9f5e9/ffffff?text=Fertilizers\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">肥料を知る</h1>
            <p className="mt-4 text-lg text-green-100">土と作物に命を吹き込む、肥料の基本。</p>
          </div>
        </section>

        {/* コンテンツセクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">コンテンツ準備中</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              このページでは、土壌の健康を保ち、作物の成長を支える肥料についての基本的な知識から、種類、効果的な使い方までを解説する予定です。しばらくお待ちください。
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
