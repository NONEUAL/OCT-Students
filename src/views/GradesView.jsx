import { BarChart2 } from "lucide-react";
import { GRADES, COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/grades.css";

export default function GradesView() {
  const totalUnits = GRADES.reduce((sum, g) => sum + g.units, 0);
  const weightedSum = GRADES.reduce((sum, g) => {
    const avg = (g.prelim + g.midterm) / 2;
    return sum + avg * g.units;
  }, 0);
  const gwa = (weightedSum / totalUnits).toFixed(2);

  return (
    <div>
      <PageHeader
        Icon={BarChart2}
        title="Grades & Transcript"
        subtitle="2nd Semester A.Y. 2025–2026 · BSIT 212-A"
      />

      <div className="card grades__table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {["Code", "Subject", "Units", "Prelim", "Midterm", "Finals", "Average", "Status"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GRADES.map((g, i) => {
              const avg = ((g.prelim + g.midterm) / 2).toFixed(1);
              const passed = avg >= 75;
              return (
                <tr key={i}>
                  <td>
                    <span className="grades__code-badge">{g.code}</span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{g.subject}</td>
                  <td style={{ color: COLORS.muted, textAlign: "center" }}>{g.units}</td>
                  <td style={{ fontWeight: 600, color: g.prelim >= 90 ? COLORS.g800 : COLORS.g700 }}>{g.prelim}</td>
                  <td style={{ fontWeight: 600, color: g.midterm >= 90 ? COLORS.g800 : COLORS.g700 }}>{g.midterm}</td>
                  <td style={{ color: COLORS.subtle }}>—</td>
                  <td className="grades__avg-cell">{avg}</td>
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

        <div className="data-table-footer" style={{ gap: 16 }}>
          <span className="grades__gwa-label">
            Total Units: <strong style={{ color: COLORS.g800 }}>{totalUnits}</strong>
          </span>
          <div style={{ width: 1, height: 16, background: COLORS.border }} />
          <span className="grades__gwa-label">General Weighted Average:</span>
          <span className="grades__gwa-value">{gwa}</span>
          <span className="grades__gwa-badge">
            {gwa <= 1.5 ? "HIGHEST HONORS" : gwa <= 1.75 ? "HIGH HONORS" : gwa <= 2.0 ? "HONORS" : "PASSING"}
          </span>
        </div>
      </div>
    </div>
  );
}
