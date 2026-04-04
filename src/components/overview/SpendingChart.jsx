import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";

export default function SpendingChart() {
  const { transactions } = useApp();
  const [period, setPeriod] = useState("this");

  const chartData = groupByCategory(transactions).slice(0, 6);
  const total = chartData.reduce((sum, c) => sum + c.value, 0);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Spending Summary
          </Typography>
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              No expense data available
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // ── Custom center label rendered as absolute overlay ──
  // This is the most reliable approach — pure HTML over the SVG
  function CenterLabel() {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: "50%", sm: "calc(100px)" }, // center of the 200px wide chart
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none", // don't block chart interactions
        }}
      >
        <Typography
          sx={{
            fontSize: "0.72rem",
            color: "#6b7280",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          Total
        </Typography>
        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          {formatCurrency(total)}
        </Typography>
      </Box>
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
            alignItems: "center",
            gap: 4,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* ── Donut with HTML center label overlay ── */}
          <Box
            sx={{
              position: "relative", // needed for absolute child
              width: { xs: "100%", sm: 200 },
              height: 200,
              flexShrink: 0,
            }}
          >
            {/* The chart */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  strokeWidth={0}
                  isAnimationActive={true}
                >
                  {chartData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
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

            {/* HTML overlay center label — sits in the donut hole */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#6b7280",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  display: "block",
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {formatCurrency(total)}
              </Typography>
            </Box>
          </Box>

          {/* ── Category grid ── */}
          <Box
            sx={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2.5,
              width: "100%",
            }}
          >
            {chartData.map((cat) => {
              const color = CATEGORY_COLORS[cat.name] || "#6b7280";
              return (
                <Box key={cat.name}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      mb: 0.3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.72rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      ml: 2.1,
                      fontSize: "0.88rem",
                    }}
                  >
                    {formatCurrency(cat.value)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
