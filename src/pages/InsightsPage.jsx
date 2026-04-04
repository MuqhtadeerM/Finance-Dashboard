import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import {
  groupByMonth,
  groupByCategory,
  formatCurrency,
} from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

// ── Insight stat card ──
function StatCard({ emoji, label, value, sub }) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ fontSize: "1.75rem", mb: 1 }}>{emoji}</Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
        >
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          {label}
        </Typography>
        {sub && (
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mt: 0.5, display: "block" }}
          >
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function InsightsPage() {
  const { transactions, summary } = useApp();

  const byMonth = groupByMonth(transactions);
  const byCategory = groupByCategory(transactions);

  // ── Computed insights ──
  const topCategory = byCategory[0];
  const savingsRate =
    summary.income > 0
      ? (((summary.income - summary.expenses) / summary.income) * 100).toFixed(
          1,
        )
      : 0;

  const monthsSorted = [...byMonth].sort((a, b) => b.balance - a.balance);
  const bestMonth = monthsSorted[0];
  const worstMonth = monthsSorted[monthsSorted.length - 1];
  const avgExpense = byMonth.length
    ? Math.round(byMonth.reduce((s, m) => s + m.expense, 0) / byMonth.length)
    : 0;

  // ── Bar chart data ──
  const barData = byMonth.map((m) => ({
    month: m.month.split(" ")[0].slice(0, 3),
    Income: m.income,
    Expense: m.expense,
    Savings: Math.max(0, m.balance),
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* ── Page header ── */}
      <Box>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: "1.4rem", sm: "1.8rem" } }}
        >
          Insights
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Patterns from your 6-month financial data
        </Typography>
      </Box>

      {/* ── Stat cards ── */}
      <Grid container spacing={2}>
        {[
          {
            emoji: "🏆",
            label: "Top Spending Category",
            value: topCategory?.name || "—",
            sub: topCategory
              ? formatCurrency(topCategory.value) + " total"
              : "",
          },
          {
            emoji: "💰",
            label: "Savings Rate",
            value: `${savingsRate}%`,
            sub: "of total income saved",
          },
          {
            emoji: "📅",
            label: "Best Month",
            value: bestMonth?.month || "—",
            sub: bestMonth ? `Saved ${formatCurrency(bestMonth.balance)}` : "",
          },
          {
            emoji: "📉",
            label: "Toughest Month",
            value: worstMonth?.month || "—",
            sub: worstMonth ? `Net ${formatCurrency(worstMonth.balance)}` : "",
          },
          {
            emoji: "🧾",
            label: "Avg Monthly Expense",
            value: formatCurrency(avgExpense),
            sub: "across all months",
          },
          {
            emoji: "📊",
            label: "Total Transactions",
            value: transactions.length,
            sub: "recorded entries",
          },
        ].map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      {/* ── Monthly bar chart ── */}
      <Card>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Monthly Comparison
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Income vs Expenses vs Net Savings per month
          </Typography>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} barGap={4} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2028" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v) => formatCurrency(v)}
                contentStyle={{
                  backgroundColor: "#1f2028",
                  border: "1px solid #2d2d3a",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              <Bar dataKey="Income" fill="#00d4aa" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expense" fill="#ff4757" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Savings" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ── Category breakdown ── */}
      <Card>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            Spending Breakdown
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            All categories ranked by total spend
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {byCategory.map((cat, i) => {
              const pct =
                summary.expenses > 0
                  ? ((cat.value / summary.expenses) * 100).toFixed(1)
                  : 0;
              const color = CATEGORY_COLORS[cat.name] || "#6b7280";
              return (
                <Box
                  key={cat.name}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr 48px 110px",
                    gap: 1.5,
                    alignItems: "center",
                  }}
                >
                  {/* Rank */}
                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", textAlign: "right" }}
                  >
                    #{i + 1}
                  </Typography>

                  {/* Name + bar */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color, fontWeight: 600, display: "block", mb: 0.4 }}
                    >
                      {cat.name}
                    </Typography>
                    <Box
                      sx={{
                        height: 6,
                        backgroundColor: "#1f2028",
                        borderRadius: "99px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${pct}%`,
                          backgroundColor: color,
                          borderRadius: "99px",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Percent */}
                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", textAlign: "right" }}
                  >
                    {pct}%
                  </Typography>

                  {/* Amount */}
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "white", textAlign: "right" }}
                  >
                    {formatCurrency(cat.value)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
