import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import { drizzle } from 'drizzle-orm/d1'
import { desc, sql } from 'drizzle-orm'
import { expenses } from '../db/schema'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useRef } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: '農業経費帳 | 鳥取県就農支援サイト' },
    { name: 'description', content: '新規就農にかかる経費を記録・管理するページです。' },
  ]
}

type LoaderData = {
  expenses: typeof expenses.$inferSelect[]
  totalAmount: number
}

type ActionData = {
  success: boolean
  error?: string
}

export async function loader({ context }: LoaderFunctionArgs) {
  const db = drizzle(context.cloudflare.env.DB)
  const allExpenses = await db.select().from(expenses).orderBy(desc(expenses.date)).all()

  // Calculate total
  const totalAmount = allExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return json<LoaderData>({ expenses: allExpenses, totalAmount })
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData()
  const date = formData.get('date')?.toString()
  const item = formData.get('item')?.toString()
  const amountStr = formData.get('amount')?.toString()
  const description = formData.get('description')?.toString() || ''

  if (!date || !item || !amountStr) {
    return json<ActionData>({ success: false, error: '必須項目を入力してください' }, { status: 400 })
  }

  const amount = parseInt(amountStr, 10)
  if (isNaN(amount)) {
    return json<ActionData>({ success: false, error: '金額は数値で入力してください' }, { status: 400 })
  }

  const db = drizzle(context.cloudflare.env.DB)

  await db.insert(expenses).values({
    id: crypto.randomUUID(),
    date,
    item,
    amount,
    description,
  })

  return json<ActionData>({ success: true })
}

export default function Expenses() {
  const { expenses, totalAmount } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset()
    }
  }, [actionData])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentPage="expenses" />

      <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">農業経費帳</h1>
            <p className="mt-3 text-xl text-gray-500">
              新規就農にかかる経費を記録・管理しましょう
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-4">経費を追加</h2>
                <form method="post" ref={formRef} className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      日付 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                      項目 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="item"
                      id="item"
                      required
                      placeholder="例: 種苗代、肥料代"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      金額 (円) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="0"
                      placeholder="例: 5000"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      詳細・備考
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2 border"
                    ></textarea>
                  </div>

                  {actionData && !actionData.success && (
                    <div className="text-red-600 text-sm">{actionData.error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
                  >
                    {isSubmitting ? '追加中...' : '追加する'}
                  </button>
                </form>
              </div>
            </div>

            {/* Expenses List */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">経費一覧</h3>
                  <div className="text-lg font-bold text-green-700">
                    合計: {totalAmount.toLocaleString()} 円
                  </div>
                </div>

                {expenses.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    まだ経費の記録がありません。
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            日付
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            項目
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            金額
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            詳細
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {expense.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              {expense.item}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {expense.amount.toLocaleString()} 円
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {expense.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
