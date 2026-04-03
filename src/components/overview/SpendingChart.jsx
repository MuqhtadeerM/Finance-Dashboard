// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   ButtonGroup,
//   Grid,
// } from "@mui/material";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { useApp } from "../../context/AppContext";
// import { groupByCategory, formatCurrency } from "../../utils/helpers";
// import { CATEGORY_COLORS } from "../../data/mockData";

// // ── Custom center label inside donut ──
// function DonutLabel({ viewBox, total }) {
//   const { cx, cy } = viewBox;
//   return (
//     <g>
//       <text
//         x={cx}
//         y={cy - 8}
//         textAnchor="middle"
//         fill="#6b7280"
//         fontSize="12"
//         fontWeight="500"
//       >
//         Total
//       </text>
//       <text
//         x={cx}
//         y={cy + 14}
//         textAnchor="middle"
//         fill="#ffffff"
//         fontSize="16"
//         fontWeight="800"
//       >
//         {formatCurrency(total)}
//       </text>
//     </g>
//   );
// }

// // ── Single category row ──
// function CategoryItem({ name, value, color }) {
//   return (
//     <Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
//         <Box
//           sx={{
//             width: 8,
//             height: 8,
//             borderRadius: "50%",
//             backgroundColor: color,
//             flexShrink: 0,
//           }}
//         />
//         <Typography variant="caption" sx={{ color: "#6b7280", flex: 1 }}>
//           {name}
//         </Typography>
//       </Box>
//       <Typography
//         variant="body2"
//         sx={{
//           fontWeight: 700,
//           color: "white",
//           ml: 2.2,
//           fontSize: { xs: "0.82rem", sm: "0.9rem" },
//         }}
//       >
//         {formatCurrency(value)}
//       </Typography>
//     </Box>
//   );
// }

// // ── Main component ──
// export default function SpendingChart() {
//   const { transactions } = useApp();
//   const [period, setPeriod] = useState("this");

//   // Get top 6 categories
//   const allCategories = groupByCategory(transactions);
//   const chartData = allCategories.slice(0, 6);

//   // Total spending
//   const total = chartData.reduce((sum, c) => sum + c.value, 0);

//   return (
//     <Card sx={{ height: "100%" }}>
//       <CardContent sx={{ p: 2.5 }}>
//         {/* ── Header ── */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2.5,
//             flexWrap: "wrap",
//             gap: 1,
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//             Spending Summary
//           </Typography>

//           {/* This month / Last month toggle */}
//           <ButtonGroup size="small">
//             <Button
//               variant={period === "this" ? "contained" : "outlined"}
//               onClick={() => setPeriod("this")}
//               sx={{
//                 fontSize: "0.75rem",
//                 px: 1.5,
//                 backgroundColor: period === "this" ? "#1f2028" : "transparent",
//                 borderColor: "#2d2d3a",
//                 color: period === "this" ? "white" : "#6b7280",
//                 "&:hover": {
//                   backgroundColor: "#2d2d3a",
//                   borderColor: "#2d2d3a",
//                 },
//               }}
//             >
//               • This month
//             </Button>
//             <Button
//               variant={period === "last" ? "contained" : "outlined"}
//               onClick={() => setPeriod("last")}
//               sx={{
//                 fontSize: "0.75rem",
//                 px: 1.5,
//                 backgroundColor: period === "last" ? "#1f2028" : "transparent",
//                 borderColor: "#2d2d3a",
//                 color: period === "last" ? "white" : "#6b7280",
//                 "&:hover": {
//                   backgroundColor: "#2d2d3a",
//                   borderColor: "#2d2d3a",
//                 },
//               }}
//             >
//               Last month
//             </Button>
//           </ButtonGroup>
//         </Box>

//         {/* ── Donut + Categories side by side ── */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             alignItems: "center",
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           {/* Donut chart */}
//           <Box
//             sx={{ width: { xs: "100%", sm: 200 }, height: 180, flexShrink: 0 }}
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={55}
//                   outerRadius={80}
//                   dataKey="value"
//                   strokeWidth={0}
//                   labelLine={false}
//                   label={<DonutLabel total={total} />}
//                 >
//                   {chartData.map((entry) => (
//                     <Cell
//                       key={entry.name}
//                       fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(val) => formatCurrency(val)}
//                   contentStyle={{
//                     backgroundColor: "#1f2028",
//                     border: "1px solid #2d2d3a",
//                     borderRadius: "10px",
//                     fontSize: "12px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>

//           {/* Category grid */}
//           <Grid container spacing={1.5} sx={{ flex: 1 }}>
//             {chartData.map((cat) => (
//               <Grid item xs={6} key={cat.name}>
//                 <CategoryItem
//                   name={cat.name}
//                   value={cat.value}
//                   color={CATEGORY_COLORS[cat.name] || "#6b7280"}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
