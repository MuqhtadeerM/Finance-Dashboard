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

  // Mobile = screen smaller than "md" (900px)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0f" }}
    >
      {/* ── Desktop sidebar (always visible) ── */}
      {!isMobile && <Sidebar />}

      {/* ── Mobile sidebar (slide-in drawer) ── */}
      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#13131a",
              border: "none",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      )}

      {/* ── Main content area ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0, // prevents overflow
          overflow: "hidden",
        }}
      >
        {/* Mobile: hamburger button inside topbar area */}
        {isMobile && (
          <Box
            sx={{
              px: 2,
              pt: 2,
              backgroundColor: "#13131a",
              borderBottom: "1px solid #1f2028",
            }}
          >
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: "white" }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        )}

        {/* Topbar */}
        <Topbar />

        {/* Scrollable page content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            p: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
