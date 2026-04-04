import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function SummaryCard({
  title,
  amount,
  percent,
  percentLabel,
  color,
  data,
  isPositive,
}) {
  return (
    <Card
      sx={{
        // Fill the grid cell completely
        width: "100%",
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 12px 32px ${color}22`,
        },
      }}
    >
      <CardContent
        sx={{
          p: 3,
          // Remove MUI's default bottom padding override
          "&:last-child": { pb: 3 },
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* ── Top row: title + three dots ── */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              cursor: "pointer",
              fontSize: "1.1rem",
              lineHeight: 1,
              letterSpacing: "0.1em",
            }}
          >
            ···
          </Typography>
        </Box>

        {/* ── Amount + percent badge ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 0.75,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              fontSize: {
                xs: "1.5rem",
                sm: "1.65rem",
                md: "1.8rem",
                lg: "2rem",
              },
              color: "text.primary",
              lineHeight: 1,
            }}
          >
            {amount}
          </Typography>

          <Chip
            icon={
              isPositive ? (
                <TrendingUp
                  sx={{
                    fontSize: "13px !important",
                    color: `${color} !important`,
                  }}
                />
              ) : (
                <TrendingDown
                  sx={{
                    fontSize: "13px !important",
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
              "& .MuiChip-icon": { ml: "6px" },
            }}
          />

          <Typography
            variant="caption"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            {percentLabel}
          </Typography>
        </Box>

        {/* ── Sparkline — flex grow to fill remaining space ── */}
        <Box sx={{ flex: 1, minHeight: 70, mt: 1, mx: -1 }}>
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
                  <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
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
