const fs = require('fs');
const path = require('path');

const CATEGORIES = ['Housing', 'Food', 'Transportation', 'Utilities', 'Insurance', 'Healthcare', 'Saving, Investing, & Debt Payments', 'Personal Spending', 'Recreation & Entertainment', 'Miscellaneous'];
const SUBSCRIPTIONS = ['Netflix', 'Spotify', 'Amazon Prime', 'Adobe Creative Cloud', 'Gym Membership', 'Apple One', 'YouTube Premium', 'ChatGPT Plus', 'GitHub Copilot', 'Notion', 'Figma'];
const ACHIEVEMENTS = [
  { id: 'a1', title: 'Saved 50k', icon: 'Trophy', unlocked: true, date: '2025-06-12' },
  { id: 'a2', title: 'Investment Beginner', icon: 'TrendingUp', unlocked: true, date: '2024-01-15' },
  { id: 'a3', title: 'Budget Master', icon: 'PieChart', unlocked: true, date: '2025-11-20' },
  { id: 'a4', title: 'Debt Free', icon: 'ShieldCheck', unlocked: false, date: null },
  { id: 'a5', title: 'Financial Explorer', icon: 'Compass', unlocked: true, date: '2023-08-05' }
];

function generateTransactions(count) {
  const transactions = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isExpense = Math.random() > 0.15;
    const amount = isExpense 
      ? -(Math.random() * 500 + 5).toFixed(2) 
      : +(Math.random() * 5000 + 1000).toFixed(2);
      
    const date = new Date(now.getTime() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000);
    
    transactions.push({
      id: `trx_${i}`,
      amount: parseFloat(amount),
      date: date.toISOString(),
      category: isExpense ? CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] : 'Income',
      description: isExpense ? `Purchase at Store ${Math.floor(Math.random() * 100)}` : 'Salary / Deposit',
      type: isExpense ? 'expense' : 'income'
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function generateHistory(months) {
  const history = [];
  let currentNetWorth = 10000;
  const now = new Date();
  
  for (let i = months; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const income = parseFloat((Math.random() * 2000 + 5000).toFixed(2));
    const expenses = parseFloat((Math.random() * 3000 + 2000).toFixed(2));
    const savings = income - expenses;
    currentNetWorth += savings + (currentNetWorth * (Math.random() * 0.02 - 0.005)); // Slight market fluctuation
    
    history.push({
      month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
      date: date.toISOString(),
      netWorth: parseFloat(currentNetWorth.toFixed(2)),
      income,
      expenses,
      savings
    });
  }
  
  return history;
}

const data = {
  user: {
    name: 'Sanjeev',
    joined: '2023-01-15',
    currency: 'USD',
    healthScore: 84
  },
  transactions: generateTransactions(500),
  history: generateHistory(60), // 5 years
  subscriptions: SUBSCRIPTIONS.map((sub, i) => ({
    id: `sub_${i}`,
    name: sub,
    amount: parseFloat((Math.random() * 20 + 5).toFixed(2)),
    billingCycle: 'monthly',
    nextBillingDate: new Date(new Date().getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  })),
  achievements: ACHIEVEMENTS,
  goals: [
    { id: 'g1', name: 'Emergency Fund', target: 20000, current: 15500, deadline: '2026-12-31', color: '#10B981' },
    { id: 'g2', name: 'House Downpayment', target: 80000, current: 24000, deadline: '2028-06-01', color: '#6366F1' },
    { id: 'g3', name: 'Dream Vacation', target: 5000, current: 1200, deadline: '2026-08-15', color: '#FBBF24' }
  ],
  investments: {
    totalValue: 45230.50,
    allocation: [
      { asset: 'Stocks', percentage: 65, value: 29399.82, color: '#6366F1' },
      { asset: 'Bonds', percentage: 20, value: 9046.10, color: '#10B981' },
      { asset: 'Crypto', percentage: 10, value: 4523.05, color: '#FBBF24' },
      { asset: 'Cash', percentage: 5, value: 2261.53, color: '#9CA3AF' }
    ]
  },
  aiInsights: [
    { id: 'ai1', type: 'warning', message: "You're spending 18% more on food this month compared to last month." },
    { id: 'ai2', type: 'success', message: "Saving $200 more monthly reaches your House Downpayment goal 8 months earlier." },
    { id: 'ai3', type: 'info', message: "Consider rebalancing your portfolio. Stocks have exceeded your target allocation by 5%." }
  ]
};

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
console.log('Massive mock data generated at src/data/mock/db.json');
