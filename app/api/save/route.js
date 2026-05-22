import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DIR = join(process.cwd(), "responses");

export async function POST(request) {
  const { key, content } = await request.json();

  await mkdir(DIR, { recursive: true });
  await writeFile(join(DIR, `${key}.txt`), content ?? "", "utf8");

  return Response.json({ ok: true });
}
