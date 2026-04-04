// import { Box } from "@mui/material";
// import PageTabs from "../components/shared/PageTabs";
// import SummaryCards from "../components/overview/SummaryCards";
// import SpendingChart from "../components/overview/SpendingChart";
// import TransactionHistory from "../components/overview/TransactionHistory";
// import YourCards from "../components/overview/YourCards";

// export default function Overview() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 2.5,
//         // Make sure content fills full height
//         minHeight: "100%",
//         width: "100%",
//       }}
//     >
//       {/* Tab row */}
//       <PageTabs />

//       {/* 3 summary cards — full width, equal columns */}
//       <SummaryCards />

//       {/* Spending + Transaction — full width row */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
//           gap: 2.5,
//           width: "100%",
//         }}
//       >
//         <SpendingChart />
//         <TransactionHistory />
//       </Box>

//       {/* Cards section — full width */}
//       <YourCards />
//     </Box>
//   );
// }

import { Box, Typography } from "@mui/material";
import PageTabs from "../components/shared/PageTabs";
import SummaryCards from "../components/overview/SummaryCards";
import SpendingChart from "../components/overview/SpendingChart";
import TransactionHistory from "../components/overview/TransactionHistory";
import YourCards from "../components/overview/YourCards";

export default function Overview() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2.5, width: "100%" }}
    >
      {/* Test 1 — if you see tabs, PageTabs works */}
      <PageTabs />

      {/* Test 2 — if you see cards, SummaryCards works */}
      <SummaryCards />

      {/* Test 3 — if blank starts here, SpendingChart is the problem */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
          gap: 2.5,
        }}
      >
        <SpendingChart />
        <TransactionHistory />
      </Box>

      {/* Test 4 */}
      <YourCards />
    </Box>
  );
}
