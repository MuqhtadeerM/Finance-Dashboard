import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import { useApp } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Overview from "./pages/Overview";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

export default function App() {
  const { darkMode } = useApp();

  // Rebuild theme only when darkMode changes
  const theme = useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
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
