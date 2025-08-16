export default function Footer() {
  return (
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
              <li><a href="/contact" className="text-green-200 hover:text-white">相談窓口</a></li>
              <li><a href="/about-us" className="text-green-200 hover:text-white">このサイトについて</a></li>
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
  )
}
