import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function LoginPage({ onLogin, onGoRegister }) {
  const [form,    setForm]    = useState({ studentId: "", password: "" });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.password) {
      setError("Please fill in all fields."); return;
    }
    setLoading(true);

    await new Promise(r => setTimeout(r, 600));
    const users = JSON.parse(localStorage.getItem("oct_users") || "[]");
    const found = users.find(
      u => u.studentId.toLowerCase() === form.studentId.trim().toLowerCase()
        && u.password === form.password
    );

    if (found) {
      localStorage.setItem("oct_session", JSON.stringify(found));
      onLogin(found);
    } else {
      setError("Invalid Student ID or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-shell">
      {/* Left panel */}
      <div className="auth-panel">
        <div className="auth-panel__orb-1" />
        <div className="auth-panel__orb-2" />
        <img src="/OCT_logo.png" alt="OCT Logo" className="auth-panel__logo" />
        <div className="auth-panel__school">Olivarez College Tagaytay</div>
        <div className="auth-panel__sub">Student Portal</div>
        <p className="auth-panel__tagline">
          Access your grades, class schedule, and academic information — all in one place.
        </p>
        <div className="auth-panel__motto">Mind · Body · Soul</div>
      </div>

      {/* Right panel */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-card__title">Welcome back!</div>
          <div className="auth-form-card__sub">Sign in to your student account to continue.</div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-field__label">Student ID</label>
              <div className="auth-field__wrap">
                <span className="auth-field__icon"><User size={15} /></span>
                <input
                  className={`auth-field__input${error ? " auth-field__input--error" : ""}`}
                  type="text"
                  placeholder="Your Student ID"
                  value={form.studentId}
                  onChange={e => update("studentId", e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-field__label">Password</label>
              <div className="auth-field__wrap">
                <span className="auth-field__icon"><Lock size={15} /></span>
                <input
                  className={`auth-field__input${error ? " auth-field__input--error" : ""}`}
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => update("password", e.target.value)}
                />
                <button type="button" className="auth-field__eye" onClick={() => setShowPw(s => !s)}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="auth-divider" />
          <div className="auth-switch">
            Don't have an account?{" "}
            <button onClick={onGoRegister}>Create one here</button>
          </div>
        </div>
      </div>
    </div>
  );
}