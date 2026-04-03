import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { MoreHorizOutlined, WifiOutlined } from "@mui/icons-material";
import { formatCurrency } from "../../utils/helpers";

// ── Mock card data ──
const CARDS = [
  {
    id: 1,
    name: "Visa Platinum",
    holder: "Maya Rivers",
    number: "4532 7890 1234 5678",
    expiry: "12/29",
    network: "VISA",
    spending: 284040,
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#00d4aa",
    label: "Spending this month",
  },
  {
    id: 2,
    name: "World",
    holder: "Maya Rivers",
    number: "5432 9876 5432 1898",
    expiry: "09/28",
    network: "MC",
    spending: 126020,
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #2d1b69 100%)",
    accent: "#e91e8c",
    label: "Spending this month",
  },
  {
    id: 3,
    name: "Visa Classic",
    holder: "Maya Rivers",
    number: "4321 8765 2199 6543",
    expiry: "08/26",
    network: "VISA",
    spending: 120000,
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
    accent: "#6366f1",
    label: "Expenses for this month",
  },
];

// ── Chip icon (the golden rectangle on cards) ──
function ChipIcon({ color }) {
  return (
    <Box
      sx={{
        width: 36,
        height: 26,
        borderRadius: "5px",
        background: `linear-gradient(135deg, ${color}88, ${color}44)`,
        border: `1px solid ${color}66`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "2px",
        p: "4px",
      }}
    >
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            backgroundColor: color + "66",
            borderRadius: "1px",
          }}
        />
      ))}
    </Box>
  );
}

// ── Network badge (VISA / MC) ──
function NetworkBadge({ network }) {
  if (network === "VISA") {
    return (
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          fontStyle: "italic",
          color: "white",
          opacity: 0.9,
        }}
      >
        VISA
      </Typography>
    );
  }

  // Mastercard — two overlapping circles
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#eb001b",
          opacity: 0.9,
        }}
      />
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#f79e1b",
          opacity: 0.9,
          ml: -1,
        }}
      />
    </Box>
  );
}

// ── Single credit card ──
function CreditCard({ card }) {
  // Mask number — show only last 4 digits
  const maskedNumber = card.number
    .split(" ")
    .map((group, i) => (i < 2 ? "····" : group))
    .join(" ");

  return (
    <Box
      sx={{
        borderRadius: "16px",
        background: card.gradient,
        border: `1px solid ${card.accent}22`,
        p: 2.5,
        height: "100%",
        minHeight: 175,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 16px 40px ${card.accent}33`,
        },
      }}
    >
      {/* Background circle decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: card.accent + "11",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -20,
          right: 40,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: card.accent + "09",
          pointerEvents: "none",
        }}
      />

      {/* ── Top row: name + wifi icon ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.82rem",
          }}
        >
          {card.name}
        </Typography>
        <WifiOutlined
          sx={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 18,
            transform: "rotate(90deg)",
          }}
        />
      </Box>

      {/* ── Chip ── */}
      <Box sx={{ mt: 1 }}>
        <ChipIcon color={card.accent} />
      </Box>

      {/* ── Holder + expiry ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.5)", display: "block", mb: 0.3 }}
          >
            {card.holder}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontWeight: 600,
              fontFamily: "'Courier New', monospace",
              fontSize: { xs: "0.7rem", sm: "0.78rem" },
              letterSpacing: "0.08em",
            }}
          >
            {maskedNumber}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            {card.expiry}
          </Typography>
          <NetworkBadge network={card.network} />
        </Box>
      </Box>

      {/* ── Bottom: spending label ── */}
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
          {card.label}
        </Typography>
        <Typography variant="caption" sx={{ color: "white", fontWeight: 700 }}>
          {formatCurrency(card.spending)}
        </Typography>
      </Box>
    </Box>
  );
}

// ── Main component ──
export default function YourCards() {
  return (
    <Card sx={{ mt: 0 }}>
      <CardContent sx={{ p: 2.5 }}>
        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Your cards
          </Typography>
          <IconButton
            size="small"
            sx={{ color: "#6b7280", "&:hover": { color: "white" } }}
          >
            <MoreHorizOutlined />
          </IconButton>
        </Box>

        {/* ── Cards grid ── */}
        <Grid container spacing={2}>
          {CARDS.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <CreditCard card={card} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
