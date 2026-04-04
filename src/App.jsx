import { lazy, Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import { getTheme } from "./theme/theme";
import { useApp } from "./context/AppContext";
import Layout from "./components/layout/Layout";

// ── Lazy load pages — each page becomes its own chunk ──
// They only download when the user visits that route
const Overview = lazy(() => import("./pages/Overview"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));

// ── Loading spinner shown while page chunk downloads ──
function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        width: "100%",
      }}
    >
      <CircularProgress size={36} sx={{ color: "#e91e8c" }} />
    </Box>
  );
}

export default function App() {
  const { darkMode } = useApp();

  const theme = useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        {/* Suspense shows PageLoader while lazy page is downloading */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}
