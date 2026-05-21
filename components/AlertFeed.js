"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";

let bindCount = 0;

export default function AlertFeed({ filter }) {
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [receiveCount, setReceiveCount] = useState(0);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("origin-software-coop");

    bindCount += 1;
    console.log(`new-alert bound ${bindCount} time(s) — filter: "${filter}"`);

    channel.bind("pusher:subscription_succeeded", () => {
      setStatus("connected");
    });

    channel.bind("new-alert", (data) => {
      console.log(`new-alert fired — currently ${bindCount} binding(s) active`);
      setReceiveCount((c) => c + 1);
      setAlerts((prev) => [...prev, { ...data, receivedAt: Date.now() }]);
    });

    // BUG: no cleanup — every filter click adds a new binding on top
  }, [filter]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
        padding: "8px 12px",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        fontSize: "13px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: status === "connected" ? "#22c55e" : "#f59e0b",
          }} />
          {status === "connected" ? "Connected" : "Connecting..."}
        </div>
        <div style={{
          fontSize: "12px",
          padding: "3px 10px",
          borderRadius: "999px",
          background: receiveCount > 1 ? "#fef2f2" : "#f0fdf4",
          border: `1px solid ${receiveCount > 1 ? "#fca5a5" : "#86efac"}`,
          color: receiveCount > 1 ? "#ef4444" : "#22c55e",
        }}>
          received {receiveCount} time{receiveCount !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        minHeight: "150px",
        maxHeight: "200px",
        overflowY: "auto",
      }}>
        {alerts.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#999", fontSize: "13px" }}>
            Waiting for alerts...
          </div>
        ) : (
          alerts.map((alert, i) => (
            <div key={i} style={{ padding: "10px 14px", borderBottom: "1px solid #f3f4f6", fontSize: "13px" }}>
              <div>{alert.message}</div>
              <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                {new Date(alert.receivedAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}