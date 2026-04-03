import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/ui/SummaryCard";
import { formatCurrency, formatDate } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

// ── Recent transaction row ──
function RecentItem({ tx }) {
  const color = CATEGORY_COLORS[tx.category] || "#94a3b8";

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.25 }}>
        {/* Colored dot with arrow */}
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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, color: "text.primary", noWrap: true }}
          >
            {tx.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(tx.date)} · {tx.category}
          </Typography>
        </Box>

        {/* Amount */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: tx.type === "income" ? "success.main" : "error.main",
            flexShrink: 0,
          }}
        >
          {tx.type === "income" ? "+" : "-"}
          {formatCurrency(tx.amount)}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
}

// ── Main Overview page ──
export default function Overview() {
  const { summary, transactions } = useApp();

  // 5 most recent transactions
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Box>
      {/* Page heading */}
      <Typography
        variant="h4"
        sx={{ mb: 0.5, fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }}
      >
        Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your financial summary at a glance
      </Typography>

      {/* ── Summary cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            type="balance"
            title="Total Balance"
            amount={formatCurrency(summary.balance)}
            subtitle="Income minus all expenses"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            type="income"
            title="Total Income"
            amount={formatCurrency(summary.income)}
            subtitle="Salary + freelance combined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            type="expense"
            title="Total Expenses"
            amount={formatCurrency(summary.expenses)}
            subtitle="All outgoing payments"
          />
        </Grid>
      </Grid>

      {/* ── Recent transactions ── */}
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          {/* Header */}
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
              variant="body2"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              See all →
            </Typography>
          </Box>

          {/* List */}
          {recent.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", py: 3 }}
            >
              No transactions yet
            </Typography>
          ) : (
            recent.map((tx) => <RecentItem key={tx.id} tx={tx} />)
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
