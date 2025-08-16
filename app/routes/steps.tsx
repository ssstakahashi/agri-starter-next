import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '就農までのステップ | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Steps() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="steps" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Steps+to+Farming\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">就農までのステップ</h1>
            <p className="mt-4 text-lg text-green-100">夢の実現に向けて、一歩ずつ着実に進んでいきましょう。</p>
          </div>
        </section>

        {/* ステップ紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* イントロダクション */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-green-800 mb-4">農業を始めるための4つのステップ</h2>
              <p className="text-gray-600">農業を仕事にするには、技術の習得や経営の知識、農地の確保など、様々な準備が必要です。鳥取県では、あなたの状況に合わせて各段階でサポートを用意しています。まずは全体の流れを把握しましょう。</p>
            </div>

            {/* ステップのタイムライン */}
            <div className="space-y-12">
              {/* STEP 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img src="https://placehold.co/600x400/e9f5e9/333333?text=相談・情報収集" alt="相談風景" className="rounded-lg shadow-lg w-full" />
                </div>
                <div className="md:w-1/2">
                  <span className="text-orange-500 font-bold">STEP 01</span>
                  <h3 className="text-2xl font-bold text-green-800 my-2">相談・情報収集</h3>
                  <p className="text-gray-600 mb-4">
                    「農業に興味があるけれど、何から始めればいいかわからない」という方は、まずはお気軽にご相談ください。あなたの希望や適性、ライフプランに合わせた就農のカタチを一緒に考えます。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>就農相談会やセミナーへの参加</li>
                    <li>県の相談窓口（担い手育成機構など）の活用</li>
                    <li>農業法人での就業体験・インターンシップ</li>
                    <li>先輩農家への訪問</li>
                  </ul>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <img src="https://placehold.co/600x400/d4e2d4/333333?text=研修・技術習得" alt="農作業研修" className="rounded-lg shadow-lg w-full" />
                </div>
                <div className="md:w-1/2">
                  <span className="text-orange-500 font-bold">STEP 02</span>
                  <h3 className="text-2xl font-bold text-green-800 my-2">研修・技術習得</h3>
                  <p className="text-gray-600 mb-4">
                    農業は実践が何よりも大切です。県が認定する研修機関や先進的な農家さんの下で、栽培したい作物の専門的な技術や、経営のノウハウを体系的に学びます。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>鳥取県立農業大学校での学習</li>
                    <li>農業法人での実践的な雇用研修</li>
                    <li>先進農家でのマンツーマン指導</li>
                    <li>各種資格（大型特殊免許など）の取得</li>
                  </ul>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <img src="https://placehold.co/600x400/f0fff4/333333?text=計画・農地確保" alt="営農計画書" className="rounded-lg shadow-lg w-full" />
                </div>
                <div className="md:w-1/2">
                  <span className="text-orange-500 font-bold">STEP 03</span>
                  <h3 className="text-2xl font-bold text-green-800 my-2">計画・農地確保</h3>
                  <p className="text-gray-600 mb-4">
                    研修で得た知識と経験をもとに、具体的な「営農計画」を作成します。どこで、何を、どれくらいの規模で始めるのかを明確にし、それに必要な農地や資金、機械、住居などを確保していきます。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>青年等就農計画の認定申請</li>
                    <li>農地バンクや市町村を通じた農地の斡旋</li>
                    <li>就農支援資金（無利子融資など）の活用</li>
                    <li>空き家バンクなどを利用した住居探し</li>
                  </ul>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/2">
                  <img src="https://placehold.co/600x400/d1e7dd/333333?text=営農開始" alt="収穫の喜び" className="rounded-lg shadow-lg w-full" />
                </div>
                <div className="md:w-1/2">
                  <span className="text-orange-500 font-bold">STEP 04</span>
                  <h3 className="text-2xl font-bold text-green-800 my-2">営農開始</h3>
                  <p className="text-gray-600 mb-4">
                    いよいよ独立・自営農家としてのスタートです。計画に沿って栽培を開始し、販路を開拓していきます。就農後も経営が安定するまで、地域の農業普及指導員や先輩農家が継続的にサポートしますのでご安心ください。
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>栽培管理と営農記録の徹底</li>
                    <li>JAや直売所、ECサイトなどでの販売</li>
                    <li>地域の農業者とのネットワーク構築</li>
                    <li>経営改善のための専門家相談</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-green-600 text-white rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">さあ、最初の一歩を踏み出そう</h2>
              <p className="max-w-2xl mx-auto mb-8">就農に関する疑問や不安は、専門の相談員が親身にお聞きします。<br />まずはお気軽にお問い合わせください。</p>
              <a href="/#contact" className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition transform hover:scale-105 duration-300">
                <i className="fas fa-phone-alt mr-2"></i> 無料相談窓口はこちら
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
