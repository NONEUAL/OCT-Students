import { TrendingUp, BookOpen, CreditCard, Clock, BarChart2, Megaphone, ArrowRight } from "lucide-react";
import { COLORS, SCHEDULE, GRADES, ANNOUNCEMENTS } from "../constants/data.js";
import { getIcon } from "../constants/icons.js";
import StatCard from "../components/StatCard.jsx";
import "../styles/dashboard.css";

export default function DashboardView({ onNavigate }) {
  const totalUnits = GRADES.reduce((sum, g) => sum + g.units, 0);
  const weightedSum = GRADES.reduce((sum, g) => {
    const avg = (g.prelim + g.midterm) / 2;
    return sum + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  return (
    <div>
      {/* Banner */}
      <div className="dashboard__banner">
        <div className="dashboard__banner-orb-1" />
        <div className="dashboard__banner-orb-2" />
        <div className="dashboard__banner-content">
          <div className="dashboard__banner-eyebrow">Welcome back</div>
          <h2 className="dashboard__banner-title">Good morning, Maria!</h2>
          <p className="dashboard__banner-sub">
            2nd Semester A.Y. 2025–2026 · BSIT 212-A · {totalUnits} units enrolled
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

      {/* Stats */}
      <div className="dashboard__stats">
        <StatCard Icon={TrendingUp} label="Current GWA"    value={gwa}          sub="2nd Semester"      accent={COLORS.g800} />
        <StatCard Icon={BookOpen}   label="Enrolled Units" value={totalUnits}   sub={`${GRADES.length} Subjects`} accent={COLORS.gold} />
        <StatCard Icon={CreditCard} label="Balance Due"    value="₱4,200"       sub="Due Mar 15"        accent={COLORS.g700} />
      </div>

      <div className="dashboard__grid">
        {/* Today's schedule */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="section-card-header">
            <Clock size={15} color={COLORS.g800} strokeWidth={2} />
            <span className="section-card-title">Today's Classes</span>
          </div>
          {SCHEDULE.slice(0, 4).map((s, i) => {
            const SubjectIcon = getIcon(s.icon);
            return (
              <div key={i} className="schedule-preview__item">
                <div className="schedule-preview__bar" style={{ background: s.color }} />
                <div style={{ flex: 1 }}>
                  <div className="schedule-preview__subject">{s.subject}</div>
                  <div className="schedule-preview__meta">{s.room} · {s.prof}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span className="schedule-preview__time">{s.time}</span>
                  <span className="schedule-preview__day">{s.day}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Announcements */}
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="section-card-header">
            <Megaphone size={15} color={COLORS.g800} strokeWidth={2} />
            <span className="section-card-title">Announcements</span>
          </div>
          {ANNOUNCEMENTS.map((a, i) => (
            <div key={i} className="announcement__item">
              <div className="announcement__row">
                <span className="announcement__tag">{a.tag}</span>
                <div>
                  <div className="announcement__title">{a.title}</div>
                  <div className="announcement__date">{a.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grades overview */}
      <div className="card" style={{ padding: "18px 20px" }}>
        <div className="section-card-header">
          <BarChart2 size={15} color={COLORS.g800} strokeWidth={2} />
          <span className="section-card-title">Grades Overview</span>
        </div>
        <div className="grades-overview__grid">
          {GRADES.map((g, i) => {
            const avg = Math.round((g.prelim + g.midterm) / 2);
            const col = avg >= 90 ? COLORS.g800 : avg >= 85 ? COLORS.g700 : COLORS.gold;
            return (
              <div key={i} className="grade-pill" style={{ border: `1px solid ${col}22` }}>
                <div className="grade-pill__value" style={{ color: col }}>{avg}</div>
                <div className="grade-pill__code">{g.code}</div>
                <div className="grade-pill__subject">{g.subject}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
