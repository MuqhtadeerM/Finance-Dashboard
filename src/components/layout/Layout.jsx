import {
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { MenuOutlined } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        // Full viewport height — no overflow
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      {/* ── Desktop sidebar ── */}
      {!isMobile && <Sidebar />}

      {/* ── Mobile drawer ── */}
      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "background.paper",
              border: "none",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      {/* ── Right side: topbar + content ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Mobile hamburger row */}
        {isMobile && (
          <Box
            sx={{
              px: 2,
              py: 1,
              backgroundColor: "background.paper",
              borderBottom: `1px solid`,
              borderColor: "divider",
            }}
          >
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: "text.primary" }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        )}

        {/* Topbar */}
        <Topbar />

        {/* ── Scrollable page content ── */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            // Padding scales with screen size
            p: { xs: 2, sm: 2.5, md: 3 },
            // Make sure children can be full width
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
