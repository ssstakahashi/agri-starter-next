import type { MetaFunction } from '@remix-run/cloudflare'
import { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '便利なツール | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

export default function Tools() {
  const [openDetails, setOpenDetails] = useState<string | null>(null)

  const toggleDetails = (toolId: string) => {
    setOpenDetails(openDetails === toolId ? null : toolId)
  }

  const toolDetails: Record<string, string> = {
    'income-planning': '営農計画を立てる際、収支の見通しを立てることが重要です。しかし、計算が複雑で時間がかかるため、簡易的な収支計画を簡単に作成できるツールを提供することで、新しい就農者や既存の農業者の方々が、より効率的に営農計画を策定できるよう支援することを目的としています。',
    'pesticide-search': '農薬の使用は適切な管理が重要ですが、作物や病害虫に応じた適切な農薬を探すのは大変です。鳥取県で使用可能な農薬を簡単に検索できるツールを提供することで、適切な農薬の選択を支援し、効率的な病害虫防除を実現することを目指しています。',
    'fertilizer-search': '土壌診断結果に基づいた適切な肥料の選択は、作物の健全な成長に欠かせません。土壌の状態や作物の種類に応じた推奨肥料を検索できるツールを提供することで、適切な施肥管理を支援し、持続可能な農業を実現することを目的としています。',
    'pesticide-calculation': '農薬散布時、散布面積と希釈倍率から必要な原液量を計算するのは、計算ミスが起きやすい作業です。正確な計算を自動化することで、農薬の適正使用を支援し、環境への負荷を減らすとともに、農薬コストの最適化を図ることを目的としています。',
    'market-price': '農産物の販売価格の動向を把握することは、適切な出荷時期の判断や経営判断に重要です。鳥取県内の市場情報を分かりやすく可視化することで、農業者の方々がより良い判断を下せるよう支援することを目的としています。',
    'farm-area-measurement': '圃場の正確な面積を把握することは、施肥量や播種量の計算、各種申請書類の作成などに必要です。地図上で簡単に面積を測定できるツールを提供することで、圃場管理の効率化を図ることを目的としています。',
    'pdf-compress': '農業に関する各種書類や資料をメールで送信する際、ファイルサイズが大きすぎて送信できないことがあります。PDFや画像ファイルを簡単に圧縮できるツールを提供することで、情報共有の円滑化を図ることを目的としています。',
    'file-storage': '農業に関する資料、写真、帳簿などの情報を安全に保管・管理することは重要ですが、適切な保管場所を確保するのは大変です。クラウドストレージを提供することで、どこからでもアクセス可能で、災害時にも情報を保護できる環境を整えることを目的としています。',
    'invoice-search': 'インボイス制度の導入により、適格請求書等の発行が義務付けられました。取引先の法人番号や登録情報を簡単に確認できるツールを提供することで、適切な請求書の発行を支援し、制度への対応を円滑にすることを目的としています。',
    'postal-code-search': '各種申請書類や配送管理において、正確な住所や郵便番号の入力は重要です。郵便番号と住所を相互に検索できるツールを提供することで、事務作業の効率化と入力ミスの削減を図ることを目的としています。'
  }

  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="tools" />

      {/* メインコンテンツ */}
      <main>
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Useful+Tools\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">便利なツール</h1>
            <p className="mt-4 text-lg text-green-100">あなたの農業経営をサポートする、様々な無料ツールをご利用いただけます。</p>
          </div>
        </section>

        {/* ツール一覧セクション */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* 収支計画作成ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-calculator text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">収支計画作成ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">栽培品目や面積、見込み収量などを入力するだけで、簡易的な収支計画を作成。営農計画策定の参考に。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('income-planning')}
                    className="text-sm text-green-600 hover:text-green-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'income-planning' && (
                    <div className="mt-2 p-3 bg-green-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['income-planning']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 農薬一覧 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-flask-vial text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">農薬検索</h3>
                <p className="text-gray-600 mb-4 flex-grow">作物名や病害虫名から、鳥取県で登録・使用可能な農薬を検索できます。希釈倍率や使用時期も確認可能。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('pesticide-search')}
                    className="text-sm text-green-600 hover:text-green-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'pesticide-search' && (
                    <div className="mt-2 p-3 bg-green-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['pesticide-search']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 肥料一覧 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <i className="fas fa-leaf text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">肥料検索</h3>
                <p className="text-gray-600 mb-4 flex-grow">土壌診断の結果や作物の種類に応じて、推奨される肥料の種類や成分量を検索できます。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('fertilizer-search')}
                    className="text-sm text-green-600 hover:text-green-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'fertilizer-search' && (
                    <div className="mt-2 p-3 bg-green-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['fertilizer-search']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 農薬使用量計算 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-orange-100 text-orange-600 rounded-full p-4 mb-4">
                  <i className="fas fa-vial-circle-check text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">農薬使用量計算</h3>
                <p className="text-gray-600 mb-4 flex-grow">散布面積と希釈倍率を入力するだけで、必要な農薬の原液量と水の量を自動で計算します。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('pesticide-calculation')}
                    className="text-sm text-orange-600 hover:text-orange-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'pesticide-calculation' && (
                    <div className="mt-2 p-3 bg-orange-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['pesticide-calculation']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 農産物市況 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                  <i className="fas fa-yen-sign text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">農産物市況情報</h3>
                <p className="text-gray-600 mb-4 flex-grow">鳥取県内の主要な卸売市場における、主要品目の市況データ（日次・週次）をグラフで確認できます。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('market-price')}
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'market-price' && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['market-price']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 農地面積測定ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-100 text-gray-600 rounded-full p-4 mb-4">
                  <i className="fas fa-draw-polygon text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">農地面積測定ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">地図上で農地を囲むだけで、おおよその面積や周回距離を計測。圃場管理に役立ちます。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('farm-area-measurement')}
                    className="text-sm text-gray-600 hover:text-gray-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'farm-area-measurement' && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['farm-area-measurement']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* PDF等圧縮用 */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
                  <i className="fas fa-file-pdf text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">PDF等圧縮用</h3>
                <p className="text-gray-600 mb-4 flex-grow">PDFファイルや画像ファイルを圧縮してファイルサイズを削減。メール送信やストレージ節約に便利です。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('pdf-compress')}
                    className="text-sm text-red-600 hover:text-red-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'pdf-compress' && (
                    <div className="mt-2 p-3 bg-red-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['pdf-compress']}</p>
                    </div>
                  )}
                  <a href="https://reduce-size.web.app/pdf" target="_blank" rel="noopener noreferrer" className="mt-auto w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">利用する</a>
                </div>
              </div>

              {/* ファイルストレージ */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 mb-4">
                  <i className="fas fa-cloud text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-indigo-800 mb-2">ファイルストレージ</h3>
                <p className="text-gray-600 mb-4 flex-grow">農業に関する資料や写真などを安全に保存・管理。必要な時にいつでもアクセスできます。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('file-storage')}
                    className="text-sm text-indigo-600 hover:text-indigo-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'file-storage' && (
                    <div className="mt-2 p-3 bg-indigo-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['file-storage']}</p>
                    </div>
                  )}
                  <a href="https://mieru-storage.studiofoods.net/" target="_blank" rel="noopener noreferrer" className="mt-auto w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">利用する</a>
                </div>
              </div>

              {/* インボイス法人番号検索ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4">
                  <i className="fas fa-building text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">インボイス法人番号検索ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">法人番号や会社名から、インボイス制度に必要な情報を検索。取引先の登録情報を簡単に確認できます。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('invoice-search')}
                    className="text-sm text-purple-600 hover:text-purple-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'invoice-search' && (
                    <div className="mt-2 p-3 bg-purple-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['invoice-search']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
                </div>
              </div>

              {/* 郵便番号検索ツール */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-teal-100 text-teal-600 rounded-full p-4 mb-4">
                  <i className="fas fa-envelope text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-2">郵便番号検索ツール</h3>
                <p className="text-gray-600 mb-4 flex-grow">郵便番号から住所を検索、または住所から郵便番号を検索。各種書類作成や配送管理に便利です。</p>
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => toggleDetails('postal-code-search')}
                    className="text-sm text-teal-600 hover:text-teal-700 underline"
                  >
                    詳細
                  </button>
                  {openDetails === 'postal-code-search' && (
                    <div className="mt-2 p-3 bg-teal-50 rounded-md text-left text-sm text-gray-700">
                      <p>{toolDetails['postal-code-search']}</p>
                    </div>
                  )}
                  <a href="#" className="mt-auto w-full text-center bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed opacity-60">準備中</a>
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
