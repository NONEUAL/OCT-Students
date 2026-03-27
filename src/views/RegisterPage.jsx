import { useState } from "react";
import { User, Lock, Eye, EyeOff, Mail, BookOpen, ShieldCheck } from "lucide-react";
import "../styles/auth.css";

const COURSES = ["BSIT", "BSBA", "BSA", "BSCrim", "BSN", "BSHM", "SHS"];
const YEARS   = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const SECTIONS = ["A", "B", "C", "D"];

export default function RegisterPage({ onGoLogin, onRegister }) {
  const [form, setForm] = useState({
    fullName: "", studentId: "", email: "",
    course: "", year: "", section: "",
    password: "", confirmPassword: "",
  });
  const [showPw,    setShowPw]    = useState(false);
  const [showCPw,   setShowCPw]   = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  const update = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError(""); };

  const validate = () => {
    const { fullName, studentId, email, course, year, section, password, confirmPassword } = form;
    if (!fullName || !studentId || !email || !course || !year || !section || !password || !confirmPassword)
      return "Please fill in all fields.";
    if (!/^\d{4}-\d{5}$/.test(studentId))
      return "Student ID must be in format: 2024-00142";
    if (password.length < 6)
      return "Password must be at least 6 characters.";
    if (password !== confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 700));

    const users = JSON.parse(localStorage.getItem("oct_users") || "[]");
    if (users.find(u => u.studentId === form.studentId)) {
      setError("A student with this ID already exists."); setLoading(false); return;
    }

    const newUser = {
      fullName:  form.fullName,
      studentId: form.studentId,
      email:     form.email,
      course:    form.course,
      year:      form.year,
      section:   form.section,
      password:  form.password,
    };

    users.push(newUser);
    localStorage.setItem("oct_users", JSON.stringify(users));
    localStorage.setItem("oct_session", JSON.stringify(newUser));
    onRegister(newUser);
    setLoading(false);
  };

  const Field = ({ label, name, type = "text", placeholder, icon: Icon, noIcon }) => (
    <div className="auth-field">
      <label className="auth-field__label">{label}</label>
      <div className="auth-field__wrap">
        {!noIcon && <span className="auth-field__icon"><Icon size={15} /></span>}
        <input
          className="auth-field__input"
          style={noIcon ? { paddingLeft: 12 } : {}}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={e => update(name, e.target.value)}
        />
      </div>
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div className="auth-field">
      <label className="auth-field__label">{label}</label>
      <div className="auth-field__wrap">
        <select
          className="auth-field__input"
          style={{ paddingLeft: 12, appearance: "auto" }}
          value={form[name]}
          onChange={e => update(name, e.target.value)}
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );

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
          Create your account to get access to your grades, schedule, and everything you need for your academic journey.
        </p>
        <div className="auth-panel__motto">Mind · Body · Soul</div>
      </div>

      {/* Right panel */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-card__title">Create your account</div>
          <div className="auth-form-card__sub">Fill in your details to get started.</div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Personal */}
            <Field label="Full Name" name="fullName" icon={User} placeholder="Last Name, First Name Middle Name" />
            <div className="auth-field__row">
              <Field label="Student ID" name="studentId" icon={ShieldCheck} placeholder="2024-00142" />
              <Field label="Email Address" name="email" type="email" icon={Mail} placeholder="you@email.com" />
            </div>

            <div className="auth-divider" />

            {/* Academic */}
            <div className="auth-field__row">
              <Select label="Course"  name="course"  options={COURSES} />
              <Select label="Year Level" name="year" options={YEARS} />
            </div>
            <div className="auth-field__row">
              <Select label="Section" name="section" options={SECTIONS} />
              <div /> {/* spacer */}
            </div>

            <div className="auth-divider" />

            {/* Password */}
            <div className="auth-field">
              <label className="auth-field__label">Password</label>
              <div className="auth-field__wrap">
                <span className="auth-field__icon"><Lock size={15} /></span>
                <input
                  className="auth-field__input"
                  type={showPw ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={e => update("password", e.target.value)}
                />
                <button type="button" className="auth-field__eye" onClick={() => setShowPw(s => !s)}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-field__label">Confirm Password</label>
              <div className="auth-field__wrap">
                <span className="auth-field__icon"><Lock size={15} /></span>
                <input
                  className="auth-field__input"
                  type={showCPw ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={e => update("confirmPassword", e.target.value)}
                />
                <button type="button" className="auth-field__eye" onClick={() => setShowCPw(s => !s)}>
                  {showCPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-divider" />
          <div className="auth-switch">
            Already have an account?{" "}
            <button onClick={onGoLogin}>Sign in here</button>
          </div>
        </div>
      </div>
    </div>
  );
}
