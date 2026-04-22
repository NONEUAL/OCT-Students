import { useState } from "react";
import { UserCircle, LogOut, ShieldCheck, Eye, EyeOff } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/profile.css";

export default function ProfileView({ user, onLogout }) {
  const initials = user?.fullName
    ? user.fullName.split(",")[0].trim().slice(0, 2).toUpperCase()
    : "ST";

  const [pw, setPw]           = useState({ current: "", newPw: "", confirm: "" });
  const [showPw, setShowPw]   = useState({ current: false, newPw: false, confirm: false });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const togglePw = (k) => setShowPw(s => ({ ...s, [k]: !s[k] }));
  const updatePw = (k, v) => { setPw(p => ({ ...p, [k]: v })); setPwError(""); setPwSaved(false); };

  const handleChangePw = (e) => {
    e.preventDefault();
    setPwError("");
    if (!pw.current)            { setPwError("Enter your current password."); return; }
    if (pw.newPw.length < 6)    { setPwError("New password must be at least 6 characters."); return; }
    if (pw.newPw !== pw.confirm) { setPwError("Passwords do not match."); return; }

    const users = JSON.parse(localStorage.getItem("oct_users") || "[]");
    const idx = users.findIndex(u => u.studentId === user.studentId);
    if (idx === -1 || users[idx].password !== pw.current) {
      setPwError("Current password is incorrect."); return;
    }
    users[idx].password = pw.newPw;
    localStorage.setItem("oct_users", JSON.stringify(users));
    const session = JSON.parse(localStorage.getItem("oct_session") || "{}");
    session.password = pw.newPw;
    localStorage.setItem("oct_session", JSON.stringify(session));

    setPw({ current: "", newPw: "", confirm: "" });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <div>
      <PageHeader
        Icon={UserCircle}
        title="Profile & Account"
        subtitle="Manage your account details and security"
      />

      <div className="profile__layout">

        {/* Left card */}
        <div className="profile__left-card">
          <div style={{ textAlign: "center" }}>
            <div className="profile__avatar">{initials}</div>
            <div className="profile__name">{user?.fullName || "Student"}</div>
            <div className="profile__role">{user?.course} — {user?.year}, Sec. {user?.section}</div>
            <div className="profile__badge-wrap">
              <span className="profile__badge">{user?.studentId}</span>
            </div>
          </div>

          <div className="profile__email-section">
            <div className="profile__email-label">Email</div>
            <div className="profile__email-value">{user?.email || "—"}</div>
          </div>

          <div className="profile__logout-wrap">
            <button className="profile__logout-btn" onClick={onLogout}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>

        {/* Right cards */}
        <div className="profile__right-col">

          {/* Personal info */}
          <div className="profile__card">
            <div className="profile__sec-title">Personal Information</div>
            <div className="profile__field-row">
              <div className="profile__field-wrap">
                <label className="profile__field-label">Full Name</label>
                <input className="profile__field-val" value={user?.fullName || ""} disabled />
              </div>
              <div className="profile__field-wrap">
                <label className="profile__field-label">Student ID</label>
                <input className="profile__field-val" value={user?.studentId || ""} disabled />
              </div>
            </div>
            <div className="profile__field-row">
              <div className="profile__field-wrap">
                <label className="profile__field-label">Course</label>
                <input className="profile__field-val" value={user?.course || ""} disabled />
              </div>
              <div className="profile__field-wrap">
                <label className="profile__field-label">Year & Section</label>
                <input className="profile__field-val" value={`${user?.year || ""} — Sec. ${user?.section || ""}`} disabled />
              </div>
            </div>
            <div className="profile__field-wrap">
              <label className="profile__field-label">Email Address</label>
              <input className="profile__field-val" value={user?.email || ""} disabled />
            </div>
            <div className="profile__note">
              To update your personal information, please visit the Registrar's Office.
            </div>
          </div>

          {/* Change password */}
          <div className="profile__card">
            <div className="profile__sec-title">Change Password</div>
            {pwError && <div className="profile__error">{pwError}</div>}
            <form onSubmit={handleChangePw}>

              {/* Current password */}
              <div className="profile__field-wrap">
                <label className="profile__field-label">Current Password</label>
                <div className="profile__pw-wrap">
                  <input
                    className="profile__pw-input"
                    type={showPw.current ? "text" : "password"}
                    placeholder="••••••••"
                    value={pw.current}
                    onChange={e => updatePw("current", e.target.value)}
                  />
                  <button type="button" className="profile__pw-eye" onClick={() => togglePw("current")}>
                    {showPw.current ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="profile__field-row">
                {/* New password */}
                <div className="profile__field-wrap">
                  <label className="profile__field-label">New Password</label>
                  <div className="profile__pw-wrap">
                    <input
                      className="profile__pw-input"
                      type={showPw.newPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={pw.newPw}
                      onChange={e => updatePw("newPw", e.target.value)}
                    />
                    <button type="button" className="profile__pw-eye" onClick={() => togglePw("newPw")}>
                      {showPw.newPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="profile__field-wrap">
                  <label className="profile__field-label">Confirm New Password</label>
                  <div className="profile__pw-wrap">
                    <input
                      className="profile__pw-input"
                      type={showPw.confirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={pw.confirm}
                      onChange={e => updatePw("confirm", e.target.value)}
                    />
                    <button type="button" className="profile__pw-eye" onClick={() => togglePw("confirm")}>
                      {showPw.confirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="profile__save-row">
                {pwSaved && <span className="profile__saved-msg">✓ Password updated</span>}
                <button type="submit" className="profile__action-btn">
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