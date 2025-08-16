import { useEffect } from 'react'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
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

  const isActive = (page: string) => {
    return currentPage === page
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* サイトロゴ */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-800">鳥取県就農支援サイト</a>
          </div>
          {/* PC向けナビゲーション */}
          <nav className="hidden md:flex md:space-x-8">
            <a
              href="/about"
              className={`transition duration-150 ease-in-out ${isActive('about')
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-700'
                }`}
            >
              鳥取の農業を知る
            </a>
            <a
              href="/steps"
              className={`transition duration-150 ease-in-out ${isActive('steps')
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-700'
                }`}
            >
              就農までのステップ
            </a>
            <a
              href="/support"
              className={`transition duration-150 ease-in-out ${isActive('support')
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-700'
                }`}
            >
              支援制度
            </a>
            <a
              href="/tools"
              className={`transition duration-150 ease-in-out ${isActive('tools')
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-700'
                }`}
            >
              便利なツール
            </a>
            <a
              href="/contact"
              className={`transition duration-150 ease-in-out ${isActive('contact')
                ? 'text-green-700 font-semibold border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-700'
                }`}
            >
              相談窓口
            </a>
          </nav>
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
        <a
          href="/about"
          className={`block py-2 px-4 text-sm ${isActive('about')
            ? 'text-green-700 bg-green-50'
            : 'text-gray-600 hover:bg-green-50'
            }`}
        >
          鳥取の農業を知る
        </a>
        <a
          href="/steps"
          className={`block py-2 px-4 text-sm ${isActive('steps')
            ? 'text-green-700 bg-green-50'
            : 'text-gray-600 hover:bg-green-50'
            }`}
        >
          就農までのステップ
        </a>
        <a
          href="/support"
          className={`block py-2 px-4 text-sm ${isActive('support')
            ? 'text-green-700 bg-green-50'
            : 'text-gray-600 hover:bg-green-50'
            }`}
        >
          支援制度
        </a>
        <a
          href="/tools"
          className={`block py-2 px-4 text-sm ${isActive('tools')
            ? 'text-green-700 bg-green-50'
            : 'text-gray-600 hover:bg-green-50'
            }`}
        >
          便利なツール
        </a>
        <a
          href="/contact"
          className={`block py-2 px-4 text-sm ${isActive('contact')
            ? 'text-green-700 bg-green-50'
            : 'text-gray-600 hover:bg-green-50'
            }`}
        >
          相談窓口
        </a>
      </div>
    </header>
  )
}
