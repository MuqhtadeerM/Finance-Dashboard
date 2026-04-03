import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";
import { useTheme } from "@mui/material/styles";

function CustomTooltip({ active, payload }) {
  const theme = useTheme();
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];

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
        {name}
      </Typography>
      <Typography variant="caption" display="block">
        {formatCurrency(value)}
      </Typography>
    </Box>
  );
}

// Renders percentage labels inside pie slices
const RADIAN = Math.PI / 180;
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.06) return null; // skip tiny slices
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
}

export default function SpendingBreakdown() {
  const { transactions } = useApp();
  const data = groupByCategory(transactions).slice(0, 6);

  if (!data.length) {
    return (
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
        }}
      >
        <Typography color="text.secondary">No expense data</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" gutterBottom>
          Spending by Category
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={2}
        >
          Top 6 expense categories
        </Typography>

        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={85}
              innerRadius={35}
              dataKey="value"
              labelLine={false}
              label={<CustomLabel />}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || "#94a3b8"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
