import { useState } from "react";
import { BarChart2, ChevronDown } from "lucide-react";
import { GRADES, COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/grades.css";

const SEMESTERS = ["2nd Semester AY 2025–2026", "1st Semester AY 2025–2026"];

export default function GradesView() {
  const [semester, setSemester] = useState(SEMESTERS[0]);

  const totalUnits  = GRADES.reduce((s, g) => s + g.units, 0);
  const weightedSum = GRADES.reduce((s, g) => {
    const avg = (g.prelim + g.midterm + g.finals) / 3;
    return s + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  const honorLabel =
    gwa <= 1.5  ? "HIGHEST HONORS" :
    gwa <= 1.75 ? "HIGH HONORS"    :
    gwa <= 2.0  ? "HONORS"         : "PASSING";

  return (
    <div>
      <PageHeader
        Icon={BarChart2}
        title="Grades"
        subtitle={`${semester} · BSIT 212-A`}
      />

      {/* GWA summary */}
      <div className="grades__summary-row">
        <div className="grades__gwa-card">
          <div className="grades__gwa-label">General Weighted Average</div>
          <div className="grades__gwa-value">{gwa}</div>
          <span className="grades__gwa-badge">{honorLabel}</span>
        </div>
        <div className="grades__gwa-card">
          <div className="grades__gwa-label">Total Units</div>
          <div className="grades__gwa-value">{totalUnits}</div>
          <span className="grades__gwa-badge">{GRADES.length} Subjects</span>
        </div>
        {/* Semester selector */}
        <div style={{ marginLeft: "auto", alignSelf: "center" }}>
          <div className="dropdown-wrap">
            <select
              className="dropdown"
              value={semester}
              onChange={e => setSemester(e.target.value)}
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="dropdown-icon" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card grades__table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {["Code", "Subject", "Units", "Prelim", "Midterm", "Finals", "Average", "Status"].map(h => (
                <th key={h}>{h}</th>
              ))}
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
                  <td>
                    <span className="grades__code-badge">{g.code}</span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{g.subject}</td>
                  <td style={{ color: COLORS.muted, textAlign: "center" }}>{g.units}</td>
                  <td style={{ fontWeight: 600, textAlign: "center", color: g.prelim  >= 90 ? COLORS.g800 : COLORS.g700 }}>{g.prelim}</td>
                  <td style={{ fontWeight: 600, textAlign: "center", color: g.midterm >= 90 ? COLORS.g800 : COLORS.g700 }}>{g.midterm}</td>
                  <td style={{ fontWeight: 600, textAlign: "center", color: g.finals  >= 90 ? COLORS.g800 : COLORS.g700 }}>{g.finals}</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="grades__avg-cell" style={{ color: avgCol }}>{avg}</span>
                  </td>
                  <td>
                    <span className={`grades__status-badge ${passed ? "grades__status-badge--passing" : "grades__status-badge--failed"}`}>
                      {passed ? "PASSING" : "FAILED"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}