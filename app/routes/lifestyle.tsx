import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取県中部の暮らしを知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Lifestyle() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="lifestyle" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Life+in+Central+Tottori\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取県中部の暮らしを知る</h1>
            <p className="mt-4 text-lg text-green-100">農業が盛んな4つの市町の、リアルな生活環境をご紹介します。</p>
          </div>
        </section>

        {/* 市町紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-green-800 mb-4">どんな場所？ どんな暮らし？</h2>
              <p className="text-gray-600">鳥取県中部は、県内有数の穀倉地帯であり、梨やスイカなどの果樹栽培も盛んです。ここでは、就農地として人気の高い倉吉市、湯梨浜町、琴浦町、北栄町の生活環境や特色をまとめました。あなたのライフスタイルに合う場所を見つける参考にしてください。</p>
            </div>

            <div className="space-y-16">
              {/* 倉吉市 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="https://placehold.co/600x800/e9f5e9/333333?text=倉吉市" alt="倉吉市" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h3 className="text-2xl font-bold text-green-800 mb-3">倉吉市 <span className="text-lg font-normal text-gray-500">- 中部の中心都市 -</span></h3>
                    <p className="text-gray-700 mb-6">商業施設や医療機関が集まる中部地区の中心地。歴史的な白壁土蔵群が残る美しい街並みと、生活の利便性が両立しています。</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><i className="fas fa-shopping-cart w-5 text-green-600"></i> <strong>買い物:</strong> スーパー、大型商業施設、ホームセンター等が充実。</div>
                      <div><i className="fas fa-hospital w-5 text-green-600"></i> <strong>医療:</strong> 地域の基幹病院があり、各種クリニックも多数。</div>
                      <div><i className="fas fa-child w-5 text-green-600"></i> <strong>子育て:</strong> 待機児童ゼロ。子育て支援施設も充実。</div>
                      <div><i className="fas fa-car w-5 text-green-600"></i> <strong>アクセス:</strong> JR倉吉駅から特急で鳥取・米子へアクセス良好。</div>
                      <div><i className="fas fa-home w-5 text-green-600"></i> <strong>住まい:</strong> 市街地から郊外まで物件は多様。移住者向けの支援制度も。</div>
                      <div><i className="fas fa-leaf w-5 text-green-600"></i> <strong>主な農産物:</strong> スイカ、梨、プリンスメロン、ネギ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 湯梨浜町 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex flex-row-reverse">
                  <div className="md:w-1/3">
                    <img src="https://placehold.co/600x800/d4e2d4/333333?text=湯梨浜町" alt="湯梨浜町" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h3 className="text-2xl font-bold text-green-800 mb-3">湯梨浜町 <span className="text-lg font-normal text-gray-500">- 湖畔と温泉のまち -</span></h3>
                    <p className="text-gray-700 mb-6">東郷湖のほとりに位置し、はわい温泉・東郷温泉で知られる風光明媚な町。二十世紀梨の一大産地でもあります。</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><i className="fas fa-shopping-cart w-5 text-green-600"></i> <strong>買い物:</strong> 町内にスーパー、ドラッグストアあり。倉吉市へも近い。</div>
                      <div><i className="fas fa-hospital w-5 text-green-600"></i> <strong>医療:</strong> 町内にクリニックが点在。救急は倉吉市の病院と連携。</div>
                      <div><i className="fas fa-child w-5 text-green-600"></i> <strong>子育て:</strong> グラウンド・ゴルフ発祥の地。三世代交流が盛ん。</div>
                      <div><i className="fas fa-car w-5 text-green-600"></i> <strong>アクセス:</strong> JR松崎駅・泊駅があり、国道9号線も利用しやすい。</div>
                      <div><i className="fas fa-home w-5 text-green-600"></i> <strong>住まい:</strong> 湖畔の景観が良いエリアが人気。空き家バンク制度あり。</div>
                      <div><i className="fas fa-leaf w-5 text-green-600"></i> <strong>主な農産物:</strong> 二十世紀梨、野花梅、らっきょう</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 琴浦町 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img src="https://placehold.co/600x800/c3e6cb/333333?text=琴浦町" alt="琴浦町" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h3 className="text-2xl font-bold text-green-800 mb-3">琴浦町 <span className="text-lg font-normal text-gray-500">- 海と山の幸に恵まれたまち -</span></h3>
                    <p className="text-gray-700 mb-6">日本海に面し、新鮮な魚介類が水揚げされる一方、大山山麓の豊かな自然も併せ持つ町。農業・漁業ともに盛んです。</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><i className="fas fa-shopping-cart w-5 text-green-600"></i> <strong>買い物:</strong> 国道沿いにスーパーや量販店が立地し便利。</div>
                      <div><i className="fas fa-hospital w-5 text-green-600"></i> <strong>医療:</strong> 町立病院があり、地域医療の拠点となっている。</div>
                      <div><i className="fas fa-child w-5 text-green-600"></i> <strong>子育て:</strong> 学校給食は100%町内産米を使用。食育に力を入れている。</div>
                      <div><i className="fas fa-car w-5 text-green-600"></i> <strong>アクセス:</strong> JR浦安駅・八橋駅があり、山陰道（無料）のICも近い。</div>
                      <div><i className="fas fa-home w-5 text-green-600"></i> <strong>住まい:</strong> 移住定住ポータルサイトで情報発信に積極的。</div>
                      <div><i className="fas fa-leaf w-5 text-green-600"></i> <strong>主な農産物:</strong> ブロッコリー、スイカ、白ねぎ、イチゴ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 北栄町 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex flex-row-reverse">
                  <div className="md:w-1/3">
                    <img src="https://placehold.co/600x800/f0fff4/333333?text=北栄町" alt="北栄町" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <h3 className="text-2xl font-bold text-green-800 mb-3">北栄町 <span className="text-lg font-normal text-gray-500">- スイカと風車のまち -</span></h3>
                    <p className="text-gray-700 mb-6">「名探偵コナン」の作者の出身地として有名。広大な砂丘畑ではブランドスイカ「大栄スイカ」や長芋が栽培されています。</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><i className="fas fa-shopping-cart w-5 text-green-600"></i> <strong>買い物:</strong> 町内にスーパー、ドラッグストアあり。</div>
                      <div><i className="fas fa-hospital w-5 text-green-600"></i> <strong>医療:</strong> 町内にクリニックが点在。近隣市町の病院も利用しやすい。</div>
                      <div><i className="fas fa-child w-5 text-green-600"></i> <strong>子育て:</strong> 町内にこども園、小学校、中学校が揃う。</div>
                      <div><i className="fas fa-car w-5 text-green-600"></i> <strong>アクセス:</strong> JR由良駅があり、国道9号線が町を横断。</div>
                      <div><i className="fas fa-home w-5 text-green-600"></i> <strong>住まい:</strong> 平坦な土地が多く、住宅地も多い。空き家バンク制度あり。</div>
                      <div><i className="fas fa-leaf w-5 text-green-600"></i> <strong>主な農産物:</strong> 大栄スイカ、長芋、らっきょう、白ねぎ</div>
                    </div>
                  </div>
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
