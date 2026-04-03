import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  ButtonGroup,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  SwapHoriz,
  Lightbulb,
  DarkMode,
  LightMode,
  Shield,
  Visibility,
  Menu,
} from "@mui/icons-material";
import { useApp, ROLES } from "../../context/AppContext";

const SIDEBAR_WIDTH = 230;

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: <Dashboard /> },
  { to: "/transactions", label: "Transactions", icon: <SwapHoriz /> },
  { to: "/insights", label: "Insights", icon: <Lightbulb /> },
];

// ── Sidebar content extracted so we reuse it in both mobile + desktop ──
function SidebarContent({ onNavClick }) {
  const { role, setRole } = useApp();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Brand */}
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "primary.main",
          }}
        >
          ₹ FinTrack
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Personal Finance
        </Typography>
      </Box>

      <Divider />

      {/* Nav links */}
      <List sx={{ px: 1, pt: 1, flex: 1 }}>
        {NAV_ITEMS.map(({ to, label, icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);
          return (
            <ListItem key={to} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={to}
                onClick={onNavClick}
                sx={{
                  borderRadius: 2,
                  color: isActive ? "primary.main" : "text.secondary",
                  backgroundColor: isActive
                    ? "primary.main" + "18"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "primary.main" + "22"
                      : "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Role switcher */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Active Role
        </Typography>

        <ButtonGroup fullWidth size="small" sx={{ mt: 1 }}>
          <Button
            variant={role === ROLES.ADMIN ? "contained" : "outlined"}
            startIcon={<Shield sx={{ fontSize: 14 }} />}
            onClick={() => setRole(ROLES.ADMIN)}
            sx={{ fontSize: "0.75rem" }}
          >
            Admin
          </Button>
          <Button
            variant={role === ROLES.VIEWER ? "contained" : "outlined"}
            startIcon={<Visibility sx={{ fontSize: 14 }} />}
            onClick={() => setRole(ROLES.VIEWER)}
            sx={{ fontSize: "0.75rem" }}
          >
            Viewer
          </Button>
        </ButtonGroup>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block", textAlign: "center" }}
        >
          {role === ROLES.ADMIN ? "✏️ Can add & edit" : "👁️ Read-only mode"}
        </Typography>
      </Box>
    </Box>
  );
}

// ── Main Layout ──
export default function Layout({ children }) {
  const { darkMode, setDarkMode } = useApp();
  const theme = useTheme();

  // isMobile = true when screen is smaller than "md" (900px)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Controls mobile drawer open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* ── Desktop: permanent sidebar ── */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* ── Mobile: temporary drawer (slides in/out) ── */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <SidebarContent onNavClick={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* ── Main area ── */}
      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
      >
        {/* Topbar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: "text.primary",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Hamburger — only on mobile */}
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} color="inherit">
                  <Menu />
                </IconButton>
              )}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem" } }}
              >
                Financial Dashboard
              </Typography>
            </Box>

            <Tooltip title="Toggle dark mode">
              <IconButton
                onClick={() => setDarkMode((d) => !d)}
                color="inherit"
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 }, // less padding on mobile
            backgroundColor: "background.default",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
