import { createTheme } from "@mui/material";

export function getTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: { main: "#e91e8c" },
      success: { main: "#00d4aa" },
      error: { main: "#ff4757" },
      warning: { main: "#ffa502" },

      background: {
        default: isDark ? "#0a0a0f" : "#f1f5f9",
        paper: isDark ? "#13131a" : "#ffffff",
      },

      text: {
        primary: isDark ? "#ffffff" : "#0f172a",
        secondary: isDark ? "#6b7280" : "#64748b",
        disabled: isDark ? "#374151" : "#cbd5e1",
      },

      divider: isDark ? "#1f2028" : "#e2e8f0",
    },

    typography: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      h3: { fontWeight: 800, letterSpacing: "-0.03em" },
      h4: { fontWeight: 800, letterSpacing: "-0.03em" },
      h5: { fontWeight: 700, letterSpacing: "-0.02em" },
      h6: { fontWeight: 700, letterSpacing: "-0.01em" },
      body1: { fontSize: "0.9rem" },
      body2: { fontSize: "0.82rem" },
    },

    shape: { borderRadius: 16 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: isDark
              ? "#1f2028 transparent"
              : "#e2e8f0 transparent",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#13131a" : "#ffffff",
            border: isDark ? "1px solid #1f2028" : "1px solid #e2e8f0",
            boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
            borderRadius: "16px",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#1f2028" : "#e2e8f0",
          },
        },
      },
    },
  });
}
