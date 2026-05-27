"use client";

import { useState } from "react";
import DeviceList from "../components/DeviceList";
import AcknowledgeCounter from "../components/AcknowledgeCounter";
import UptimeCounter from "../components/UptimeCounter";
import DeviceDashboard from "../components/DeviceDashboard";
import DeviceStatus from "../components/DeviceStatus";
import RegisterDevice from "../components/RegisterDevice";
import Scenario from "../components/Scenario";
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
    description: "Click any of the buttons below. They all show the same number, but they shouldn't. Each button was created inside a loop, and something about how that loop captured the value went wrong.",
    files: ["components/DeviceList.js"],
    component: DeviceList,
  },
  {
    number: 2,
    title: "Stale State in Async Handler",
    short: "Stale State",
    tags: ["React", "State"],
    difficulty: "easy",
    description: "Hit the acknowledge button a few times quickly. The count doesn't add up. The handler is reading a value that was already out of date before it even ran.",
    files: ["components/AcknowledgeCounter.js"],
    component: AcknowledgeCounter,
  },
  {
    number: 3,
    title: "State vs. Ref",
    short: "State vs. Ref",
    tags: ["React", "Performance"],
    difficulty: "medium",
    description: "This component tracks how many times it has rendered. Watch the number, it goes up more than it should, and every increment causes another render. The value doesn't need to live where it does.",
    files: ["components/UptimeCounter.js"],
    component: UptimeCounter,
  },
  {
    number: 4,
    title: "Missing useMemo",
    short: "Missing useMemo",
    tags: ["React", "Performance"],
    difficulty: "medium",
    description: "Toggle the theme and watch the console. The device list gets re-sorted every single time, even though the data hasn't changed. Something that should only run when the data changes is running on every render.",
    files: ["components/DeviceDashboard.js"],
    component: DeviceDashboard,
  },
  {
    number: 5,
    title: "Wrong HTTP Status Code",
    short: "HTTP Status Code",
    tags: ["Backend", "HTTP"],
    difficulty: "medium",
    description: "The device being fetched does not exist, but look at what the API sends back. The status code says everything went fine. The frontend believes it.",
    files: ["app/api/device/route.js", "components/DeviceStatus.js"],
    component: DeviceStatus,
    props: { deviceId: "device-009" },
  },
  {
    number: 6,
    title: "Missing Server-Side Validation",
    short: "Input Validation",
    tags: ["Backend", "Validation"],
    difficulty: "easy",
    description: "Leave the name blank, or type anything you want in the status field. The API accepts it without complaint. The server should be the last line of defense, right now it isn't.",
    files: ["app/api/devices/route.js", "components/RegisterDevice.js"],
    component: RegisterDevice,
  },
  {
    number: 7,
    title: "Webhook Overload",
    short: "Webhook Overload",
    tags: ["Backend", "System Design"],
    difficulty: "medium",
    description: "The alert webhook does everything synchronously, DB write, email, real-time event and collapses under 600 requests/second. Describe how you'd redesign the architecture so no alert is ever dropped, critical alerts are prioritized, and the webhook always responds quickly.",
    files: [],
    component: Scenario,
  },
  {
    number: 8,
    title: "SQL JOIN and Filtering",
    short: "SQL JOIN",
    tags: ["SQL"],
    difficulty: "medium",
    description: "Two tables, devices and alerts. Write a query that pulls the one unacknowledged critical alert from the Warehouse, and include the device name alongside it.",
    files: [],
    component: DBQuery,
  },
  {
    number: 9,
    title: "Index as Key",
    short: "Index as Key",
    tags: ["React", "Keys"],
    difficulty: "easy",
    description: "Type a note into the first alert card, then dismiss it. The note doesn't go away, it moves down to the next card. React is reusing the wrong DOM node.",
    files: ["components/AlertNotes.js"],
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

function QuestionContent({ q, answers, setAnswers }) {
  const Component = q.component;

  const extraProps =
    q.number === 7 ? { value: answers.queueAnswer, onChange: (v) => setAnswers((a) => ({ ...a, queueAnswer: v })) } :
    q.number === 8 ? { value: answers.sqlQuery,    onChange: (v) => setAnswers((a) => ({ ...a, sqlQuery: v })) } :
    {};

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
          marginBottom: 10,
        }}>
          {q.title}
        </h2>
        <p style={{ fontSize: "0.8125rem", color: C.gray500, lineHeight: 1.65, margin: 0, marginBottom: q.files?.length ? 14 : 0 }}>
          {q.description}
        </p>
        {q.files?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {q.files.map((f) => (
              <span key={f} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 9px",
                borderRadius: 5,
                background: C.gray50,
                border: `1px solid ${C.gray200}`,
                fontSize: "0.7rem",
                fontFamily: '"SF Mono","Fira Code","Roboto Mono",monospace',
                color: C.gray600,
              }}>
                <span style={{ color: C.brand500, fontSize: "0.7rem" }}>📄</span>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Component card */}
      <div style={{
        background: C.white,
        border: `1px solid ${C.gray200}`,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        <Component {...q.props} {...extraProps} />
      </div>

    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({sqlQuery: "", queueAnswer: "" });
  function select(i) {
    setCurrentIndex(i);
  }

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
            Full Stack Engineer (Intern)<br />Technical Assessment
          </h1>
          
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
              { v: "60 min", l: "Time" },
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
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      <Header />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        <Sidebar
          questions={QUESTIONS}
          currentIndex={currentIndex}
          onSelect={select}
        />

        <QuestionContent q={q} answers={answers} setAnswers={setAnswers} />

      </div>

    </div>
  );
}
