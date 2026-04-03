import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
} from "@mui/icons-material";

// Each type gets its own color + icon
const TYPE_CONFIG = {
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

export default function SummaryCard({ type, title, amount, subtitle }) {
  const config = TYPE_CONFIG[type];

  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 8px 24px ${config.color}22`,
        },
        // Top accent bar
        borderTop: `3px solid ${config.color} !important`,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Top row: icon + chip */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: config.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: config.color,
            }}
          >
            {config.icon}
          </Box>
          <Chip
            label={config.label}
            size="small"
            sx={{
              backgroundColor: config.bg,
              color: config.color,
              fontWeight: 600,
              fontSize: "0.7rem",
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
            mb: 0.25,
            // Responsive font size
            fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.75rem" },
          }}
        >
          {amount}
        </Typography>

        {/* Title */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 0.5, display: "block" }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
