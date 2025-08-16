import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '農業の基礎知識：農薬を知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Pesticide() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="pesticide" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Pesticides\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">農業の基礎知識：農薬を知る</h1>
            <p className="mt-4 text-lg text-green-100">作物を守り、安定した収穫を得るための大切な知識です。</p>
          </div>
        </section>

        {/* 農薬とは？ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">農薬ってなんだろう？</h2>
              <p className="text-gray-600 leading-relaxed">
                「農薬」と聞くと、害虫を殺す薬だけをイメージするかもしれませんが、法律（農薬取締法）ではもっと広く定義されています。具体的には、以下の2つの目的で使われる薬剤を指します。
              </p>
              <div className="mt-4 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">1. 防除に使われるもの（守る農薬）</h4>
                  <p className="text-sm text-gray-600 mt-1">農作物（※）を害する菌、線虫、ダニ、昆虫、ネズミなどの動植物や、ウイルスの防除に使われる殺菌剤、殺虫剤、除草剤など。</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">2. 生育を調整するもの（育てる農薬）</h4>
                  <p className="text-sm text-gray-600 mt-1">作物の成長を促進したり、逆に抑制したり、発根を促したり、着果を良くしたりする薬剤（植物成長調整剤など）。</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-left">※ここでいう農作物には、田畑で栽培される野菜や果樹だけでなく、庭木や公園の樹木、花なども含まれます。</p>
            </div>

            <div className="space-y-10">
              {/* なぜ農薬は必要か？ */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center"><i className="fas fa-shield-alt mr-3 text-green-500"></i>なぜ農薬は必要か？</h3>
                <p className="text-gray-700 leading-relaxed">
                  もし農薬を使わずに作物を育てると、病気で枯れてしまったり、害虫に食べられてしまったりして、収穫量が大幅に減ってしまいます。また、見た目が悪くなったり、味が落ちたりすることもあります。農薬を適切に使うことで、
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>病害虫や雑草による被害を防ぎ、収穫量を安定させる。</li>
                  <li>作物の品質を保ち、美味しい農産物を消費者に届ける。</li>
                  <li>除草作業などの労力を減らし、効率的な農業経営を可能にする。</li>
                </ul>
                <p className="text-gray-700 mt-2">といったメリットがあります。</p>
              </div>

              {/* 農薬の種類 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center"><i className="fas fa-flask mr-3 text-blue-400"></i>農薬の種類</h3>
                <p className="text-gray-700 leading-relaxed mb-4">農薬は、その目的によって大きく分けられます。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800">殺虫剤</h4>
                    <p className="text-sm text-gray-600">作物を食べる害虫を退治します。</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800">殺菌剤</h4>
                    <p className="text-sm text-gray-600">カビなどが原因の病気を防いだり、治療したりします。</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800">除草剤</h4>
                    <p className="text-sm text-gray-600">作物の生育を妨げる雑草を枯らします。</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800">植物成長調整剤</h4>
                    <p className="text-sm text-gray-600">作物の生長を促進したり、実の付きを良くしたりします。</p>
                  </div>
                </div>
              </div>

              {/* 農薬の安全な使い方 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-red-700 mb-3 flex items-center"><i className="fas fa-exclamation-triangle mr-3 text-red-500"></i>最も重要！農薬の安全な使い方</h3>
                <p className="text-gray-700 leading-relaxed">
                  日本で販売されている農薬は、国の厳しい審査を経て登録されたものです。ラベルに書かれている使用方法を守れば、人や環境への安全は確保されています。農薬を使う上で最も大切なことは、<strong className="text-red-600">必ずラベルを読んで、そこに書かれている内容を厳守する</strong>ことです。
                </p>
                <div className="mt-4 bg-red-50 p-4 rounded-lg text-sm">
                  <p className="font-bold text-red-800"><i className="fas fa-check-circle mr-2"></i>ラベルで確認するべき重要ポイント</p>
                  <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                    <li><strong>対象作物：</strong>その農薬が使える作物が決められています。登録のない作物には絶対に使ってはいけません。</li>
                    <li><strong>使用量（希釈倍数）：</strong>濃すぎると作物に害が出たり、残留のリスクが高まります。薄すぎると効果が出ません。</li>
                    <li><strong>使用時期：</strong>「収穫〇日前まで」という基準があります。これを守らないと、収穫物から基準値を超える農薬が検出される可能性があります。</li>
                    <li><strong>使用回数：</strong>同じ農薬を同じ作物に使える合計回数には上限があります。</li>
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <a href="https://www.maff.go.jp/j/nouyaku/" target="_blank" className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition">
                    より詳しい情報は農林水産省のページへ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 関連コンテンツ */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">関連コンテンツ</h2>
            <p className="text-gray-600 mb-8">農業の基礎科学に関する他のトピックもご覧いただけます。</p>
            <div className="flex justify-center">
              <a href="/physiology" className="bg-white text-green-700 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-50 transition">
                植物生理学について学ぶ
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
