const devices = [
  { id: 1, name: "Living Room Sensor", status: "online",  location: "Living Room" },
  { id: 2, name: "Kitchen Hub",        status: "offline", location: "Kitchen"     },
];

export function GET() {
  return Response.json({ devices });
}

export async function POST(request) {
  const body = await request.json();
  const {name, status, location} = body

  if (name == ''){
    return Response.json({status: 400}, {body: "Name field is empty"})
  }
  if (status != 'online' || status != 'offline'){
    return Response.json({status: 400}, {body: "status should be either online or offline"})
  }
  if (location == ''){
    return Response.json({status: 400}, {body: "location field is empty"})
  }
  const device = {
    id: Date.now(),
    name: body.name,
    status: body.status,
    location: body.location,
  };

  devices.push(device);
  return Response.json(device); 
}

