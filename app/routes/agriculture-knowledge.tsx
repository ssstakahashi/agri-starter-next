import type { MetaFunction } from '@remix-run/cloudflare'

import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '農業知識 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function AgricultureKnowledge() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="agriculture-knowledge" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Agriculture+Knowledge\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">農業知識</h1>
            <p className="mt-4 text-lg text-green-100">アグリチャレンジの研修で学んだことから、気になったことなどをさらに自身で調べた内容です。</p>
            <p className="mt-2 text-sm text-green-200">
              運営者の個人ページ: <a href="https://s-takahashi.work.studiofoods.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">https://s-takahashi.work.studiofoods.net/</a>
            </p>
          </div>
        </section>

        {/* 農業知識カテゴリー */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">農業知識カテゴリー</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* 農薬 */}
              <a href="/pesticide" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-shield-alt text-3xl text-red-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">農薬</h3>
                  </div>
                  <p className="text-gray-600">病害虫や雑草の防除に使用する農薬の種類、効果的な使い方、安全な使用法。</p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    農薬の基礎知識 → 詳細を見る
                  </div>
                </div>
              </a>

              {/* 植物生理学 */}
              <a href="/physiology" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-seedling text-3xl text-green-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">植物生理学</h3>
                  </div>
                  <p className="text-gray-600">植物の成長メカニズム、光合成、水分吸収など、植物の基本的な生理機能。</p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    植物の仕組み → 詳細を見る
                  </div>
                </div>
              </a>

              {/* 肥料 */}
              <a href="/fertilizers" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-leaf text-3xl text-yellow-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">肥料</h3>
                  </div>
                  <p className="text-gray-600">土と作物の健康を支える肥料の基本知識から、種類や効果的な使い方まで。</p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    肥料の基礎 → 詳細を見る
                  </div>
                </div>
              </a>

              {/* 土壌 */}
              <div className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-mountain text-3xl text-amber-600 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">土壌</h3>
                  </div>
                  <p className="text-gray-600">土壌の種類、pH調整、有機物の働きなど、健康な土づくりの基礎知識。</p>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    準備中
                  </div>
                </div>
              </div>

              {/* 気象 */}
              <div className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-cloud-sun text-3xl text-blue-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">気象</h3>
                  </div>
                  <p className="text-gray-600">天候の変化が作物に与える影響、気象予報の活用方法、災害対策。</p>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    準備中
                  </div>
                </div>
              </div>

              {/* 農機具 */}
              <div className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-tractor text-3xl text-gray-600 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">農機具</h3>
                  </div>
                  <p className="text-gray-600">トラクター、耕運機、収穫機など、効率的な農業に必要な農機具の選び方と使い方。</p>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    準備中
                  </div>
                </div>
              </div>

              {/* 自然農法 */}
              <a href="/natural-farming" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-recycle text-3xl text-green-600 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">自然農法</h3>
                  </div>
                  <p className="text-gray-600">化学肥料や農薬に頼らず、自然の力を活かした持続可能な農法。</p>
                  <div className="mt-4 text-sm text-green-600 font-medium">
                    自然農法の基礎 → 詳細を見る
                  </div>
                </div>
              </a>

              {/* 病害虫防除 */}
              <div className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-bug text-3xl text-orange-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">病害虫防除</h3>
                  </div>
                  <p className="text-gray-600">作物の病気や害虫の種類、早期発見の方法、効果的な防除技術。</p>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    準備中
                  </div>
                </div>
              </div>

              {/* 栽培技術 */}
              <div className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-hands-helping text-3xl text-purple-500 mr-3"></i>
                    <h3 className="text-xl font-bold text-green-800">栽培技術</h3>
                  </div>
                  <p className="text-gray-600">播種、育苗、定植、収穫など、作物栽培の基本的な技術とポイント。</p>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    準備中
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 学習の進め方 */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">学習の進め方</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold mb-2 text-green-800">基礎知識を身につける</h3>
                <p className="text-gray-600">植物生理学や土壌の基礎から始めて、農業の基本を理解しましょう。</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold mb-2 text-green-800">実践的な技術を学ぶ</h3>
                <p className="text-gray-600">肥料、農薬、農機具など、実際の栽培に必要な技術を習得しましょう。</p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold mb-2 text-green-800">継続的に学習する</h3>
                <p className="text-gray-600">農業技術は日々進歩しています。最新の情報を常にキャッチアップしましょう。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 関連リンク */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">関連ページ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="/about" className="block bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-green-800 mb-2">鳥取の農業を知る</h3>
                <p className="text-gray-600">鳥取県の農業の特徴や特産品について詳しく学びます。</p>
              </a>
              <a href="/steps" className="block bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors duration-300">
                <h3 className="text-xl font-bold text-green-800 mb-2">就農までのステップ</h3>
                <p className="text-gray-600">新規就農を目指す方のための具体的なステップを確認できます。</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
