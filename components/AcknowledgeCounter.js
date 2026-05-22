"use client";

import { useState } from "react";

export default function AcknowledgeCounter() {
  const [count, setCount] = useState(0);

  async function handleAcknowledge() {
    await new Promise((res) => setTimeout(res, 1000));
    setCount(count + 1);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q2. Acknowledge alerts</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Click the button 3 times quickly. The count should reach 3, does it?
      </p>
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", fontWeight: "500", marginBottom: "1rem" }}>
          {count}
        </div>
        <p style={{ fontSize: "13px", color: "#999", marginBottom: "1rem" }}>
          alerts acknowledged
        </p>
        <button onClick={handleAcknowledge}>Acknowledge</button>
      </div>
    </div>
  );
}