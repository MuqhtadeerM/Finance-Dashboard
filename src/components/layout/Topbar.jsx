import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  Button,
  ButtonGroup,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Search,
  NotificationsOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  ShieldOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useApp, ROLES } from "../../context/AppContext";

export default function Topbar() {
  const { darkMode, setDarkMode, role, setRole } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const isDark = darkMode;

  // ── Shared icon button style ──
  const iconBtnStyle = {
    backgroundColor: isDark ? "#0a0a0f" : "#f1f5f9",
    border: `1px solid ${isDark ? "#1f2028" : "#e2e8f0"}`,
    borderRadius: "10px",
    width: 38,
    height: 38,
    "&:hover": {
      backgroundColor: isDark ? "#1f2028" : "#e2e8f0",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        py: 2,
        borderBottom: `1px solid ${isDark ? "#1f2028" : "#e2e8f0"}`,
        backgroundColor: "background.paper",
        gap: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      {/* ── Left: Greeting ── */}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {greeting},{" "}
          <Box component="span" sx={{ fontWeight: 800 }}>
            Maya
          </Box>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.78rem" }}
        >
          Your personalized financial dashboard.
        </Typography>
      </Box>

      {/* ── Right controls ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {/* Search — hide on mobile */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: isDark ? "#0a0a0f" : "#f8fafc",
              border: `1px solid ${isDark ? "#1f2028" : "#e2e8f0"}`,
              borderRadius: "10px",
              px: 1.5,
              py: 0.5,
              gap: 1,
              width: { sm: 160, md: 220 },
            }}
          >
            <Search sx={{ color: "#6b7280", fontSize: 16 }} />
            <InputBase
              placeholder="Search..."
              sx={{
                color: "text.primary",
                fontSize: "0.82rem",
                flex: 1,
                "& input::placeholder": { color: "#6b7280" },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                backgroundColor: isDark ? "#1f2028" : "#e2e8f0",
                px: 0.75,
                py: 0.2,
                borderRadius: "5px",
                fontSize: "0.62rem",
              }}
            >
              ⌘K
            </Typography>
          </Box>
        )}

        {/* ── Role switcher — hide on mobile ── */}
        {!isTablet && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: isDark ? "#1f2028" : "#e2e8f0" }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography
                variant="caption"
                sx={{ color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Role:
              </Typography>
              <ButtonGroup size="small">
                <Tooltip title="Admin can add, edit and delete">
                  <Button
                    startIcon={
                      <ShieldOutlined sx={{ fontSize: "14px !important" }} />
                    }
                    onClick={() => setRole(ROLES.ADMIN)}
                    sx={{
                      fontSize: "0.73rem",
                      px: 1.25,
                      height: 32,
                      backgroundColor:
                        role === ROLES.ADMIN
                          ? "#e91e8c"
                          : isDark
                            ? "#0a0a0f"
                            : "#f1f5f9",
                      color: role === ROLES.ADMIN ? "white" : "#6b7280",
                      border: `1px solid ${role === ROLES.ADMIN ? "#e91e8c" : isDark ? "#2d2d3a" : "#e2e8f0"}`,
                      "&:hover": {
                        backgroundColor:
                          role === ROLES.ADMIN
                            ? "#c2185b"
                            : isDark
                              ? "#1f2028"
                              : "#e2e8f0",
                      },
                    }}
                  >
                    Admin
                  </Button>
                </Tooltip>

                <Tooltip title="Viewer can only view data">
                  <Button
                    startIcon={
                      <VisibilityOutlined
                        sx={{ fontSize: "14px !important" }}
                      />
                    }
                    onClick={() => setRole(ROLES.VIEWER)}
                    sx={{
                      fontSize: "0.73rem",
                      px: 1.25,
                      height: 32,
                      backgroundColor:
                        role === ROLES.VIEWER
                          ? "#6366f1"
                          : isDark
                            ? "#0a0a0f"
                            : "#f1f5f9",
                      color: role === ROLES.VIEWER ? "white" : "#6b7280",
                      border: `1px solid ${role === ROLES.VIEWER ? "#6366f1" : isDark ? "#2d2d3a" : "#e2e8f0"}`,
                      "&:hover": {
                        backgroundColor:
                          role === ROLES.VIEWER
                            ? "#4f46e5"
                            : isDark
                              ? "#1f2028"
                              : "#e2e8f0",
                      },
                    }}
                  >
                    Viewer
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: isDark ? "#1f2028" : "#e2e8f0" }}
            />
          </>
        )}

        {/* ── Dark / Light toggle ── */}
        <Tooltip
          title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          <IconButton onClick={() => setDarkMode((d) => !d)} sx={iconBtnStyle}>
            {darkMode ? (
              <LightModeOutlined sx={{ fontSize: 17, color: "#ffa502" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: 17, color: "#6b7280" }} />
            )}
          </IconButton>
        </Tooltip>

        {/* ── Notification bell ── */}
        <Tooltip title="Notifications">
          <IconButton sx={iconBtnStyle}>
            <Badge badgeContent={3} color="primary">
              <NotificationsOutlined sx={{ fontSize: 17, color: "#6b7280" }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* ── Avatar ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg, #e91e8c, #9c27b0)",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            M
          </Avatar>
          {!isMobile && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "0.82rem" }}
              >
                Maya Rivers
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.72rem" }}
              >
                maya@creations.com
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
