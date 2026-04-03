import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import {
  EditOutlined,
  CalendarTodayOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";

// ── Single transaction row ──
function TxRow({ tx }) {
  const color = CATEGORY_COLORS[tx.category] || "#6b7280";

  // Get initials from description
  const initials = tx.description
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1,
        borderBottom: "1px solid #1f2028",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      {/* Avatar with initials */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          backgroundColor: color + "22",
          color: color,
          fontSize: "0.72rem",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {initials}
      </Avatar>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          flex: 1,
          fontWeight: 500,
          color: "white",
          // Truncate long names
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {tx.description}
      </Typography>

      {/* Amount */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: tx.type === "income" ? "#00d4aa" : "#ff4757",
          flexShrink: 0,
          fontSize: "0.85rem",
        }}
      >
        {tx.type === "income" ? "+" : "-"}
        {formatCurrency(tx.amount)}
      </Typography>

      {/* Edit icon */}
      <IconButton
        size="small"
        sx={{
          color: "#6b7280",
          width: 28,
          height: 28,
          flexShrink: 0,
          "&:hover": { color: "white", backgroundColor: "#1f2028" },
        }}
      >
        <EditOutlined sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}

// ── Main component ──
export default function TransactionHistory() {
  const { transactions } = useApp();

  // 8 most recent
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.5 }}>
        {/* ── Header ── */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Transaction history
        </Typography>

        {/* ── Filter buttons ── */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button
            size="small"
            startIcon={<CalendarTodayOutlined sx={{ fontSize: 14 }} />}
            sx={{
              backgroundColor: "#1f2028",
              color: "#6b7280",
              border: "1px solid #2d2d3a",
              fontSize: "0.75rem",
              px: 1.5,
              "&:hover": { backgroundColor: "#2d2d3a" },
            }}
          >
            Select dates
          </Button>
          <Button
            size="small"
            startIcon={<TuneOutlined sx={{ fontSize: 14 }} />}
            sx={{
              backgroundColor: "#1f2028",
              color: "#6b7280",
              border: "1px solid #2d2d3a",
              fontSize: "0.75rem",
              px: 1.5,
              "&:hover": { backgroundColor: "#2d2d3a" },
            }}
          >
            Apply filter
          </Button>
        </Box>

        {/* ── Column headers ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
            px: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", fontWeight: 600 }}
          >
            Transaction
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", fontWeight: 600 }}
          >
            Amount
          </Typography>
        </Box>

        {/* ── Transaction rows ── */}
        <Box
          sx={{
            maxHeight: { xs: "none", md: 320 },
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#2d2d3a",
              borderRadius: "99px",
            },
          }}
        >
          {recent.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", py: 4, fontSize: "0.85rem" }}
            >
              No transactions found
            </Typography>
          ) : (
            recent.map((tx) => <TxRow key={tx.id} tx={tx} />)
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
