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
  Menu,
} from "@mui/material";
import {
  AddOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  FileDownloadOutlined,
} from "@mui/icons-material";
import { useApp, ROLES } from "../context/AppContext";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";
import { formatCurrency, formatDate, getUniqueMonths } from "../utils/helpers";
import TransactionModal from "../components/transactions/TransactionModal";
import EmptyState from "../components/shared/EmptyState";

// ============================================================
// DOWNLOAD HELPERS
// ============================================================

function downloadCSV(transactions) {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJSON(transactions) {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================
// SORT ICON — shows arrow on active sort column
// ============================================================

function SortIcon({ field, sortBy, sortOrder }) {
  if (sortBy !== field) return null;
  return sortOrder === "asc" ? (
    <ArrowUpwardOutlined sx={{ fontSize: 13, ml: 0.5 }} />
  ) : (
    <ArrowDownwardOutlined sx={{ fontSize: 13, ml: 0.5 }} />
  );
}

// ============================================================
// DOWNLOAD MENU — CSV and JSON options
// ============================================================

function DownloadMenu({ transactions }) {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlined />}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          borderColor: "#2d2d3a",
          color: "#6b7280",
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#6b7280",
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        Download
      </Button>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            backgroundColor: "#13131a",
            border: "1px solid #2d2d3a",
            borderRadius: "12px",
            mt: 0.5,
            minWidth: 180,
          },
        }}
      >
        {/* Header label */}
        <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            EXPORT AS
          </Typography>
        </Box>

        {/* CSV option */}
        <Box
          onClick={() => {
            downloadCSV(transactions);
            setAnchor(null);
          }}
          sx={{
            px: 2,
            py: 1.25,
            cursor: "pointer",
            mx: 0.5,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            "&:hover": { backgroundColor: "#1f2028" },
          }}
        >
          <Typography sx={{ fontSize: "1.1rem" }}>📄</Typography>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 600 }}
            >
              CSV File
            </Typography>
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              Open in Excel / Sheets
            </Typography>
          </Box>
        </Box>

        {/* JSON option */}
        <Box
          onClick={() => {
            downloadJSON(transactions);
            setAnchor(null);
          }}
          sx={{
            px: 2,
            py: 1.25,
            cursor: "pointer",
            mx: 0.5,
            mb: 0.5,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            "&:hover": { backgroundColor: "#1f2028" },
          }}
        >
          <Typography sx={{ fontSize: "1.1rem" }}>📦</Typography>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 600 }}
            >
              JSON File
            </Typography>
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              For developers / APIs
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

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

  const [modal, setModal] = useState(null);
  const isAdmin = role === ROLES.ADMIN;
  const months = getUniqueMonths(transactions);

  // Toggle sort field or flip direction
  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      updateFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      updateFilter("sortBy", field);
      updateFilter("sortOrder", "desc");
    }
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

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <DownloadMenu transactions={filteredTransactions} />

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
      </Box>

      {/* ── Filters bar ── */}
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

            {/* Type */}
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

            {/* Category */}
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

            {/* Month */}
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

      {/* ── Transactions table ── */}
      <Card>
        {filteredTransactions.length === 0 ? (
          <EmptyState message="No transactions match your filters" />
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  {/* Date — sortable */}
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
                      Date
                      <SortIcon
                        field="date"
                        sortBy={filters.sortBy}
                        sortOrder={filters.sortOrder}
                      />
                    </Box>
                  </TableCell>

                  <TableCell sx={headerCell}>Description</TableCell>
                  <TableCell sx={headerCell}>Category</TableCell>
                  <TableCell sx={headerCell}>Type</TableCell>

                  {/* Amount — sortable */}
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
                      Amount
                      <SortIcon
                        field="amount"
                        sortBy={filters.sortBy}
                        sortOrder={filters.sortOrder}
                      />
                    </Box>
                  </TableCell>

                  {/* Actions — Admin only */}
                  {isAdmin && (
                    <TableCell sx={headerCell} align="right">
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTransactions.map((tx) => {
                  const catColor = CATEGORY_COLORS[tx.category] || "#6b7280";
                  return (
                    <TableRow
                      key={tx.id}
                      sx={{
                        "&:hover": { backgroundColor: "#1f202855" },
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
                          color: "text.primary",
                          fontWeight: 500,
                          fontSize: "0.85rem",
                        }}
                      >
                        {tx.description}
                      </TableCell>

                      {/* Category chip */}
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

                      {/* Type chip */}
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

                      {/* Edit + Delete — Admin only */}
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

      {/* ── Add modal ── */}
      <TransactionModal
        open={modal === "add"}
        onClose={() => setModal(null)}
        onSave={addTransaction}
      />

      {/* ── Edit modal ── */}
      <TransactionModal
        open={Boolean(modal?.editing)}
        onClose={() => setModal(null)}
        onSave={(updated) => editTransaction(modal.editing.id, updated)}
        initial={modal?.editing}
      />
    </Box>
  );
}

// ============================================================
// SHARED STYLES
// ============================================================

const headerCell = {
  color: "#6b7280",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  backgroundColor: "#0a0a0f",
  borderColor: "#1f2028",
  whiteSpace: "nowrap",
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
};
