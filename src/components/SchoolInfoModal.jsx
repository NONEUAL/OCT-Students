import { X, MapPin, Phone, Mail, Globe, Clock, BookOpen } from "lucide-react";
import { SCHOOL_INFO } from "../constants/data.js";
import "../styles/schoolinfo.css";

export default function SchoolInfoModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__orb" />
          <img src="/OCT_logo.png" alt="OCT" className="modal-header__logo" />
          <div>
            <div className="modal-header__name">{SCHOOL_INFO.name}</div>
            <div className="modal-header__sub">Est. {SCHOOL_INFO.founded}  ·  {SCHOOL_INFO.motto}</div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Info rows */}
        <div className="modal-body">
          {[
            { Icon: MapPin,   label: "Address",       value: SCHOOL_INFO.address },
            { Icon: Phone,    label: "Phone",         value: SCHOOL_INFO.phone },
            { Icon: Mail,     label: "Email",         value: SCHOOL_INFO.email },
            { Icon: Globe,    label: "Website",       value: SCHOOL_INFO.website },
            { Icon: Clock,    label: "Office Hours",  value: SCHOOL_INFO.hours },
            { Icon: BookOpen, label: "Academic Year", value: "AY 2025–2026 · 2nd Semester" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="modal-row">
              <div className="modal-row__icon"><Icon size={15} /></div>
              <div>
                <div className="modal-row__label">{label}</div>
                <div className="modal-row__value">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="modal-footer__btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
