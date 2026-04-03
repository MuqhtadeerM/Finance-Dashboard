import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useApp } from "./context/AppContext";
import Layout from "./components/layout/Layout";

// ── Pages (empty for now, we'll fill them next steps) ──
import Overview from "./pages/Overview";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

export default function App() {
  const { darkMode } = useApp();

  // useMemo = only rebuild theme when darkMode changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",

          primary: {
            main: "#6366f1", // indigo — our brand color
            light: "#818cf8",
            dark: "#4f46e5",
          },
          success: {
            main: "#22c55e", // green — income
          },
          error: {
            main: "#ef4444", // red — expenses
          },
          background: {
            default: darkMode ? "#0f172a" : "#f8fafc",
            paper: darkMode ? "#1e293b" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#f1f5f9" : "#0f172a",
            secondary: darkMode ? "#94a3b8" : "#64748b",
          },
        },

        typography: {
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          h4: { fontWeight: 800, letterSpacing: "-0.02em" },
          h5: { fontWeight: 700, letterSpacing: "-0.02em" },
          h6: { fontWeight: 700 },
        },

        shape: {
          borderRadius: 12, // rounded corners everywhere
        },

        components: {
          // Make ALL MUI Paper components slightly rounded
          MuiPaper: {
            styleOverrides: {
              root: { backgroundImage: "none" },
            },
          },
          // Make ALL MUI Cards have a border
          MuiCard: {
            styleOverrides: {
              root: {
                border: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
                boxShadow: "none",
              },
            },
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline = MUI's version of CSS reset */}
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
