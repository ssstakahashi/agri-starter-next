import type { MetaFunction } from '@remix-run/cloudflare'

import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取の農業を知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function About() {
  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="about" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Tottori+Specialty+Crops\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取の農業を知る</h1>
            <p className="mt-4 text-lg text-green-100">豊かな大地と変化に富んだ気候が育む、多彩な農畜産物の世界へようこそ。</p>
          </div>
        </section>

        {/* 鳥取県の農業の魅力 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-green-800">鳥取県の農業、3つの魅力</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">日本海と中国山地に抱かれた鳥取県ならではの、農業を始める上での強みをご紹介します。</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 魅力1 */}
              <div className="text-center p-8 bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <i className="fas fa-seedling text-5xl text-green-500 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">多様な気候と土壌</h3>
                <p className="text-gray-600">県の東西で異なる気候と、砂丘から中山間地までの多様な土壌が、二十世紀梨をはじめ、スイカ、白ねぎ、らっきょうなど、個性豊かな特産品を生み出します。</p>
              </div>
              {/* 魅力2 */}
              <div className="text-center p-8 bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <i className="fas fa-users text-5xl text-green-500 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">手厚いサポート体制</h3>
                <p className="text-gray-600">県や市町村、関係機関が一体となり、研修から就農後の経営安定までをきめ細かくサポート。新規就農者でも安心して農業に挑戦できる環境が整っています。</p>
              </div>
              {/* 魅力3 */}
              <div className="text-center p-8 bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <i className="fas fa-tractor text-5xl text-green-500 mb-4"></i>
                <h3 className="text-xl font-bold mb-2">先進技術への挑戦</h3>
                <p className="text-gray-600">スマート農業技術の導入や、環境に配慮した持続可能な農業（GAP等）にも積極的に取り組んでいます。未来を見据えた農業を実践できるフィールドです。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 数字で見る鳥取の農業 */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">数字で見る鳥取の農業</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold text-orange-500">約49%</p>
                <p className="mt-2 text-gray-600">二十世紀梨の全国シェア<br /><span className="text-xs">(2023年)</span></p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold text-green-600">1,200ha</p>
                <p className="mt-2 text-gray-600">ブロッコリーの作付面積<br /><span className="text-xs">(西日本最大級)</span></p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold text-blue-500">100人以上</p>
                <p className="mt-2 text-gray-600">毎年の新規就農者数<br /><span className="text-xs">(過去5年平均)</span></p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-4xl font-bold text-red-500">65.8歳</p>
                <p className="mt-2 text-gray-600">農業就業者の平均年齢<br /><span className="text-xs">(全国平均より若い)</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 主要な特産品 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">鳥取が誇る主な特産品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 特産品カード */}
              <a href="/pear" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <img src="https://placehold.co/400x300/e9f5e9/333333?text=二十世紀梨" alt="二十世紀梨" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-bold">二十世紀梨</h3>
                  <p className="text-sm text-gray-600 mt-1">みずみずしい果汁とシャリシャリした食感が特徴。100年以上の歴史を誇る鳥取の顔です。</p>
                </div>
              </a>
              <a href="/rakkyo" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <img src="https://placehold.co/400x300/d4e2d4/333333?text=砂丘らっきょう" alt="砂丘らっきょう" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-bold">砂丘らっきょう</h3>
                  <p className="text-sm text-gray-600 mt-1">日本一の砂丘地帯で栽培され、色白でシャキシャキとした歯ごたえが人気です。</p>
                </div>
              </a>
              <a href="/onion" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <img src="https://placehold.co/400x300/f0fff4/333333?text=白ねぎ" alt="白ねぎ" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-bold">白ねぎ</h3>
                  <p className="text-sm text-gray-600 mt-1">弓浜半島の砂地で育ち、柔らかく甘みが強いのが特徴。鍋物や薬味に最適です。</p>
                </div>
              </a>
              <a href="/watermelon" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <img src="https://placehold.co/400x300/d1e7dd/333333?text=スイカ" alt="スイカ" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <h3 className="font-bold">スイカ</h3>
                  <p className="text-sm text-gray-600 mt-1">大山山麓の黒ぼく土壌で育つ大玉スイカは、糖度が高くシャリ感も抜群です。</p>
                </div>
              </a>
            </div>
            <div className="text-center mt-12">
              <a href="#" className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition">その他の特産品も見る</a>
            </div>
          </div>
        </section>

        {/* さらに詳しく知る */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">さらに詳しく知る</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 肥料を知る */}
              <a href="/fertilizers" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">肥料を知る</h3>
                  <p className="text-gray-600">土と作物の健康を支える肥料の基本知識から、種類や効果的な使い方までを学びます。</p>
                </div>
              </a>
              {/* 農業経営を知る */}
              <a href="/farm-management" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">農業経営を知る</h3>
                  <p className="text-gray-600">農業をビジネスとして成功させるための、経営計画、資金繰り、販売戦略などを学びます。</p>
                </div>
              </a>
              {/* 自然農法を知る */}
              <a href="/natural-farming" className="block bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">自然農法を知る</h3>
                  <p className="text-gray-600">化学肥料や農薬に頼らず、自然の力を活かした持続可能な農法について学びます。</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
