import type { MetaFunction } from '@remix-run/cloudflare'
import { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const meta: MetaFunction = () => {
  return [
    { title: '就農スタート診断 | 鳥取県就農支援サイト' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
}

// データ構造：質問と結果の定義
const decisionTree: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    type: 'question',
    text: '農業の経験はありますか？',
    options: [
      { label: 'はい', nextId: 'has_experience' },
      { label: 'いいえ', nextId: 'no_experience' },
    ],
  },
  has_experience: {
    id: 'has_experience',
    type: 'question',
    text: '希望する作物は決まっていますか？',
    options: [
      { label: 'はい', nextId: 'result_search_land' },
      { label: 'いいえ', nextId: 'result_consult' },
    ],
  },
  no_experience: {
    id: 'no_experience',
    type: 'question',
    text: '研修を受ける時間は確保できますか？',
    options: [
      { label: 'はい（1年以上）', nextId: 'result_training_long' },
      { label: '短期のみ', nextId: 'result_training_short' },
    ],
  },
  // 結果（ゴール）の定義
  result_search_land: {
    id: 'result_search_land',
    type: 'result',
    title: '農地探しから始めましょう',
    content: '栽培技術をお持ちのようですので、希望する地域の農地バンクや自治体の農林課へ問い合わせてみましょう。',
  },
  result_consult: {
    id: 'result_consult',
    type: 'result',
    title: '就農相談会への参加',
    content: '経験はあるものの品目が決まっていない場合、地域の市場ニーズを知るために相談会へ参加するのが近道です。',
  },
  result_training_long: {
    id: 'result_training_long',
    type: 'result',
    title: '長期研修（アグリスタート研修など）',
    content: 'しっかりと技術を身につけるために、自治体が提供する親方農家のもとでの1〜2年の長期研修制度に申し込みましょう。',
  },
  result_training_short: {
    id: 'result_training_short',
    type: 'result',
    title: '農業体験・短期インターン',
    content: 'まずは週末農業や、数日間の農業インターンシップに参加して、農業の現場を肌で感じてみましょう。',
  },
}

type DecisionNode = QuestionNode | ResultNode

interface QuestionNode {
  id: string
  type: 'question'
  text: string
  options: Array<{ label: string; nextId: string }>
}

interface ResultNode {
  id: string
  type: 'result'
  title: string
  content: string
}

export default function Diagnosis() {
  // 表示するカードのIDリスト（最初はスタートのみ）
  const [path, setPath] = useState<string[]>(['start'])
  const bottomRef = useRef<HTMLDivElement>(null)

  // 回答が選ばれたときの処理
  const handleSelect = (currentId: string, nextId: string) => {
    // 現在の質問より後ろの履歴を削除し（やり直し対応）、次のIDを追加
    const currentIndex = path.indexOf(currentId)
    const newPath = [...path.slice(0, currentIndex + 1), nextId]
    setPath(newPath)
  }

  // 自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [path])

  // リセット処理
  const handleReset = () => {
    setPath(['start'])
  }

  return (
    <div className="bg-green-50 text-gray-800">
      <Header currentPage="diagnosis" />

      {/* メインコンテンツ */}
      <main className="pt-20">
        {/* ヒーローセクション */}
        <section className="relative py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">就農スタート診断</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              あなたに最適な就農の道をご提案します
            </p>
          </div>
        </section>

        {/* 診断フローセクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-0">
                {path.map((nodeId, index) => {
                  const node = decisionTree[nodeId]
                  const isLast = index === path.length - 1

                  // 次のノードが存在するか（すでに回答済みか）
                  const nextNodeId = path[index + 1]

                  return (
                    <div key={nodeId} className="relative flex flex-col items-center">

                      {/* カード本体 */}
                      <div className={`w-full bg-white p-6 rounded-xl shadow-md border-l-4 transition-all duration-500
                        ${node.type === 'result' ? 'border-green-500 bg-green-50' : 'border-blue-500'}
                        ${!isLast ? 'opacity-60 hover:opacity-100' : 'opacity-100 scale-100'}
                      `}>

                        {/* 質問または結果の表示 */}
                        {node.type === 'question' ? (
                          <>
                            <h3 className="text-lg font-bold mb-4">{node.text}</h3>
                            <div className="flex gap-3">
                              {node.options.map((option) => (
                                <button
                                  key={option.label}
                                  onClick={() => handleSelect(node.id, option.nextId)}
                                  className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-bold
                                    ${nextNodeId === option.nextId
                                      ? 'bg-blue-600 text-white shadow-inner' // 選択された回答
                                      : nextNodeId
                                        ? 'bg-gray-100 text-gray-400' // 選ばれなかった回答
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200' // 未選択（アクティブ）
                                    }
                                  `}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : (
                          /* 結果表示カード */
                          <div className="text-center">
                            <div className="text-3xl mb-2">🎉</div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">{node.title}</h3>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                              {node.content}
                            </p>
                            <button
                              onClick={handleReset}
                              className="text-sm text-green-600 underline hover:text-green-800"
                            >
                              最初からやり直す
                            </button>
                          </div>
                        )}
                      </div>

                      {/* カード間の連結線（最後の要素以外に表示） */}
                      {!isLast && (
                        <div className="h-8 w-1 bg-gray-300 my-1"></div>
                      )}

                      {/* 最後の要素の下に余白用のダミー要素 */}
                      {isLast && <div className="h-12" />}
                    </div>
                  )
                })}
                {/* 自動スクロール用のターゲット */}
                <div ref={bottomRef} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
