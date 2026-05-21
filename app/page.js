"use client";

import { useState } from "react";
import DeviceList from "../components/DeviceList";
import AcknowledgeCounter from "../components/AcknowledgeCounter";
import UptimeCounter from "../components/UptimeCounter";
import DeviceDashboard from "../components/DeviceDashboard";
import AlertFeedWrapper from "../components/AlertFeedWrapper";
import DeviceStatus from "../components/DeviceStatus";
import RegisterDevice from "../components/RegisterDevice";
import GitScenario from "../components/GitScenario";
import DBQuery from "../components/DBQuery";
import AlertNotes from "../components/AlertNotes";

// ── Design tokens (Origin Wireless AI design doc) ─────────────────────────────
const C = {
  brand500:  "#00AB8E",
  brand600:  "#0C9D83",
  brand700:  "#00705E",
  brand400:  "#19B99A",
  brand100:  "#B5F7EB",
  brand50:   "#DCFFF8",
  gray50:    "#F7FAFC",
  gray100:   "#EDF2F7",
  gray200:   "#E2E8F0",
  gray400:   "#A0AEC0",
  gray500:   "#718096",
  gray600:   "#4A5568",
  gray700:   "#2D3748",
  gray800:   "#1A202C",
  gray900:   "#171923",
  white:     "#ffffff",
  header:    "#0f172a",
  hoverBg:   "#F5FCFB",
};



// ── Question registry ─────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    number: 1,
    title: "Closure in a Loop",
    short: "Closure in a Loop",
    tags: ["JavaScript", "Closures"],
    difficulty: "easy",
    description: "A classic JavaScript closure trap. Each button shares a variable that gets overwritten during the render loop. This pattern shows up constantly in loops, timers, and async callbacks — understanding it is fundamental to writing correct event handlers.",
    component: DeviceList,
  },
  {
    number: 2,
    title: "Stale State in Async Handler",
    short: "Stale State",
    tags: ["React", "State"],
    difficulty: "easy",
    description: "React state updates are asynchronous and batched. When you read state directly inside an async handler, you capture a stale snapshot from the last render. This is one of the most common bugs in React apps that use async operations.",
    component: AcknowledgeCounter,
  },
  {
    number: 3,
    title: "State vs. Ref",
    short: "State vs. Ref",
    tags: ["React", "Performance"],
    difficulty: "medium",
    description: "Not every value that changes needs to live in React state. Storing a computed value in state forces a re-render on every update, even when nothing visible needs to change. Understanding the difference between state, refs, and derived values is key to writing performant components.",
    component: UptimeCounter,
  },
  {
    number: 4,
    title: "Missing useMemo",
    short: "Missing useMemo",
    tags: ["React", "Performance"],
    difficulty: "medium",
    description: "Expensive computations like sorting and filtering run on every render by default — even when their inputs have not changed. useMemo lets you cache the result and skip re-computation when unrelated state changes, like a theme toggle.",
    component: DeviceDashboard,
  },
  {
    number: 5,
    title: "Missing Effect Cleanup",
    short: "Effect Cleanup",
    tags: ["React", "WebSockets"],
    difficulty: "medium",
    description: "Every useEffect that sets up a subscription, interval, or event listener must return a cleanup function. Without it, old subscriptions stack up silently — each one still active and consuming resources. This is especially dangerous with real-time connections like Pusher or WebSockets.",
    component: AlertFeedWrapper,
  },
  {
    number: 6,
    title: "Wrong HTTP Status Code",
    short: "HTTP Status Code",
    tags: ["Backend", "HTTP"],
    difficulty: "medium",
    description: "HTTP status codes are the contract between server and client. A server that returns 200 for every response — including errors — breaks that contract. The client has no reliable way to distinguish success from failure without checking res.ok, and the server must send the correct status code.",
    component: DeviceStatus,
    props: { deviceId: "device-99" },
  },
  {
    number: 7,
    title: "Missing Server-Side Validation",
    short: "Input Validation",
    tags: ["Backend", "Validation"],
    difficulty: "easy",
    description: "Client-side validation is a UX convenience, not a security measure. Any HTTP client can bypass browser forms entirely and POST arbitrary data directly to your API. Server-side validation is mandatory — treat every incoming request as potentially malicious.",
    component: RegisterDevice,
  },
  {
    number: 8,
    title: "Rewriting Git History",
    short: "Git History",
    tags: ["Git"],
    difficulty: "medium",
    description: "Accidentally committing secrets to version control is a common and serious mistake. Even if you delete the file in the next commit, the secret remains visible in git history. Interactive rebase lets you rewrite history before pushing — essential knowledge for any developer working with credentials or env files.",
    component: GitScenario,
  },
  {
    number: 9,
    title: "SQL JOIN and Filtering",
    short: "SQL JOIN",
    tags: ["SQL"],
    difficulty: "medium",
    description: "Most real-world data spans multiple tables. A JOIN lets you combine related rows using a shared key, and WHERE clauses filter to exactly what you need. Knowing how to express multi-condition queries is a core backend skill that applies across every relational database.",
    component: DBQuery,
  },
  {
    number: 10,
    title: "Index as Key",
    short: "Index as Key",
    tags: ["React", "Keys"],
    difficulty: "easy",
    description: "React uses the key prop to track which DOM node belongs to which list item. Using the array index as a key is a subtle but common mistake — when items are removed or reordered, React reuses the wrong DOM node, causing input state, focus, and animations to bleed into the wrong elements.",
    component: AlertNotes,
  },
];




// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  return (
    <div style={{
      height: 48,
      background: C.brand700,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      flexShrink: 0,
      borderBottom: `1px solid ${C.brand600}`,
    }}>
      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: C.white, letterSpacing: "-0.01em" }}>
        Technical Assessment
      </span>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ questions, currentIndex, onSelect }) {
  return (
    <div style={{
      width: 236,
      flexShrink: 0,
      background: C.white,
      borderRight: `1px solid ${C.gray200}`,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    }}>
      {/* Top label */}
      <div style={{
        padding: "14px 16px 10px",
        fontSize: "0.75rem",
        fontWeight: 500,
        color: C.gray500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        borderBottom: `1px solid ${C.gray100}`,
        flexShrink: 0,
      }}>
        Questions
      </div>

      {/* Question list */}
      <div style={{ flex: 1, padding: "6px 0" }}>
        {questions.map((q, i) => {
          const active = i === currentIndex;
          return (
            <button
              key={q.number}
              onClick={() => onSelect(i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "9px 16px",
                border: "none",
                borderLeft: active ? `3px solid ${C.brand500}` : "3px solid transparent",
                borderRadius: 0,
                background: active ? C.brand50 : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 150ms cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = C.hoverBg; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              {/* Number */}
              <span style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: active ? C.brand600 : C.gray400,
                minWidth: 20,
                paddingTop: 1,
                fontVariantNumeric: "tabular-nums",
              }}>
                {String(q.number).padStart(2, "0")}
              </span>

              {/* Title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "0.875rem",
                  fontWeight: active ? 700 : 400,
                  color: active ? "#004438" : C.gray700,
                  lineHeight: 1.4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {q.short}
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}

// ── Question content ──────────────────────────────────────────────────────────

function QuestionContent({ q }) {
  const Component = q.component;
  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.gray50, padding: 24 }}>

      {/* Meta card */}
      <div style={{
        background: C.white,
        border: `1px solid ${C.gray200}`,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        padding: 24,
        marginBottom: 16,
      }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: C.brand500, letterSpacing: "0.04em" }}>
            Q{q.number}
          </span>
        </div>
        <h2 style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: C.gray800,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}>
          {q.title}
        </h2>
      </div>

      {/* Component card */}
      <div style={{
        background: C.white,
        border: `1px solid ${C.gray200}`,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {q.props ? <Component {...q.props} /> : <Component />}
      </div>

    </div>
  );
}

// ── Finish screen ─────────────────────────────────────────────────────────────

function FinishScreen({ onRestart }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: C.header,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    }}>
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "rgba(0,171,142,0.15)",
          border: `2px solid rgba(0,171,142,0.4)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: C.brand400,
          margin: "0 auto 20px",
        }}>
          ✓
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 10, letterSpacing: "-0.02em" }}>
          Assessment Complete
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: 32 }}>
          You have reviewed all 10 questions. Make sure your fixes and explanations
          are documented — we will discuss your reasoning in the next round.
        </p>
        <button
          onClick={onRestart}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#cbd5e1",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          Review from beginning
        </button>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  function select(i) {
    setCurrentIndex(i);
  }

  function handleFinish() {
    setFinished(true);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setFinished(false);
    setStarted(false);
  }

  if (finished) return <FinishScreen onRestart={handleRestart} />;

  // Welcome screen
  if (!started) {
    return (
      <div style={{
        minHeight: "100vh",
        background: C.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}>
        <div style={{ maxWidth: 520, width: "100%" }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: C.brand700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            Software Co-op<br />Technical Assessment
          </h1>
          <p style={{ fontSize: "0.875rem", color: C.gray500, lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
            Ten questions across React, JavaScript, backend APIs, SQL, and Git.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: 0,
            marginBottom: 32,
            borderRadius: 8,
            overflow: "hidden",
            border: `1px solid ${C.gray200}`,
          }}>
            {[
              { v: "10",      l: "Questions"     },
              { v: "~60 min", l: "Estimated time" },
            ].map((s, i, arr) => (
              <div key={s.l} style={{
                flex: 1,
                padding: "14px 16px",
                background: C.gray50,
                borderRight: i < arr.length - 1 ? `1px solid ${C.gray200}` : "none",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 700, color: C.brand700, marginBottom: 2 }}>{s.v}</div>
                <div style={{ fontSize: "0.75rem", color: C.gray500 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            style={{
              width: "100%",
              padding: "13px 24px",
              borderRadius: 8,
              background: C.brand500,
              border: `1px solid ${C.brand500}`,
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.brand600; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.brand500; }}
          >
            Begin Assessment →
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentIndex];
  const isLast = currentIndex === QUESTIONS.length - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      <Header />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <Sidebar
          questions={QUESTIONS}
          currentIndex={currentIndex}
          onSelect={select}
        />

        <QuestionContent q={q} />

      </div>

      {/* Subtle bottom bar with finish button on last question */}
      {isLast && (
        <div style={{
          height: 52,
          background: C.white,
          borderTop: `1px solid ${C.gray200}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 24px",
          flexShrink: 0,
        }}>
          <button
            onClick={handleFinish}
            style={{
              padding: "8px 24px",
              borderRadius: 8,
              background: C.brand500,
              border: `1px solid ${C.brand500}`,
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.brand600; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.brand500; }}
          >
            Submit Assessment ✓
          </button>
        </div>
      )}

    </div>
  );
}
