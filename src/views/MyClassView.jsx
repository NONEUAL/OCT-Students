import { Clock, MapPin, BookOpen, User } from "lucide-react";
import { CLASSES } from "../constants/data.js";
import { getIcon } from "../constants/icons.js";
import PageHeader from "../components/PageHeader.jsx";
import "../styles/myclass.css";

export default function MyClassView() {
  const totalUnits = CLASSES.reduce((sum, c) => sum + c.units, 0);

  return (
    <div>
      <PageHeader
        Icon={BookOpen}
        title="My Classes"
        subtitle={`2nd Semester AY 2025–2026 · BSIT 212-A · Total: ${totalUnits} Units`}
      />

      <div className="myclass__list">
        {CLASSES.map((c, i) => {
          const ClassIcon = getIcon(c.icon);
          return (
            <div key={i} className="class-card">
              <div className="class-card__icon-wrap">
                {ClassIcon && <ClassIcon size={20} color="#fff" strokeWidth={1.8} />}
              </div>

              <div className="class-card__info">
                <div className="class-card__meta">
                  <span className="class-card__code">{c.code}</span>
                  <span className="class-card__units">{c.units} units</span>
                  <span className="class-card__section">{c.section}</span>
                </div>
                <div className="class-card__name">{c.name}</div>
                <div className="class-card__prof">
                  <User size={11} strokeWidth={1.8} style={{ display: "inline", marginRight: 4 }} />
                  {c.prof}
                </div>
              </div>

              <div className="class-card__details">
                <div className="class-card__detail-row">
                  <Clock size={11} strokeWidth={1.8} />
                  {c.time}
                </div>
                <div className="class-card__detail-row">
                  <MapPin size={11} strokeWidth={1.8} />
                  {c.room}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
