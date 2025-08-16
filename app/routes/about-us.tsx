import type { MetaFunction } from '@remix-run/cloudflare'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: 'このサイトについて | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function AboutUs() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about-us" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/e9f5e9/ffffff?text=About+this+site\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">このサイトについて</h1>
            <p className="mt-4 text-lg text-green-100">鳥取で農業を志す、すべての仲間たちへ。</p>
          </div>
        </section>

        {/* 運営者メッセージ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/3 text-center">
                <img src="https://ssstakahashi-storage.studiofoods.net/logo/illustration_style_pfofile2..png" alt="運営者プロフィール" className="rounded-full shadow-lg w-48 h-48 mx-auto" />
                <h3 className="mt-4 text-xl font-bold">サイト運営者</h3>
                <p className="text-gray-500">Tottori Farmer</p>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-green-800 mb-4">はじめまして。</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  このサイトに訪れていただき、ありがとうございます。
                  私自身、鳥取県で新たに農業を始めようとしている一人です。
                  いまは、鳥取県立農業大学校のアグリチャレンジ科の30期生として、農業を学んでいるところです。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農業を始めようと決意したとき、まず直面したのが情報収集の壁でした。支援制度、農地の探し方、栽培技術…。大切な情報はたくさんあるのに、あちこちに散らばっていて、全体像を掴むのにとても苦労したのを覚えています。
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  「これから農業を始める人が、自分と同じ苦労をしなくても済むように」。
                  このサイトは、そんな想いから生まれました。私が実際に研修先で先輩方から教わったこと、役場や生産部会で聞いた話、自分で調べてまとめたノートが、このサイトの原型です。
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold">
                  このサイトが、あなたの「はじめの一歩」を少しでも後押しできたら。そして、鳥取の豊かな大地で一緒に汗を流す仲間が一人でも増えたら、これほど嬉しいことはありません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex">
                <div className="py-1"><i className="fas fa-exclamation-triangle text-yellow-500 mr-4"></i></div>
                <div>
                  <p className="text-yellow-800">
                    <strong>ご利用にあたっての注意</strong><br />
                    当サイトの情報は、運営者の経験や調査に基づき作成しておりますが、その正確性を保証するものではありません。特に支援制度などの情報は変更される場合がありますので、必ず公式サイトや担当窓口で最新の情報をご確認ください。
                  </p>
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
