<<<<<<< HEAD
import { Box } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";
=======
import { Box, Grid } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";
import SpendingChart from "../components/overview/SpendingChart";
import TransactionHistory from "../components/overview/TransactionHistory";
>>>>>>> 14f91bb86b0449f966f38638f53323830f0f8f83

export default function Overview() {
  return (
    <Box>
<<<<<<< HEAD
      {/* Tab row */}
      <PageTabs />

      {/* 3 summary cards with sparklines */}
      <SummaryCards />
=======
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
>>>>>>> 14f91bb86b0449f966f38638f53323830f0f8f83
    </Box>
  );
}
