import { Box, Typography } from "@mui/material";
import { useState } from "react";

const TABS = [
  "Overview",
  "Analytics",
  "Transaction",
  "Reports",
  "Notifications",
];

export default function PageTabs() {
  const [active, setActive] = useState("Overview");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        mb: 3,
        overflowX: "auto", // scroll on mobile if tabs overflow
        pb: 0.5,
        // Hide scrollbar visually but keep it functional
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <Box
            key={tab}
            onClick={() => setActive(tab)}
            sx={{
              px: { xs: 1.5, sm: 2 },
              py: 0.75,
              borderRadius: "10px",
              cursor: "pointer",
              flexShrink: 0, // don't shrink tabs on mobile
              backgroundColor: isActive ? "#1f2028" : "transparent",
              border: isActive ? "1px solid #2d2d3a" : "1px solid transparent",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isActive ? "#1f2028" : "#13131a",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "white" : "#6b7280",
                fontSize: { xs: "0.78rem", sm: "0.85rem" },
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
