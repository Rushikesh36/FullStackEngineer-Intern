"use client";

import { useState } from "react";

const allDevices = Array.from({ length: 200 }, (_, i) => ({
  id: `d-${i}`,
  name: `Device ${String(i).padStart(3, "0")}`,
}));

export default function DeviceDashboard() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  console.log("sort running"); 

  const filtered = allDevices
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "480px",
        background: darkMode ? "#111" : "#fff",
        color: darkMode ? "#fff" : "#111",
      }}
    >
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q4. Device search</h2>
      <p style={{ fontSize: "13px", color: darkMode ? "#aaa" : "#666", marginBottom: "1rem" }}>
        Open the browser console and toggle dark mode. Why does{" "}
        <code style={{ background: darkMode ? "#333" : "#f3f4f6", padding: "1px 5px", borderRadius: "4px" }}>sort running</code>{" "}
        print even when the search did not change?
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search devices..."
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "14px",
            background: darkMode ? "#222" : "#fff",
            color: darkMode ? "#fff" : "#111",
          }}
        />
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        {filtered.map((d) => (
          <div
            key={d.id}
            style={{
              padding: "8px 14px",
              fontSize: "13px",
              borderBottom: "1px solid #f3f4f6",
              background: darkMode ? "#1a1a1a" : "#fff",
              color: darkMode ? "#fff" : "#111",
            }}
          >
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}