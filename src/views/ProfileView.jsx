import { useState } from "react";
import { UserCircle, LogOut, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";

const css = {
  layout:   { display: "grid", gridTemplateColumns: "260px 1fr", gap: 18 },
  card:     { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(13,42,13,0.06)" },
  avatar:   {
    width: 88, height: 88, borderRadius: "50%", margin: "0 auto 14px",
    background: "linear-gradient(135deg,#c8a825,#e8c040)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 700, color: "#0a1f0a",
    border: "4px solid #c8e6c9",
  },
  name:      { fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#0d1f0d", textAlign: "center" },
  role:      { fontSize: 12, color: "#3a5c3a", textAlign: "center", marginTop: 3 },
  badge:     { display: "inline-block", marginTop: 10, fontSize: 10, fontWeight: 700, color: "#2d6a35", background: "#e8f5e9", padding: "4px 12px", borderRadius: 8, letterSpacing: "0.5px" },
  secTitle:  { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#1a3a1a", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid #c8e6c9" },
  fieldLabel:{ fontSize: 10.5, fontWeight: 600, color: "#7aaa80", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5, display: "block" },
  fieldVal:  { width: "100%", padding: "9px 13px", border: "1.5px solid #c8e6c9", borderRadius: 9, fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#0d1f0d", background: "#f4fbf5" },
  fieldWrap: { marginBottom: 14 },
  fieldRow:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  pwInput:   { width: "100%", padding: "9px 42px 9px 13px", border: "1.5px solid #c8e6c9", borderRadius: 9, fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#0d1f0d", background: "#fff", outline: "none" },
  pwWrap:    { position: "relative", display: "flex", alignItems: "center" },
  pwEye:     { position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", color: "#7aaa80", display: "flex", alignItems: "center" },
  saveRow:   { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 6 },
  savedMsg:  { fontSize: 11.5, color: "#2d6a35", fontWeight: 600 },
};

const btn = (variant) => ({
  cursor: "pointer", borderRadius: 9, fontSize: 12, fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans',sans-serif", padding: "9px 18px",
  display: "inline-flex", alignItems: "center", gap: 6,
  background: variant === "danger" ? "#fdecea" : "linear-gradient(100deg,#1a3a1a,#2d6a35)",
  color: variant === "danger" ? "#c62828" : "#fff",
  border: variant === "danger" ? "1.5px solid #f5c6c6" : "none",
  transition: "opacity 0.15s",
});

export default function ProfileView({ user, onLogout }) {
  const initials = user?.fullName
    ? user.fullName.split(",")[0].trim().slice(0, 2).toUpperCase()
    : "ST";

  const [pw, setPw]         = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const togglePw = (k) => setShowPw(s => ({ ...s, [k]: !s[k] }));

  const handleChangePw = (e) => {
    e.preventDefault();
    setPwError("");
    if (!pw.current) { setPwError("Enter your current password."); return; }
    if (pw.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pw.newPw !== pw.confirm) { setPwError("Passwords do not match."); return; }

    // Update in localStorage
    const users = JSON.parse(localStorage.getItem("oct_users") || "[]");
    const idx = users.findIndex(u => u.studentId === user.studentId);
    if (idx === -1 || users[idx].password !== pw.current) { setPwError("Current password is incorrect."); return; }
    users[idx].password = pw.newPw;
    localStorage.setItem("oct_users", JSON.stringify(users));
    const session = JSON.parse(localStorage.getItem("oct_session") || "{}");
    session.password = pw.newPw;
    localStorage.setItem("oct_session", JSON.stringify(session));

    setPw({ current: "", newPw: "", confirm: "" });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  const PwField = ({ label, k }) => (
    <div style={css.fieldWrap}>
      <label style={css.fieldLabel}>{label}</label>
      <div style={css.pwWrap}>
        <input
          style={css.pwInput}
          type={showPw[k] ? "text" : "password"}
          placeholder="••••••••"
          value={pw[k]}
          onChange={e => { setPw(p => ({ ...p, [k]: e.target.value })); setPwError(""); setPwSaved(false); }}
        />
        <button type="button" style={css.pwEye} onClick={() => togglePw(k)}>
          {showPw[k] ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader Icon={UserCircle} title="Profile & Account" subtitle="Manage your account details and security" />

      <div style={css.layout}>
        {/* Left card */}
        <div style={css.card}>
          <div style={{ textAlign: "center" }}>
            <div style={css.avatar}>{initials}</div>
            <div style={css.name}>{user?.fullName || "Student"}</div>
            <div style={css.role}>{user?.course} — {user?.year}, Sec. {user?.section}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={css.badge}>{user?.studentId}</span>
            </div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #c8e6c9" }}>
            <div style={{ fontSize: 11, color: "#7aaa80", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</div>
            <div style={{ fontSize: 12.5, color: "#3a5c3a", wordBreak: "break-word" }}>{user?.email || "—"}</div>
          </div>

          {/* Logout */}
          <div style={{ marginTop: 28 }}>
            <button style={{ ...btn("danger"), width: "100%", justifyContent: "center" }} onClick={onLogout}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>

        {/* Right cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Personal info */}
          <div style={css.card}>
            <div style={css.secTitle}>Personal Information</div>
            <div style={css.fieldRow}>
              <div style={css.fieldWrap}>
                <label style={css.fieldLabel}>Full Name</label>
                <input style={css.fieldVal} value={user?.fullName || ""} disabled />
              </div>
              <div style={css.fieldWrap}>
                <label style={css.fieldLabel}>Student ID</label>
                <input style={css.fieldVal} value={user?.studentId || ""} disabled />
              </div>
            </div>
            <div style={css.fieldRow}>
              <div style={css.fieldWrap}>
                <label style={css.fieldLabel}>Course</label>
                <input style={css.fieldVal} value={user?.course || ""} disabled />
              </div>
              <div style={css.fieldWrap}>
                <label style={css.fieldLabel}>Year & Section</label>
                <input style={css.fieldVal} value={`${user?.year || ""} — Sec. ${user?.section || ""}`} disabled />
              </div>
            </div>
            <div style={css.fieldWrap}>
              <label style={css.fieldLabel}>Email Address</label>
              <input style={css.fieldVal} value={user?.email || ""} disabled />
            </div>
            <div style={{ fontSize: 11, color: "#7aaa80", marginTop: 4 }}>
              To update your personal information, please visit the Registrar's Office.
            </div>
          </div>

          {/* Change password */}
          <div style={css.card}>
            <div style={css.secTitle}>Change Password</div>
            {pwError && (
              <div style={{ background: "#fdecea", border: "1px solid #f5c6c6", borderRadius: 9, padding: "10px 14px", fontSize: 12.5, color: "#c62828", marginBottom: 14 }}>
                {pwError}
              </div>
            )}
            <form onSubmit={handleChangePw}>
              <PwField label="Current Password" k="current" />
              <div style={css.fieldRow}>
                <PwField label="New Password" k="newPw" />
                <PwField label="Confirm New Password" k="confirm" />
              </div>
              <div style={css.saveRow}>
                {pwSaved && <span style={css.savedMsg}>✓ Password updated</span>}
                <button type="submit" style={btn("primary")}>
                  <ShieldCheck size={13} /> Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
