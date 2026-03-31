import { useState } from "react";
import { FileText, CheckCircle, Clock, XCircle, Send, X } from "lucide-react";
import { DOCUMENT_TYPES, DOCUMENT_REQUESTS, COLORS } from "../constants/data.js";
import { getIcon } from "../constants/icons.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/documents.css";

const STATUS_CONFIG = {
  Pending:    { color: "#7a4a00", bg: "#fff3e0", Icon: Clock        },
  Processing: { color: "#0d47a1", bg: "#e3f2fd", Icon: Clock        },
  Ready:      { color: "#1a3a1a", bg: "#e8f5e9", Icon: CheckCircle  },
  Released:   { color: "#3a5c3a", bg: "#f0faf2", Icon: CheckCircle  },
  Cancelled:  { color: "#b71c1c", bg: "#fdecea", Icon: XCircle      },
};

export default function DocumentRequestView() {
  const [requests, setRequests]   = useState(DOCUMENT_REQUESTS);
  const [modal,    setModal]      = useState(null);   // document type id
  const [purpose,  setPurpose]    = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedType = DOCUMENT_TYPES.find(d => d.id === modal);

  const handleRequest = () => {
    if (!purpose.trim()) return;
    const newReq = {
      id:            `REQ-00${requests.length + 4}`,
      type:          selectedType.label,
      requestedDate: new Date().toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }),
      status:        "Pending",
      remarks:       "",
    };
    setRequests(prev => [newReq, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      setModal(null);
      setPurpose("");
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div>
      <PageHeader
        Icon={FileText}
        title="Document Requests"
        subtitle="Request official school documents from the Registrar's Office"
      />

      {/* Available documents */}
      <div className="docs__section-title">Available Documents</div>
      <div className="docs__types-grid">
        {DOCUMENT_TYPES.map((doc) => {
          const Icon = getIcon(doc.icon);
          return (
            <div key={doc.id} className="docs__type-card">
              <div className="docs__type-icon">
                {Icon && <Icon size={20} color="#fff" strokeWidth={1.8} />}
              </div>
              <div style={{ flex: 1 }}>
                <div className="docs__type-label">{doc.label}</div>
                <div className="docs__type-desc">{doc.description}</div>
                <div className="docs__type-days">
                  <Clock size={11} /> Processing: {doc.processDays} working day{doc.processDays > 1 ? "s" : ""}
                </div>
              </div>
              <button
                className="docs__request-btn"
                onClick={() => setModal(doc.id)}
              >
                <Send size={12} /> Request
              </button>
            </div>
          );
        })}
      </div>

      {/* Clearance notice */}
      <div className="docs__notice">
        <AlertIcon />
        <span>
          Document release requires <strong>Accounting clearance</strong> (no outstanding balance).
          Please settle your account before claiming your documents.
        </span>
      </div>

      {/* My requests */}
      <div className="docs__section-title" style={{ marginTop: 28 }}>My Requests</div>
      <div className="card" style={{ overflow: "hidden" }}>
        {requests.length === 0 ? (
          <div style={{ padding: "50px 20px", textAlign: "center", color: COLORS.subtle, fontSize: 13 }}>
            No document requests yet.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {["Ref No.", "Document", "Date Requested", "Status", "Remarks"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => {
                const cfg = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.Pending;
                const StatusIcon = cfg.Icon;
                return (
                  <tr key={i}>
                    <td style={{ fontFamily: "monospace", fontSize: 11.5, color: COLORS.subtle }}>{r.id}</td>
                    <td style={{ fontWeight: 600 }}>{r.type}</td>
                    <td style={{ color: COLORS.muted, whiteSpace: "nowrap" }}>{r.requestedDate}</td>
                    <td>
                      <span className="docs__status-badge" style={{ background: cfg.bg, color: cfg.color }}>
                        <StatusIcon size={10} strokeWidth={2.5} />
                        {r.status}
                      </span>
                    </td>
                    <td style={{ color: COLORS.subtle, fontSize: 12, fontStyle: r.remarks ? "normal" : "italic" }}>
                      {r.remarks || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Request modal */}
      {modal && selectedType && (
        <div className="docs__modal-overlay" onClick={() => { setModal(null); setPurpose(""); setSubmitted(false); }}>
          <div className="docs__modal-card" onClick={e => e.stopPropagation()}>
            <div className="docs__modal-header">
              <div>
                <div className="docs__modal-title">{selectedType.label}</div>
                <div className="docs__modal-sub">Processing time: {selectedType.processDays} working day{selectedType.processDays > 1 ? "s" : ""}</div>
              </div>
              <button className="docs__modal-close" onClick={() => { setModal(null); setPurpose(""); setSubmitted(false); }}>
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="docs__modal-success">
                <CheckCircle size={32} color={COLORS.g700} />
                <div>Request submitted successfully!</div>
                <div style={{ fontSize: 12, color: COLORS.subtle }}>You will be notified when it's ready.</div>
              </div>
            ) : (
              <>
                <div className="docs__modal-body">
                  <label className="docs__modal-label">Purpose / Reason for Request</label>
                  <textarea
                    className="docs__modal-textarea"
                    placeholder="e.g. For scholarship application, employment, etc."
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    rows={3}
                  />
                  <div className="docs__modal-note">
                    Pick up your document at the <strong>Registrar's Office</strong> once notified.
                    Bring a valid ID and this reference number.
                  </div>
                </div>
                <div className="docs__modal-footer">
                  <button className="docs__modal-cancel" onClick={() => { setModal(null); setPurpose(""); }}>
                    Cancel
                  </button>
                  <button
                    className="docs__modal-submit"
                    disabled={!purpose.trim()}
                    onClick={handleRequest}
                  >
                    <Send size={13} /> Submit Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Inline alert icon to avoid extra import
function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}