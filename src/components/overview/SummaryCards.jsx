import { Box } from "@mui/material";
import SummaryCard from "./SummaryCard";
import { useApp } from "../../context/AppContext";
import { formatCurrency, groupByMonth } from "../../utils/helpers";

function makeSparkline(monthlyData, key) {
  return monthlyData.map((m) => ({ value: m[key] }));
}

export default function SummaryCards() {
  const { summary, transactions } = useApp();
  const byMonth = groupByMonth(transactions);

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
    <Box
      sx={{
        display: "grid",
        // Equal 3 columns on desktop, 1 on mobile, 2 on tablet
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 2.5,
        width: "100%",
      }}
    >
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </Box>
  );
}
