import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  AddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";
import { useApp, ROLES } from "../context/AppContext";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";
import { formatCurrency, formatDate, getUniqueMonths } from "../utils/helpers";
import TransactionModal from "../components/transactions/TransactionModal";
import EmptyState from "../components/shared/EmptyState";

export default function TransactionsPage() {
  const {
    filteredTransactions,
    filters,
    updateFilter,
    resetFilters,
    role,
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useApp();

  const [modal, setModal] = useState(null); // null | "add" | { editing: tx }
  const isAdmin = role === ROLES.ADMIN;
  const months = getUniqueMonths(transactions);

  // ── Sort toggle ──
  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      updateFilter("sortBy", field);
      updateFilter("sortOrder", "desc");
    }
  };

  // ── Sort icon ──
  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return null;
    return filters.sortOrder === "asc" ? (
      <ArrowUpwardOutlined sx={{ fontSize: 13, ml: 0.5 }} />
    ) : (
      <ArrowDownwardOutlined sx={{ fontSize: 13, ml: 0.5 }} />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* ── Page header ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.4rem", sm: "1.8rem" } }}
          >
            Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {filteredTransactions.length} records found
          </Typography>
        </Box>

        {/* Add button — Admin only */}
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => setModal("add")}
            sx={{
              backgroundColor: "#e91e8c",
              "&:hover": { backgroundColor: "#c2185b" },
              borderRadius: "10px",
            }}
          >
            Add Transaction
          </Button>
        )}
      </Box>

      {/* ── Filters ── */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "2fr 1fr 1fr 1fr auto",
              },
              alignItems: "center",
            }}
          >
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined sx={{ color: "#6b7280", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={filterFieldStyle}
            />

            {/* Type filter */}
            <TextField
              select
              size="small"
              label="Type"
              value={filters.type}
              onChange={(e) => updateFilter("type", e.target.value)}
              sx={filterFieldStyle}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>

            {/* Category filter */}
            <TextField
              select
              size="small"
              label="Category"
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              sx={filterFieldStyle}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            {/* Month filter */}
            <TextField
              select
              size="small"
              label="Month"
              value={filters.month}
              onChange={(e) => updateFilter("month", e.target.value)}
              sx={filterFieldStyle}
            >
              <MenuItem value="all">All Months</MenuItem>
              {months.map((m) => (
                <MenuItem key={m.key} value={m.key}>
                  {m.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Reset */}
            <Button
              size="small"
              onClick={resetFilters}
              sx={{
                color: "#6b7280",
                border: "1px solid #2d2d3a",
                whiteSpace: "nowrap",
                "&:hover": { backgroundColor: "#1f2028", color: "white" },
              }}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ── Table ── */}
      <Card>
        {filteredTransactions.length === 0 ? (
          <EmptyState message="No transactions match your filters" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ "& th": { borderColor: "#1f2028" } }}>
                  {/* Sortable Date column */}
                  <TableCell
                    onClick={() => toggleSort("date")}
                    sx={{
                      ...headerCell,
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                      userSelect: "none",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Date <SortIcon field="date" />
                    </Box>
                  </TableCell>

                  <TableCell sx={headerCell}>Description</TableCell>
                  <TableCell sx={headerCell}>Category</TableCell>
                  <TableCell sx={headerCell}>Type</TableCell>

                  {/* Sortable Amount column */}
                  <TableCell
                    align="right"
                    onClick={() => toggleSort("amount")}
                    sx={{
                      ...headerCell,
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                      userSelect: "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      Amount <SortIcon field="amount" />
                    </Box>
                  </TableCell>

                  {/* Actions column — Admin only */}
                  {isAdmin && <TableCell sx={headerCell} />}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTransactions.map((tx) => {
                  const catColor = CATEGORY_COLORS[tx.category] || "#6b7280";
                  return (
                    <TableRow
                      key={tx.id}
                      sx={{
                        "& td": { borderColor: "#1f2028" },
                        "&:hover": { backgroundColor: "#1f202888" },
                        "&:last-child td": { border: 0 },
                        transition: "background 0.15s",
                      }}
                    >
                      {/* Date */}
                      <TableCell
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.8rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDate(tx.date)}
                      </TableCell>

                      {/* Description */}
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                        }}
                      >
                        {tx.description}
                      </TableCell>

                      {/* Category badge */}
                      <TableCell>
                        <Chip
                          label={tx.category}
                          size="small"
                          sx={{
                            backgroundColor: catColor + "22",
                            color: catColor,
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 22,
                          }}
                        />
                      </TableCell>

                      {/* Type badge */}
                      <TableCell>
                        <Chip
                          label={
                            tx.type === "income" ? "↑ Income" : "↓ Expense"
                          }
                          size="small"
                          sx={{
                            backgroundColor:
                              tx.type === "income" ? "#00d4aa18" : "#ff475718",
                            color: tx.type === "income" ? "#00d4aa" : "#ff4757",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: 22,
                          }}
                        />
                      </TableCell>

                      {/* Amount */}
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: tx.type === "income" ? "#00d4aa" : "#ff4757",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </TableCell>

                      {/* Edit / Delete — Admin only */}
                      {isAdmin && (
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 0.5,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => setModal({ editing: tx })}
                                sx={{
                                  color: "#6b7280",
                                  "&:hover": {
                                    color: "#6366f1",
                                    backgroundColor: "#6366f118",
                                  },
                                }}
                              >
                                <EditOutlined sx={{ fontSize: 15 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  if (
                                    window.confirm("Delete this transaction?")
                                  )
                                    deleteTransaction(tx.id);
                                }}
                                sx={{
                                  color: "#6b7280",
                                  "&:hover": {
                                    color: "#ff4757",
                                    backgroundColor: "#ff475718",
                                  },
                                }}
                              >
                                <DeleteOutlined sx={{ fontSize: 15 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* ── Modals ── */}
      <TransactionModal
        open={modal === "add"}
        onClose={() => setModal(null)}
        onSave={addTransaction}
      />
      <TransactionModal
        open={Boolean(modal?.editing)}
        onClose={() => setModal(null)}
        onSave={(updated) => editTransaction(modal.editing.id, updated)}
        initial={modal?.editing}
      />
    </Box>
  );
}

// ── Shared styles ──
const headerCell = {
  color: "#6b7280",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  backgroundColor: "#0a0a0f",
};

const filterFieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0a0a0f",
    borderRadius: "10px",
    fontSize: "0.85rem",
    "& fieldset": { borderColor: "#2d2d3a" },
    "&:hover fieldset": { borderColor: "#6b7280" },
    "&.Mui-focused fieldset": { borderColor: "#e91e8c" },
  },
  "& .MuiInputLabel-root": { color: "#6b7280", fontSize: "0.85rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiSelect-icon": { color: "#6b7280" },
  "& .MuiMenuItem-root": { fontSize: "0.85rem" },
};
