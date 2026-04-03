import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
} from "@mui/icons-material";

// icon and color are determined by "type" prop
const CONFIG = {
  balance: {
    icon: <AccountBalanceWallet />,
    color: "#6366f1",
    bg: "#6366f115",
    label: "Balance",
  },
  income: {
    icon: <TrendingUp />,
    color: "#22c55e",
    bg: "#22c55e15",
    label: "Income",
  },
  expense: {
    icon: <TrendingDown />,
    color: "#ef4444",
    bg: "#ef444415",
    label: "Expenses",
  },
};

export default function SummaryCard({ type, amount, subtitle }) {
  const config = CONFIG[type];

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        {/* Top row: icon + chip */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Colored icon box */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: config.bg,
              color: config.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {config.icon}
          </Box>

          {/* Label chip */}
          <Chip
            label={config.label}
            size="small"
            sx={{
              backgroundColor: config.bg,
              color: config.color,
              fontWeight: 600,
              fontSize: "0.72rem",
            }}
          />
        </Box>

        {/* Amount */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "text.primary",
            mb: 0.5,
          }}
        >
          {amount}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
