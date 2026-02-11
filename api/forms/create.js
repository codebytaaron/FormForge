import { readDb, writeDb } from "../../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ error: "Missing fields" });

  const db = await readDb();

  if (db.forms.some((form) => form.id === id)) {
    return res.status(409).json({ error: "Form already exists" });
  }

  db.forms.push({
    id,
    name,
    created_at: new Date().toISOString()
  });

  await writeDb(db);

  res.json({ success: true });
}
