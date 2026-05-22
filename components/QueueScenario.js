"use client";

import { useState } from "react";

export default function QueueScenario({ value = "", onChange }) {
  const answer = value;
  const setAnswer = (v) => onChange?.(v);
  const [status, setStatus] = useState("idle"); // "idle" | "saving" | "saved"

  async function submitAnswer() {
    setStatus("saving");
    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "queue-answer", content: answer }),
    });
    setStatus("saved");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "640px" }}>

      {/* Scenario */}
      <div style={{
        marginBottom: "1.25rem",
        padding: "16px 18px",
        borderRadius: "8px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        fontSize: "13px",
        color: "#334155",
        lineHeight: "1.75",
      }}>
        <p style={{ margin: "0 0 10px", fontWeight: "600", color: "#0f172a" }}>Situation</p>
        <p style={{ margin: "0 0 10px" }}>
          The platform's{" "}
          <code style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: "4px" }}>POST /api/alerts</code>
          {" "}webhook handles every incoming alert <strong>synchronously</strong> inside the request handler, it validates
          the payload, writes to the database, sends an email notification, and fires a real-time event, all before
          returning a response:
        </p>

        {/* Current code block */}
        <div style={{
          background: "#0d0d0d",
          borderRadius: "6px",
          padding: "12px 14px",
          fontFamily: "monospace",
          fontSize: "12px",
          marginBottom: "12px",
          lineHeight: "1.7",
          color: "#d1d5db",
        }}>
          <div><span style={{ color: "#7dd3fc" }}>export async function</span> <span style={{ color: "#86efac" }}>POST</span>(req) {"{"}</div>
          <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7dd3fc" }}>const</span> alert = <span style={{ color: "#7dd3fc" }}>await</span> req.<span style={{ color: "#86efac" }}>json</span>();</div>
          <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7dd3fc" }}>await</span> db.<span style={{ color: "#86efac" }}>insert</span>(alert);           <span style={{ color: "#6b7280" }}>// ~50 ms</span></div>
          <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7dd3fc" }}>await</span> emailService.<span style={{ color: "#86efac" }}>send</span>(alert);   <span style={{ color: "#6b7280" }}>// ~200 ms</span></div>
          <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7dd3fc" }}>await</span> pusher.<span style={{ color: "#86efac" }}>trigger</span>(...);       <span style={{ color: "#6b7280" }}>// ~30 ms</span></div>
          <div style={{ paddingLeft: "16px" }}><span style={{ color: "#7dd3fc" }}>return</span> Response.<span style={{ color: "#86efac" }}>json</span>({"{"}  ok: <span style={{ color: "#f59e0b" }}>true</span>  {"}"});</div>
          <div>{"}"}</div>
          <div style={{ marginTop: "8px", color: "#6b7280" }}>{"// ~280 ms per request"}</div>
        </div>

        {/* What's going wrong */}
        <p style={{ margin: "0 0 6px", fontWeight: "600", color: "#0f172a" }}>What is happening in production</p>
        <ul style={{ margin: "0 0 12px", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "5px" }}>
          <li>During the 8–9 AM warehouse shift start, <strong>~600 alerts/second</strong> arrive simultaneously.</li>
          <li>The server runs out of available connections and starts queuing requests internally.</li>
          <li>Requests that wait too long are rejected with{" "}
            <code style={{ background: "#fee2e2", padding: "1px 5px", borderRadius: "4px", color: "#b91c1c" }}>504 Gateway Timeout</code>.
          </li>
          <li>Alerts are silently dropped on-call engineers never see them.</li>
          <li>Even when the spike passes, the email service remains backed up for several minutes.</li>
        </ul>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e2e8f0", margin: "12px 0" }} />

        <p style={{ margin: "0 0 8px", fontWeight: "600", color: "#0f172a" }}>Describe how you would solve this:</p>
        <ol style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <li>What is the core problem with the current design?</li>
          <li>How would you change the architecture so the webhook can always respond quickly, even under load?</li>
          <li>How do you make sure no alert is lost if a downstream step (email, real-time event) fails temporarily?</li>
          <li>
            <code style={{ background: "#fee2e2", padding: "1px 4px", borderRadius: "4px", color: "#b91c1c" }}>critical</code>{" "}
            alerts must reach on-call engineers faster than{" "}
            <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "4px" }}>info</code>{" "}
            alerts. How would your design handle that?
          </li>
          <li>What tools, patterns, or infrastructure would you use, and why?</li>
        </ol>
      </div>

      {/* Answer box */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div style={{
          padding: "6px 12px",
          background: "#1e1e1e",
          borderRadius: "6px 6px 0 0",
          fontSize: "11px",
          color: "#6b7280",
          fontFamily: "monospace",
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span>your answer</span>
          <span>{answer.trim().split("\n").filter(Boolean).length} line(s)</span>
        </div>
        <textarea
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setStatus("idle"); }}
          spellCheck={false}
          placeholder={"Describe your approach in plain English...\n"}
          style={{
            width: "100%",
            minHeight: "220px",
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
        onClick={submitAnswer}
        disabled={status === "saving" || !answer.trim()}
        style={{
          padding: "7px 20px",
          background: answer.trim() ? "#111" : "#e5e7eb",
          color: answer.trim() ? "#fff" : "#9ca3af",
          border: "none",
          borderRadius: "6px",
          fontSize: "13px",
          cursor: answer.trim() ? "pointer" : "default",
          marginBottom: "1.25rem",
        }}
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Submit answer"}
      </button>

    </div>
  );
}
