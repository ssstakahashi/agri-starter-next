import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取のらっきょうを知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Rakkyo() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/f5f5dc/ffffff?text=Tottori+Rakkyo\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取の砂丘らっきょうを知る</h1>
            <p className="mt-4 text-lg text-green-100">日本海の風と砂丘が育てた、白く輝く宝石。</p>
          </div>
        </section>

        {/* 鳥取砂丘らっきょうの歴史と特徴 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-800 mb-4">砂丘に根を張る、生命力の結晶</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  鳥取砂丘らっきょうの栽培は、江戸時代に参勤交代の付け人が持ち帰ったことが始まりとされています。保水力のない砂丘地での栽培は困難を極めましたが、先人たちの知恵と努力により、この地ならではの特産品が生まれました。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  砂地で育つらっきょうは、引き締まった繊維によってシャキシャキとした抜群の歯ごたえが生まれます。また、色白で美しい見た目も特徴です。毎年5月下旬から6月にかけて、紫色の可憐な花が一面に咲き誇る「らっきょう畑」は、鳥取の初夏の風物詩となっています。
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="https://placehold.co/600x400/e9f5e9/333333?text=らっきょう畑の風景" alt="鳥取のらっきょう畑" className="rounded-lg shadow-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 商品形態紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">旬の味を食卓へ</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 洗いらっきょう */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/d4e2d4/333333?text=洗いらっきょう" alt="洗いらっきょう" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-green-900">洗いらっきょう <span className="text-sm font-normal text-gray-500">(5月下旬～6月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">収穫されたばかりのらっきょうの根と茎を切り、きれいに洗浄したもの。この時期にしか手に入らない生らっきょうで、家庭で好みの味の甘酢漬けなどを作るのに最適です。</p>
                </div>
              </div>
              {/* 根付きらっきょう */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/f0fff4/333333?text=根付きらっきょう" alt="根付きらっきょう" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-800">根付きらっきょう <span className="text-sm font-normal text-gray-500">(5月下旬～6月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">畑から掘り起こしたままの、土と根が付いた状態のらっきょう。鮮度が最も保たれるため、風味を重視する方に好まれます。漬物だけでなく、天ぷらや炒め物にも。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 主な産地紹介 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">らっきょうづくりの中心地</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-lg p-8">
                <p className="text-gray-700 mb-6">鳥取砂丘らっきょうは、鳥取市から北栄町にかけての日本海沿岸に広がる砂丘地で主に栽培されています。中でも鳥取砂丘に隣接するエリアが最大の産地です。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">鳥取市福部町</h4>
                    <p className="text-sm text-gray-600">全国的に有名な「鳥取砂丘」に隣接する、日本一のらっきょう産地。</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">北栄町・湯梨浜町</h4>
                    <p className="text-sm text-gray-600">県の東西に延びる砂丘地帯の西側に位置する、歴史ある産地。</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6">収穫期には多くの直売所が並び、県内外から多くの人々が新鮮ならっきょうを求めて訪れます。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
