"use client";

import { useState } from "react";

const TABLES = [
  {
    name: "devices",
    columns: ["id", "name", "location", "status"],
    rows: [
      { id: 1, name: "Warehouse Sensor A", location: "Warehouse", status: "online"  },
      { id: 2, name: "Office Hub",         location: "Office",    status: "online"  },
      { id: 3, name: "Warehouse Sensor B", location: "Warehouse", status: "offline" },
    ],
  },
  {
    name: "alerts",
    columns: ["id", "device_id", "severity", "message", "created_at", "acknowledged"],
    rows: [
      { id: 1, device_id: 1, severity: "critical", message: "Temp exceeded 80°C", created_at: "2024-06-01 09:15", acknowledged: 0 },
      { id: 2, device_id: 1, severity: "warning",  message: "Battery below 10%",  created_at: "2024-06-01 08:00", acknowledged: 1 },
      { id: 3, device_id: 2, severity: "info",     message: "Rebooted",            created_at: "2024-06-01 07:30", acknowledged: 0 },
      { id: 4, device_id: 3, severity: "critical", message: "No signal",           created_at: "2024-06-01 06:00", acknowledged: 0 },
    ],
  },
];

export default function DBQuery({ value = "", onChange }) {
  const query = value;
  const setQuery = (v) => onChange?.(v);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runQuery() {
    setLoading(true);
    setResult(null);
    setError(null);

    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) setError(data.error);
    else setResult(data.rows);
  }

  const columns = result?.length > 0 ? Object.keys(result[0]) : [];

  return (
    <div style={{ padding: "2rem", maxWidth: "560px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q8 — SQL: query device alerts</h2>

      {/* Task */}
      <div style={{
        marginBottom: "1.25rem",
        padding: "14px 16px",
        borderRadius: "8px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        fontSize: "13px",
        color: "#334155",
        lineHeight: "1.75",
      }}>
        <p style={{ margin: "0 0 8px", fontWeight: "600", color: "#0f172a" }}>Task</p>
        <p style={{ margin: 0 }}>
          Write a query that returns the <strong>device name</strong>, <strong>severity</strong>,{" "}
          <strong>message</strong>, and <strong>created_at</strong> for every{" "}
          <span style={{ background: "#fee2e2", color: "#b91c1c", padding: "1px 5px", borderRadius: "4px" }}>unacknowledged</span>{" "}
          alert from a device that is{" "}
          <span style={{ background: "#dcfce7", color: "#166534", padding: "1px 5px", borderRadius: "4px" }}>online</span>{" "}
          and located in{" "}
          <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "1px 5px", borderRadius: "4px" }}>&quot;Warehouse&quot;</span>.
          Return the most recent alerts first.
        </p>
      </div>

      {/* Tables with data */}
      <div style={{ marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
        {TABLES.map((t) => (
          <div key={t.name}>
            <div style={{
              padding: "6px 12px",
              background: "#1e1e1e",
              borderRadius: "6px 6px 0 0",
              fontSize: "11px",
              color: "#a78bfa",
              fontFamily: "monospace",
              fontWeight: "600",
            }}>
              {t.name}
            </div>
            <div style={{ overflowX: "auto", borderRadius: "0 0 6px 6px", border: "1px solid #e2e8f0", borderTop: "none" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>
                    {t.columns.map((col) => (
                      <th key={col} style={{
                        padding: "6px 12px",
                        background: "#f1f5f9",
                        borderBottom: "1px solid #e2e8f0",
                        textAlign: "left",
                        fontFamily: "monospace",
                        color: "#475569",
                        whiteSpace: "nowrap",
                        fontWeight: "600",
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {t.columns.map((col) => (
                        <td key={col} style={{
                          padding: "6px 12px",
                          borderBottom: i < t.rows.length - 1 ? "1px solid #f1f5f9" : "none",
                          fontFamily: "monospace",
                          color: col === "status"
                            ? row[col] === "online" ? "#16a34a" : "#dc2626"
                            : col === "acknowledged"
                            ? row[col] === 1 ? "#16a34a" : "#dc2626"
                            : "#374151",
                          whiteSpace: "nowrap",
                        }}>
                          {col === "acknowledged" ? (row[col] === 1 ? "true" : "false") : String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Query editor */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{
          padding: "6px 12px",
          background: "#1e1e1e",
          borderRadius: "6px 6px 0 0",
          fontSize: "11px",
          color: "#6b7280",
          fontFamily: "monospace",
        }}>
          your query
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}

          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) runQuery();
          }}
          spellCheck={false}
          placeholder={"SELECT ...\nFROM ...\nJOIN ...\nWHERE ...\nORDER BY ..."}
          style={{
            width: "100%",
            minHeight: "140px",
            background: "#0d0d0d",
            color: "#d1d5db",
            border: "none",
            borderRadius: "0 0 6px 6px",
            padding: "12px",
            fontFamily: "monospace",
            fontSize: "13px",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
            lineHeight: "1.7",
          }}
        />
      </div>

      <button
        onClick={runQuery}
        disabled={loading || !query.trim()}
        style={{
          padding: "7px 20px",
          background: query.trim() ? "#111" : "#e5e7eb",
          color: query.trim() ? "#fff" : "#9ca3af",
          border: "none",
          borderRadius: "6px",
          fontSize: "13px",
          cursor: query.trim() ? "pointer" : "default",
          marginBottom: "1.25rem",
        }}
      >
        {loading ? "Running..." : "Run query"}
      </button>

      {/* Error */}
      {error && (
        <div style={{
          padding: "10px 14px",
          borderRadius: "6px",
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          fontSize: "12px",
          color: "#b91c1c",
          fontFamily: "monospace",
          marginBottom: "1rem",
        }}>
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>
            {result.length === 0
              ? "Query ran successfully — 0 rows returned."
              : `${result.length} row${result.length !== 1 ? "s" : ""} returned`}
            {result.length === 1 && (
              <span style={{ marginLeft: "8px", color: "#22c55e", fontWeight: "600" }}>
                Correct!
              </span>
            )}
          </div>

          {result.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col} style={{
                        padding: "6px 12px",
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        textAlign: "left",
                        fontFamily: "monospace",
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      {columns.map((col) => (
                        <td key={col} style={{
                          padding: "6px 12px",
                          border: "1px solid #e2e8f0",
                          fontFamily: "monospace",
                          color: "#374151",
                          whiteSpace: "nowrap",
                        }}>
                          {String(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
