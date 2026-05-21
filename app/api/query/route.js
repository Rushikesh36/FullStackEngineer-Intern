import alasql from "alasql";

let seeded = false;

function seed() {
  if (seeded) return;
  seeded = true;

  alasql("CREATE TABLE IF NOT EXISTS devices (id INT, name STRING, location STRING, status STRING)");
  alasql("CREATE TABLE IF NOT EXISTS alerts (id INT, device_id INT, severity STRING, message STRING, created_at STRING, acknowledged INT)");

  alasql.tables.devices.data = [
    { id: 1, name: "Warehouse Sensor A", location: "Warehouse", status: "online"  },
    { id: 2, name: "Office Hub",         location: "Office",    status: "online"  },
    { id: 3, name: "Warehouse Sensor B", location: "Warehouse", status: "offline" },
  ];

  alasql.tables.alerts.data = [
    { id: 1, device_id: 1, severity: "critical", message: "Temp exceeded 80°C", created_at: "2024-06-01 09:15", acknowledged: 0 },
    { id: 2, device_id: 1, severity: "warning",  message: "Battery below 10%",  created_at: "2024-06-01 08:00", acknowledged: 1 },
    { id: 3, device_id: 2, severity: "info",     message: "Rebooted",            created_at: "2024-06-01 07:30", acknowledged: 0 },
    { id: 4, device_id: 3, severity: "critical", message: "No signal",           created_at: "2024-06-01 06:00", acknowledged: 0 },
  ];
}

export function GET() {
  seed();
  return Response.json({
    status: "ok",
    tables: { devices: alasql.tables.devices.data, alerts: alasql.tables.alerts.data },
  });
}

export async function POST(request) {
  const { query } = await request.json();

  if (!query?.trim()) {
    return Response.json({ error: "No query provided." }, { status: 400 });
  }

  if (!query.trim().toLowerCase().startsWith("select")) {
    return Response.json({ error: "Only SELECT statements are allowed." }, { status: 400 });
  }

  try {
    seed();
    const rows = alasql(query);
    return Response.json({ rows });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
