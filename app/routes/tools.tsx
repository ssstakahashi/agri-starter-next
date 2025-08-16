import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '便利なツール | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Tools() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="tools" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Useful+Tools\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">便利なツール</h1>
            <p className="mt-4 text-lg text-green-100">あなたの農業経営をサポートする、様々な無料ツールをご利用いただけます。</p>
          </div>
        </section>

        {/* ツール一覧セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* 収支計画作成ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-calculator text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">収支計画作成ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">栽培品目や面積、見込み収量などを入力するだけで、簡易的な収支計画を作成。営農計画策定の参考に。</p>
                <a href="#" className="mt-auto w-full text-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">ツールを使ってみる</a>
              </div>

              {/* 農薬一覧 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-flask-vial text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">農薬検索</h3>
                <p className="text-gray-600 mb-4 flex-grow">作物名や病害虫名から、鳥取県で登録・使用可能な農薬を検索できます。希釈倍率や使用時期も確認可能。</p>
                <a href="#" className="mt-auto w-full text-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">ツールを使ってみる</a>
              </div>

              {/* 肥料一覧 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-leaf text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">肥料検索</h3>
                <p className="text-gray-600 mb-4 flex-grow">土壌診断の結果や作物の種類に応じて、推奨される肥料の種類や成分量を検索できます。</p>
                <a href="#" className="mt-auto w-full text-center bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition">ツールを使ってみる</a>
              </div>

              {/* 農薬使用量計算 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-orange-100 text-orange-600 rounded-full p-4 mb-4">
                  <i className="fas fa-vial-circle-check text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">農薬使用量計算</h3>
                <p className="text-gray-600 mb-4 flex-grow">散布面積と希釈倍率を入力するだけで、必要な農薬の原液量と水の量を自動で計算します。</p>
                <a href="#" className="mt-auto w-full text-center bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition">ツールを使ってみる</a>
              </div>

              {/* 農産物市況 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                  <i className="fas fa-yen-sign text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">農産物市況情報</h3>
                <p className="text-gray-600 mb-4 flex-grow">鳥取県内の主要な卸売市場における、主要品目の市況データ（日次・週次）をグラフで確認できます。</p>
                <a href="#" className="mt-auto w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition">ツールを使ってみる</a>
              </div>

              {/* 農地面積測定ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-100 text-gray-600 rounded-full p-4 mb-4">
                  <i className="fas fa-draw-polygon text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">農地面積測定ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">地図上で農地を囲むだけで、おおよその面積や周回距離を計測。圃場管理に役立ちます。</p>
                <a href="#" className="mt-auto w-full text-center bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition">ツールを使ってみる</a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
