// Pure functions — no React, just logic
// These are like "tools in a toolbox" you use anywhere

// ₹85000 → "₹85,000"
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// "2025-01-03" → "03 Jan 2025"
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// "2025-01-03" → "2025-01"  (used for grouping by month)
export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}

// "2025-01" → "January 2025"
export function getMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  return new Date(year, month - 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

// Groups transactions by month → used in charts
// Output: [{ month: "Jan 2025", income: 85000, expense: 40000, balance: 45000 }]
export function groupByMonth(transactions) {
  const groups = {};

  for (const tx of transactions) {
    const key = getMonthKey(tx.date);
    if (!groups[key]) groups[key] = { income: 0, expense: 0, balance: 0 };

    if (tx.type === "income") {
      groups[key].income += tx.amount;
    } else {
      groups[key].expense += tx.amount;
    }
    groups[key].balance = groups[key].income - groups[key].expense;
  }

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, vals]) => ({
      month: getMonthLabel(key),
      monthKey: key,
      ...vals,
    }));
}

// Groups expense transactions by category → used in pie chart
// Output: [{ name: "Rent", value: 132000 }, ...]
export function groupByCategory(transactions) {
  const groups = {};

  for (const tx of transactions.filter((t) => t.type === "expense")) {
    if (!groups[tx.category]) groups[tx.category] = 0;
    groups[tx.category] += tx.amount;
  }

  return Object.entries(groups)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));
}

// Returns unique months from transactions for the filter dropdown
export function getUniqueMonths(transactions) {
  const months = [...new Set(transactions.map((t) => getMonthKey(t.date)))];
  return months.sort().map((key) => ({ key, label: getMonthLabel(key) }));
}
