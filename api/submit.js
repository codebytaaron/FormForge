import { readDb, writeDb } from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { formId } = req.query;
  if (!formId) return res.status(400).end();

  const db = await readDb();

  db.lastSubmissionId += 1;
  db.submissions.push({
    id: db.lastSubmissionId,
    form_id: formId,
    data: JSON.stringify(req.body),
    created_at: new Date().toISOString()
  });

  await writeDb(db);

  res.json({ success: true });
}
