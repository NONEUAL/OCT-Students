import { useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

// ── Dummy accounts seeded on first load ──────────────────────────────────────
const DUMMY_ACCOUNTS = [
  {
    fullName:  "VELASQUEZ, GABRIEL",
    studentId: "211C-5169",
    email:     "gabriel.velasquez@oct.edu.ph",
    course:    "BSIT",
    year:      "2nd Year",
    section:   "A",
    password:  "gabriel123",
  },
  {
    fullName:  "DELA CRUZ, MARIA SANTOS",
    studentId: "211C-5201",
    email:     "maria.delacruz@oct.edu.ph",
    course:    "BSIT",
    year:      "2nd Year",
    section:   "A",
    password:  "maria123",
  },
  {
    fullName:  "REYES, JOHN CARLO",
    studentId: "211C-5088",
    email:     "johncarlo.reyes@oct.edu.ph",
    course:    "BSIT",
    year:      "2nd Year",
    section:   "B",
    password:  "john123",
  },
];

function seedDummyAccounts() {
  const existing = JSON.parse(localStorage.getItem("oct_users") || "[]");
  const merged = [...existing];
  for (const dummy of DUMMY_ACCOUNTS) {
    const alreadyExists = merged.some(
      u => u.studentId.toLowerCase() === dummy.studentId.toLowerCase()
    );
    if (!alreadyExists) merged.push(dummy);
  }
  localStorage.setItem("oct_users", JSON.stringify(merged));
}

export default function LoginPage({ onLogin }) {
  const [form,    setForm]    = useState({ studentId: "", password: "" });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  // Seed dummy accounts once on mount
  useEffect(() => { seedDummyAccounts(); }, []);

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

  const quickLogin = (acc) => {
    setForm({ studentId: acc.studentId, password: acc.password });
    setError("");
  };

  return (
    <div className="auth-shell">
      {/* ── Left panel ── */}
      <div className="auth-panel">
        <div className="auth-panel__orb-1" />
        <div className="auth-panel__orb-2" />
        <img src="/OCT_logo.png" alt="OCT Logo" className="auth-panel__logo" />
        <div className="auth-panel__school">Olivarez College Tagaytay</div>
        <div className="auth-panel__sub">Student Portal</div>
        <div className="auth-panel__motto">Mind · Body · Soul</div>

        {/* Demo accounts hint */}
        <div className="auth-panel__demo">
          <div className="auth-panel__demo-title">Demo Accounts</div>
          {DUMMY_ACCOUNTS.map((acc) => (
            <button
              key={acc.studentId}
              className="auth-panel__demo-btn"
              onClick={() => quickLogin(acc)}
            >
              <span className="auth-panel__demo-name">
                {acc.fullName.split(",")[0]}
              </span>
              <span className="auth-panel__demo-id">{acc.studentId}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-card__title">Welcome back!</div>
          <div className="auth-form-card__sub">
            Sign in with your student credentials to continue.
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-field__label">Student ID</label>
              <div className="auth-field__wrap">
                <span className="auth-field__icon"><User size={15} /></span>
                <input
                  className={`auth-field__input${error ? " auth-field__input--error" : ""}`}
                  type="text"
                  placeholder="e.g. 211C-5169"
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
                <button
                  type="button"
                  className="auth-field__eye"
                  onClick={() => setShowPw(s => !s)}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="auth-divider" />
          <p className="auth-footer-note">
            Don't have an account? Please contact the&nbsp;
            <strong>Registrar's Office</strong> to get your credentials.
          </p>
        </div>
      </div>
    </div>
  );
}