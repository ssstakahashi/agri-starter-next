import type { MetaFunction } from '@remix-run/cloudflare'
import { useEffect, useState } from 'react'
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
  // 単位変換の状態管理
  const [conversionType, setConversionType] = useState('area')
  const [inputValue, setInputValue] = useState('')
  const [inputUnit, setInputUnit] = useState('a')
  const [result, setResult] = useState('')

  // 単位変換の設定
  const conversionConfig = {
    area: {
      name: '面積',
      units: [
        { value: 'a', label: 'アール (a)' },
        { value: 'ha', label: 'ヘクタール (ha)' },
        { value: 'm2', label: '平方メートル (㎡)' }
      ],
      conversions: {
        a: { ha: 0.01, m2: 100 },
        ha: { a: 100, m2: 10000 },
        m2: { a: 0.01, ha: 0.0001 }
      }
    },
    weight: {
      name: '重量',
      units: [
        { value: 'g', label: 'グラム (g)' },
        { value: 'kg', label: 'キログラム (kg)' },
        { value: 't', label: 'トン (t)' }
      ],
      conversions: {
        g: { kg: 0.001, t: 0.000001 },
        kg: { g: 1000, t: 0.001 },
        t: { g: 1000000, kg: 1000 }
      }
    },
    volume: {
      name: '容量',
      units: [
        { value: 'ml', label: 'ミリリットル (mL)' },
        { value: 'l', label: 'リットル (L)' },
        { value: 'kl', label: 'キロリットル (kL)' }
      ],
      conversions: {
        ml: { l: 0.001, kl: 0.000001 },
        l: { ml: 1000, kl: 0.001 },
        kl: { ml: 1000000, l: 1000 }
      }
    },
    concentration: {
      name: '濃度',
      units: [
        { value: 'percent', label: 'パーセント (%)' },
        { value: 'ppm', label: 'ppm' },
        { value: 'dilution', label: '希釈倍数' }
      ],
      conversions: {
        percent: { ppm: 10000, dilution: 100 },
        ppm: { percent: 0.0001, dilution: 1000000 },
        dilution: { percent: 100, ppm: 1000000 }
      }
    }
  }

  // 単位変換の計算
  const calculateConversion = (value: string, fromUnit: string, type: string) => {
    if (!value || value === '') {
      setResult('')
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult('')
      return
    }

    const config = conversionConfig[type as keyof typeof conversionConfig]
    const conversions = config.conversions[fromUnit as keyof typeof config.conversions]

    const results = []

    // 入力した値と単位を表示
    const inputUnitLabel = config.units.find(u => u.value === fromUnit)?.label || fromUnit
    results.push(`入力: ${numValue} ${inputUnitLabel}`)
    results.push('') // 空行

    // 他の単位への変換結果を表示
    for (const [unit, factor] of Object.entries(conversions)) {
      const convertedValue = numValue * factor
      const unitLabel = config.units.find(u => u.value === unit)?.label || unit

      let displayValue
      if (type === 'area') {
        displayValue = unit === 'm2' ? convertedValue.toFixed(0) : convertedValue.toFixed(4)
      } else if (type === 'weight') {
        displayValue = unit === 'g' ? convertedValue.toFixed(0) : convertedValue.toFixed(6)
      } else if (type === 'volume') {
        displayValue = unit === 'ml' ? convertedValue.toFixed(0) : convertedValue.toFixed(6)
      } else {
        displayValue = unit === 'ppm' ? convertedValue.toFixed(0) : convertedValue.toFixed(4)
      }

      results.push(`= ${displayValue} ${unitLabel}`)
    }

    setResult(results.join('\n'))
  }

  // 入力値が変更された時の処理
  const handleInputChange = (value: string) => {
    setInputValue(value)
    calculateConversion(value, inputUnit, conversionType)
  }

  // 入力単位が変更された時の処理
  const handleUnitChange = (unit: string) => {
    setInputUnit(unit)
    calculateConversion(inputValue, unit, conversionType)
  }

  // 変換タイプが変更された時の処理
  const handleTypeChange = (type: string) => {
    setConversionType(type)
    const config = conversionConfig[type as keyof typeof conversionConfig]
    setInputUnit(config.units[0].value)
    setInputValue('')
    setResult('')
  }

  // クリアボタンの処理
  const handleClear = () => {
    setInputValue('')
    setResult('')
  }

  // 農薬希釈計算の状態管理
  const [dilutionRatio, setDilutionRatio] = useState('')
  const [pesticideAmount, setPesticideAmount] = useState('100')
  const [fieldArea, setFieldArea] = useState('10')
  const [pesticideResult, setPesticideResult] = useState('')

  // 農薬希釈計算の処理
  const handleDilutionChange = (value: string) => {
    setDilutionRatio(value)
    calculatePesticideDilution(value, pesticideAmount, fieldArea)
  }

  const handlePesticideAmountChange = (value: string) => {
    setPesticideAmount(value)
    calculatePesticideDilution(dilutionRatio, value, fieldArea)
  }

  const handleFieldAreaChange = (value: string) => {
    setFieldArea(value)
    calculatePesticideDilution(dilutionRatio, pesticideAmount, value)
  }

  // 農薬希釈計算のロジック
  const calculatePesticideDilution = (ratio: string, pesticidePer10a: string, area: string) => {
    if (!ratio || ratio === '' || !pesticidePer10a || pesticidePer10a === '' || !area || area === '') {
      setPesticideResult('')
      return
    }

    const numRatio = parseFloat(ratio)
    const numPesticidePer10a = parseFloat(pesticidePer10a)
    const numArea = parseFloat(area)

    if (isNaN(numRatio) || numRatio <= 0 || isNaN(numPesticidePer10a) || numPesticidePer10a <= 0 || isNaN(numArea) || numArea <= 0) {
      setPesticideResult('')
      return
    }

    // 圃場面積に応じた農薬使用量を計算
    const totalPesticideAmount = (numPesticidePer10a * numArea) / 10
    const waterAmount = totalPesticideAmount * (numRatio - 1)
    const totalAmount = totalPesticideAmount + waterAmount

    const results = []
    results.push(`圃場面積: ${numArea} アール`)
    results.push(`希釈倍率: ${numRatio}倍`)
    results.push(`10アールあたり農薬量: ${numPesticidePer10a} mL`)
    results.push('')
    results.push(`農薬の量: ${totalPesticideAmount.toFixed(1)} mL`)
    results.push(`水の量: ${waterAmount.toFixed(0)} mL`)
    results.push(`合計量: ${totalAmount.toFixed(0)} mL`)

    setPesticideResult(results.join('\n'))
  }

  // 農薬計算のクリアボタンの処理
  const handlePesticideClear = () => {
    setDilutionRatio('')
    setPesticideAmount('100')
    setFieldArea('10')
    setPesticideResult('')
  }

  useEffect(() => {
    // アンカーリンクのスムーズスクロールを確実にする
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href')?.substring(1)
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            // ヘッダーの高さを考慮してオフセットを調整
            const headerHeight = 80
            const elementPosition = targetElement.offsetTop - headerHeight

            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            })
          }
        }
      }
    }

    // モバイル目次のオーバーレイを閉じる関数
    const closeMobileTOC = () => {
      const overlay = document.getElementById('mobile-toc-overlay')
      if (overlay) {
        overlay.classList.add('hidden')
      }
    }

    // イベントリスナーを追加
    document.addEventListener('click', handleAnchorClick)

    // モバイル目次のリンククリック時にオーバーレイを閉じる
    const mobileTOCLinks = document.querySelectorAll('#mobile-toc-overlay a')
    mobileTOCLinks.forEach(link => {
      link.addEventListener('click', closeMobileTOC)
    })

    // クリーンアップ関数
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      mobileTOCLinks.forEach(link => {
        link.removeEventListener('click', closeMobileTOC)
      })
    }
  }, [])

  return (
    <div className="bg-green-50 text-gray-800 scroll-smooth">
      <Header currentPage="pesticide" />

      {/* 固定サイドバー目次 */}
      <div className="fixed left-0 top-20 w-80 h-screen bg-white shadow-lg z-40 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <h3 className="text-lg font-bold text-green-800 mb-4 border-b border-green-200 pb-2">目次</h3>
          <nav className="space-y-1 text-sm">
            <a href="#introduction" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• はじめに</a>
            <a href="#safety-question" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• 農薬を安全に使用している！と胸を張って言うことができますか？</a>
            <a href="#section1" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">１ 農薬の功績とその使用目的</a>
            <a href="#section1-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① そもそも、どうして農薬を使うのかな？</a>
            <a href="#section2" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">２ 農薬基礎編</a>
            <a href="#section2-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬の定義</a>
            <a href="#section2-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬の名前</a>
            <a href="#section2-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 剤型の種類</a>
            <a href="#section2-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 農薬の選択性について</a>
            <a href="#section2-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 農薬の作用メカニズム ～殺虫剤～</a>
            <a href="#section2-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬の作用メカニズム ～殺菌剤～</a>
            <a href="#section2-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 農薬の作用メカニズム ～除草剤～</a>
            <a href="#section2-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 単位について</a>
            <a href="#section3" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">３ 農薬の使用にまつわる注意点</a>
            <a href="#section3-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬は何にでも使っていいのかな？</a>
            <a href="#section3-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬の適正使用</a>
            <a href="#section3-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ ラベルの表示事項とその注意点</a>
            <a href="#section3-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 散布する人の安全確保</a>
            <a href="#section3-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 農薬のはかり方</a>
            <a href="#section3-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬の混ぜ方</a>
            <a href="#section3-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 散布器具の洗浄</a>
            <a href="#section3-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 使用済み農薬の処理方法</a>
            <a href="#section3-9" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑨ 使用回数の数え方</a>
            <a href="#section3-10" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑩ 似て非なるもの</a>
            <a href="#section3-11" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑪ 農薬の保管管理の仕方</a>
            <a href="#section3-12" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑫ 使用期限と登録失効</a>
            <a href="#section3-13" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑬ ドリフト対策（飛散防止）</a>
            <a href="#section3-14" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑭ 止水管理の徹底を！ 魚介類に残留？</a>
            <a href="#section3-15" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑮ うっかりこんなこと！ ありませんか？</a>
            <a href="#section3-16" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑯ しっかり記帳しましょう！</a>
            <a href="#section3-question" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• なぜ、農薬の適正使用が必要なのでしょう？？？</a>
            <a href="#section4" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">４ 農薬の登録の仕組み</a>
            <a href="#section4-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬に関係する様々な法律</a>
            <a href="#section4-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬取締法とその罰則</a>
            <a href="#section4-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 農薬の登録制度と販売</a>
            <a href="#section4-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 農薬が登録されるまでには</a>
            <a href="#section4-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 環境への影響</a>
            <a href="#section4-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬登録保留基準とは？</a>
            <a href="#section4-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 無登録農薬</a>
            <a href="#section4-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 販売禁止農薬</a>
            <a href="#section5" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">５ 毒とは何でしょうか？</a>
            <a href="#section5-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 急性毒性と慢性毒性</a>
            <a href="#section5-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 毒性の考え方について</a>
            <a href="#section5-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 毒物・劇物</a>
            <a href="#section6" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">６ 農薬の残留とポジティブリスト制度</a>
            <a href="#section6-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬の残留とＡＤＩ</a>
            <a href="#section6-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 残留農薬基準の設定まで ～ＡＤＩを基本にして～</a>
            <a href="#section6-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 残留農薬と食品衛生法</a>
            <a href="#section6-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ ポジティブリスト制度</a>
          </nav>
        </div>
      </div>

      {/* モバイル用目次ボタン */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          id="mobile-toc-toggle"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          目次
        </button>
      </div>

      {/* モバイル用目次オーバーレイ */}
      <div id="mobile-toc-overlay" className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 hidden">
        <div className="fixed left-0 top-0 w-80 h-full bg-white shadow-lg overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-green-800">目次</h3>
              <button
                id="mobile-toc-close"
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <nav className="space-y-1 text-sm">
              <a href="#introduction" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• はじめに</a>
              <a href="#safety-question" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• 農薬を安全に使用している！と胸を張って言うことができますか？</a>
              <a href="#section1" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">１ 農薬の功績とその使用目的</a>
              <a href="#section1-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① そもそも、どうして農薬を使うのかな？</a>
              <a href="#section2" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">２ 農薬基礎編</a>
              <a href="#section2-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬の定義</a>
              <a href="#section2-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬の名前</a>
              <a href="#section2-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 剤型の種類</a>
              <a href="#section2-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 農薬の選択性について</a>
              <a href="#section2-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 農薬の作用メカニズム ～殺虫剤～</a>
              <a href="#section2-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬の作用メカニズム ～殺菌剤～</a>
              <a href="#section2-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 農薬の作用メカニズム ～除草剤～</a>
              <a href="#section2-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 単位について</a>
              <a href="#section3" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">３ 農薬の使用にまつわる注意点</a>
              <a href="#section3-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬は何にでも使っていいのかな？</a>
              <a href="#section3-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬の適正使用</a>
              <a href="#section3-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ ラベルの表示事項とその注意点</a>
              <a href="#section3-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 散布する人の安全確保</a>
              <a href="#section3-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 農薬のはかり方</a>
              <a href="#section3-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬の混ぜ方</a>
              <a href="#section3-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 散布器具の洗浄</a>
              <a href="#section3-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 使用済み農薬の処理方法</a>
              <a href="#section3-9" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑨ 使用回数の数え方</a>
              <a href="#section3-10" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑩ 似て非なるもの</a>
              <a href="#section3-11" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑪ 農薬の保管管理の仕方</a>
              <a href="#section3-12" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑫ 使用期限と登録失効</a>
              <a href="#section3-13" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑬ ドリフト対策（飛散防止）</a>
              <a href="#section3-14" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑭ 止水管理の徹底を！ 魚介類に残留？</a>
              <a href="#section3-15" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑮ うっかりこんなこと！ ありませんか？</a>
              <a href="#section3-16" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑯ しっかり記帳しましょう！</a>
              <a href="#section3-question" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• なぜ、農薬の適正使用が必要なのでしょう？？？</a>
              <a href="#section4" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">４ 農薬の登録の仕組み</a>
              <a href="#section4-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬に関係する様々な法律</a>
              <a href="#section4-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 農薬取締法とその罰則</a>
              <a href="#section4-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 農薬の登録制度と販売</a>
              <a href="#section4-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ 農薬が登録されるまでには</a>
              <a href="#section4-5" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑤ 環境への影響</a>
              <a href="#section4-6" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑥ 農薬登録保留基準とは？</a>
              <a href="#section4-7" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑦ 無登録農薬</a>
              <a href="#section4-8" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ⑧ 販売禁止農薬</a>
              <a href="#section5" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">５ 毒とは何でしょうか？</a>
              <a href="#section5-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 急性毒性と慢性毒性</a>
              <a href="#section5-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 毒性の考え方について</a>
              <a href="#section5-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 毒物・劇物</a>
              <a href="#section6" className="block py-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition font-medium">６ 農薬の残留とポジティブリスト制度</a>
              <a href="#section6-1" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ① 農薬の残留とＡＤＩ</a>
              <a href="#section6-2" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ② 残留農薬基準の設定まで ～ＡＤＩを基本にして～</a>
              <a href="#section6-3" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ③ 残留農薬と食品衛生法</a>
              <a href="#section6-4" className="block py-2 px-3 pl-6 text-blue-600 hover:bg-blue-50 hover:text-blue-800 rounded transition">• ④ ポジティブリスト制度</a>
            </nav>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="lg:ml-80">
        {/* ページヘッダーセクション */}
        <section className="relative bg-green-700 text-white py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(\'https://placehold.co/1600x400/a0d2a4/ffffff?text=Pesticides\')' }}></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">農業の基礎知識：農薬を知る</h1>
            <p className="mt-4 text-lg text-green-100">アグリチャレンジの研修で学んだことから、気になったことなどをさらに自身で調べた内容です。</p>
            <p className="mt-2 text-sm text-green-200">
              運営者の個人ページ: <a href="https://s-takahashi.work.studiofoods.net/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">https://s-takahashi.work.studiofoods.net/</a>
            </p>
            <div className="mt-4 p-4 bg-green-800 bg-opacity-50 rounded-lg">
              <p className="text-sm text-green-100 mb-2">
                <strong>学習の基礎情報：</strong>
              </p>
              <p className="text-sm text-green-200">
                このページの内容は、<a href="https://www.pref.tottori.lg.jp/120956.htm" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-medium">鳥取県「農薬の適正使用について」</a>を参考に作成されています。
              </p>
            </div>
          </div>
        </section>


        {/* はじめに */}
        <section id="introduction" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">はじめに</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-4">
                農業において農薬は、病害虫や雑草から作物を守り、安定した収穫を確保するために欠かせない資材です。しかし、その使用には適切な知識と技術が必要であり、誤った使用方法は人や環境に悪影響を与える可能性があります。
              </p>
              <p className="text-gray-700 leading-relaxed">
                このページでは、アグリチャレンジの研修で学んだ農薬の基礎知識を基に、安全で効果的な農薬使用のための重要なポイントをまとめています。農薬を「安全に使用している！」と胸を張って言えるよう、一緒に学んでいきましょう。
              </p>
            </div>
          </div>
        </section>

        {/* 農薬を安全に使用している！と胸を張って言うことができますか？ */}
        <section id="safety-question" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">＜農薬を安全に使用している！と胸を張って言うことができますか？＞</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                農薬の使用において最も重要なのは、安全性の確保です。以下の点を確認して、自信を持って「安全に使用している！」と言えるようになりましょう。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">使用前の確認事項</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ラベルを正しく読んでいる</li>
                    <li>• 対象作物が登録されている</li>
                    <li>• 使用量・希釈倍数を守っている</li>
                    <li>• 使用時期・回数を守っている</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">安全対策の実施</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 防護具を着用している</li>
                    <li>• 風向きを確認している</li>
                    <li>• 散布器具を適切に洗浄している</li>
                    <li>• 使用記録を付けている</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の功績とその使用目的 */}
        <section id="section1" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">１ 農薬の功績とその使用目的</h2>

            <div className="space-y-8">
              <div id="section1-1" className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-700 mb-4">① そもそも、どうして農薬を使うのかな？</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    農薬を使用する主な理由は、以下の通りです：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-800 mb-2">収穫量の確保</h4>
                      <p className="text-sm text-gray-600">病害虫や雑草による被害を防ぎ、安定した収穫量を確保します。</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-800 mb-2">品質の向上</h4>
                      <p className="text-sm text-gray-600">見た目や味を良くし、商品価値の高い農産物を生産します。</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-bold text-yellow-800 mb-2">労働力の軽減</h4>
                      <p className="text-sm text-gray-600">除草作業などの重労働を軽減し、効率的な農業経営を実現します。</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-800 mb-2">経済性の向上</h4>
                      <p className="text-sm text-gray-600">適切な防除により、生産コストを削減し収益性を向上させます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬基礎編 */}
        <section id="section2" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">２ 農薬基礎編</h2>

            <div className="space-y-8">
              <div id="section2-1" className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">① 農薬の定義</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬取締法では、農薬を以下のように定義しています：
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-medium mb-2">農薬とは、以下の目的で使用される薬剤を指します：</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>農作物を害する菌、線虫、ダニ、昆虫、ネズミなどの動植物やウイルスの防除</li>
                    <li>農作物の生理機能の増進または抑制</li>
                    <li>農作物の生育を阻害する植物の防除</li>
                  </ul>
                </div>
              </div>

              <div id="section2-2" className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">② 農薬の名前</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬には複数の名前があります：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800">一般名</h4>
                    <p className="text-sm text-gray-600">有効成分の化学名や国際的に統一された名称</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800">商品名</h4>
                    <p className="text-sm text-gray-600">メーカーが付けた商品の名前</p>
                  </div>
                </div>
              </div>

              <div id="section2-3" className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">③ 剤型の種類</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬は使用しやすくするため、様々な剤型に加工されています：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800">水和剤（WP）</h4>
                    <p className="text-sm text-gray-600">水に溶けやすい粉末状</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800">乳剤（EC）</h4>
                    <p className="text-sm text-gray-600">水に混ぜると白濁する液体</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800">粒剤（GR）</h4>
                    <p className="text-sm text-gray-600">土壌に散布する粒状</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800">フロアブル剤（FL）</h4>
                    <p className="text-sm text-gray-600">水に混ぜやすい液体</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800">粉剤（DP）</h4>
                    <p className="text-sm text-gray-600">そのまま散布する粉末</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-bold text-indigo-800">マイクロカプセル剤（MC）</h4>
                    <p className="text-sm text-gray-600">有効成分をカプセル化</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の使用にまつわる注意点 */}
        <section id="section3" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">３ 農薬の使用にまつわる注意点</h2>

            <div className="space-y-8">
              <div id="section3-2" className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-red-700 mb-4">② 農薬の適正使用</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬の適正使用は、人や環境の安全を守るために最も重要です。以下の原則を必ず守りましょう：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">ラベルの確認</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 対象作物の確認</li>
                      <li>• 使用量・希釈倍数</li>
                      <li>• 使用時期・回数</li>
                      <li>• 収穫前日数</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">安全対策</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 防護具の着用</li>
                      <li>• 散布時の風向き確認</li>
                      <li>• 散布器具の洗浄</li>
                      <li>• 使用記録の記帳</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section3-3" className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-700 mb-4">③ ラベルの表示事項とその注意点</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬のラベルには重要な情報が記載されています。必ず確認すべき項目：
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>登録番号：</strong>農薬取締法に基づく登録番号</li>
                    <li><strong>有効成分：</strong>農薬の主成分と含有量</li>
                    <li><strong>適用作物：</strong>使用可能な作物名</li>
                    <li><strong>適用病害虫：</strong>防除対象の病害虫名</li>
                    <li><strong>使用量：</strong>10a当たりの使用量</li>
                    <li><strong>希釈倍数：</strong>水で薄める倍率</li>
                    <li><strong>使用時期：</strong>いつ使用するか</li>
                    <li><strong>使用回数：</strong>1シーズンの使用回数上限</li>
                    <li><strong>収穫前日数：</strong>最後の散布から収穫までの日数</li>
                  </ul>
                </div>
              </div>

              <div id="section3-4" className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-red-700 mb-4">④ 散布する人の安全確保</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬散布時は、散布者自身の安全を最優先に考えましょう。適切な防護具の着用と安全対策が重要です。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">必要な防護具</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 防護服（長袖・長ズボン）</li>
                      <li>• 防護メガネ</li>
                      <li>• 防護マスク</li>
                      <li>• ゴム手袋</li>
                      <li>• 長靴</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">散布時の注意点</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 風向きを確認（風上から散布）</li>
                      <li>• 風速2m/s以下で散布</li>
                      <li>• 高温時は避ける</li>
                      <li>• 一人で作業しない</li>
                      <li>• 散布後は手洗い・うがい</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の選択性について */}
        <section id="section2-4" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">④ 農薬の選択性について</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-4">
                農薬の選択性とは、農薬が特定の生物（病害虫や雑草）に対して効果を示す一方で、他の生物（作物や有用生物）には影響を与えない性質のことです。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">選択性の種類</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 生理的選択性：生物の生理的違いによる選択性</li>
                    <li>• 物理的選択性：散布方法や時期による選択性</li>
                    <li>• 化学的選択性：化学構造の違いによる選択性</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">選択性の重要性</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 作物への薬害を防ぐ</li>
                    <li>• 天敵などの有用生物を保護</li>
                    <li>• 環境への影響を最小限に抑制</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の作用メカニズム ～殺虫剤～ */}
        <section id="section2-5" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑤ 農薬の作用メカニズム ～殺虫剤～</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-700 mb-4">殺虫剤の作用部位</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">神経系への作用</h4>
                    <p className="text-sm text-gray-600">神経伝達を阻害し、昆虫の行動を麻痺させる</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">呼吸系への作用</h4>
                    <p className="text-sm text-gray-600">酸素の取り込みを阻害し、窒息させる</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">成長阻害</h4>
                    <p className="text-sm text-gray-600">脱皮や変態を阻害し、正常な成長を妨げる</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">摂食阻害</h4>
                    <p className="text-sm text-gray-600">摂食行動を阻害し、餓死させる</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の作用メカニズム ～殺菌剤～ */}
        <section id="section2-6" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑥ 農薬の作用メカニズム ～殺菌剤～</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-700 mb-4">殺菌剤の作用機序</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">細胞膜の破壊</h4>
                    <p className="text-sm text-gray-600">菌の細胞膜を破壊し、細胞内容物を漏出させる</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">代謝阻害</h4>
                    <p className="text-sm text-gray-600">菌の代謝経路を阻害し、生存を困難にする</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">タンパク質合成阻害</h4>
                    <p className="text-sm text-gray-600">菌のタンパク質合成を阻害し、増殖を防ぐ</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">DNA合成阻害</h4>
                    <p className="text-sm text-gray-600">菌のDNA合成を阻害し、分裂を防ぐ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の作用メカニズム ～除草剤～ */}
        <section id="section2-7" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑦ 農薬の作用メカニズム ～除草剤～</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-700 mb-4">除草剤の作用部位</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">光合成阻害</h4>
                    <p className="text-sm text-gray-600">光合成の電子伝達系を阻害し、エネルギー生産を停止</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">アミノ酸合成阻害</h4>
                    <p className="text-sm text-gray-600">必須アミノ酸の合成を阻害し、タンパク質合成を停止</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">ホルモン作用</h4>
                    <p className="text-sm text-gray-600">植物ホルモンのバランスを崩し、異常な成長を引き起こす</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">細胞分裂阻害</h4>
                    <p className="text-sm text-gray-600">細胞分裂を阻害し、植物の成長を停止</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 単位について */}
        <section id="section2-8" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑧ 単位について</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の使用量や濃度を表す際に使用される単位について理解しましょう。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-3">面積の単位</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 10a（アール）= 1,000㎡</li>
                    <li>• 1ha（ヘクタール）= 10,000㎡</li>
                    <li>• 1反 = 約10a</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-3">重量の単位</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1g = 1,000mg</li>
                    <li>• 1kg = 1,000g</li>
                    <li>• 1t = 1,000kg</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-3">容量の単位</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1L = 1,000mL</li>
                    <li>• 1kL = 1,000L</li>
                    <li>• 1斗 = 約18L</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-3">濃度の単位</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ppm = 百万分の1</li>
                    <li>• % = 百分の1</li>
                    <li>• 希釈倍数（例：1,000倍）</li>
                  </ul>
                </div>
              </div>

              {/* 単位変換ツール */}
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 mb-4">単位変換ツール</h3>

                {/* 変換タイプ選択 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">変換タイプ</label>
                  <select
                    value={conversionType}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="area">面積</option>
                    <option value="weight">重量</option>
                    <option value="volume">容量</option>
                    <option value="concentration">濃度</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 入力エリア */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-3">入力</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">値</label>
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="数値を入力してください"
                          step="any"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">単位</label>
                        <select
                          value={inputUnit}
                          onChange={(e) => handleUnitChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          {conversionConfig[conversionType as keyof typeof conversionConfig].units.map((unit) => (
                            <option key={unit.value} value={unit.value}>
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleClear}
                          className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          クリア
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 結果表示エリア */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-3">変換結果</h4>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
                      {result ? (
                        <div className="space-y-2">
                          {result.split('\n').map((line, index) => (
                            <div key={index} className="text-sm text-gray-700 font-mono">
                              {line}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          数値を入力すると変換結果が表示されます
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の使用にまつわる注意点 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">３ 農薬の使用にまつわる注意点</h1>
          </div>
        </section>

        {/* 農薬は何にでも使っていいのかな？ */}
        <section id="section3-1" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">① 農薬は何にでも使っていいのかな？</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-red-600">いいえ、農薬は何にでも使えるわけではありません。</strong>農薬取締法により、以下の制限があります：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">登録作物以外への使用禁止</h3>
                  <p className="text-sm text-gray-600">ラベルに記載された作物以外には絶対に使用できません。</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">使用量の制限</h3>
                  <p className="text-sm text-gray-600">指定された使用量を超えて使用することは禁止されています。</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">使用時期の制限</h3>
                  <p className="text-sm text-gray-600">指定された時期以外の使用は禁止されています。</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">使用回数の制限</h3>
                  <p className="text-sm text-gray-600">1シーズンの使用回数に上限が設けられています。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬のはかり方 */}
        <section id="section3-5" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑤ 農薬のはかり方</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の正確な計量は、効果的な防除と安全性確保の基本です。適切な計量器具を使用し、正確にはかりましょう。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-3">計量器具の種類</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• デジタルスケール（精密な計量）</li>
                    <li>• 計量カップ（液体用）</li>
                    <li>• 計量スプーン（少量用）</li>
                    <li>• メスシリンダー（正確な容量測定）</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-3">計量時の注意点</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 平らな場所で計量する</li>
                    <li>• 目盛りを水平に見る</li>
                    <li>• 計量器具の精度を確認</li>
                    <li>• 使用後は清潔に保つ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 農薬希釈計算ツール */}
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500 mt-8">
              <h3 className="text-xl font-bold text-green-800 mb-4">農薬希釈計算ツール</h3>
              <p className="text-gray-600 mb-6">圃場面積、10アールあたりの農薬量、希釈倍率を入力すると、必要な水の量と合計量を計算します。</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 入力エリア */}
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">入力</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">圃場面積（アール）</label>
                      <input
                        type="number"
                        value={fieldArea}
                        onChange={(e) => handleFieldAreaChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="例: 10"
                        min="0.1"
                        step="0.1"
                      />
                      <p className="text-xs text-gray-500 mt-1">例: 10アールの場合は「10」と入力</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">10アールあたり農薬量（mL）</label>
                      <input
                        type="number"
                        value={pesticideAmount}
                        onChange={(e) => handlePesticideAmountChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="例: 100"
                        min="1"
                        step="1"
                      />
                      <p className="text-xs text-gray-500 mt-1">例: 100mLの場合は「100」と入力</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">希釈倍率</label>
                      <input
                        type="number"
                        value={dilutionRatio}
                        onChange={(e) => handleDilutionChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="例: 1000"
                        min="1"
                        step="1"
                      />
                      <p className="text-xs text-gray-500 mt-1">例: 1000倍希釈の場合は「1000」と入力</p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={handlePesticideClear}
                        className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        クリア
                      </button>
                    </div>
                  </div>
                </div>

                {/* 結果表示エリア */}
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">計算結果（10アールあたり）</h4>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
                    {pesticideResult ? (
                      <div className="space-y-2">
                        {pesticideResult.split('\n').map((line, index) => (
                          <div key={index} className="text-sm text-gray-700 font-mono">
                            {line}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        希釈倍率を入力すると計算結果が表示されます
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の混ぜ方 */}
        <section id="section3-6" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑥ 農薬の混ぜ方</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の混合は、効果と安全性に大きく影響します。正しい順序と方法で混合しましょう。
              </p>
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">混合の基本順序</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>水を半分程度入れる</li>
                    <li>水和剤を加えてよく混ぜる</li>
                    <li>乳剤を加えて混ぜる</li>
                    <li>フロアブル剤を加える</li>
                    <li>水を規定量まで加える</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-bold text-red-800 mb-2">混合時の注意点</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 異なる剤型の相性を確認</li>
                      <li>• 混合順序を守る</li>
                      <li>• 十分に攪拌する</li>
                      <li>• 混合後は速やかに使用</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">混合禁止の組み合わせ</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• アルカリ性と酸性の農薬</li>
                      <li>• 銅剤と石灰硫黄合剤</li>
                      <li>• 油剤と乳剤</li>
                      <li>• ラベルで禁止されている組み合わせ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 散布器具の洗浄 */}
        <section id="section3-7" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑦ 散布器具の洗浄</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                散布器具の適切な洗浄は、農薬の残留を防ぎ、次回使用時の安全性を確保するために重要です。
              </p>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-3">洗浄手順</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>散布後、残った農薬を排出する</li>
                    <li>水で3回以上すすぎ洗い</li>
                    <li>中性洗剤で洗浄</li>
                    <li>十分に水洗い</li>
                    <li>乾燥させる</li>
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">洗浄時の注意点</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 防護具を着用して洗浄</li>
                      <li>• 洗浄水は適切に処理</li>
                      <li>• ノズルの清掃も忘れずに</li>
                      <li>• 洗浄後は手洗い・うがい</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-2">洗浄水の処理</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 農地に散布（希釈状態）</li>
                      <li>• 下水道に流さない</li>
                      <li>• 河川に流さない</li>
                      <li>• 適切な場所で処理</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使用済み農薬の処理方法 */}
        <section id="section3-8" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑧ 使用済み農薬の処理方法</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                使用済み農薬の適切な処理は、環境保護と安全性確保のため重要です。正しい方法で処理しましょう。
              </p>
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">絶対にやってはいけないこと</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 河川や水路に流す</li>
                    <li>• 下水道に流す</li>
                    <li>• 土に埋める</li>
                    <li>• 燃やす</li>
                    <li>• 一般ごみとして出す</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">正しい処理方法</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 農地に散布（希釈状態）</li>
                      <li>• 専門業者に依頼</li>
                      <li>• 市町村の回収に出す</li>
                      <li>• 農協の回収に出す</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">処理前の準備</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 容器を空にする</li>
                      <li>• ラベルを確認</li>
                      <li>• 適切な容器に移す</li>
                      <li>• 処理業者に連絡</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使用回数の数え方 */}
        <section id="section3-9" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑨ 使用回数の数え方</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の使用回数は、同じ有効成分を含む農薬の合計回数で計算されます。正確に記録しましょう。
              </p>
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">使用回数の計算方法</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 同じ有効成分の農薬を合計</li>
                    <li>• 商品名が違っても成分が同じなら合算</li>
                    <li>• 1シーズン（栽培期間）で計算</li>
                    <li>• 作物ごとに別々に計算</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">記録の重要性</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 使用回数の上限管理</li>
                      <li>• 残留農薬の防止</li>
                      <li>• 適正使用の証明</li>
                      <li>• 次回使用時の参考</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">記録すべき項目</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 使用日</li>
                      <li>• 農薬名</li>
                      <li>• 有効成分名</li>
                      <li>• 使用量</li>
                      <li>• 対象作物</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 似て非なるもの */}
        <section id="section3-10" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑩ 似て非なるもの</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬と似ているが、実際は農薬ではないものがあります。これらを正しく区別しましょう。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">農薬ではないもの</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 肥料（植物の栄養）</li>
                      <li>• 土壌改良剤</li>
                      <li>• 植物成長調整剤（一部）</li>
                      <li>• 天敵（生物農薬）</li>
                      <li>• 忌避剤</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">農薬に該当するもの</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 殺虫剤</li>
                      <li>• 殺菌剤</li>
                      <li>• 除草剤</li>
                      <li>• 殺鼠剤</li>
                      <li>• 植物成長調整剤（登録済み）</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">判断のポイント</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 農薬取締法の登録があるか</li>
                    <li>• ラベルに登録番号があるか</li>
                    <li>• 防除効果をうたっているか</li>
                    <li>• 使用基準が定められているか</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 農薬の保管管理の仕方 */}
        <section id="section3-11" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑪ 農薬の保管管理の仕方</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の適切な保管は、品質保持と安全性確保のために重要です。正しい保管方法を実践しましょう。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">保管場所の条件</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 直射日光を避ける</li>
                      <li>• 高温多湿を避ける</li>
                      <li>• 風通しが良い</li>
                      <li>• 鍵のかかる場所</li>
                      <li>• 子供の手の届かない場所</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">保管時の注意点</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 元の容器で保管</li>
                      <li>• ラベルを保持</li>
                      <li>• 食品と分離</li>
                      <li>• 定期的な点検</li>
                      <li>• 使用期限の確認</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">保管してはいけない場所</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 台所や食品庫</li>
                    <li>• 寝室や居間</li>
                    <li>• 車庫（高温になる）</li>
                    <li>• 屋外（雨ざらし）</li>
                    <li>• 子供の遊び場</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使用期限と登録失効 */}
        <section id="section3-12" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑫ 使用期限と登録失効</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬には使用期限があり、登録が失効した農薬は使用できません。定期的に確認しましょう。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">使用期限について</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 製造から3年が一般的</li>
                      <li>• ラベルに記載</li>
                      <li>• 期限切れは使用禁止</li>
                      <li>• 保管条件で変動</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">登録失効について</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 登録期間は3年</li>
                      <li>• 更新されないと失効</li>
                      <li>• 失効後は使用禁止</li>
                      <li>• 販売も禁止</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">確認方法</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 農薬登録情報提供システムで確認</li>
                    <li>• 農薬メーカーに問い合わせ</li>
                    <li>• 農協や農業改良普及センターに確認</li>
                    <li>• 定期的な情報収集</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ドリフト対策（飛散防止） */}
        <section id="section3-13" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑬ ドリフト対策（飛散防止）</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の飛散（ドリフト）は、周辺の作物や環境に影響を与える可能性があります。適切な対策を講じましょう。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">飛散の原因</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 風による飛散</li>
                      <li>• 散布圧力が高い</li>
                      <li>• ノズルが細かい</li>
                      <li>• 散布高さが高い</li>
                      <li>• 気温が高い</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">対策方法</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 風速2m/s以下で散布</li>
                      <li>• 適切な散布圧力</li>
                      <li>• 粗いノズルを使用</li>
                      <li>• 低い位置から散布</li>
                      <li>• 早朝や夕方に散布</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">飛散防止の重要性</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 周辺作物への薬害防止</li>
                    <li>• 環境汚染の防止</li>
                    <li>• 近隣住民への配慮</li>
                    <li>• 法的責任の回避</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 止水管理の徹底を！ 魚介類に残留？ */}
        <section id="section3-14" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑭ 止水管理の徹底を！ 魚介類に残留？</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬が河川や水路に流れ込むと、魚介類に影響を与える可能性があります。止水管理を徹底しましょう。
              </p>
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">魚介類への影響</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 急性毒性による死</li>
                    <li>• 慢性毒性による影響</li>
                    <li>• 食物連鎖への影響</li>
                    <li>• 生態系の破壊</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">止水管理の方法</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 水路の水門を閉める</li>
                      <li>• ポンプで水を止める</li>
                      <li>• 土のうで堰を作る</li>
                      <li>• 散布前後で確認</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">散布時の注意</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 水路から離れて散布</li>
                      <li>• 風向きを確認</li>
                      <li>• 散布器具の洗浄水に注意</li>
                      <li>• 余った農薬の処理</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* うっかりこんなこと！ ありませんか？ */}
        <section id="section3-15" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑮ うっかりこんなこと！ ありませんか？</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬使用時によくある間違いや注意不足をチェックしましょう。安全な使用のため、これらの点に注意してください。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-bold text-red-800 mb-3">よくある間違い</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ラベルを読まずに使用</li>
                      <li>• 希釈倍数を間違える</li>
                      <li>• 使用時期を間違える</li>
                      <li>• 防護具を着用しない</li>
                      <li>• 使用回数を超える</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-3">注意不足の例</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 風向きを確認しない</li>
                      <li>• 散布器具を洗浄しない</li>
                      <li>• 使用記録を付けない</li>
                      <li>• 保管場所が不適切</li>
                      <li>• 使用期限を確認しない</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">安全使用のチェックポイント</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ラベルを必ず読む</li>
                    <li>• 防護具を着用する</li>
                    <li>• 正確に計量する</li>
                    <li>• 使用記録を付ける</li>
                    <li>• 適切に保管する</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* しっかり記帳しましょう！ */}
        <section id="section3-16" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">⑯ しっかり記帳しましょう！</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed mb-6">
                農薬の使用記録は、適正使用の証明と安全管理のために重要です。必ず記録を付けましょう。
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">記録すべき項目</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 使用年月日</li>
                      <li>• 農薬名・商品名</li>
                      <li>• 有効成分名</li>
                      <li>• 使用量・希釈倍数</li>
                      <li>• 対象作物・面積</li>
                      <li>• 防除対象</li>
                      <li>• 散布者名</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">記録の重要性</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 適正使用の証明</li>
                      <li>• 使用回数の管理</li>
                      <li>• 効果の確認</li>
                      <li>• 問題発生時の対応</li>
                      <li>• 次回使用の参考</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">記録の保管</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 3年間保管する</li>
                    <li>• 見やすい場所に保管</li>
                    <li>• 定期的に確認</li>
                    <li>• 必要に応じて提出</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* なぜ、農薬の適正使用が必要なのでしょう？？？ */}
        <section id="section3-question" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8">＜なぜ、農薬の適正使用が必要なのでしょう？？？＞</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                農薬の適正使用は、以下の理由から必要不可欠です：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">人の安全確保</h3>
                  <p className="text-sm text-gray-600">散布者や周辺住民の健康を守る</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">環境保護</h3>
                  <p className="text-sm text-gray-600">生態系や水質を守る</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">食品の安全性</h3>
                  <p className="text-sm text-gray-600">残留農薬基準の遵守</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">法的責任</h3>
                  <p className="text-sm text-gray-600">農薬取締法の遵守</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ４ 農薬の登録の仕組み */}
        <section id="section4" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-green-800 mb-8 border-l-4 border-green-500 pl-4">４ 農薬の登録の仕組み</h2>
            <div className="space-y-8">
              <div id="section4-1" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">① 農薬に関係する様々な法律</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬の製造から使用、廃棄に至るまで、様々な法律によって厳しく規制されています。中心となるのは「農薬取締法」ですが、他にも「食品衛生法」「毒物及び劇物取締法」などが関わってきます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">農薬取締法</h4>
                    <p className="text-sm text-gray-600">農薬の品質確保と安全で適正な使用を図る</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">食品衛生法</h4>
                    <p className="text-sm text-gray-600">食品中の残留農薬基準を定める</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">毒物及び劇物取締法</h4>
                    <p className="text-sm text-gray-600">毒性の強い農薬の保管・管理を規制</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-2">環境基本法</h4>
                    <p className="text-sm text-gray-600">環境への影響を最小限に抑制</p>
                  </div>
                </div>
              </div>

              <div id="section4-2" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">② 農薬取締法とその罰則</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬の品質確保と安全で適正な使用を図るための法律です。例えば、<strong className="text-red-600">登録されていない農薬（無登録農薬）を販売・使用すること</strong>や、ラベルに記載された使用基準を守らないことは法律違反となり、罰則が科せられます。
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">主な罰則</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 3年以下の懲役もしくは100万円以下の罰金</li>
                    <li>• 無登録農薬の製造・輸入・販売</li>
                    <li>• 使用基準違反</li>
                    <li>• 虚偽の表示</li>
                  </ul>
                </div>
              </div>

              <div id="section4-3" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">③ 農薬の登録制度と販売</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  日本国内で農薬を製造・輸入・販売するためには、農林水産大臣の「登録」を受けなければなりません。登録された農薬には「農林水産省登録第○○号」という登録番号が与えられます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">登録の要件</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 効果が確認されている</li>
                      <li>• 人畜に害がない</li>
                      <li>• 農作物に害がない</li>
                      <li>• 環境に害がない</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">登録番号の確認</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ラベルに記載</li>
                      <li>• 農薬登録情報提供システムで確認</li>
                      <li>• 有効期限の確認</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section4-4" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">④ 農薬が登録されるまでには</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬の登録には、効果や安全性に関する膨大な試験成績の提出が必要です。人への影響（急性毒性、慢性毒性など）、作物への残留、環境（土壌、水中など）への影響など、多角的な審査が行われ、安全性が確認されたものだけが登録されます。
                </p>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">必要な試験</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-gray-700 mb-1">効果試験</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 防除効果の確認</li>
                          <li>• 適用作物の特定</li>
                          <li>• 使用量の決定</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-700 mb-1">安全性試験</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 急性毒性試験</li>
                          <li>• 慢性毒性試験</li>
                          <li>• 残留性試験</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="section4-5" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">⑤ 環境への影響</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬の環境への影響を評価し、最小限に抑えるための試験が行われます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">土壌への影響</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 土壌微生物への影響</li>
                      <li>• 分解性の確認</li>
                      <li>• 蓄積性の評価</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">水環境への影響</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 魚類への毒性</li>
                      <li>• 水生生物への影響</li>
                      <li>• 水質汚濁の防止</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section4-6" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">⑥ 農薬登録保留基準とは？</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬登録保留基準とは、農薬の登録を保留するかどうかを判断する基準のことです。この基準を超える農薬は登録されません。
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">保留基準の例</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 急性毒性が極めて強い</li>
                    <li>• 発がん性が確認されている</li>
                    <li>• 環境への影響が大きい</li>
                    <li>• 残留性が極めて高い</li>
                  </ul>
                </div>
              </div>

              <div id="section4-7" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">⑦ 無登録農薬</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  無登録農薬とは、農薬取締法に基づく登録を受けていない農薬のことです。これらは製造・輸入・販売・使用が禁止されています。
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">無登録農薬の問題点</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 安全性が確認されていない</li>
                    <li>• 効果が不明</li>
                    <li>• 環境への影響が不明</li>
                    <li>• 使用基準が定められていない</li>
                  </ul>
                </div>
              </div>

              <div id="section4-8" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">⑧ 販売禁止農薬</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  販売禁止農薬とは、一度登録されたが、後に安全性や環境への影響が問題となり、販売が禁止された農薬のことです。
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">販売禁止の理由</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 新たな毒性が発見された</li>
                    <li>• 環境への影響が判明した</li>
                    <li>• より安全な代替品が開発された</li>
                    <li>• 国際的な規制の変更</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ５ 毒とは何でしょうか？ */}
        <section id="section5" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 border-l-4 border-blue-500 pl-4">５ 毒とは何でしょうか？</h2>
            <div className="space-y-8">
              <div id="section5-1" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">① 急性毒性と慢性毒性</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  毒性には大きく分けて2種類あります。<strong className="text-blue-600">急性毒性</strong>は、一度に大量に摂取した場合の毒性の強さを指します。一方、<strong className="text-blue-600">慢性毒性</strong>は、少量でも長期間にわたって繰り返し摂取し続けた場合に現れる毒性のことです。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">急性毒性</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 一度に大量摂取した場合</li>
                      <li>• 短時間で症状が現れる</li>
                      <li>• LD50（半数致死量）で評価</li>
                      <li>• 即座に危険な量</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold text-orange-800 mb-2">慢性毒性</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 少量の長期摂取</li>
                      <li>• 長期間で症状が現れる</li>
                      <li>• NOAEL（無毒性量）で評価</li>
                      <li>• 蓄積による影響</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section5-2" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">② 毒性の考え方について</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  「すべての物質は毒であり、毒でないものはない。毒であるか薬であるかは量による」という言葉があるように、どんな物質でも量によっては毒になります。例えば、食塩も一度に大量に摂取すれば死に至ることがあります。農薬の安全性は、この「量」を科学的に評価し、管理することで確保されています。
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">毒性の基本原則</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 量が毒性を決める</li>
                    <li>• 暴露経路が重要</li>
                    <li>• 個体差がある</li>
                    <li>• 時間的要因がある</li>
                  </ul>
                </div>
              </div>

              <div id="section5-3" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">③ 毒物・劇物</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  急性毒性が特に強いものは、「毒物及び劇物取締法」によって「毒物」または「劇物」に指定されます。これらに該当する農薬は、保管や管理、販売において非常に厳しい規制が課せられています。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">毒物</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 極めて強い急性毒性</li>
                      <li>• 厳重な保管義務</li>
                      <li>• 特別な販売許可が必要</li>
                      <li>• 使用記録の義務</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold text-orange-800 mb-2">劇物</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 強い急性毒性</li>
                      <li>• 適切な保管が必要</li>
                      <li>• 販売許可が必要</li>
                      <li>• 使用時の注意が必要</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ６ 農薬の残留とポジティブリスト制度 */}
        <section id="section6" className="py-16 bg-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-yellow-800 mb-8 border-l-4 border-yellow-500 pl-4">６ 農薬の残留とポジティブリスト制度</h2>
            <div className="space-y-8">
              <div id="section6-1" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">① 農薬の残留とADI</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  農薬を散布すると、一部が作物に残ることがあります。これを<strong className="text-yellow-700">残留農薬</strong>といいます。その安全性を評価する国際的な指標が<strong className="text-yellow-700">ADI（一日摂取許容量）</strong>です。ADIとは、「人が生涯にわたって毎日摂取し続けても、健康に悪影響がないと推定される化学物質の量」のことで、体重1kgあたりのmgで示されます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">ADIの設定</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• NOAEL（無毒性量）を基準</li>
                      <li>• 安全係数（100倍）を適用</li>
                      <li>• 国際的に統一された基準</li>
                      <li>• 定期的な見直し</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">ADIの意味</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 生涯にわたって安全</li>
                      <li>• 毎日摂取しても問題なし</li>
                      <li>• 体重1kgあたりの量</li>
                      <li>• 非常に保守的な基準</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section6-2" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">② 残留農薬基準の設定まで ～ADIを基本にして～</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ADIを基に、各農産物について「残留農薬基準値」が定められます。これは、日本人の平均的な食生活を考慮し、すべての農産物から摂取する農薬の合計量がADIを大幅に下回るように、非常に厳しく設定されています。
                </p>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">基準値設定の手順</h4>
                    <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                      <li>ADIを基準とする</li>
                      <li>日本人の平均的な食生活を調査</li>
                      <li>各農産物の摂取量を計算</li>
                      <li>ADIの80%以下になるよう設定</li>
                      <li>分析技術の限界を考慮</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div id="section6-3" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">③ 残留農薬と食品衛生法</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  食品中の残留農薬は「食品衛生法」によって規制されています。基準値を超えて農薬が残留した食品は、販売することができません。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">違反時の措置</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 販売の禁止</li>
                      <li>• 回収命令</li>
                      <li>• 改善指導</li>
                      <li>• 公表</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">検査体制</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 輸入時の検査</li>
                      <li>• 国内流通時の検査</li>
                      <li>• モニタリング検査</li>
                      <li>• 違反時の重点検査</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="section6-4" className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">④ ポジティブリスト制度</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  これは、<strong className="text-yellow-700">「原則、すべての農薬について残留基準値を設定し、基準値が設定されていない農薬が一定量以上含まれる食品の流通を禁止する」</strong>という制度です。これにより、国内で使われていない農薬が含まれる輸入食品なども規制対象となり、食の安全性がより一層確保されるようになりました。
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">ポジティブリスト制度の特徴</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• すべての農薬に基準値を設定</li>
                      <li>• 基準値未設定は0.01ppm</li>
                      <li>• 輸入食品も規制対象</li>
                      <li>• より厳しい規制</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">制度の効果</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 食の安全性の向上</li>
                      <li>• 輸入食品の安全性確保</li>
                      <li>• 消費者への情報提供</li>
                      <li>• 国際的な調和</li>
                    </ul>
                  </div>
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

        {/* 学習の基礎情報 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">学習の基礎情報</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  このページの内容は、以下の公式資料を参考に作成されています：
                </p>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-bold text-green-800 mb-3">参考資料</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>鳥取県「農薬の適正使用について」</strong>
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    農薬の基礎知識の再確認と使用に係る現行制度を理解し、農薬の適正使用への一層の取組強化を図るための冊子（平成21年3月末作成）
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://www.pref.tottori.lg.jp/120956.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition text-center"
                    >
                      鳥取県公式ページを見る
                    </a>
                    <a
                      href="https://www.pref.tottori.lg.jp/120956.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-green-600 border-2 border-green-600 font-bold py-2 px-4 rounded-lg hover:bg-green-50 transition text-center"
                    >
                      PDF資料をダウンロード
                    </a>
                  </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">お問い合わせ先</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>鳥取県生産振興課 環境にやさしい農業担当</strong>
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>電話: 0857-26-7415</p>
                    <p>ファクシミリ: 0857-26-8497</p>
                    <p>E-mail: seisanshinkou@pref.tottori.lg.jp</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center mt-6">
                  より詳細な情報や最新の情報については、上記の鳥取県公式ページをご確認ください。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
