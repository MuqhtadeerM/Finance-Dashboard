import { createContext, useContext, useState, useMemo } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

// Step 1 — Create the context (empty box)
const AppContext = createContext(null);

export const ROLES = {
  ADMIN: "admin",
  VIEWER: "viewer",
};

// Step 2 — Create the Provider (fills the box with data)
export function AppProvider({ children }) {
  // ── All our state lives here ──
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState(ROLES.VIEWER);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  // ── Derived state: filtered list (recalculates only when deps change) ──
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    if (filters.type !== "all")
      result = result.filter((t) => t.type === filters.type);
    if (filters.category !== "all")
      result = result.filter((t) => t.category === filters.category);
    if (filters.month !== "all")
      result = result.filter((t) => t.date.startsWith(filters.month));

    result.sort((a, b) => {
      const valA = filters.sortBy === "date" ? new Date(a.date) : a.amount;
      const valB = filters.sortBy === "date" ? new Date(b.date) : b.amount;
      return filters.sortOrder === "asc" ? valA - valB : valB - valA;
    });

    return result;
  }, [transactions, filters]);

  // ── Derived state: summary numbers ──
  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  // ── Actions (only admin can call these) ──
  const addTransaction = (tx) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  const deleteTransaction = (id) => {
    if (role !== ROLES.ADMIN) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({
      search: "",
      type: "all",
      category: "all",
      month: "all",
      sortBy: "date",
      sortOrder: "desc",
    });

  // Step 3 — Provide everything to children
  return (
    <AppContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        role,
        darkMode,
        summary,
        setRole,
        setDarkMode,
        addTransaction,
        editTransaction,
        deleteTransaction,
        updateFilter,
        resetFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Step 4 — Custom hook so any component can consume context easily
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
