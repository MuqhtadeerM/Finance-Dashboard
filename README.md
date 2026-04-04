# FinTrack — Personal Finance Dashboard

> A clean, responsive, dark-themed personal finance dashboard built with React and Material UI.

🔗 **Live Demo:** [https://finance-dashboard-YOUR-URL.vercel.app](https://finance-dashboard-eta-sage.vercel.app/)
📁 **Repo:** https://github.com/YOUR-USERNAME/finance-dashboard

---

## 📸 Preview

![Dashboard Dark](https://placehold.co/1200x600/13131a/e91e8c?text=FinTrack+Dark+Mode)
![Dashboard Light](https://placehold.co/1200x600/f1f5f9/e91e8c?text=FinTrack+Light+Mode)

---

## 🚀 Quick Start
```bash
# 1. Clone the repo
git clone https://github.com/YOUR-USERNAME/finance-dashboard.git

# 2. Go into the folder
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open → `http://localhost:5173`

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 📊 Overview | Balance, Income, Expense cards with sparkline charts |
| 🍩 Spending Summary | Donut chart with top 6 category breakdown |
| 💳 Your Cards | Credit card UI with masked numbers + network badges |
| 📋 Transactions | Sortable table — filter by search, type, category, month |
| 📥 Download | Export filtered data as CSV or JSON |
| 👤 Role Based UI | Admin can add, edit, delete — Viewer is read-only |
| 🌙 Theme Toggle | Dark and Light mode, switches instantly |
| 📈 Insights | Monthly bar chart, savings rate, category rankings |
| 📱 Responsive | Mobile drawer, tablet 2-col, desktop full sidebar layout |

---

## 👤 Role Based Access Control

| Action | Admin | Viewer |
|--------|-------|--------|
| View all data | ✅ | ✅ |
| Download CSV / JSON | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |

> Switch roles using the **Admin / Viewer** buttons in the topbar.

---

## 📁 Project Structure
```
finance-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx              # App shell — sidebar + topbar wrapper
│   │   │   ├── Sidebar.jsx             # Icon-only vertical nav
│   │   │   └── Topbar.jsx              # Greeting, search, role switcher, theme toggle
│   │   │
│   │   ├── overview/
│   │   │   ├── SummaryCard.jsx         # Single stat card with sparkline chart
│   │   │   ├── SummaryCards.jsx        # Grid of 3 summary cards (reads from context)
│   │   │   ├── SpendingChart.jsx       # Donut chart + category breakdown
│   │   │   ├── TransactionHistory.jsx  # Recent 8 transactions list
│   │   │   └── YourCards.jsx           # Credit card UI
│   │   │
│   │   ├── transactions/
│   │   │   └── TransactionModal.jsx    # Add / Edit transaction dialog
│   │   │
│   │   └── shared/
│   │       ├── PageTabs.jsx            # Overview / Analytics / Reports tab row
│   │       └── EmptyState.jsx          # Shown when no data matches filters
│   │
│   ├── context/
│   │   └── AppContext.jsx              # Global state — all data, filters, role, theme
│   │
│   ├── data/
│   │   └── mockData.js                 # 40 realistic mock transactions + category colors
│   │
│   ├── pages/
│   │   ├── Overview.jsx                # Main dashboard — assembles all overview components
│   │   ├── TransactionsPage.jsx        # Full transactions table with filters + download
│   │   └── InsightsPage.jsx            # Analytics — bar chart + stat cards + breakdown
│   │
│   ├── theme/
│   │   └── theme.js                    # MUI theme factory — getTheme(mode)
│   │
│   ├── utils/
│   │   └── helpers.js                  # formatCurrency, formatDate, groupByMonth, groupByCategory
│   │
│   ├── App.jsx                         # Root — ThemeProvider + lazy routes + Suspense
│   ├── main.jsx                        # Entry point — BrowserRouter + AppProvider
│   └── index.css                       # Global reset + Inter font + scrollbar styles
│
├── DECISIONS.md                        # Technical decisions and trade-offs
├── README.md                           # This file
├── vite.config.js                      # Vite config with code splitting
└── package.json
```

---

## 🧠 State Management

All global state lives in a single `AppContext.jsx` using React Context + `useMemo`:
```
AppContext
├── transactions[]           raw list — 40 mock entries
├── filteredTransactions[]   derived via useMemo (applies all filters + sort)
├── summary {}               derived via useMemo → { income, expenses, balance }
├── filters {}               { search, type, category, month, sortBy, sortOrder }
├── role                     "admin" | "viewer"
└── darkMode                 true | false
```

**Why Context over Redux?**
The app shares state across 3 pages. Context + `useMemo` handles this cleanly without Redux boilerplate.

**Why `useMemo`?**
`filteredTransactions` and `summary` are computed from raw data. `useMemo` skips recalculation unless transactions or filters actually change.

**Data shape** mirrors a real REST API response:
```js
{ id, date, description, category, amount, type }
```
Switching to a real API only requires changing `useState` to `useEffect + fetch` in AppContext.

---

## ⚖️ Technical Decisions & Trade-offs

| Decision | Chosen | Alternative | Reason |
|----------|--------|-------------|--------|
| UI Library | MUI v5 | Tailwind CSS | Pre-built components = faster development |
| State Management | Context API | Redux / Zustand | App is small — no need for Redux overhead |
| Charts | Recharts | Chart.js | Better React integration, composable API |
| Build Tool | Vite 8 | Create React App | 10x faster dev server, modern tooling |
| Routing | React Router v6 | TanStack Router | Industry standard, simple for this scale |
| Deployment | Vercel | Netlify | Zero config for Vite, auto-redeploy on push |

**Trade-offs accepted:**

| Trade-off | Impact |
|-----------|--------|
| Context over Redux | Won't scale cleanly beyond ~15 shared-state components |
| Mock data only | Data resets on page refresh — no persistence |
| MUI over custom CSS | Faster to build but harder to customize deeply |
| No backend | RBAC is frontend-only — not secure in production |
| Lazy loading pages | Faster initial load but slight delay on first page visit |

**What I'd change at production scale:**
- React Query for server state + caching
- Zustand for cleaner global state
- Node.js + Express + MongoDB backend
- JWT authentication for real RBAC
- Vitest + React Testing Library for unit tests
- localStorage or IndexedDB for persistence

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI library |
| Vite | 8 | Build tool and dev server |
| MUI | v5 | Component library + theming |
| Emotion | latest | CSS-in-JS (required by MUI) |
| React Router | v6 | Client-side routing |
| Recharts | latest | Sparkline, donut, bar charts |
| MUI Icons | v5 | Icon set |

---

## ⚡ Performance Optimisations

### Code Splitting
Vite splits the bundle into 4 separate chunks:
```
vendor-react.js     ~140 KB   React + React DOM + Router
vendor-mui.js       ~220 KB   MUI components + Emotion
vendor-recharts.js  ~280 KB   Chart library
index.js            ~80  KB   Your actual app code
```

### Lazy Loading
Pages load only when the user navigates to them:
```jsx
const Overview         = lazy(() => import("./pages/Overview"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const InsightsPage     = lazy(() => import("./pages/InsightsPage"));
```

### useMemo
Expensive computations like filtering and summary totals are memoized — they only recalculate when their dependencies change.

---

## 📦 Build & Deploy
```bash
npm run build      # production build → /dist
npm run preview    # test production build locally at localhost:4173
```

### Deploy to Vercel
1. Push repo to GitHub
2. Go to [vercel.com]([https://vercel.com](https://finance-dashboard-eta-sage.vercel.app/)) → Import project
3. Select your repo → click **Deploy**
4. Live in ~60 seconds ✅

Auto-redeploys on every `git push` to main.

---

## 🖥️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📱 Responsive Behaviour

| Breakpoint | Layout |
|-----------|--------|
| Mobile < 600px | Sidebar hidden, hamburger menu, cards stack full width |
| Tablet 600–900px | 2-column cards, role switcher moves to sidebar |
| Desktop > 900px | Permanent sidebar, 3-column cards, all controls in topbar |

---

## 🔮 Future Improvements

- [ ] Real backend — Node.js + Express + MongoDB
- [ ] JWT authentication + secure RBAC
- [ ] Budget goals and spending limits per category
- [ ] PDF statement export
- [ ] Unit tests with Vitest + React Testing Library
- [ ] Persistent storage with localStorage or IndexedDB
- [ ] Recurring transactions — auto-add monthly bills
- [ ] Push notifications when spending limit is reached
- [ ] Multi-currency support

---

## 📄 License

This project is built for evaluation purposes only.

---

*Built with React + MUI + Recharts · Deployed on Vercel*
