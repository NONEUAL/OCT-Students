import { useState } from "react";
import { ArrowRight, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS, GRADES, CALENDAR_EVENTS } from "../constants/data.js";
import "../styles/dashboard.css";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["S","M","T","W","T","F","S"];

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

function CalendarCard() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthEvents = CALENDAR_EVENTS.filter(
    e => e.date.getFullYear() === year && e.date.getMonth() === month
  );

  const upcoming = CALENDAR_EVENTS
    .filter(e => e.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 3);

  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="card cal-card">
      <div className="cal-header">
        <div className="cal-month-year">
          <span className="cal-month">{MONTHS[month]}</span>
          <span className="cal-year">{year}</span>
        </div>
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={() => setViewDate(new Date(year, month - 1, 1))}><ChevronLeft size={12} /></button>
          <button className="cal-nav-btn" onClick={() => setViewDate(new Date(year, month + 1, 1))}><ChevronRight size={12} /></button>
        </div>
      </div>

      <div className="cal-dow">
        {DAYS_SHORT.map((d, i) => <div key={i} className="cal-dow-cell">{d}</div>)}
      </div>

      <div className="cal-grid">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} className="cal-day cal-day--empty" />;
          const cellDate    = new Date(year, month, day);
          const isToday     = isSameDay(cellDate, today);
          const isSunday    = cellDate.getDay() === 0;
          const eventsOnDay = monthEvents.filter(e => isSameDay(e.date, cellDate));
          const dotType = eventsOnDay.find(e => e.type === "exam")?.type
            ?? eventsOnDay.find(e => e.type === "holiday")?.type
            ?? eventsOnDay[0]?.type;
          let cls = "cal-day";
          if (isToday)  cls += " cal-day--today";
          if (isSunday) cls += " cal-day--sunday";
          return (
            <div key={day} className={cls}>
              <span className="cal-day-num">{day}</span>
              {dotType && <div className={`cal-dot cal-dot--${dotType}`} />}
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        {[["#c62828","Exam"],["#c8a825","Holiday"],["#2d6a35","Event"]].map(([color, label]) => (
          <div key={label} className="cal-legend-item">
            <div className="cal-legend-dot" style={{ background: color }} />{label}
          </div>
        ))}
      </div>

      {upcoming.length > 0 && (
        <>
          <div className="cal-upcoming-title">Upcoming</div>
          <div className="cal-events">
            {upcoming.map((ev, i) => (
              <div key={i} className="cal-event-row">
                <div className="cal-event-date">
                  {ev.date.toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
                </div>
                <div className="cal-event-label">{ev.label}</div>
                <span className={`cal-event-tag cal-event-tag--${ev.type}`}>{ev.type}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

  return (
    <div>
      <div className="dashboard__banner">
        <div className="dashboard__banner-orb-1" />
        <div className="dashboard__banner-orb-2" />
        <div className="dashboard__banner-content">
          <div className="dashboard__banner-eyebrow">Welcome back</div>
          <h2 className="dashboard__banner-title">Good morning, {firstName}!</h2>
          <p className="dashboard__banner-sub">
            2nd Semester A.Y. 2025–2026 &nbsp;·&nbsp;
            {user?.course ?? "BSIT"} {user?.year ?? ""} &nbsp;·&nbsp;
            {totalUnits} units enrolled &nbsp;·&nbsp; GWA&nbsp;
            <strong style={{ color: "#fff" }}>{gwa}</strong>
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

      <div className="dashboard__grid">
        <div className="card" style={{ padding: "18px 20px" }}>
          <div className="section-card-header">
            <BarChart2 size={15} color={COLORS.g800} strokeWidth={2} />
            <span className="section-card-title">Grades</span>
            <button className="section-card-link" onClick={() => onNavigate("grades")}>
              Full view <ArrowRight size={11} />
            </button>
          </div>
          <div className="dashboard__grades-scroll">
            <table className="dashboard__grades-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Subject</th>
                  <th className="dash-col-hide" style={{ textAlign: "center" }}>Prelim</th>
                  <th className="dash-col-hide" style={{ textAlign: "center" }}>Midterm</th>
                  <th className="dash-col-hide" style={{ textAlign: "center" }}>Finals</th>
                  <th style={{ textAlign: "center" }}>Avg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map((g, i) => {
                  const avg    = ((g.prelim + g.midterm + g.finals) / 3).toFixed(1);
                  const passed = parseFloat(avg) >= 75;
                  const avgCol = parseFloat(avg) >= 90 ? COLORS.g800 : parseFloat(avg) >= 75 ? COLORS.g700 : "#c62828";
                  return (
                    <tr key={i}>
                      <td><span className="dash-grade-code">{g.code}</span></td>
                      <td style={{ fontWeight: 500, fontSize: 11.5 }}>{g.subject}</td>
                      <td className="dash-col-hide" style={{ textAlign: "center", color: COLORS.muted }}>{g.prelim}</td>
                      <td className="dash-col-hide" style={{ textAlign: "center", color: COLORS.muted }}>{g.midterm}</td>
                      <td className="dash-col-hide" style={{ textAlign: "center", color: COLORS.muted }}>{g.finals}</td>
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
        </div>

        <CalendarCard />
      </div>
    </div>
  );
}