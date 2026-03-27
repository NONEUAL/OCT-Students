import { useState, useEffect } from "react";
import "./styles/global.css";

import Navbar       from "./components/Navbar.jsx";
import Sidebar      from "./components/Sidebar.jsx";
import LoginPage    from "./views/LoginPage.jsx";
import RegisterPage from "./views/RegisterPage.jsx";

import DashboardView  from "./views/DashboardView.jsx";
import ScheduleView   from "./views/ScheduleView.jsx";
import GradesView     from "./views/GradesView.jsx";
import PaymentsView   from "./views/PaymentsView.jsx";
import ProfileView    from "./views/ProfileView.jsx";
import PlaceholderView from "./views/PlaceholderView.jsx";

function renderView(active, user, onNavigate, onLogout) {
  switch (active) {
    case "dashboard": return <DashboardView onNavigate={onNavigate} />;
    case "schedule":  return <ScheduleView />;
    case "grades":    return <GradesView />;
    case "payments":  return <PaymentsView />;
    case "profile":   return <ProfileView user={user} onLogout={onLogout} />;
    default:          return <PlaceholderView label={active} />;
  }
}

export default function App() {
  const isMobile = () => window.innerWidth <= 768;

  // Auth state
  const [user,      setUser]      = useState(null);
  const [authPage,  setAuthPage]  = useState("login"); // "login" | "register"
  const [authReady, setAuthReady] = useState(false);

  // Portal state
  const [active,  setActive]  = useState("dashboard");
  const [sidebar, setSidebar] = useState(!isMobile());

  // Check existing session on mount
  useEffect(() => {
    const session = localStorage.getItem("oct_session");
    if (session) {
      try { setUser(JSON.parse(session)); } catch {}
    }
    setAuthReady(true);
  }, []);

  useEffect(() => {
    const handler = () => { if (isMobile()) setSidebar(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLogin    = (u) => { setUser(u); setActive("dashboard"); };
  const handleRegister = (u) => { setUser(u); setActive("dashboard"); };
  const handleLogout   = () => {
    localStorage.removeItem("oct_session");
    setUser(null);
    setAuthPage("login");
    setActive("dashboard");
  };

  const navigate = (id) => {
    setActive(id);
    if (isMobile()) setSidebar(false);
  };

  if (!authReady) return null;

  // Not logged in → show auth pages
  if (!user) {
    return authPage === "login"
      ? <LoginPage onLogin={handleLogin} onGoRegister={() => setAuthPage("register")} />
      : <RegisterPage onRegister={handleRegister} onGoLogin={() => setAuthPage("login")} />;
  }

  // Logged in → show portal
  return (
    <div className="app-shell">
      <Navbar onToggleSidebar={() => setSidebar(s => !s)} user={user} />
      <div className="app-body">
        <Sidebar active={active} onNavigate={navigate} isOpen={sidebar} />
        {sidebar && isMobile() && (
          <div className="sidebar-overlay" onClick={() => setSidebar(false)} />
        )}
        <main className="app-main">
          <div className="fade-in" key={active}>
            {renderView(active, user, navigate, handleLogout)}
          </div>
        </main>
      </div>
    </div>
  );
}
