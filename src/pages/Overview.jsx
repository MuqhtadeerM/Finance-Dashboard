import { Grid, Typography, Box, Card, CardContent, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/ui/SummaryCard";
import BalanceTrend from "../components/charts/BalanceTrend";
import SpendingBreakdown from "../components/charts/SpendingBreakdown";
import { formatCurrency, formatDate } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

export default function Overview() {
  const { summary, transactions } = useApp();

  // 5 most recent transactions
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Box>
      {/* Page heading */}
      <Typography variant="h5" fontWeight={800} mb={0.5}>
        Good morning 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Here's your financial summary
      </Typography>

      {/* ── Summary Cards ── */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            type="balance"
            amount={formatCurrency(summary.balance)}
            subtitle="Total balance this period"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            type="income"
            amount={formatCurrency(summary.income)}
            subtitle="All salary + freelance"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            type="expense"
            amount={formatCurrency(summary.expenses)}
            subtitle="All outgoing payments"
          />
        </Grid>
      </Grid>

      {/* ── Charts ── */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={7}>
          <BalanceTrend />
        </Grid>
        <Grid item xs={12} md={5}>
          <SpendingBreakdown />
        </Grid>
      </Grid>

      {/* ── Recent Transactions ── */}
      <Card>
        <CardContent sx={{ p: 2.5 }}>
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Recent Transactions</Typography>
            <Typography
              component={Link}
              to="/transactions"
              variant="caption"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              See all →
            </Typography>
          </Box>

          {/* Transaction rows */}
          {recent.map((tx, index) => {
            const color = CATEGORY_COLORS[tx.category] || "#94a3b8";
            const isLast = index === recent.length - 1;

            return (
              <Box
                key={tx.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.2,
                  borderBottom: isLast ? "none" : "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* Colored dot / type indicator */}
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    backgroundColor: color + "22",
                    color: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    flexShrink: 0,
                  }}
                >
                  {tx.type === "income" ? "↑" : "↓"}
                </Box>

                {/* Description + date */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {tx.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(tx.date)} · {tx.category}
                  </Typography>
                </Box>

                {/* Amount */}
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color: tx.type === "income" ? "success.main" : "error.main",
                  }}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </Typography>
              </Box>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
}
