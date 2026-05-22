"use client";

import { useState, useEffect } from "react";

export default function DeviceStatus({ deviceId }) {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/device?id=${deviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setDevice(data);
        setLoading(false);
      });
  }, [deviceId]);

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q5 — Device lookup</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        The component below fetches <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: "4px" }}>device-99</code>,
        which does not exist in the API. It should show an error message — but it does not.
      </p>

      {/* Context block */}
      <div style={{
        marginBottom: "1rem",
        padding: "12px 14px",
        borderRadius: "8px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        fontSize: "12px",
        color: "#475569",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}>
        <div><strong>Scenario:</strong> A client requests a device ID that does not exist.</div>
        <div><strong>Expected:</strong> API returns <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "3px" }}>404 Not Found</code> → UI shows an error message.</div>
        <div><strong>Actual:</strong> Open the Network tab and check the status code on <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "3px" }}>GET /api/device?id=device-99</code>.</div>
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "6px" }}>
          <strong>Your task:</strong> Find the bug in both the API route and this component. Fix both.
        </div>
      </div>


      {loading ? (
        <div style={{ fontSize: "13px", color: "#999" }}>Loading...</div>
      ) : (
        <div style={{
          padding: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "13px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          {/* BUG: device could be { error: "Device not found" } not a real device */}
          <div>Name: <strong>{device?.name ?? "—"}</strong></div>
          <div>Status:{" "}
            <strong style={{ color: device?.status === "online" ? "#22c55e" : "#ef4444" }}>
              {device?.status ?? "—"}
            </strong>
          </div>
          <div>Temp: <strong>{device?.temp ?? "—"}</strong></div>
        </div>
      )}
    </div>
  );
}