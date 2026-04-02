import { ArrowRight, BarChart2 } from "lucide-react";
import { COLORS, GRADES } from "../constants/data.js";
import "../styles/dashboard.css";

export default function DashboardView({ onNavigate, user }) {
  const totalUnits  = GRADES.reduce((s, g) => s + g.units, 0);
  const weightedSum = GRADES.reduce((s, g) => {
    const avg = (g.prelim + g.midterm + g.finals) / 3;
    return s + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  const honorLabel =
    gwa >= 90 ? "Highest Honors" :
    gwa >= 85 ? "High Honors"    :
    gwa >= 80 ? "Honors"         : "Passing";

  const firstName = user?.fullName
    ? user.fullName.split(",")[1]?.trim().split(" ")[0] ?? "Student"
    : "Student";

  return (
    <div>
      {/* Banner */}
      <div className="dashboard__banner">
        <div className="dashboard__banner-orb-1" />
        <div className="dashboard__banner-orb-2" />
        <div className="dashboard__banner-content">
          <div className="dashboard__banner-eyebrow">Welcome back</div>
          <h2 className="dashboard__banner-title">Good morning, {firstName}!</h2>
          <p className="dashboard__banner-sub">
            2nd Semester A.Y. 2025–2026 &nbsp;·&nbsp;
            {user?.course ?? "BSIT"} {user?.year ?? ""} &nbsp;·&nbsp;
            {totalUnits} units enrolled
          </p>
          <div className="dashboard__banner-actions">
            <button className="btn btn-primary" onClick={() => onNavigate("grades")}>
              View Grades <ArrowRight size={13} />
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("schedule")}>
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Two-col grid */}
      <div className="dashboard__grid">

        {/* Grades table */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="section-card-header">
            <BarChart2 size={15} color={COLORS.g800} strokeWidth={2} />
            <span className="section-card-title">Grades</span>
            <button
              className="section-card-link"
              onClick={() => onNavigate("grades")}
            >
              Full view <ArrowRight size={11} />
            </button>
          </div>

          <table className="dashboard__grades-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject</th>
                <th style={{ textAlign: "center" }}>Prelim</th>
                <th style={{ textAlign: "center" }}>Midterm</th>
                <th style={{ textAlign: "center" }}>Finals</th>
                <th style={{ textAlign: "center" }}>Avg</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((g, i) => {
                const avg    = ((g.prelim + g.midterm + g.finals) / 3).toFixed(1);
                const passed = avg >= 75;
                const avgCol =
                  avg >= 90 ? COLORS.g800 :
                  avg >= 75 ? COLORS.g700 : "#c62828";
                return (
                  <tr key={i}>
                    <td><span className="dash-grade-code">{g.code}</span></td>
                    <td style={{ fontWeight: 500, fontSize: 11.5 }}>{g.subject}</td>
                    <td style={{ textAlign: "center", color: COLORS.muted }}>{g.prelim}</td>
                    <td style={{ textAlign: "center", color: COLORS.muted }}>{g.midterm}</td>
                    <td style={{ textAlign: "center", color: COLORS.muted }}>{g.finals}</td>
                    <td style={{ textAlign: "center" }}>
                      <span className="dash-grade-avg" style={{ color: avgCol }}>{avg}</span>
                    </td>
                    <td>
                      <span className={`dash-grade-status ${passed ? "dash-grade-status--pass" : "dash-grade-status--fail"}`}>
                        {passed ? "Pass" : "Fail"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* GWA card — smaller */}
        <div className="card dashboard__gwa-card">
          <div className="dashboard__gwa-eyebrow">GWA</div>
          <div className="dashboard__gwa-num">{gwa}</div>
          <span className="dashboard__gwa-badge">{honorLabel}</span>
          <div className="dashboard__gwa-sub">
            {GRADES.length} Subjects&nbsp;·&nbsp;{totalUnits} Units
          </div>
          <button
            className="dashboard__gwa-btn"
            onClick={() => onNavigate("grades")}
          >
            Full Grades <ArrowRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}