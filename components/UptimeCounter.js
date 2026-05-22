"use client";

import { useState, useEffect, useRef } from "react";

let renderCount = 0; 

export default function UptimeCounter() {
  const [elapsed, setElapsed] = useState(0);
  const [mounted, setMounted] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => { setMounted(true); }, []);

  renderCount += 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(((Date.now() - startTime.current)/1000).toFixed(0));

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q3.Device uptime</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Watch the render count. It should NOT increase every second, but it does.
      </p>
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <span style={{ fontSize: "13px", color: "#999" }}>Uptime: </span>
          <span style={{ fontSize: "20px", fontWeight: "500" }}>
            {elapsed} seconds
          </span>
        </div>
        <div style={{
          padding: "8px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#666",
        }}>
          Render count: <strong>{mounted ? renderCount : "—"}</strong>
        </div>
      </div>
    </div>
  );
}