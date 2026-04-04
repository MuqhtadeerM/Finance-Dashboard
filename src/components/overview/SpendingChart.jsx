import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Grid,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";

// ── Center label inside donut ──
function DonutLabel({ viewBox, total }) {
  // Safety check — if viewBox is undefined, return nothing
  if (!viewBox) return null;
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="#6b7280"
        fontSize="13"
        fontWeight="500"
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="15"
        fontWeight="800"
      >
        {formatCurrency(total)}
      </text>
    </g>
  );
}

// ── Single category item ──
function CategoryItem({ name, value, color }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
          {name}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 700, ml: 2.1 }}>
        {formatCurrency(value)}
      </Typography>
    </Box>
  );
}

// ── Main component ──
export default function SpendingChart() {
  const { transactions } = useApp();
  const [period, setPeriod] = useState("this");

  // ── Safety check 1: transactions exist? ──
  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Spending Summary
          </Typography>
          <Typography color="text.secondary">
            No transaction data found.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // ── Compute chart data ──
  const allCategories = groupByCategory(transactions);
  const chartData = allCategories.slice(0, 6);
  const total = chartData.reduce((sum, c) => sum + c.value, 0);

  // ── Safety check 2: expense data exists? ──
  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Spending Summary
          </Typography>
          <Typography color="text.secondary">
            No expense categories found.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Spending Summary
          </Typography>

          <ButtonGroup size="small">
            {["this", "last"].map((p) => (
              <Button
                key={p}
                onClick={() => setPeriod(p)}
                sx={{
                  fontSize: "0.75rem",
                  px: 1.5,
                  backgroundColor: period === p ? "#1f2028" : "transparent",
                  borderColor: "#2d2d3a",
                  color: period === p ? "white" : "text.secondary",
                  "&:hover": {
                    backgroundColor: "#2d2d3a",
                    borderColor: "#2d2d3a",
                  },
                }}
              >
                {p === "this" ? "• This month" : "Last month"}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* ── Donut + Categories ── */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            // Stack on mobile, side by side on tablet+
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* ── Donut chart — FIXED pixel height, never % ── */}
          <Box
            sx={{
              flexShrink: 0,
              // Fixed width on desktop, full width on mobile
              width: { xs: "100%", sm: 220 },
              // Always a fixed pixel height — this is the key
              height: 220,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="transparent"
                  labelLine={false}
                  label={(props) => <DonutLabel {...props} total={total} />}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [formatCurrency(val), "Spending"]}
                  contentStyle={{
                    backgroundColor: "#1f2028",
                    border: "1px solid #2d2d3a",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "white",
                  }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* ── Category grid ── */}
          <Grid container spacing={2} sx={{ flex: 1 }}>
            {chartData.map((cat) => (
              <Grid item xs={6} key={cat.name}>
                <CategoryItem
                  name={cat.name}
                  value={cat.value}
                  color={CATEGORY_COLORS[cat.name] || "#6b7280"}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
