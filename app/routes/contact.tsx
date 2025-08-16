import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '支援機関・相談窓口 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Contact() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="contact" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Contact+Us\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">支援機関・相談窓口</h1>
            <p className="mt-4 text-lg text-green-100">あなたの「はじめの一歩」を、様々な機関がサポートします。</p>
          </div>
        </section>

        {/* 連絡先一覧セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

            {/* 就農相談の総合窓口 */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center"><i className="fas fa-star mr-3 text-yellow-500"></i>就農相談の総合窓口</h2>
              <p className="mb-6 text-gray-600">鳥取県で新たに農業を始めたい方のための相談窓口です。「どこに相談すれば良いか分からない」という方は、まずはこちらにご連絡ください。</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">鳥取県農業経営・就農支援センター</h3>
                <p className="text-gray-700 mb-4">（鳥取県農林水産事業団経営支援課内）</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold">本部</h4>
                    <p className="mt-2"><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒680-8570 鳥取市東町1丁目220</p>
                    <p><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0857-26-8366</p>
                    <p><i className="fas fa-fax w-5 text-center mr-1 text-gray-500"></i>0857-26-7294</p>
                    <p><i className="fas fa-globe w-5 text-center mr-1 text-gray-500"></i><a href="http://www.tottori-aff.or.jp/nougyou/" target="_blank" className="text-blue-600 hover:underline">http://www.tottori-aff.or.jp/nougyou/</a></p>
                    <p><i className="fas fa-envelope w-5 text-center mr-1 text-gray-500"></i>keieishien@pref.tottori.lg.jp</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">西部駐在</h4>
                    <p className="text-gray-700">（西部総合事務所農林局経営支援課内）</p>
                    <p className="mt-2"><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒683-0054 米子市旗ヶ崎2丁目2-1 B棟16D</p>
                    <p><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0859-31-9653</p>
                    <p><i className="fas fa-mobile-alt w-5 text-center mr-1 text-gray-500"></i>070-8803-5990 (西部地区担当普及指導員)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 農業協同組合（JA） */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center"><i className="fas fa-users mr-3 text-green-600"></i>農業協同組合（JA）</h2>
              <p className="mb-6 text-gray-600">農業資材の購入、生産物の集荷・販売、資金の貸付など、営農と暮らしを総合的にサポートします。栽培技術の指導も行っています。</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold">JA鳥取いなば (東部)</h3>
                  <p className="mt-2 text-sm"><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒680-0942 鳥取市湖山町東5丁目261</p>
                  <p className="text-sm"><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0857-32-1100</p>
                  <p className="text-sm"><i className="fas fa-fax w-5 text-center mr-1 text-gray-500"></i>0857-32-1130</p>
                  <p className="text-sm"><i className="fas fa-globe w-5 text-center mr-1 text-gray-500"></i><a href="https://www.ja-tottori.or.jp/" target="_blank" className="text-blue-600 hover:underline">Webサイト</a></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold">JA鳥取中央 (県中部)</h3>
                  <p className="mt-2 text-sm"><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒682-0867 倉吉市越殿町1409</p>
                  <p className="text-sm"><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0858-23-3000</p>
                  <p className="text-sm"><i className="fas fa-fax w-5 text-center mr-1 text-gray-500"></i>0858-23-3070</p>
                  <p className="text-sm"><i className="fas fa-globe w-5 text-center mr-1 text-gray-500"></i><a href="http://www.ja-tottorichuou.or.jp/" target="_blank" className="text-blue-600 hover:underline">Webサイト</a></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold">JA鳥取西部 (県西部)</h3>
                  <p className="mt-2 text-sm"><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒683-0802 米子市東福原一丁目5-16</p>
                  <p className="text-sm"><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0859-34-1141</p>
                  <p className="text-sm"><i className="fas fa-fax w-5 text-center mr-1 text-gray-500"></i>0859-37-5870</p>
                  <p className="text-sm"><i className="fas fa-globe w-5 text-center mr-1 text-gray-500"></i><a href="http://www.ja-tottoriseibu.or.jp/" target="_blank" className="text-blue-600 hover:underline">Webサイト</a></p>
                </div>
              </div>
            </div>

            {/* 専門機関 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center"><i className="fas fa-cogs mr-3 text-blue-600"></i>技術指導・専門機関</h2>

              {/* 農業改良普及所 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-blue-700 mb-2">農業改良普及所一覧 (県内7か所)</h3>
                <p className="text-gray-600 mb-4">地域の農業者グループの活動支援や、就農後の経営確立に向けた技術指導などを行います。</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-3 py-3">名称</th>
                        <th className="px-3 py-3">所在地</th>
                        <th className="px-3 py-3">電話 / FAX</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>鳥取農業改良普及所</strong><br />(鳥取市)</td>
                        <td className="px-3 py-3">〒680-0061 鳥取市立川町6丁目176</td>
                        <td className="px-3 py-3">TEL: 0857-20-3562<br />FAX: 0857-20-3583</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>八頭農業改良普及所</strong><br />(八頭町・若桜町・智頭町)</td>
                        <td className="px-3 py-3">〒680-0461 八頭郡八頭町郡家100</td>
                        <td className="px-3 py-3">TEL: 0858-72-3840<br />FAX: 0858-72-3867</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>東伯農業改良普及所 赤碕農業改良分室</strong><br />(琴浦町・三朝町)</td>
                        <td className="px-3 py-3">〒689-2502 東伯郡琴浦町徳万88-2</td>
                        <td className="px-3 py-3">TEL: 0858-23-3191<br />FAX: 0858-23-3198</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>東伯農業改良普及所</strong><br />(北栄町・琴浦町)</td>
                        <td className="px-3 py-3">〒689-2301 東伯郡琴浦町八橋212-1</td>
                        <td className="px-3 py-3">TEL: 0858-52-2125<br />FAX: 0858-52-2127</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>西部農業改良普及所</strong><br />(米子市・境港市・南部町・伯耆町・日吉津村)</td>
                        <td className="px-3 py-3">〒683-0054 米子市旗ヶ崎2-2-1 B棟16D</td>
                        <td className="px-3 py-3">TEL: 0859-31-9685<br />FAX: 0859-39-0494</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>西部農業改良普及所大山普及支所</strong><br />(大山町)</td>
                        <td className="px-3 py-3">〒689-3303 西伯郡大山町所子541-8</td>
                        <td className="px-3 py-3">TEL: 0859-53-3721<br />FAX: 0859-53-3723</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>日野農業改良普及所</strong><br />(日南町・日野町・江府町)</td>
                        <td className="px-3 py-3">〒689-4503 日野郡日野町根雨140-1</td>
                        <td className="px-3 py-3">TEL: 0859-72-2028<br />FAX: 0859-72-2090</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 各総合事務所農林局・農林事務所 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-blue-700 mb-2">各総合事務所農林局・農林事務所 (県内5か所)</h3>
                <p className="text-gray-600 mb-4">補助事業等の各種支援策の窓口となります。</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-3 py-3">名称</th>
                        <th className="px-3 py-3">所在地</th>
                        <th className="px-3 py-3">電話 / FAX</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>東部農林事務所 農業振興課</strong><br />(鳥取市・岩美町)</td>
                        <td className="px-3 py-3">〒680-0061 鳥取市立川町6丁目176</td>
                        <td className="px-3 py-3">TEL: 0857-20-3554<br />FAX: 0857-20-3567</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>八頭農林事務所 農業振興室</strong><br />(八頭町・若桜町・智頭町)</td>
                        <td className="px-3 py-3">〒680-0461 八頭郡八頭町郡家100</td>
                        <td className="px-3 py-3">TEL: 0858-72-3816<br />FAX: 0858-73-0136</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>中部総合事務所農林局 農業振興課</strong><br />(倉吉市・湯梨浜町・三朝町・北栄町・琴浦町)</td>
                        <td className="px-3 py-3">〒682-0802 倉吉市東巌城町2</td>
                        <td className="px-3 py-3">TEL: 0858-23-3165<br />FAX: 0858-23-3134</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>西部総合事務所農林局 農業振興課</strong><br />(米子市・境港市・南部町・伯耆町・日吉津村・大山町)</td>
                        <td className="px-3 py-3">〒683-0054 米子市旗ヶ崎2-2-1 B棟16D</td>
                        <td className="px-3 py-3">TEL: 0859-31-9652<br />FAX: 0859-34-1083</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-3 py-3"><strong>西部総合事務所日野振興センター 日野農林振興室</strong><br />(日南町・日野町・江府町)</td>
                        <td className="px-3 py-3">〒689-4503 日野郡日野町根雨140-1</td>
                        <td className="px-3 py-3">TEL: 0859-72-2011<br />FAX: 0859-72-2011</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 農業大学校 */}
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">鳥取県立農業大学校</h3>
                <p className="text-gray-600 mb-2">専門的な技術や知識を体系的に学ぶ養成課程や、短期の研修を実施しています。</p>
                <p><i className="fas fa-map-marker-alt w-5 text-center mr-1 text-gray-500"></i>〒682-0402 倉吉市関金町大鳥居1238</p>
                <p><i className="fas fa-phone-alt w-5 text-center mr-1 text-gray-500"></i>0858-45-2411</p>
                <p><i className="fas fa-fax w-5 text-center mr-1 text-gray-500"></i>0858-45-2412</p>
                <p><i className="fas fa-globe w-5 text-center mr-1 text-gray-500"></i><a href="http://www.pref.tottori.lg.jp/dd.aspx?menuid=53709" target="_blank" className="text-blue-600 hover:underline">Webサイト</a></p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
