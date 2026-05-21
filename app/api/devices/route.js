const devices = [
  { id: 1, name: "Living Room Sensor", status: "online",  location: "Living Room" },
  { id: 2, name: "Kitchen Hub",        status: "offline", location: "Kitchen"     },
];

export function GET() {
  return Response.json({ devices });
}

export async function POST(request) {
  const body = await request.json();

  // BUG: no validation — name can be empty, status can be any string, location can be missing
  const device = {
    id: Date.now(),
    name: body.name,
    status: body.status,
    location: body.location,
  };

  devices.push(device);
  return Response.json(device); // always 200, even for garbage input
}
