import { ArrowRight, Clock } from "lucide-react";
import { COLORS, SCHEDULE, GRADES } from "../constants/data.js";
import "../styles/dashboard.css";

export default function DashboardView({ onNavigate, user }) {
  const totalUnits  = GRADES.reduce((s, g) => s + g.units, 0);
  const weightedSum = GRADES.reduce((s, g) => {
    const avg = (g.prelim + g.midterm + g.finals) / 3;
    return s + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  const firstName = user?.fullName
    ? user.fullName.split(",")[1]?.trim().split(" ")[0] ?? "Student"
    : "Student";

  const honorLabel =
    gwa >= 90 ? "Highest Honors" :
    gwa >= 85 ? "High Honors"    :
    gwa >= 80 ? "Honors"         : "Passing";

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
            <button className="btn btn-primary" onClick={() => onNavigate("schedule")}>
              View Schedule <ArrowRight size={13} />
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("grades")}>
              View Grades
            </button>
          </div>
        </div>
      </div>

      {/* Two-col grid */}
      <div className="dashboard__grid">

        {/* Class Schedule — compact list */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="section-card-header">
            <Clock size={15} color={COLORS.g800} strokeWidth={2} />
            <span className="section-card-title">Class Schedule</span>
            <button
              className="section-card-link"
              onClick={() => onNavigate("schedule")}
            >
              See all <ArrowRight size={11} />
            </button>
          </div>

          {SCHEDULE.map((s, i) => (
            <div key={i} className="sched-row">
              <div className="sched-bar" style={{ background: s.color }} />
              <div className="sched-info">
                <div className="sched-subject">{s.subject}</div>
                <div className="sched-meta">{s.room}&nbsp;·&nbsp;{s.prof}</div>
              </div>
              <div className="sched-right">
                <span className="sched-time">{s.time}</span>
                <span className="sched-day">{s.day}</span>
              </div>
            </div>
          ))}
        </div>

        {/* GWA card */}
        <div className="card dashboard__gwa-card">
          <div className="dashboard__gwa-eyebrow">General Weighted Average</div>
          <div className="dashboard__gwa-num">{gwa}</div>
          <span className="dashboard__gwa-badge">{honorLabel}</span>
          <div className="dashboard__gwa-sub">
            {GRADES.length} Subjects&nbsp;·&nbsp;{totalUnits} Units
          </div>
          <button
            className="dashboard__gwa-btn"
            onClick={() => onNavigate("grades")}
          >
            View Full Grades <ArrowRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}