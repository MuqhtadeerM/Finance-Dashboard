import { Box, Grid } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";
// import SpendingChart from "../components/overview/SpendingChart";
import TransactionHistory from "../components/overview/TransactionHistory";
import YourCards from "../components/overview/YourCards";

export default function Overview() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Tabs */}
      <PageTabs />

      {/* 3 summary cards */}
      <SummaryCards />

      {/* Spending chart + Transaction history */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          {/* <SpendingChart /> */}
        </Grid>
        <Grid item xs={12} md={5}>
          <TransactionHistory />
        </Grid>
      </Grid>

      {/* Credit cards */}
      <YourCards />
    </Box>
  );
}
