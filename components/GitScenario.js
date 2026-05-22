"use client";


export default function GitScenario({ value = "", onChange }) {
  const answer = value;
  const setAnswer = (v) => onChange?.(v);

  return (
    <div style={{ padding: "2rem", maxWidth: "520px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q7 — Git: clean up and ship</h2>

      {/* Scenario */}
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
        <p style={{ margin: "0 0 10px", fontWeight: "600", color: "#0f172a" }}>Situation</p>
        <p style={{ margin: "0 0 8px" }}>
          You are on branch{" "}
          <code style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: "4px" }}>feature/sensor-dashboard</code>.
          You have 3 local commits and <strong>have not pushed yet</strong>.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          Running <code style={{ background: "#e2e8f0", padding: "1px 5px", borderRadius: "4px" }}>git log --oneline</code> shows:
        </p>

        {/* mini git log */}
        <div style={{
          background: "#0d0d0d",
          borderRadius: "6px",
          padding: "10px 12px",
          fontFamily: "monospace",
          fontSize: "12px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          <div><span style={{ color: "#f59e0b" }}>a3f9c12</span> <span style={{ color: "#d1d5db" }}>add sensor dashboard UI</span></div>
          <div><span style={{ color: "#f59e0b" }}>b7e2d45</span> <span style={{ color: "#f87171" }}>add env config and api wiring</span> <span style={{ color: "#ef4444", fontSize: "11px" }}>← .env.local committed here</span></div>
          <div><span style={{ color: "#f59e0b" }}>c1a8f33</span> <span style={{ color: "#d1d5db" }}>init feature/sensor-dashboard</span></div>
        </div>

        <p style={{ margin: "0 0 6px", fontWeight: "600", color: "#0f172a" }}>Your tasks — write the commands in order:</p>
        <ol style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <li>Use an interactive rebase to go back and edit commit <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "4px" }}>b7e2d45</code></li>
          <li>Remove <code style={{ background: "#fee2e2", padding: "1px 4px", borderRadius: "4px", color: "#b91c1c" }}>.env.local</code> from git tracking</li>
          <li>Add <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "4px" }}>.env.local</code> to <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: "4px" }}>.gitignore</code> so it is never committed again</li>
          <li>Finish the rebase and push the branch</li>
        </ol>
      </div>

      {/* Answer box */}
      <div style={{ marginBottom: "1rem" }}>
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
          onChange={(e) => setAnswer(e.target.value)}

          spellCheck={false}
          placeholder={"# write your git commands here, one per line\ngit ..."}
          style={{
            width: "100%",
            minHeight: "180px",
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

    </div>
  );
}
