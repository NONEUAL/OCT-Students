# OCT Student Portal

Olivarez College Tagaytay — Student Portal built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## If you see a MIME type error on localhost

This is caused by a **stale Service Worker** from a previous project cached in your browser. Fix it in one of these ways:

### Option A — DevTools (fastest)
1. Open Chrome DevTools → **Application** tab
2. Click **Service Workers** in the left panel
3. Click **Unregister** on any listed service worker
4. Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Option B — Clear site data
1. DevTools → **Application** → **Storage**
2. Click **Clear site data**
3. Refresh

### Option C — Incognito window
Open http://localhost:5173 in an incognito/private window — service workers don't run there.

---

## Project Structure

```
src/
├── main.jsx                        # Entry point
├── App.jsx                         # Root component + routing
├── constants/
│   ├── data.js                     # All mock data (plain JS, no React)
│   └── icons.js                    # Lucide icon registry (getIcon helper)
├── components/
│   ├── Navbar.jsx                  # Top navigation bar
│   ├── Sidebar.jsx                 # Left sidebar navigation
│   ├── PageHeader.jsx              # Reusable page title + icon header
│   └── StatCard.jsx                # Dashboard stat card
├── views/
│   ├── DashboardView.jsx
│   ├── MyClassView.jsx
│   ├── ScheduleView.jsx
│   ├── GradesView.jsx
│   ├── PaymentsView.jsx
│   └── PlaceholderView.jsx
└── styles/
    ├── global.css                  # Resets, shared classes, animations
    ├── navbar.css
    ├── sidebar.css
    ├── pageheader.css
    ├── dashboard.css
    ├── myclass.css
    ├── schedule.css
    ├── grades.css
    └── payments.css
```
