import { Receipt, CheckCircle, AlertCircle } from "lucide-react";
import { TUITION_SUMMARY, PAYMENTS, COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/tuition.css";

const METHOD_COLORS = {
  Cash:            { bg: "#e8f5e9", color: "#1a3a1a" },
  GCash:           { bg: "#e3f2fd", color: "#0d47a1" },
  "Bank Transfer": { bg: "#fff3e0", color: "#7a4a00" },
};

export default function TuitionView() {
  const balance = TUITION_SUMMARY.totalFee - TUITION_SUMMARY.totalPaid;
  const cleared = balance <= 0;

  return (
    <div>
      <PageHeader
        Icon={Receipt}
        title="Tuition & Payments"
        subtitle={TUITION_SUMMARY.semester}
      />

      <div className="tuition__layout">

        {/* LEFT — Payment History */}
        <div>
          <div className="card tuition__history-card">
            <div className="tuition__section-title">Payment History</div>

            {PAYMENTS.length === 0 ? (
              <div className="tuition__empty">No payment records yet.</div>
            ) : (
              <div className="tuition__table-wrap">
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
                          <td style={{ fontFamily: "'Urbanist', sans-serif", fontWeight: 700, color: COLORS.g800, whiteSpace: "nowrap" }}>
                            ₱{p.amount.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="tuition__history-summary">
              <div className="tuition__summary-row">
                <span className="tuition__summary-label">Total Paid</span>
                <span className="tuition__summary-value" style={{ color: COLORS.g700 }}>
                  ₱{TUITION_SUMMARY.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="tuition__summary-row">
                <span className="tuition__summary-label">Balance</span>
                <span className="tuition__summary-value" style={{ color: balance > 0 ? "#c62828" : COLORS.g700 }}>
                  ₱{balance.toLocaleString()}
                </span>
              </div>

              <div className={`tuition__status ${cleared ? "tuition__status--cleared" : "tuition__status--due"}`}>
                {cleared
                  ? <><CheckCircle size={14} /> Account cleared — no outstanding balance.</>
                  : <><AlertCircle size={14} /> Balance due on {TUITION_SUMMARY.dueDate}. Please settle at the Accounting Office.</>
                }
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Fee Breakdown */}
        <div className="card tuition__breakdown-card">
          <div className="tuition__section-title">Fee Breakdown</div>
          <div className="tuition__breakdown-sub">{TUITION_SUMMARY.semester}</div>

          <div className="tuition__breakdown-list">
            {TUITION_SUMMARY.breakdown.map((item, i) => (
              <div key={i} className="tuition__breakdown-row">
                <span className="tuition__breakdown-label">{item.label}</span>
                <span className="tuition__breakdown-amount">₱{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="tuition__breakdown-total">
            <span>Total</span>
            <span>₱{TUITION_SUMMARY.totalFee.toLocaleString()}</span>
          </div>

          <div className="tuition__breakdown-note">
            For official receipts, visit the Accounting Office.
          </div>
        </div>

      </div>
    </div>
  );
}