import { promises as fs } from "node:fs";
import path from "node:path";

const DB_PATH = path.resolve(process.cwd(), "formforge-db.json");

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const seed = { forms: [], submissions: [], lastSubmissionId: 0 };
    await fs.writeFile(DB_PATH, JSON.stringify(seed, null, 2));
  }
}

export async function readDb() {
  await ensureDb();
  const text = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(text);
}

export async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}
