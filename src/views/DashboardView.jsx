import {
  TrendingUp, BookOpen, Receipt, FileText,
  Clock, ArrowRight,
} from "lucide-react";
import { COLORS, SCHEDULE, GRADES, TUITION_SUMMARY, DOCUMENT_REQUESTS } from "../constants/data.js";
import { getIcon } from "../constants/icons.js";
import StatCard from "../components/StatCard.jsx";
import "../styles/dashboard.css";

export default function DashboardView({ onNavigate, user }) {
  // GWA
  const totalUnits  = GRADES.reduce((s, g) => s + g.units, 0);
  const weightedSum = GRADES.reduce((s, g) => {
    const avg = (g.prelim + g.midterm + g.finals) / 3;
    return s + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  // Balance
  const balance   = TUITION_SUMMARY.totalFee - TUITION_SUMMARY.totalPaid;
  const balanceStr = `₱${balance.toLocaleString()}`;

  // Pending document requests
  const pendingDocs = DOCUMENT_REQUESTS.filter(
    d => d.status === "Processing" || d.status === "Pending"
  ).length;

  // First name from "Last, First Middle" format
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
            2nd Semester A.Y. 2025–2026 &nbsp;·&nbsp; {user?.course ?? "BSIT"} {user?.year ?? ""} &nbsp;·&nbsp; {totalUnits} units enrolled
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

      {/* Stat cards */}
      <div className="dashboard__stats">
        <StatCard
          Icon={TrendingUp} label="Current GWA"
          value={gwa} sub="2nd Semester"
          accent={COLORS.g800}
        />
        <StatCard
          Icon={BookOpen} label="Enrolled Units"
          value={totalUnits} sub={`${GRADES.length} Subjects`}
          accent={COLORS.gold}
        />
        <StatCard
          Icon={Receipt} label="Balance Due"
          value={balanceStr} sub={`Due ${TUITION_SUMMARY.dueDate}`}
          accent={balance > 0 ? "#c62828" : COLORS.g700}
          onClick={() => onNavigate("payments")}
        />
        <StatCard
          Icon={FileText} label="Doc Requests"
          value={pendingDocs} sub="In progress"
          accent={COLORS.g500}
          onClick={() => onNavigate("documents")}
        />
      </div>

      {/* Two col grid */}
      <div className="dashboard__grid">
        {/* Today's schedule */}
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
          {SCHEDULE.slice(0, 5).map((s, i) => {
            const SubjectIcon = getIcon(s.icon);
            return (
              <div key={i} className="schedule-preview__item">
                <div
                  className="schedule-preview__bar"
                  style={{ background: s.color }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="schedule-preview__subject">{s.subject}</div>
                  <div className="schedule-preview__meta">
                    {s.room} · {s.prof}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                  <span className="schedule-preview__time">{s.time}</span>
                  <span className="schedule-preview__day">{s.day}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Grades snapshot */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div className="section-card-header">
              <TrendingUp size={15} color={COLORS.g800} strokeWidth={2} />
              <span className="section-card-title">Grades Snapshot</span>
              <button
                className="section-card-link"
                onClick={() => onNavigate("grades")}
              >
                Full view <ArrowRight size={11} />
              </button>
            </div>
            <div className="grades-snapshot__grid">
              {GRADES.slice(0, 4).map((g, i) => {
                const avg = Math.round((g.prelim + g.midterm + g.finals) / 3);
                const col = avg >= 90 ? COLORS.g800 : avg >= 85 ? COLORS.g700 : avg >= 75 ? COLORS.gold : "#c62828";
                return (
                  <div key={i} className="grades-snapshot__pill" style={{ borderTop: `3px solid ${col}` }}>
                    <div className="grades-snapshot__val" style={{ color: col }}>{avg}</div>
                    <div className="grades-snapshot__code">{g.code}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Balance card */}
          <div
            className="card dashboard__balance-card"
            onClick={() => onNavigate("payments")}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="dashboard__balance-label">Outstanding Balance</div>
                <div className="dashboard__balance-amount" style={{ color: balance > 0 ? "#c62828" : COLORS.g700 }}>
                  ₱{balance.toLocaleString()}
                </div>
                <div className="dashboard__balance-sub">Due {TUITION_SUMMARY.dueDate}</div>
              </div>
              <Receipt size={22} color={balance > 0 ? "#c62828" : COLORS.g700} strokeWidth={1.6} />
            </div>
            {balance > 0 && (
              <div className="dashboard__balance-badge">
                Please settle your balance at the Accounting Office
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}