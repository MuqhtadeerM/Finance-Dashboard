import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";
import { useApp } from "../../context/AppContext";
import { formatCurrency, groupByMonth } from "../../utils/helpers";

// Generate sparkline data from monthly totals
function makeSparkline(monthlyData, key) {
  return monthlyData.map((m) => ({ value: m[key] }));
}

export default function SummaryCards() {
  const { summary, transactions } = useApp();
  const byMonth = groupByMonth(transactions);

  // Sparkline datasets
  const incomeSparkline = makeSparkline(byMonth, "income");
  const expenseSparkline = makeSparkline(byMonth, "expense");
  const balanceSparkline = makeSparkline(byMonth, "balance");

  const cards = [
    {
      title: "Account Summary",
      amount: formatCurrency(summary.balance),
      percent: 15.8,
      percentLabel: "Total Summary",
      color: "#00d4aa",
      isPositive: true,
      data: balanceSparkline,
    },
    {
      title: "Income Overview",
      amount: formatCurrency(summary.income),
      percent: 2.4,
      percentLabel: "Total Revenue",
      color: "#6366f1",
      isPositive: true,
      data: incomeSparkline,
    },
    {
      title: "Total Expenses",
      amount: formatCurrency(summary.expenses),
      percent: 5.7,
      percentLabel: "vs last month",
      color: "#ff4757",
      isPositive: false,
      data: expenseSparkline,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid key={card.title} item xs={12} sm={6} md={4}>
          <SummaryCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
}
