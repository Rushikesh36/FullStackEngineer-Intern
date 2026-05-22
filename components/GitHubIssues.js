"use client";

import { useState, useEffect } from "react";

export default function GitHubIssues() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const rl = data?.rateLimit;
  const isLow = rl && rl.limit <= 60;

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q7. GitHub issues feed</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        This route fetches open issues from the{" "}
        <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: "4px" }}>
          vercel/next.js
        </code>{" "}
        repo. It works on first load but breaks after a few refreshes. Why?
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
        <div>
          <strong>Scenario:</strong> The dashboard deploys fine and works for the first developer.
          On the second dev machine — and in CI — it starts returning errors almost immediately.
        </div>
        <div>
          <strong>Clue:</strong> Every GitHub API response includes{" "}
          <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "3px" }}>
            x-ratelimit-limit
          </code>{" "}
          and{" "}
          <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "3px" }}>
            x-ratelimit-remaining
          </code>{" "}
          headers. Check the values below.
        </div>
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "6px" }}>
          <strong>Your task:</strong> Explain why the limit is what it is, and fix the API
          route so authenticated requests are made instead.
        </div>
      </div>

      {/* Rate limit panel */}
      {!loading && rl && (
        <div style={{
          marginBottom: "1rem",
          padding: "10px 14px",
          borderRadius: "6px",
          border: `1px solid ${isLow ? "#fca5a5" : "#86efac"}`,
          background: isLow ? "#fef2f2" : "#f0fdf4",
          fontSize: "12px",
          color: isLow ? "#b91c1c" : "#166534",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          <div style={{ fontWeight: "600", marginBottom: "2px" }}>
            GitHub rate limit {isLow && "⚠ unauthenticated"}
          </div>
          <div>
            <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: "3px" }}>
              x-ratelimit-limit
            </code>{" "}
            <strong>{rl.limit}</strong>
            {isLow && " (authenticated requests allow 5,000/hour)"}
          </div>
          <div>
            <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 4px", borderRadius: "3px" }}>
              x-ratelimit-remaining
            </code>{" "}
            <strong>{rl.remaining}</strong>
          </div>
          <div>Resets at <strong>{rl.resetsAt}</strong></div>
        </div>
      )}

      {/* Error state */}
      {!loading && data?.error && (
        <div style={{
          marginBottom: "1rem",
          padding: "10px 14px",
          borderRadius: "6px",
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          fontSize: "13px",
          color: "#b91c1c",
        }}>
          GitHub API error: <strong>{data.error}</strong>
        </div>
      )}

      {/* Issues list */}
      {loading ? (
        <div style={{ fontSize: "13px", color: "#999" }}>Loading...</div>
      ) : data?.issues ? (
        <div style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden",
          fontSize: "13px",
        }}>
          {data.issues.map((issue) => (
            <div key={issue.number} style={{
              padding: "10px 14px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}>
              <span style={{ color: "#999", flexShrink: 0 }}>#{issue.number}</span>
              <span>{issue.title}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
