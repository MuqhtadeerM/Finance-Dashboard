import { Box } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";
import SpendingChart from "../components/overview/SpendingChart";
import TransactionHistory from "../components/overview/TransactionHistory";

export default function Overview() {
  return (
    <Box>
      {/* Tabs */}
      <PageTabs />

      {/* Summary cards */}
      <Box sx={{ mb: 3 }}>
        <SummaryCards />
      </Box>

      {/* Spending chart + Transaction history */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <SpendingChart />
        </Grid>
        <Grid item xs={12} md={5}>
          <TransactionHistory />
        </Grid>
      </Grid>
    </Box>
  );
}
