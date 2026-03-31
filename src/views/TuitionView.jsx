import { Receipt, CheckCircle, AlertCircle } from "lucide-react";
import { TUITION_SUMMARY, PAYMENTS, COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/tuition.css";

const METHOD_COLORS = {
  Cash:           { bg: "#e8f5e9", color: "#1a3a1a" },
  GCash:          { bg: "#e3f2fd", color: "#0d47a1" },
  "Bank Transfer":{ bg: "#fff3e0", color: "#7a4a00" },
};

export default function TuitionView() {
  const balance = TUITION_SUMMARY.totalFee - TUITION_SUMMARY.totalPaid;
  const cleared = balance <= 0;
  const paidPct = Math.min(100, Math.round((TUITION_SUMMARY.totalPaid / TUITION_SUMMARY.totalFee) * 100));

  return (
    <div>
      <PageHeader
        Icon={Receipt}
        title="Tuition & Payments"
        subtitle={TUITION_SUMMARY.semester}
      />

      {/* Status banner */}
      <div className={`tuition__status-banner ${cleared ? "tuition__status-banner--cleared" : "tuition__status-banner--due"}`}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {cleared
            ? <CheckCircle size={20} />
            : <AlertCircle size={20} />
          }
          <div>
            <div className="tuition__status-title">
              {cleared ? "Account Cleared" : "Balance Due"}
            </div>
            <div className="tuition__status-sub">
              {cleared
                ? "Your account has no outstanding balance."
                : `₱${balance.toLocaleString()} due on ${TUITION_SUMMARY.dueDate}. Please settle at the Accounting Office.`
              }
            </div>
          </div>
        </div>
      </div>

      <div className="tuition__layout">
        {/* Left — breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Summary cards */}
          <div className="tuition__summary-row">
            <div className="tuition__summary-card">
              <div className="tuition__summary-label">Total Fee</div>
              <div className="tuition__summary-value">₱{TUITION_SUMMARY.totalFee.toLocaleString()}</div>
            </div>
            <div className="tuition__summary-card">
              <div className="tuition__summary-label">Total Paid</div>
              <div className="tuition__summary-value" style={{ color: COLORS.g700 }}>
                ₱{TUITION_SUMMARY.totalPaid.toLocaleString()}
              </div>
            </div>
            <div className="tuition__summary-card">
              <div className="tuition__summary-label">Balance</div>
              <div className="tuition__summary-value" style={{ color: balance > 0 ? "#c62828" : COLORS.g700 }}>
                ₱{balance.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.g800 }}>Payment Progress</span>
              <span style={{ fontSize: "12px", color: COLORS.muted }}>{paidPct}% paid</span>
            </div>
            <div className="tuition__progress-track">
              <div
                className="tuition__progress-fill"
                style={{ width: `${paidPct}%`, background: cleared ? COLORS.g700 : COLORS.gold }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: COLORS.subtle }}>₱0</span>
              <span style={{ fontSize: 11, color: COLORS.subtle }}>₱{TUITION_SUMMARY.totalFee.toLocaleString()}</span>
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div className="section-card-header" style={{ marginBottom: 14 }}>
              <span className="section-card-title">Fee Breakdown</span>
            </div>
            {TUITION_SUMMARY.breakdown.map((item, i) => (
              <div key={i} className="tuition__breakdown-row">
                <span className="tuition__breakdown-label">{item.label}</span>
                <span className="tuition__breakdown-amount">₱{item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="tuition__breakdown-row tuition__breakdown-row--total">
              <span className="tuition__breakdown-label">Total</span>
              <span className="tuition__breakdown-amount">₱{TUITION_SUMMARY.totalFee.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right — payment history */}
        <div className="card" style={{ overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "18px 20px 0" }}>
            <div className="section-card-title" style={{ marginBottom: 4 }}>Payment History</div>
            <div style={{ fontSize: 11.5, color: COLORS.subtle, marginBottom: 14 }}>
              For official receipts, please visit the Accounting Office.
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                {["Date", "Description", "Method", "Reference", "Amount"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p, i) => {
                const mc = METHOD_COLORS[p.method] ?? { bg: "#f0faf2", color: "#1a3a1a" };
                return (
                  <tr key={i}>
                    <td style={{ whiteSpace: "nowrap", color: COLORS.muted }}>{p.date}</td>
                    <td style={{ fontWeight: 500 }}>{p.desc}</td>
                    <td>
                      <span style={{ fontSize: 10, fontWeight: 700, background: mc.bg, color: mc.color, padding: "3px 9px", borderRadius: 7 }}>
                        {p.method}
                      </span>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: 11.5, color: COLORS.subtle }}>{p.ref}</td>
                    <td style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: COLORS.g800 }}>
                      ₱{p.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {PAYMENTS.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: COLORS.subtle, fontSize: 13 }}>
              No payment records yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}