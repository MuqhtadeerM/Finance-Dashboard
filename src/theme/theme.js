import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: { main: "#e91e8c" },
    success: { main: "#00d4aa" },
    error: { main: "#ff4757" },
    warning: { main: "#ffa502" },

    background: {
      default: "#0a0a0f", // page background
      paper: "#13131a", // card background
    },

    text: {
      primary: "#ffffff",
      secondary: "#6b7280",
      disabled: "#374151",
    },

    divider: "#1f2028",
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
          scrollbarColor: "#1f2028 transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#1f2028",
            borderRadius: "99px",
          },
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
          backgroundColor: "#13131a",
          border: "1px solid #1f2028",
          boxShadow: "none",
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

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
});

export default theme;
