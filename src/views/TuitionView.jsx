import { Receipt, CheckCircle, AlertCircle, Download } from "lucide-react";
import { TUITION_SUMMARY, PAYMENTS, COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/tuition.css";

const METHOD_COLORS = {
  Cash:            { bg: "#e8f5e9", color: "#1a3a1a" },
  GCash:           { bg: "#e3f2fd", color: "#0d47a1" },
  "Bank Transfer": { bg: "#fff3e0", color: "#7a4a00" },
};

// Tuition data matching the uploaded Certificate of Matriculation
const FULL_TUITION = {
  studentName:  "VELASQUEZ, GABRIEL",
  studentId:    "211C-5169",
  course:       "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
  yearLevel:    "2ND YEAR",
  semester:     "2025-2026 / 2nd Semester",
  dateEnrolled: "January 13, 2026",
  section:      "BSIT2A225",

  fees: [
    { label: "Tuition Fee",                   amount: 16863.75 },
    { label: "Miscellaneous Fees",            amount: 3145.91  },
    { label: "Other Expense",                 amount: 4781.54  },
    { label: "Activity Fee – Departmental",   amount: 1800.00  },
    { label: "Activity Fee – Institutional",  amount: 1150.00  },
    { label: "Computer Lab Fee",              amount: 3450.00  },
    { label: "Council Membership Fee",        amount: 200.00   },
    { label: "General Services Fee",          amount: 310.61   },
    { label: "PE",                            amount: 500.00   },
  ],

  total: 32201.81,

  paymentMode: "INSTALLMENT",
  schedule: [
    { dueDate: "2026/01/13", desc: "Upon Enrollment", assessed: 1000.00,   outstanding: 0.00      },
    { dueDate: "2026/02/09", desc: "Prelim",          assessed: 10401.00,  outstanding: 10401.00  },
    { dueDate: "2026/03/23", desc: "Midterm",         assessed: 10401.00,  outstanding: 10401.00  },
    { dueDate: "2026/04/20", desc: "Finals",          assessed: 10399.81,  outstanding: 10399.81  },
  ],

  netTotal:       32201.81,
  netOutstanding: 31201.81,
};

function generatePDF() {
  // Build HTML for the PDF-like printable page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Certificate of Matriculation – ${FULL_TUITION.studentName}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, sans-serif;
    font-size: 11px;
    color: #000;
    background: #fff;
    padding: 24px 32px;
  }
  .header { text-align: center; margin-bottom: 16px; }
  .header h1 { font-size: 16px; font-weight: bold; color: #1a3a1a; margin-bottom: 2px; }
  .header p  { font-size: 10px; color: #444; }
  .title-bar {
    background: #1a3a1a;
    color: #fff;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 7px 0;
    margin-bottom: 14px;
    text-transform: uppercase;
  }
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 20px;
    margin-bottom: 16px;
    font-size: 11px;
  }
  .info-grid .row { display: flex; gap: 6px; }
  .info-grid .lbl { font-weight: bold; min-width: 90px; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
  th { background: #1a3a1a; color: #fff; padding: 6px 8px; text-align: left; }
  td { padding: 5px 8px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) td { background: #f4fbf5; }
  .section-title { font-weight: bold; font-size: 11px; margin-bottom: 6px; color: #1a3a1a; text-transform: uppercase; letter-spacing: 0.5px; }
  .fee-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #e8e8e8; }
  .fee-total { display: flex; justify-content: space-between; padding: 6px 0; border-top: 2px solid #1a3a1a; font-weight: bold; font-size: 12px; margin-top: 4px; }
  .footer { margin-top: 20px; font-size: 10px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
  .enrolled-msg { color: #1a3a1a; font-weight: bold; text-align: center; font-size: 12px; margin: 10px 0; }
  .bold { font-weight: bold; }
  .right { text-align: right; }
  .note { color: #c00; font-size: 10px; margin-top: 8px; }
</style>
</head>
<body>
<div class="header">
  <h1>OLIVAREZ COLLEGE TAGAYTAY</h1>
  <p>Emilio Aguinaldo Highway, Brgy. San Jose, Tagaytay City</p>
</div>

<div class="title-bar">CERTIFICATE OF MATRICULATION</div>

<div class="info-grid">
  <div>
    <div class="row"><span class="lbl">Student No.:</span> <span>${FULL_TUITION.studentId}</span></div>
    <div class="row"><span class="lbl">Name:</span> <span>${FULL_TUITION.studentName}</span></div>
    <div class="row"><span class="lbl">Course:</span> <span>${FULL_TUITION.course}</span></div>
  </div>
  <div>
    <div class="row"><span class="lbl">Date Enrolled:</span> <span>${FULL_TUITION.dateEnrolled}</span></div>
    <div class="row"><span class="lbl">Year Level:</span> <span>${FULL_TUITION.yearLevel}</span></div>
    <div class="row"><span class="lbl">SY / Sem:</span> <span>${FULL_TUITION.semester}</span></div>
  </div>
</div>

<div class="two-col">
  <!-- Left: Subjects -->
  <div>
    <div class="section-title">Enrolled Subjects</div>
    <table>
      <thead><tr><th>Subject</th><th>Units</th><th>Schedule</th><th>Room</th></tr></thead>
      <tbody>
        <tr><td>GEC4 – Arts Appreciation</td><td>3.00</td><td>THU 1:00–4:00PM</td><td>NB3</td></tr>
        <tr><td>GEC7 – Science, Tech &amp; Society</td><td>3.00</td><td>FRI 4:00–7:00PM</td><td>NB2</td></tr>
        <tr><td>GEC8 – The Contemporary World</td><td>3.00</td><td>TUE 1:00–4:00PM</td><td>120</td></tr>
        <tr><td>IT104 – Quantitative Method</td><td>3.00</td><td>FRI 1:00–4:00PM</td><td>COM LAB 1</td></tr>
        <tr><td>IT204 – System Analysis &amp; Design</td><td>3.00</td><td>TUE 9:00AM–12:00PM</td><td>COM LAB 2</td></tr>
        <tr><td>IT205 – Computer Org. &amp; Assembly</td><td>3.00</td><td>SAT 9:00AM–12:00PM</td><td>COM LAB 2</td></tr>
        <tr><td>IT210 – Web Programming</td><td>3.00</td><td>THU 4:00–7:00PM</td><td>COM LAB 2</td></tr>
        <tr><td>OLIVARIA104 – Career Dev. Orientation</td><td>2.00</td><td>SAT 1:00–4:00PM</td><td>–</td></tr>
        <tr><td>PE04 – Wellness and Fitness</td><td>2.00</td><td>THU 10:00AM–12:00PM</td><td>GYM</td></tr>
      </tbody>
    </table>
    <p style="text-align:right; font-weight:bold; margin-top:6px;">Total: 25.00 unit(s)</p>
    <p class="enrolled-msg">✓ YOU ARE NOW OFFICIALLY ENROLLED!</p>
  </div>

  <!-- Right: Fees -->
  <div>
    <div class="section-title">Matriculation Fees</div>
    ${FULL_TUITION.fees.map(f => `
      <div class="fee-row">
        <span>${f.label}</span>
        <span class="bold">₱${f.amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
      </div>`).join("")}
    <div class="fee-total">
      <span>TOTAL</span>
      <span>₱${FULL_TUITION.total.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
    </div>

    <div style="margin-top:14px;">
      <div class="bold" style="margin-bottom:6px;">Mode of Payment: ${FULL_TUITION.paymentMode}</div>
      <div class="bold" style="margin-bottom:8px;">Total Amount Due Today: ₱0.00</div>
      <table>
        <thead><tr><th>Due Date</th><th>Description</th><th>Assessed</th><th>Outstanding</th></tr></thead>
        <tbody>
          ${FULL_TUITION.schedule.map(s => `
            <tr>
              <td>${s.dueDate}</td>
              <td>${s.desc}</td>
              <td class="right">₱${s.assessed.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
              <td class="right">₱${s.outstanding.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            </tr>`).join("")}
          <tr>
            <td colspan="2" class="bold">Net Total:</td>
            <td class="right bold">₱${FULL_TUITION.netTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            <td class="right bold">₱${FULL_TUITION.netOutstanding.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="footer">
  <p><strong>*${FULL_TUITION.studentId}*</strong></p>
  <p style="margin-top:4px;">Prepared by, Date/Time: LORICA.MAE, 2026-01-13 14:59:30</p>
  <p class="note">Note: Please settle your old account! Disregard if payment made.</p>
  <div style="margin-top:24px; text-align:right;">
    <div style="display:inline-block; border-top:1px solid #000; padding-top:4px; min-width:180px; text-align:center;">Signature</div>
  </div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);

  // Open in new tab — user can Ctrl+P / Cmd+P to save as PDF
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      setTimeout(() => win.print(), 400);
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    };
  }
}

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

          {/* ── PDF Download Button ── */}
          <button className="tuition__pdf-btn" onClick={generatePDF}>
            <Download size={14} />
            Download Certificate of Matriculation
          </button>
        </div>

      </div>
    </div>
  );
}