"use client";

import { useState } from "react";
import AlertFeed from "./AlertFeed";

export default function AlertFeedWrapper() {
  const [filter, setFilter] = useState("all");

  return (
    <div style={{ padding: "2rem", maxWidth: "480px" }}>
      <h2 style={{ marginBottom: "4px", fontSize: "16px" }}>Q5 — Live alerts</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Click the filter buttons below then send ONE alert from Pusher dashboard.
        It should appear once — does it?
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        {["all", "critical", "warning"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
              cursor: "pointer",
              background: filter === f ? "#111" : "#fff",
              color: filter === f ? "#fff" : "#111",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <AlertFeed filter={filter} />

      <div style={{
        marginTop: "1rem",
        padding: "10px 14px",
        background: "#fafafa",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#666",
        border: "1px solid #e5e7eb",
      }}>
        <strong>Hint:</strong> Click filters 3 times then send one alert from
        Pusher dashboard. Watch the "received X times" counter — why is it
        more than 1?
      </div>
    </div>
  );
}