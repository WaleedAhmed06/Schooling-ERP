"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
  Eye,
  X,
  Printer,
  CheckCircle,
  FileText,
} from "lucide-react";
import { modules, reportTypes } from "./module-config";
import { downloadCSV, getRows, setRows, type RecordRow } from "./storage";
const money = (v: number) => `Rs. ${v.toLocaleString("en-PK")}`;
function Summary({ slug, rows }: { slug: string; rows: RecordRow[] }) {
  if (slug === "fees") {
    const total = rows.reduce(
      (n, r) =>
        n +
        Number(r.amount || 0) -
        Number(r.discount || 0) +
        Number(r.fine || 0),
      0,
    );
    const collected = rows
      .filter((r) => r.status === "Paid")
      .reduce(
        (n, r) =>
          n +
          Number(r.amount || 0) -
          Number(r.discount || 0) +
          Number(r.fine || 0),
        0,
      );
    return (
      <div className="erp-stats">
        {[
          ["Total generated", money(total)],
          ["Collected", money(collected)],
          ["Pending", money(total - collected)],
          [
            "Overdue",
            String(rows.filter((r) => r.status === "Overdue").length),
          ],
        ].map(([label, value]) => (
          <div className="card erp-stat" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    );
  }
  if (slug === "attendance") {
    return (
      <div className="erp-stats">
        {["Present", "Absent", "Late", "Leave"].map((s) => (
          <div className="card erp-stat" key={s}>
            <small>{s}</small>
            <strong>{rows.filter((r) => r.status === s).length}</strong>
          </div>
        ))}
      </div>
    );
  }
  if (slug === "exams") {
    return (
      <div className="erp-stats">
        {[
          ["Examination records", rows.length],
          ["Published", rows.filter((r) => r.status === "Published").length],
          ["Draft", rows.filter((r) => r.status === "Draft").length],
        ].map(([k, v]) => (
          <div className="card erp-stat" key={k}>
            <small>{k}</small>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="erp-stats">
      <div className="card erp-stat">
        <small>Total records</small>
        <strong>{rows.length}</strong>
      </div>
    </div>
  );
}
export function AdminModule({ slug }: { slug: string }) {
  const config = modules[slug];
  const [rows, update] = useState<RecordRow[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<RecordRow | null>(null);
  const [viewing, setViewing] = useState<RecordRow | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [report, setReport] = useState(reportTypes[0]);
  useEffect(() => {
    update(getRows(slug));
    setReady(true);
  }, [slug]);
  const filterField =
    slug === "attendance"
      ? "status"
      : slug === "fees"
        ? "status"
        : slug === "exams"
          ? "status"
          : slug === "announcements"
            ? "audience"
            : slug === "teachers"
              ? "type"
              : slug === "subjects"
                ? "type"
                : slug === "calendar"
                  ? "type"
                  : "class";
  const filterOptions = Array.from(
    new Set(rows.map((r) => r[filterField]).filter(Boolean)),
  ).sort();
  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!filter || r[filterField] === filter) &&
          Object.values(r).some((v) =>
            String(v).toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    [rows, query, filter, filterField],
  );
  const shown = filtered.slice((page - 1) * 10, page * 10);
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  function persist(next: RecordRow[], message: string) {
    update(next);
    setRows(slug, next);
    setNotice(message);
    setTimeout(() => setNotice(""), 3500);
  }
  function startNew() {
    setForm(
      Object.fromEntries(
        config.fields.map((f) => [
          f.key,
          f.type === "date" ? "2026-10-31" : (f.options?.[0] ?? ""),
        ]),
      ),
    );
    setEditing({ id: "" });
  }
  function startEdit(row: RecordRow) {
    setForm({ ...row });
    setEditing(row);
  }
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const item: RecordRow = {
      ...form,
      id: editing.id || `${slug}-${Date.now()}`,
    };
    persist(
      editing.id
        ? rows.map((r) => (r.id === editing.id ? item : r))
        : [item, ...rows],
      editing.id ? "Record updated" : "Record created",
    );
    setEditing(null);
    setPage(1);
  }
  function remove(row: RecordRow) {
    if (window.confirm("Delete this record from the demo?"))
      persist(
        rows.filter((r) => r.id !== row.id),
        "Record deleted",
      );
  }
  function patch(row: RecordRow, changes: Record<string, string>) {
    persist(
      rows.map((r) => (r.id === row.id ? { ...r, ...changes } : r)),
      "Status updated",
    );
  }
  function print() {
    window.print();
  }
  if (!config) return null;
  if (slug === "reports")
    return (
      <section className="erp-module">
        <div className="erp-heading">
          <div>
            <span className="eyebrow">ADMIN PORTAL</span>
            <h1>Reports & Analytics</h1>
            <p>Generate and export demo reports from shared school records.</p>
          </div>
        </div>
        <div className="card erp-panel">
          <div className="erp-toolbar">
            <select
              aria-label="Report type"
              value={report}
              onChange={(e) => setReport(e.target.value)}
            >
              {reportTypes.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <input type="date" aria-label="Start date" />
            <input type="date" aria-label="End date" />
            <select aria-label="Class filter">
              <option>All classes</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i}>Grade {i + 1}</option>
              ))}
            </select>
            <button
              className="ui-button"
              onClick={() => {
                const source = report.includes("Attendance")
                  ? "attendance"
                  : report.includes("Fee")
                    ? "fees"
                    : report.includes("Teacher")
                      ? "teachers"
                      : report.includes("Examination") ||
                          report.includes("Academic")
                        ? "exams"
                        : report.includes("Class")
                          ? "classes"
                          : "students";
                downloadCSV(getRows(source), source + "-report");
              }}
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
          <p className="muted" style={{ marginTop: 20 }}>
            Select a report and export the corresponding demo records. Date and
            class inputs are presentation controls in this phase;
            report-specific filtering is not yet connected.
          </p>
        </div>
      </section>
    );
  return (
    <section className="erp-module">
      <div className="erp-heading">
        <div>
          <span className="eyebrow">ADMIN PORTAL · PHASE 2</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <button className="ui-button" onClick={startNew}>
          <Plus size={17} /> Add{" "}
          {slug === "fees"
            ? "Fee Voucher"
            : slug === "exams"
              ? "Exam Record"
              : "Record"}
        </button>
      </div>
      {ready && <Summary slug={slug} rows={rows} />}
      <div className="card erp-panel">
        <div className="erp-toolbar">
          <div className="erp-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search records..."
              aria-label="Search records"
            />
          </div>
          {filterOptions.length > 0 && (
            <select
              aria-label={`Filter by ${filterField}`}
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All {filterField}</option>
              {filterOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
          <button
            className="erp-outline"
            onClick={() => downloadCSV(filtered, slug)}
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
        <div className="erp-table-wrap">
          <table className="erp-table">
            <thead>
              <tr>
                {config.fields
                  .slice(0, slug === "students" ? 6 : 5)
                  .map((f) => (
                    <th key={f.key}>{f.label}</th>
                  ))}
                {slug === "exams" && <th>Grade</th>}
                {slug === "fees" && <th>Net payable</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((row) => (
                <tr key={row.id}>
                  {config.fields
                    .slice(0, slug === "students" ? 6 : 5)
                    .map((f) => (
                      <td key={f.key}>{row[f.key] || "—"}</td>
                    ))}
                  {slug === "exams" && (
                    <td>
                      {Number(row.total) > 0
                        ? `${Math.round((Number(row.obtained) / Number(row.total)) * 100)}% · ${Number(row.obtained) / Number(row.total) >= 0.8 ? "A" : Number(row.obtained) / Number(row.total) >= 0.6 ? "B" : "C"}`
                        : "—"}
                    </td>
                  )}
                  {slug === "fees" && (
                    <td>
                      {money(
                        Number(row.amount || 0) -
                          Number(row.discount || 0) +
                          Number(row.fine || 0),
                      )}
                    </td>
                  )}
                  <td>
                    <div className="erp-actions">
                      <button title="View" onClick={() => setViewing(row)}>
                        <Eye size={16} />
                      </button>
                      <button title="Edit" onClick={() => startEdit(row)}>
                        <Pencil size={16} />
                      </button>
                      {slug === "fees" && row.status !== "Paid" && (
                        <button
                          title="Mark paid (demo)"
                          onClick={() => patch(row, { status: "Paid" })}
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {slug === "exams" && row.status !== "Published" && (
                        <button
                          title="Publish result"
                          onClick={() => patch(row, { status: "Published" })}
                        >
                          <FileText size={16} />
                        </button>
                      )}
                      <button title="Delete" onClick={() => remove(row)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={config.fields.length + 3} className="erp-empty">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="erp-pagination">
          <span>
            {filtered.length} records · Page {page} of {pages}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage((v) => v - 1)}>
              Previous
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((v) => v + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {notice && (
        <div role="status" className="erp-toast">
          {notice}
        </div>
      )}
      {editing && (
        <div
          className="erp-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <div
            className="erp-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Record form"
          >
            <div className="erp-modal-head">
              <h2>
                {editing.id ? "Edit" : "Add"} {config.title}
              </h2>
              <button onClick={() => setEditing(null)} aria-label="Close">
                <X />
              </button>
            </div>
            <form onSubmit={save}>
              <div className="erp-form-grid">
                {config.fields.map((f) => (
                  <label key={f.key}>
                    {f.label}
                    {f.type === "select" ? (
                      <select
                        required
                        value={form[f.key] ?? ""}
                        onChange={(e) =>
                          setForm((v) => ({ ...v, [f.key]: e.target.value }))
                        }
                      >
                        {f.options?.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea
                        required
                        value={form[f.key] ?? ""}
                        onChange={(e) =>
                          setForm((v) => ({ ...v, [f.key]: e.target.value }))
                        }
                      />
                    ) : (
                      <input
                        required={f.required}
                        type={
                          f.type === "number"
                            ? "number"
                            : f.type === "date"
                              ? "date"
                              : "text"
                        }
                        value={form[f.key] ?? ""}
                        onChange={(e) =>
                          setForm((v) => ({ ...v, [f.key]: e.target.value }))
                        }
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="erp-modal-foot">
                <button
                  type="button"
                  className="erp-outline"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
                <button className="ui-button" type="submit">
                  Save record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {viewing && (
        <div
          className="erp-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setViewing(null);
          }}
        >
          <div
            className="erp-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Record details"
          >
            <div className="erp-modal-head">
              <h2>{config.title} · Details</h2>
              <button onClick={() => setViewing(null)} aria-label="Close">
                <X />
              </button>
            </div>
            <dl className="erp-details">
              {config.fields.map((f) => (
                <div key={f.key}>
                  <dt>{f.label}</dt>
                  <dd>{viewing[f.key] || "—"}</dd>
                </div>
              ))}
              {slug === "exams" && (
                <div>
                  <dt>Percentage / Grade</dt>
                  <dd>
                    {Number(viewing.total) > 0
                      ? `${((Number(viewing.obtained) / Number(viewing.total)) * 100).toFixed(1)}% · ${Number(viewing.obtained) / Number(viewing.total) >= 0.8 ? "A" : Number(viewing.obtained) / Number(viewing.total) >= 0.6 ? "B" : "C"}`
                      : "—"}
                  </dd>
                </div>
              )}
            </dl>
            <div className="erp-modal-foot">
              <button className="erp-outline" onClick={print}>
                <Printer size={16} /> Print
              </button>
              <button className="ui-button" onClick={() => setViewing(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
