import { readDb } from "../../lib/db.js";

export default async function handler(req, res) {
  const { formId } = req.query;
  if (!formId) return res.status(400).end();

  const db = await readDb();

  const rows = db.submissions
    .filter((submission) => submission.form_id === formId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json(rows);
}
