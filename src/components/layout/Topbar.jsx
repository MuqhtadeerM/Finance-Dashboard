import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, NotificationsOutlined } from "@mui/icons-material";

export default function Topbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get current hour to decide greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        py: 2.5,
        borderBottom: "1px solid #1f2028",
        backgroundColor: "#13131a",
        gap: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
        color: "Pink",
      }}
    >
      {/* ── Left: Greeting ── */}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {greeting},{" "}
          <Box component="span" sx={{ color: "white", fontWeight: 800 }}>
            Muqhtadeer
          </Box>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.82rem" } }}
        >
          Your personalized financial dashboard.
        </Typography>
      </Box>

      {/* ── Right: Search + Bell + Avatar ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          flexShrink: 0,
        }}
      >
        {/* Search bar — hidden on xs, visible sm+ */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0a0a0f",
              border: "1px solid #1f2028",
              borderRadius: "10px",
              px: 1.5,
              py: 0.6,
              gap: 1,
              width: { sm: 180, md: 240 },
            }}
          >
            <Search sx={{ color: "#6b7280", fontSize: 18 }} />
            <InputBase
              placeholder="Search..."
              sx={{
                color: "text.primary",
                fontSize: "0.85rem",
                flex: 1,
                "& input::placeholder": { color: "#6b7280" },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                backgroundColor: "#1f2028",
                px: 0.75,
                py: 0.25,
                borderRadius: "5px",
                fontSize: "0.65rem",
              }}
            >
              ⌘K
            </Typography>
          </Box>
        )}

        {/* Notification bell */}
        <IconButton
          size="small"
          sx={{
            backgroundColor: "#0a0a0f",
            border: "1px solid #1f2028",
            borderRadius: "10px",
            width: 38,
            height: 38,
            "&:hover": { backgroundColor: "#1f2028" },
          }}
        >
          <Badge badgeContent={3} color="primary">
            <NotificationsOutlined sx={{ fontSize: 18, color: "#6b7280" }} />
          </Badge>
        </IconButton>

        {/* Avatar + name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #e91e8c, #9c27b0)",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            M
          </Avatar>
          {/* Name — hidden on mobile */}
          {!isMobile && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                Muqhtadeer
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Muqhtadeer@creations.com
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
