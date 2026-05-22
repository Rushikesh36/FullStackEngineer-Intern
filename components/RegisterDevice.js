"use client";

import { useState, useEffect } from "react";

const VALID_STATUSES = ["online", "offline"];

export default function RegisterDevice() {
  const [devices, setDevices] = useState([]);
  const [form, setForm] = useState({ name: "", status: "", location: "" });
  const [lastResponse, setLastResponse] = useState(null);

  useEffect(() => {
    fetch("/api/devices").then((r) => r.json()).then((d) => setDevices(d.devices));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLastResponse({ status: res.status, body: data });
    if (res.ok) {
      setDevices((prev) => [...prev, data]);
      setForm({ name: "", status: "", location: "" });
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "480px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q6 — Register a device</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Try submitting the form with an <strong>empty name</strong>, or type{" "}
        <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: "4px" }}>superonline</code>{" "}
        as the status. What does the API return? Should it?
      </p>

      {/* Context */}
      <div style={{
        marginBottom: "1.25rem",
        padding: "12px 14px",
        borderRadius: "8px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        fontSize: "12px",
        color: "#475569",
        lineHeight: "1.6",
      }}>
        <div><strong>Valid statuses:</strong>{" "}
          {VALID_STATUSES.map((s) => (
            <code key={s} style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: "4px", marginRight: "6px" }}>{s}</code>
          ))}
        </div>
        <div style={{ marginTop: "6px" }}>
          <strong>Your task:</strong> Find where the bug is, API or frontend? Fix it so invalid input
          returns <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "4px" }}>400 Bad Request</code> with an error message.
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.25rem" }}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Device name"
          style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px" }}
        />
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Location"
          style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px" }}
        />
        <input
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          placeholder={`Status  (try typing anything)`}
          style={{ padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px" }}
        />
        <button type="submit" style={{
          padding: "8px 16px", background: "#111", color: "#fff",
          border: "none", borderRadius: "6px", fontSize: "13px", cursor: "pointer",
        }}>
          Register
        </button>
      </form>

      {/* Last API response */}
      {lastResponse && (
        <div style={{
          marginBottom: "1.25rem",
          padding: "10px 12px",
          borderRadius: "6px",
          background: lastResponse.status === 200 ? "#fefce8" : "#f0fdf4",
          border: `1px solid ${lastResponse.status === 200 ? "#fde68a" : "#86efac"}`,
          fontSize: "12px",
          fontFamily: "monospace",
        }}>
          <span style={{ color: "#6b7280" }}>API responded </span>
          <strong style={{ color: lastResponse.status === 200 ? "#b45309" : "#166534" }}>
            {lastResponse.status}
          </strong>
          <span style={{ color: "#6b7280" }}>  →  </span>
          <code>{JSON.stringify(lastResponse.body)}</code>
        </div>
      )}

      {/* Device list */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ padding: "8px 14px", background: "#f9fafb", fontSize: "11px", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>
          registered devices ({devices.length})
        </div>
        {devices.map((d) => (
          <div key={d.id} style={{
            padding: "8px 14px",
            fontSize: "13px",
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
          }}>
            <span>{d.name || <em style={{ color: "#ef4444" }}>no name</em>}</span>
            <span style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "999px",
              background: d.status === "online" ? "#dcfce7" : d.status === "offline" ? "#f3f4f6" : "#fee2e2",
              color: d.status === "online" ? "#166534" : d.status === "offline" ? "#6b7280" : "#b91c1c",
            }}>
              {d.status || "no status"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
