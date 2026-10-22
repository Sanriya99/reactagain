import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const PORT = process.env.PORT || 3001;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
fs.mkdirSync(path.join(rootDir, 'data'), { recursive: true });
const db = new DatabaseSync(path.join(rootDir, 'data', 'portfolio.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  )
`);

const insertContact = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');

const app = express();
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const name = String(req.body.name ?? '').trim();
  const email = String(req.body.email ?? '').trim();
  const message = String(req.body.message ?? '').trim();

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message must be 2000 characters or fewer.' });
  }

  insertContact.run(name, email, message);
  res.status(201).json({ ok: true });
});

const distDir = path.join(rootDir, 'dist');
app.use(express.static(distDir));
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
