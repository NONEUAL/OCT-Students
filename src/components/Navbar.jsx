import { Bell, Search, Menu } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar({ onToggleSidebar, user }) {
  const initials = user?.fullName
    ? user.fullName.split(",")[0].trim().slice(0, 2).toUpperCase()
    : "ST";

  return (
    <header className="navbar">
      <div className="navbar__glow" />
      <button className="navbar__hamburger" onClick={onToggleSidebar}>
        <Menu size={20} />
      </button>
      <img src="/OCT_logo.png" alt="OCT Logo" className="navbar__logo" />
      <div className="navbar__brand">
        <div className="navbar__brand-name">Olivarez College Tagaytay</div>
        <div className="navbar__brand-sub">Student Portal</div>
      </div>
      <div className="navbar__spacer" />
      <div className="navbar__search">
        <Search size={13} color="rgba(255,255,255,0.45)" />
        <input placeholder="Search..." />
      </div>
      <div className="navbar__notif">
        <button className="navbar__notif-btn">
          <Bell size={16} color="rgba(255,255,255,0.7)" />
        </button>
        <div className="navbar__notif-dot" />
      </div>
      <div className="navbar__profile">
        <div className="navbar__avatar">{initials}</div>
        <div>
          <div className="navbar__profile-name">{user?.fullName || "Student"}</div>
          <div className="navbar__profile-id">{user?.studentId} · {user?.course}</div>
        </div>
      </div>
    </header>
  );
}
