import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function SummaryCard({
  title, // "Account Summary"
  amount, // "₹2,15,120"
  percent, // 15.8
  percentLabel, // "Total Summary"
  color, // "#00d4aa"
  data, // [{value: 100}, {value: 120}, ...]
  isPositive, // true = green arrow, false = red arrow
}) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 12px 32px ${color}22`,
        },
      }}
    >
      <CardContent sx={{ p: 2.5, pb: "2.5rem !important" }}>
        {/* ── Top row: title + menu dot ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", fontWeight: 500 }}
          >
            {title}
          </Typography>

          {/* Three dot menu */}
          <Typography
            sx={{
              color: "#6b7280",
              cursor: "pointer",
              fontSize: "1.2rem",
              lineHeight: 1,
            }}
          >
            ···
          </Typography>
        </Box>

        {/* ── Amount + % badge ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 0.5,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.6rem" },
            }}
          >
            {amount}
          </Typography>

          {/* Percent badge */}
          <Chip
            icon={
              isPositive ? (
                <TrendingUp
                  sx={{
                    fontSize: "14px !important",
                    color: `${color} !important`,
                  }}
                />
              ) : (
                <TrendingDown
                  sx={{
                    fontSize: "14px !important",
                    color: "#ff4757 !important",
                  }}
                />
              )
            }
            label={`${percent}%`}
            size="small"
            sx={{
              backgroundColor: isPositive ? `${color}18` : "#ff475718",
              color: isPositive ? color : "#ff4757",
              fontWeight: 700,
              fontSize: "0.72rem",
              height: 24,
            }}
          />

          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {percentLabel}
          </Typography>
        </Box>

        {/* ── Sparkline chart ── */}
        <Box sx={{ height: 60, mt: 1.5, mx: -1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id={`grad-${color.replace("#", "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#grad-${color.replace("#", "")})`}
                dot={false}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
