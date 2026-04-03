import { Box, Typography } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";

export default function EmptyState({ message = "No data found" }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        gap: 1.5,
      }}
    >
      <InboxOutlined sx={{ fontSize: 48, color: "#2d2d3a" }} />
      <Typography variant="body2" sx={{ color: "#6b7280" }}>
        {message}
      </Typography>
    </Box>
  );
}
