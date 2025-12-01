import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取のスイカを知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Watermelon() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/90ee90/ffffff?text=Tottori+Watermelon\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取のスイカを知る</h1>
            <p className="mt-4 text-lg text-green-100">大山の恵みと黒ぼく土壌が育む、夏の逸品。</p>
          </div>
        </section>

        {/* 鳥取のスイカの歴史と特徴 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-800 mb-4">夏の代名詞、鳥取のスイカ</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  鳥取県のスイカ栽培は、西日本を代表する名峰・大山の麓に広がる黒ぼく土壌地帯が中心です。この水はけが良く、養分を豊富に含んだ火山灰土壌が、甘くて大きいスイカを育てるのに最適な環境を提供しています。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  特に有名な「大栄スイカ」は、長い歴史の中で培われた栽培技術と、厳しい品質管理によってそのブランドを確立しました。春先の丁寧な土づくりから始まり、一株から一個だけを厳選して育てるなど、生産者のこだわりが詰まっています。その結果生まれる高い糖度とシャリ感は、全国の市場で高く評価されています。
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/suika_svg.svg" alt="鳥取のスイカ畑" className="rounded-lg shadow-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ブランド紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">鳥取スイカの主なブランド</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 大栄スイカ */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/suika_svg.svg" alt="大栄スイカ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-green-900">大栄スイカ <span className="text-sm font-normal text-gray-500">(6月～7月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">鳥取スイカの王様。大玉で糖度が高く、シャリ感あふれる食感が特徴です。光センサーによる選果で、品質の高さが保証されています。</p>
                </div>
              </div>
              {/* 極実スイカ（ごくみ） */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/suika_svg.svg" alt="極実スイカ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-red-800">極実スイカ <span className="text-sm font-normal text-gray-500">(6月下旬～7月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">大栄スイカの中でも、糖度・形・熟度など、特に厳しい基準をクリアした最高級ブランド。贈答用としても絶大な人気を誇ります。</p>
                </div>
              </div>
              {/* 倉吉スイカ */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/suika_svg.svg" alt="倉吉スイカ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-800">倉吉スイカ <span className="text-sm font-normal text-gray-500">(6月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">倉吉市で栽培されるハウススイカのブランド。糖度が高く皮が薄いのが特徴で、贈答品としても人気があります。</p>
                </div>
              </div>
              {/* 抑制スイカ */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://ssstakahashi-storage.studiofoods.net/image/agri/suika_svg.svg" alt="抑制スイカ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-orange-800">抑制スイカ <span className="text-sm font-normal text-gray-500">(9月～10月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">出荷時期を遅らせて秋に収穫されるスイカ。夏の終わりから秋にかけて、名残のスイカとして楽しむことができます。甘みが凝縮されています。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 主な産地紹介 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">スイカづくりの中心地</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-lg p-8">
                <p className="text-gray-700 mb-6">鳥取県のスイカは、主に県中部に位置する大山山麓の地域で栽培されています。特に、旧大栄町のエリアを含む<strong>北栄町（ほくえいちょう）</strong>や<strong>倉吉市（くらよしし）</strong>が日本有数の大産地として全国にその名を知られています。</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">北栄町</h4>
                    <p className="text-sm text-gray-600">（旧 大栄町・北条町）</p>
                    <p className="text-sm mt-1">「大栄スイカ」ブランドを誇る、全国屈指の大産地。</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">倉吉市</h4>
                    <p className="text-sm text-gray-600">（旧 関金町など）</p>
                    <p className="text-sm mt-1">ハウス栽培の「倉吉スイカ」が有名。</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">琴浦町</h4>
                    <p className="text-sm text-gray-600">（旧 東伯町・赤碕町）</p>
                    <p className="text-sm mt-1">北栄町に隣接し、同様にスイカ栽培が盛んな地域。</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6">これらの地域では、スイカの収穫時期になると多くの直売所がオープンし、新鮮なスイカを求めて多くの人が訪れます。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
