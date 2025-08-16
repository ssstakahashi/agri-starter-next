import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '支援制度 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Support() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="support" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Support+System\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">新規就農関係の主な支援制度</h1>
            <p className="mt-4 text-lg text-green-100">あなたのステージに合わせた、国や県の様々な支援制度をご活用ください。</p>
          </div>
        </section>

        {/* 支援制度紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

            {/* 認定新規就農者とは */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-12">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">まず「認定新規就農者」を目指しましょう</h2>
              <p className="text-blue-900 mb-4">
                独立・自営就農を目指す場合、多くの支援制度は市町村から「青年等就農計画」の認定を受けた<strong>「認定新規就農者」</strong>になることが前提条件となります。
              </p>
              <div className="bg-white p-4 rounded-md">
                <h3 className="font-bold mb-2">認定新規就農者とは</h3>
                <p className="text-sm text-gray-700 mb-2"><strong>対象者:</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                  <li>青年（原則18歳以上45歳未満）</li>
                  <li>特定の知識・技術を有する中高年齢者（65歳未満）</li>
                  <li>上記の者が役員の過半数を占める法人</li>
                </ul>
                <p className="text-sm text-gray-700 mb-2"><strong>主な認定基準:</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                  <li>計画が市町村の基本構想に照らして適切であること</li>
                  <li>研修経験等から、計画達成の見込みが確実であること</li>
                  <li>農業経営を開始して5年を経過しない者であること</li>
                </ul>
                <a href="https://www.maff.go.jp/j/new_farmer/nintei_syunou.html" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">詳しくは農林水産省のHPもご確認ください &rarr;</a>
              </div>
            </div>

            {/* 支援カテゴリ */}
            <div className="space-y-12">
              {/* 【1】 営農・生活資金の支援 */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-300 flex items-center gap-3"><i className="fas fa-coins text-yellow-500"></i>【1】 営農・生活資金の支援</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 就農準備資金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">国</span><h3 className="text-xl font-bold mb-2">就農準備資金</h3><p className="text-gray-500 text-sm mb-3">（農業次世代人材投資資金・準備型）</p><p className="text-gray-700 mb-4 flex-grow">県指定の研修機関で就農前の研修に集中する方に資金を交付します。</p><p className="font-bold">支援額: 年間150万円（最長2年間）</p></div>
                  {/* 経営開始資金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">国</span><h3 className="text-xl font-bold mb-2">経営開始資金</h3><p className="text-gray-500 text-sm mb-3">（農業次世代人材投資資金・経営開始型）</p><p className="text-gray-700 mb-4 flex-grow">経営・生活等を支援するため、使途を特定しない交付金を交付します。</p><p className="font-bold">支援額: 年間150万円（経営開始1〜3年目）</p></div>
                  {/* 就農応援交付金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">就農応援交付金</h3><p className="text-gray-700 mb-4 flex-grow">経営・生活等を支援するため、使途を特定しない交付金を交付します。</p><p className="font-bold">支援額: 年間120万円（経営開始1〜3年目）</p></div>
                  {/* 就農研修交付金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">就農研修交付金</h3><p className="text-gray-700 mb-4 flex-grow">就農前の研修に集中する方に資金を交付します。（国の就農準備資金の対象外となる「アグリチャレンジ科」受講者向け）</p><p className="font-bold">支援額: 月10万円（最長4カ月）</p></div>
                </div>
              </div>

              {/* 【2】 機械・施設整備の支援 */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-300 flex items-center gap-3"><i className="fas fa-tractor text-orange-500"></i>【2】 機械・施設整備の支援</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 経営発展支援事業 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">国</span><h3 className="text-xl font-bold mb-2">経営発展支援事業</h3><p className="text-gray-700 mb-4 flex-grow">機械・施設の導入等の取組を支援します。</p><p className="font-bold">事業費上限: 500万円</p><p className="font-bold">補助率: 国 1/2、県 1/4</p></div>
                  {/* 就農条件整備事業 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">就農条件整備事業</h3><p className="text-gray-700 mb-4 flex-grow">就農5年以内に必要な機械・施設整備等を支援します。</p><p className="font-bold">事業費上限: 1,600万円</p><p className="font-bold">補助率: 県 1/3、市町 1/6</p></div>
                </div>
              </div>

              {/* 【3】 資金の融資 */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-300 flex items-center gap-3"><i className="fas fa-yen-sign text-indigo-500"></i>【3】 資金の融資</h2>
                <div className="grid grid-cols-1">
                  {/* 青年等就農資金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">国</span><h3 className="text-xl font-bold mb-2">青年等就農資金</h3><p className="text-gray-700 mb-4 flex-grow">経営開始に必要な機械・施設の取得に必要な資金を無利子で貸付します。</p><p className="font-bold">借入限度額: 3,700万円</p><p className="font-bold">償還期限: 17年以内（うち据置期間5年以内）</p></div>
                </div>
              </div>

              {/* 【4】 その他の支援 */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-300 flex items-center gap-3"><i className="fas fa-hands-helping text-pink-500"></i>【4】 その他の支援</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 親元就農促進支援交付金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">親元就農促進支援交付金</h3><p className="text-gray-700 mb-4 flex-grow">親元就農者（子等）に対する経営基盤の継承を促進するための研修に係る経費を支援します。</p><p className="font-bold">支援額: 年間120万円（最大2年間）</p></div>
                  {/* 就農・くらしのアドバイザー事業 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">就農・くらしのアドバイザー事業</h3><p className="text-gray-700 mb-4 flex-grow">就農1年目の農業経営、農村生活に関する指導・助言を行う地域のアドバイザーに係る報償費を支援します。</p><p className="font-bold">支援額: 報償費 月3万円（1年間）</p></div>
                </div>
              </div>

              {/* 【5】 雇用就農向けの支援 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-300 flex items-center gap-3"><i className="fas fa-handshake text-teal-500"></i>【5】 雇用就農向けの支援</h2>
                <p className="mb-6 text-gray-600">独立自営だけでなく、まずは農業法人等で働きながら技術を身につける「雇用就農」という道もあります。雇用就農者や雇用主向けの支援も用意されています。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 雇用就農資金 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">国</span><h3 className="text-xl font-bold mb-2">雇用就農資金</h3><p className="text-gray-700 mb-4 flex-grow">農業法人等が新たに正規雇用した新規就業者に対する実践研修を支援します。</p><p className="font-bold">支援額: 月5万円（最長4年間）</p></div>
                  {/* 農の雇用ステップアップ支援事業 */}
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col"><span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full self-start mb-3">県</span><h3 className="text-xl font-bold mb-2">農の雇用ステップアップ支援事業</h3><p className="text-gray-700 mb-4 flex-grow">（未来を託す農場リーダー育成事業）</p><p className="font-bold">支援額: 月5万円（最長2年間）</p></div>
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
