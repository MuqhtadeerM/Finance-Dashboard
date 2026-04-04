import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { CATEGORIES } from "../../data/mockData";

const BLANK = {
  date: "",
  description: "",
  category: CATEGORIES[0],
  amount: "",
  type: "expense",
};

export default function TransactionModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || BLANK);

  // Reset form when modal opens with new data
  const handleOpen = () => setForm(initial || BLANK);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.date || !form.description || !form.amount) {
      alert("Please fill all required fields");
      return;
    }
    onSave({ ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionProps={{ onEnter: handleOpen }}
      PaperProps={{
        sx: {
          backgroundColor: "#13131a",
          border: "1px solid #1f2028",
          borderRadius: "16px",
          width: "100%",
          maxWidth: 460,
        },
      }}
    >
      {/* ── Title ── */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {initial ? "Edit Transaction" : "Add Transaction"}
        </Typography>
        <Box
          onClick={onClose}
          sx={{
            cursor: "pointer",
            color: "#6b7280",
            display: "flex",
            "&:hover": { color: "white" },
          }}
        >
          <CloseOutlined fontSize="small" />
        </Box>
      </DialogTitle>

      {/* ── Form fields ── */}
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
      >
        {/* Type toggle */}
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "#6b7280", mb: 0.75, display: "block" }}
          >
            TYPE
          </Typography>
          <ToggleButtonGroup
            value={form.type}
            exclusive
            onChange={(_, val) => val && set("type", val)}
            fullWidth
            size="small"
          >
            <ToggleButton
              value="expense"
              sx={{
                borderColor: "#2d2d3a",
                color: "#6b7280",
                "&.Mui-selected": {
                  backgroundColor: "#ff475718",
                  color: "#ff4757",
                  borderColor: "#ff4757",
                },
              }}
            >
              Expense
            </ToggleButton>
            <ToggleButton
              value="income"
              sx={{
                borderColor: "#2d2d3a",
                color: "#6b7280",
                "&.Mui-selected": {
                  backgroundColor: "#00d4aa18",
                  color: "#00d4aa",
                  borderColor: "#00d4aa",
                },
              }}
            >
              Income
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Date */}
        <TextField
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          size="small"
          sx={fieldStyle}
        />

        {/* Description */}
        <TextField
          label="Description"
          placeholder="e.g. Netflix Subscription"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          fullWidth
          size="small"
          sx={fieldStyle}
        />

        {/* Amount */}
        <TextField
          label="Amount (₹)"
          type="number"
          placeholder="0"
          value={form.amount}
          onChange={(e) => set("amount", e.target.value)}
          fullWidth
          size="small"
          sx={fieldStyle}
        />

        {/* Category */}
        <TextField
          label="Category"
          select
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          fullWidth
          size="small"
          sx={fieldStyle}
        >
          {CATEGORIES.map((c) => (
            <MenuItem
              key={c}
              value={c}
              sx={{
                fontSize: "0.85rem",
                backgroundColor: "#13131a",
                "&:hover": { backgroundColor: "#1f2028" },
              }}
            >
              {c}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      {/* ── Actions ── */}
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#6b7280",
            border: "1px solid #2d2d3a",
            "&:hover": { backgroundColor: "#1f2028" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#e91e8c",
            "&:hover": { backgroundColor: "#c2185b" },
          }}
        >
          {initial ? "Save Changes" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Shared MUI TextField dark styling
const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#0a0a0f",
    borderRadius: "10px",
    "& fieldset": { borderColor: "#2d2d3a" },
    "&:hover fieldset": { borderColor: "#6b7280" },
    "&.Mui-focused fieldset": { borderColor: "#e91e8c" },
  },
  "& .MuiInputLabel-root": { color: "#6b7280", fontSize: "0.85rem" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#e91e8c" },
  "& .MuiInputBase-input": { color: "white", fontSize: "0.85rem" },
};
