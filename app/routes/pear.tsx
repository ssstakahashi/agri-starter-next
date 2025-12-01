import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取の梨を知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Pear() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/c3e6cb/ffffff?text=Tottori+Pear\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取の梨を知る</h1>
            <p className="mt-4 text-lg text-green-100">100年以上の歴史と革新が育む、みずみずしい鳥取の宝物。</p>
          </div>
        </section>

        {/* 鳥取の梨の歴史と特徴 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-800 mb-4">世紀を超えて愛される、鳥取の梨</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  鳥取県の梨栽培の歴史は、1904年（明治37年）に千葉県から導入された「二十世紀梨」の苗木から始まりました。水はけの良い土壌と、昼夜の寒暖差が大きい気候が梨の栽培に適しており、以来、鳥取県は日本有数の梨の名産地として知られるようになりました。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  先人たちのたゆまぬ努力によって築かれた高い栽培技術は、今も受け継がれています。一つひとつ手作業で丁寧に育てられた鳥取の梨は、そのみずみずしさと上品な甘さで、多くの人々に愛され続けています。
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/20nashi_svg.svg" alt="鳥取の梨園" className="rounded-lg shadow-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 品種紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">鳥取を彩る梨の品種たち</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 二十世紀梨 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/20nashi_svg.svg" alt="二十世紀梨" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-green-900">二十世紀梨 <span className="text-sm font-normal text-gray-500">(8月下旬～9月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">鳥取梨の代名詞。透き通るような淡い黄緑色の果皮が特徴です。シャリシャリとした心地よい食感と、甘みと酸味の絶妙なバランスが楽しめます。</p>
                </div>
              </div>
              {/* 新甘泉（しんかんせん） */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/ffd8b1/333333?text=新甘泉" alt="新甘泉" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-red-800">新甘泉 <span className="text-sm font-normal text-gray-500">(8月下旬～9月上旬)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">鳥取県が開発したオリジナル赤梨品種。糖度が非常に高く、酸味が少ないため、強い甘みが際立ちます。シャリ感も強く、食べ応えがあります。</p>
                </div>
              </div>
              {/* 秋甘泉（あきかんせん） */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/ffecb3/333333?text=秋甘泉" alt="秋甘泉" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-orange-800">秋甘泉 <span className="text-sm font-normal text-gray-500">(9月中旬～9月下旬)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">こちらも鳥取県のオリジナル赤梨品種。豊かな甘みの中に程よい酸味があり、濃厚な味わいが特徴です。果汁も豊富で、食感も滑らか。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 主な産地紹介 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">梨づくりの中心地</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-lg p-8">
                <p className="text-gray-700 mb-6">鳥取県の梨は、主に県東部から中部にかけての地域で栽培されています。特に、<strong>鳥取市</strong>、<strong>八頭町（やずちょう）</strong>、<strong>湯梨浜町（ゆりはまちょう）</strong>、<strong>三朝町（みささちょう）</strong>などが一大産地として知られています。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">東部エリア</h4>
                    <p className="text-sm text-gray-600">（鳥取市、八頭町など）</p>
                    <p className="text-sm mt-1">県内最大の栽培面積を誇る中心産地。</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">中部エリア</h4>
                    <p className="text-sm text-gray-600">（湯梨浜町、三朝町など）</p>
                    <p className="text-sm mt-1">東郷湖周辺など、特色ある産地が点在。</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6">これらの地域では、梨をテーマにした観光農園や直売所も多く、収穫シーズンには多くの人で賑わいます。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
