import { Construction } from "lucide-react";
import { COLORS } from "../constants/data.js";
import PageHeader from "../components/PageHeader.jsx";

export default function PaymentsView() {
  return (
    <div>
      <PageHeader Icon={Construction} title="Payment History" subtitle="Financial records" />
      <div style={{
        background: "#fff", borderRadius: 16, padding: "70px 40px",
        boxShadow: "0 2px 12px rgba(13,42,13,0.06)", textAlign: "center",
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: 18,
          background: "linear-gradient(135deg,#1a3a1a,#2d6a35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <Construction size={30} color="#fff" strokeWidth={1.6} />
        </div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", color: "#1a3a1a", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
          Coming Soon
        </h2>
        <p style={{ color: "#7aaa80", fontSize: 13.5, maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
          Payment history and online payment features are currently being set up. Please visit the Finance Office for your statement of account.
        </p>
        <div style={{ marginTop: 24, display: "inline-block", background: "#e8f5e9", borderRadius: 10, padding: "10px 20px", fontSize: 12, color: "#2d6a35", fontWeight: 600 }}>
          Finance Office Hours: Mon–Sat, 8:00 AM – 5:00 PM
        </div>
      </div>
    </div>
  );
}
