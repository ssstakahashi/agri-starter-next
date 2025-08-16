import type { MetaFunction } from '@remix-run/cloudflare'
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: '鳥取の白ねぎを知る | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Onion() {
  useEffect(() => {
    // モバイルメニューのトグル機能
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')

    if (mobileMenuButton && mobileMenu) {
      const handleClick = () => {
        mobileMenu.classList.toggle('hidden')
      }
      mobileMenuButton.addEventListener('click', handleClick)
      return () => mobileMenuButton.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="bg-green-50 text-gray-800">
      {/* ヘッダー & ナビゲーション */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* サイトロゴ */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-green-800">鳥取県就農支援サイト</a>
            </div>
            {/* PC向けナビゲーション */}
            <nav className="hidden md:flex md:space-x-8">
              <a href="/about" className="text-green-700 font-semibold border-b-2 border-green-600">鳥取の農業を知る</a>
              <a href="/steps" className="text-gray-600 hover:text-green-700 transition duration-150 ease-in-out">就農までのステップ</a>
              <a href="/#support" className="text-gray-600 hover:text-green-700 transition duration-150 ease-in-out">支援制度</a>
              <a href="/tools" className="text-gray-600 hover:text-green-700 transition duration-150 ease-in-out">便利なツール</a>
            </nav>
            {/* お問い合わせボタン */}
            <div className="hidden md:block">
              <a href="/#contact" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">お問い合わせ</a>
            </div>
            {/* モバイルメニューボタン */}
            <div className="md:hidden">
              <button id="mobile-menu-button" className="text-gray-600 hover:text-green-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* モバイルメニュー */}
        <div id="mobile-menu" className="md:hidden hidden bg-white border-t">
          <a href="/about" className="block py-2 px-4 text-sm text-green-700 bg-green-50">鳥取の農業を知る</a>
          <a href="/steps" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">就農までのステップ</a>
          <a href="/#support" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">支援制度</a>
          <a href="/tools" className="block py-2 px-4 text-sm text-gray-600 hover:bg-green-50">便利なツール</a>
          <a href="/#contact" className="block py-2 px-4 text-sm text-white bg-green-600 hover:bg-green-700">お問い合わせ</a>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/c8e6c9/ffffff?text=Tottori+Green+Onion\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">鳥取の白ねぎを知る</h1>
            <p className="mt-4 text-lg text-green-100">弓浜半島の砂地が育んだ、甘くて柔らかい名脇役。</p>
          </div>
        </section>

        {/* 鳥取の白ねぎの歴史と特徴 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-green-800 mb-4">鍋物から薬味まで、食卓の万能選手</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  鳥取県西部の弓浜（ゆみがはま）半島は、水はけの良い砂地が広がり、白ねぎ栽培の最適地です。ここで育つ白ねぎは、白い部分が長く、繊維質が柔らかいため、熱を加えるととろけるような食感と強い甘みが引き出されます。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  「伯州美人（はくしゅうびじん）」などのブランドで知られ、その品質の高さから京阪神市場を中心に高い評価を得ています。作型を組み合わせることで一年を通じた出荷体制を確立しており、鳥取県を代表する野菜の一つとなっています。
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="https://placehold.co/600x400/e9f5e9/333333?text=ねぎ畑の風景" alt="鳥取のねぎ畑" className="rounded-lg shadow-lg w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ブランド・作型紹介セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">一年中味わえる鳥取の白ねぎ</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 秋冬ねぎ */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/d4e2d4/333333?text=秋冬ねぎ" alt="秋冬ねぎ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-green-900">秋冬ねぎ <span className="text-sm font-normal text-gray-500">(10月～3月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">白ねぎの旬。寒さにあたることで甘みと風味がぐっと増します。鍋物や焼きねぎにすると、とろりとした食感と濃厚な甘さを存分に楽しめます。</p>
                </div>
              </div>
              {/* 春夏ねぎ */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src="https://placehold.co/400x300/f0fff4/333333?text=春夏ねぎ" alt="春夏ねぎ" className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-800">春夏ねぎ <span className="text-sm font-normal text-gray-500">(4月～9月)</span></h3>
                  <p className="text-gray-600 mt-2 flex-grow">みずみずしく、さっぱりとした風味が特徴。薬味として冷奴やそうめんに添えたり、サラダや炒め物にしたりと、爽やかな辛味と香りが料理を引き立てます。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 主な産地紹介 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-green-800">白ねぎづくりの中心地</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-lg p-8">
                <p className="text-gray-700 mb-6">鳥取県の白ねぎは、そのほとんどが県西部の弓浜半島で生産されています。この地域は日本海と中海に挟まれた砂州で、白ねぎ栽培に非常に適した土壌条件を持っています。</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">米子市</h4>
                    <p className="text-sm text-gray-600">（旧 淀江町を含む）</p>
                    <p className="text-sm mt-1">弓浜半島の基部に位置し、広大なねぎ畑が広がる。</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold text-lg text-green-700">境港市</h4>
                    <p className="text-sm text-gray-600">弓浜半島の先端に位置する、県内最大の産地。</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-6">これらの地域では、収穫期になると選果場がフル稼働し、全国へ向けて高品質な白ねぎが出荷されていきます。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-2">鳥取県就農支援サイト</h3>
              <p className="text-sm text-green-200">このサイトは、鳥取県で農業を始めたい方を応援するための情報サイトです。</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">サイトマップ</h3>
              <ul className="text-sm space-y-1">
                <li><a href="/about" className="text-green-200 hover:text-white">鳥取の農業を知る</a></li>
                <li><a href="/steps" className="text-green-200 hover:text-white">就農までのステップ</a></li>
                <li><a href="/#support" className="text-green-200 hover:text-white">支援制度</a></li>
                <li><a href="/tools" className="text-green-200 hover:text-white">便利なツール</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">関連リンク</h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="text-green-200 hover:text-white">鳥取県庁</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">公益財団法人 鳥取県農業農村担い手育成機構</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-700 pt-4 text-center text-sm text-green-300">
            &copy; 2025 鳥取県就農支援サイト. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
