import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '農業の基礎科学：植物生理学入門 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Physiology() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="physiology" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Plant+Physiology\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">農業の基礎科学：植物生理学入門</h1>
            <p className="mt-4 text-lg text-green-100">作物の気持ちが分かれば、農業はもっと面白くなる。</p>
          </div>
        </section>

        {/* 植物生理学とは？ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">なぜ植物生理学を学ぶのか？</h2>
              <p className="text-gray-600 leading-relaxed">
                植物生理学とは、植物がどのように生長し、栄養を吸収し、子孫を残すのか、その「生命の仕組み」を解き明かす学問です。農家にとって、作物は大切なパートナー。そのパートナーが何を欲しがり、どうすれば元気に育つのかを理解することは、安定した収量と品質の高い農産物を作るための第一歩です。日々の作業の一つひとつに、科学的な裏付けがあることを知ると、農業の奥深さが見えてきます。
              </p>
            </div>

            <div className="space-y-10">
              {/* 光合成 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center"><i className="fas fa-sun mr-3 text-yellow-500"></i>光合成：植物の食事</h3>
                <p className="text-gray-700 leading-relaxed">
                  植物は、葉を「<strong className="text-green-600">太陽光発電のパネル付き調理場</strong>」として使っています。この調理場で、<strong className="text-blue-500">根から吸い上げた水</strong>と<strong className="text-gray-500">空気中の二酸化炭素</strong>を材料に、太陽の光エネルギーを使って<strong className="text-orange-500">糖（栄養分）</strong>を合成します。これが光合成です。<br />
                  作られた糖は、植物が新しい葉や茎、根を作るための材料になったり、甘い果実や美味しい野菜として蓄えられたりします。つまり、光合成が活発であるほど、作物は大きく元気に育ち、収穫物の味も良くなるのです。
                </p>
                <div className="mt-4 bg-green-50 p-4 rounded-lg text-sm">
                  <p className="font-bold text-green-800"><i className="fas fa-lightbulb mr-2"></i>農業での応用</p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li><strong>剪定・整枝：</strong>葉にまんべんなく光が当たるように枝を整理し、光合成の効率を高める。</li>
                    <li><strong>栽植密度：</strong>株間を適切に保ち、葉の重なりを防ぐことで、光の取り合いをなくす。</li>
                    <li><strong>水管理：</strong>光合成に必要な水を、土壌が乾きすぎないように適切に供給する。</li>
                  </ul>
                </div>
              </div>

              {/* 呼吸 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center"><i className="fas fa-wind mr-3 text-blue-400"></i>呼吸：エネルギーの利用</h3>
                <p className="text-gray-700 leading-relaxed">
                  光合成で作った糖は、いわば「貯金」のようなもの。植物は、この貯金を切り崩して日々の活動エネルギーに変える必要があります。その働きが<strong className="text-blue-600">呼吸</strong>です。人間が食事で得た栄養を、呼吸をすることで活動エネルギーに変えるのと同じです。<br />
                  呼吸は昼も夜も行われますが、光合成ができない夜間は、貯金（糖）を消費する一方になります。特に気温が高いと呼吸が活発になり、糖の消費量が増えてしまいます。果実を甘くするためには、夜間の糖の消費をいかに抑えるかが重要になります。
                </p>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg text-sm">
                  <p className="font-bold text-blue-800"><i className="fas fa-lightbulb mr-2"></i>農業での応用</p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li><strong>温度管理：</strong>夜間のハウス内温度を下げ、呼吸による養分の消耗を抑えることで、果実の糖度を高める。</li>
                    <li><strong>収穫後の管理：</strong>収穫した野菜や果物を低温で保存し、呼吸を抑制して鮮度を長持ちさせる。</li>
                  </ul>
                </div>
              </div>

              {/* 蒸散と養水分吸収 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center"><i className="fas fa-tint mr-3 text-cyan-500"></i>蒸散と養水分吸収：体液の循環</h3>
                <p className="text-gray-700 leading-relaxed">
                  植物は、葉から水分を放出（<strong className="text-cyan-600">蒸散</strong>）することで、体温を調節しています。これは人間が汗をかくのと同じ仕組みです。そして、この蒸散にはもう一つ重要な役割があります。葉から水分が出ていくことで、植物の体内には<strong className="text-blue-500">ストローで吸い上げるような力</strong>が生まれ、根から新しい<strong className="text-blue-500">水</strong>と、水に溶けた<strong className="text-yellow-600">肥料分（栄養）</strong>を吸い上げる原動力となるのです。<br />
                  つまり、植物は蒸散することで、根から葉の先まで栄養を行き渡らせています。土が乾いて根から水が吸えなくなると、この流れが止まり、植物は元気をなくしてしまいます。
                </p>
                <div className="mt-4 bg-cyan-50 p-4 rounded-lg text-sm">
                  <p className="font-bold text-cyan-800"><i className="fas fa-lightbulb mr-2"></i>農業での応用</p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li><strong>灌水（水やり）：</strong>土壌の水分が不足すると、根からの吸水が止まり、蒸散もできなくなって生育が停止する。適切な灌水が重要。</li>
                    <li><strong>施肥（肥料やり）：</strong>肥料は水に溶けて初めて根から吸収される。水やりと肥料やりはセットで考える。</li>
                    <li><strong>土づくり：</strong>根が広く張れるように、通気性・保水性の良い土を作ることが、効率的な養水分吸収につながる。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
