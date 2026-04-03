import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tooltip, Avatar } from "@mui/material";
import {
  HomeOutlined,
  BarChartOutlined,
  SwapHorizOutlined,
  DescriptionOutlined,
  HistoryOutlined,
  PeopleOutlined,
} from "@mui/icons-material";

// ── Nav items ──
const NAV_ITEMS = [
  { icon: <HomeOutlined />, path: "/", label: "Overview" },
  { icon: <BarChartOutlined />, path: "/insights", label: "Insights" },
  { icon: <SwapHorizOutlined />, path: "/transactions", label: "Transactions" },
  { icon: <DescriptionOutlined />, path: "/reports", label: "Reports" },
  { icon: <HistoryOutlined />, path: "/history", label: "History" },
  { icon: <PeopleOutlined />, path: "/people", label: "People" },
];

// ── Single nav icon button ──
function NavIcon({ item, isActive, onClick }) {
  return (
    <Tooltip title={item.label} placement="right">
      <Box
        onClick={onClick}
        sx={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: isActive ? "#e91e8c" : "#6b7280",
          backgroundColor: isActive ? "#e91e8c18" : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: isActive ? "#e91e8c22" : "#1f2028",
            color: isActive ? "#e91e8c" : "#ffffff",
          },
        }}
      >
        {item.icon}
      </Box>
    </Tooltip>
  );
}

// ── Main Sidebar ──
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 70,
        flexShrink: 0,
        height: "100vh",
        backgroundColor: "#13131a",
        borderRight: "1px solid #1f2028",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        gap: 1,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #e91e8c, #9c27b0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          flexShrink: 0,
        }}
      >
        <Box
          component="span"
          sx={{ color: "white", fontWeight: 900, fontSize: "1rem" }}
        >
          ₹
        </Box>
      </Box>

      {/* Nav icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          flex: 1,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavIcon
              key={item.path}
              item={item}
              isActive={isActive}
              onClick={() => navigate(item.path)}
            />
          );
        })}
      </Box>

      {/* Avatar at bottom */}
      <Tooltip title="Muqhtadeer M" placement="right">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            cursor: "pointer",
            border: "2px solid #e91e8c",
            fontSize: "0.8rem",
            background: "linear-gradient(135deg, #e91e8c, #9c27b0)",
          }}
        >
          M
        </Avatar>
      </Tooltip>
    </Box>
  );
}
