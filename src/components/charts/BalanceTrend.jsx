import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByMonth } from "../../utils/helpers";
import { useTheme } from "@mui/material/styles";

// Custom tooltip that uses MUI theme colors
function CustomTooltip({ active, payload, label }) {
  const theme = useTheme();
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 1.5,
      }}
    >
      <Typography variant="caption" fontWeight={600}>
        {label}
      </Typography>
      {payload.map((p) => (
        <Typography
          key={p.name}
          variant="caption"
          display="block"
          sx={{ color: p.color }}
        >
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </Typography>
      ))}
    </Box>
  );
}

export default function BalanceTrend() {
  const { transactions } = useApp();
  const theme = useTheme();
  const data = groupByMonth(transactions);

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Cash Flow
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={2}
        >
          Income vs Expenses over time
        </Typography>

        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
              tickFormatter={(v) => v.split(" ")[0].slice(0, 3)}
            />
            <YAxis
              tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#incomeGrad)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#expenseGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
