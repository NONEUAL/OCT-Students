import { useState, useEffect } from "react";
import "./styles/global.css";

import Navbar       from "./components/Navbar.jsx";
import Sidebar      from "./components/Sidebar.jsx";
import LoginPage    from "./views/LoginPage.jsx";
import RegisterPage from "./views/RegisterPage.jsx";

import DashboardView       from "./views/DashboardView.jsx";
import ScheduleView        from "./views/ScheduleView.jsx";
import GradesView          from "./views/GradesView.jsx";
import TuitionView         from "./views/TuitionView.jsx";
import DocumentRequestView from "./views/DocumentRequestView.jsx";
import ProfileView         from "./views/ProfileView.jsx";
import PlaceholderView     from "./views/PlaceholderView.jsx";

function renderView(active, user, onNavigate, onLogout) {
  switch (active) {
    case "dashboard": return <DashboardView onNavigate={onNavigate} user={user} />;
    case "schedule":  return <ScheduleView />;
    case "grades":    return <GradesView />;
    case "payments":  return <TuitionView />;
    case "documents": return <DocumentRequestView />;
    case "profile":   return <ProfileView user={user} onLogout={onLogout} />;
    default:          return <PlaceholderView label={active} />;
  }
}

export default function App() {
  const isMobile = () => window.innerWidth <= 768;

  const [user,      setUser]      = useState(null);
  const [authPage,  setAuthPage]  = useState("login");
  const [authReady, setAuthReady] = useState(false);

  const [active,  setActive]  = useState("dashboard");
  const [sidebar, setSidebar] = useState(!isMobile());

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

  if (!user) {
    return authPage === "login"
      ? <LoginPage onLogin={handleLogin} onGoRegister={() => setAuthPage("register")} />
      : <RegisterPage onRegister={handleRegister} onGoLogin={() => setAuthPage("login")} />;
  }

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