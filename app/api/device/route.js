export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "device-1";

  const devices = {
    "device-1": { id: "device-1", name: "Living Room Sensor", status: "online", temp: "22°C" },
    "device-2": { id: "device-2", name: "Kitchen Hub", status: "offline", temp: "19°C" },
    "device-3": { id: "device-3", name: "Bedroom Monitor", status: "online", temp: "21°C" },
  };
  console.log(devices[id])


  return Response.json(devices[id] === undefined ? { status: 404 } : { status: 200});
}