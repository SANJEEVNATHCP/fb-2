/**
 * Core Financial Business Logic Utilities
 * These functions calculate metrics based on mock data on the frontend.
 */

// Types
export interface Transaction {
  id: string
  amount: number
  date: string
  category: string
  description: string
  type: 'income' | 'expense'
}

export interface HistoryPoint {
  month: string
  date: string
  netWorth: number
  income: number
  expenses: number
  savings: number
}

// 1. Calculate Monthly Cash Flow (Income vs Expenses for the current month)
export function calculateCashFlow(transactions: Transaction[], targetMonth: Date = new Date()) {
  const currentMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date)
    return d.getMonth() === targetMonth.getMonth() && d.getFullYear() === targetMonth.getFullYear()
  })

  let income = 0
  let expenses = 0

  currentMonthTransactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount
    } else {
      expenses += Math.abs(t.amount)
    }
  })

  return { income, expenses, net: income - expenses }
}

// 2. Calculate Savings Rate
export function calculateSavingsRate(income: number, expenses: number): number {
  if (income <= 0) return 0
  const savings = income - expenses
  return (savings / income) * 100
}

// 3. Calculate Financial Health Score (0-100)
// Simple algorithm based on savings rate and debt/expenses
export function calculateHealthScore(savingsRate: number, totalNetWorth: number): number {
  let score = 50 // Base score
  
  // Add points for savings rate (up to 30 points)
  if (savingsRate >= 20) score += 30
  else if (savingsRate > 0) score += (savingsRate / 20) * 30

  // Add points for net worth threshold (up to 20 points)
  if (totalNetWorth > 100000) score += 20
  else if (totalNetWorth > 0) score += (totalNetWorth / 100000) * 20

  return Math.min(Math.max(Math.round(score), 0), 100)
}

// 4. Calculate Expenses by Category
export function calculateCategoryBreakdown(transactions: Transaction[]) {
  const breakdown: Record<string, number> = {}
  
  transactions.forEach(t => {
    if (t.type === 'expense') {
      const amount = Math.abs(t.amount)
      breakdown[t.category] = (breakdown[t.category] || 0) + amount
    }
  })

  return Object.entries(breakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

// 5. Future Simulator: Compound Interest Projection
export function projectFutureWealth(
  currentPrincipal: number,
  monthlyContribution: number,
  annualInterestRate: number,
  years: number
) {
  const monthlyRate = annualInterestRate / 100 / 12
  const months = years * 12
  let futureValue = currentPrincipal

  const projection = []

  for (let i = 1; i <= months; i++) {
    futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate)
    
    // Store yearly data points
    if (i % 12 === 0) {
      projection.push({
        year: i / 12,
        value: Math.round(futureValue)
      })
    }
  }

  return { futureValue: Math.round(futureValue), projection }
}
