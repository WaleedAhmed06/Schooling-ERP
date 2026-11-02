import { School } from "lucide-react";
export function SchoolInformation() {
  return (
    <div className="school-select">
      <span className="school-avatar">
        <School size={19} />
      </span>
      <span className="school-label">
        <strong>Bright Future School</strong>
        <small>Academic Session 2026–27</small>
      </span>
    </div>
  );
}
