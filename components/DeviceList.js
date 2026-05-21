"use client";

export default function DeviceList() {
  const devices = [
    { id: "d-1", name: "Living Room" },
    { id: "d-2", name: "Kitchen" },
    { id: "d-3", name: "Bedroom" },
  ];

  let selectedId;

  function handleDismiss() {
    alert("Dismissed: " + selectedId);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "16px" }}>Q1 — Dismiss a device</h2>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "1rem" }}>
        Click any Dismiss button. Notice which ID appears in the alert.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {devices.map((device) => {
          selectedId = device.id;
          return (
            <div
              key={device.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "14px" }}>{device.name}</span>
              <button onClick={handleDismiss}>Dismiss</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}