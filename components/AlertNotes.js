"use client";

import { useState } from "react";

const INITIAL_ALERTS = [
  { id: "a1", device: "Warehouse Sensor A", message: "Temp exceeded 80°C", severity: "critical" },
  { id: "a2", device: "Office Hub",         message: "Rebooted unexpectedly", severity: "warning" },
  { id: "a3", device: "Bedroom Monitor",    message: "Battery below 10%",  severity: "warning" },
  { id: "a4", device: "Kitchen Hub",        message: "No signal for 5 min", severity: "critical" },
];

export default function AlertNotes() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  function dismiss(id) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "480px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q10 — Alert notes</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Type a note into the <strong>first</strong> input, then dismiss the{" "}
        <strong>first</strong> alert. Watch where your note ends up.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {alerts.map((alert, index) => (
          // BUG: key uses array index — React reuses DOM nodes in wrong order after dismissal
          <div key={index} style={{
            padding: "12px 14px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{
                  fontSize: "11px",
                  padding: "2px 7px",
                  borderRadius: "999px",
                  background: alert.severity === "critical" ? "#fee2e2" : "#fef9c3",
                  color: alert.severity === "critical" ? "#b91c1c" : "#854d0e",
                  marginRight: "8px",
                }}>
                  {alert.severity}
                </span>
                <span style={{ fontSize: "13px", fontWeight: "500" }}>{alert.device}</span>
              </div>
              <button
                onClick={() => dismiss(alert.id)}
                style={{
                  fontSize: "12px", padding: "3px 10px", borderRadius: "6px",
                  border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", color: "#6b7280",
                }}
              >
                Dismiss
              </button>
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>{alert.message}</div>
            <input
              placeholder="Add a note..."
              style={{
                padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: "6px",
                fontSize: "12px", outline: "none",
              }}
            />
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div style={{ fontSize: "13px", color: "#999", textAlign: "center", padding: "2rem" }}>
          All alerts dismissed.
        </div>
      )}
    </div>
  );
}
