import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const deviceId = searchParams.get("deviceId") || "device-1";

  await pusher.trigger("origin-software-coop", "new-alert", {
    message: `Alert from ${deviceId} at ${new Date().toLocaleTimeString()}`,
  });

  return Response.json({ ok: true });
}