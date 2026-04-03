import { Box } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";

export default function Overview() {
  return (
    <Box>
      {/* Tab row */}
      <PageTabs />

      {/* 3 summary cards with sparklines */}
      <SummaryCards />
    </Box>
  );
}
