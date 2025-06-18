import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY,
      email text UNIQUE NOT NULL,
      password text NOT NULL
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS workflows (
      id uuid PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      nodes jsonb,
      edges jsonb
    );
  `);
}

init().catch(err => console.error('DB init failed', err));

function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/internal/api/v1/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false });
  const hashed = await bcrypt.hash(password, 10);
  const id = uuid();
  await pool.query('INSERT INTO users (id, email, password) VALUES ($1,$2,$3)', [id, email, hashed]);
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string);
  res.json({ success: true, token });
});

app.post('/internal/api/v1/login', async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ success: false });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ success: false });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
  res.json({ success: true, token });
});

app.post('/internal/api/v1/workflows', auth, async (req, res) => {
  const id = uuid();
  const { nodes, edges } = req.body;
  await pool.query('INSERT INTO workflows (id, user_id, nodes, edges) VALUES ($1,$2,$3,$4)', [
    id,
    (req as any).userId,
    JSON.stringify(nodes),
    JSON.stringify(edges)
  ]);
  res.json({ success: true, workflow: { id, nodes, edges } });
});

app.get('/internal/api/v1/workflows', auth, async (req, res) => {
  const { rows } = await pool.query('SELECT id, nodes, edges FROM workflows WHERE user_id=$1', [
    (req as any).userId
  ]);
  res.json({ success: true, workflows: rows });
});

app.get('/internal/api/v1/workflows/:id', auth, async (req, res) => {
  const { rows } = await pool.query('SELECT id, nodes, edges FROM workflows WHERE id=$1 AND user_id=$2', [
    req.params.id,
    (req as any).userId
  ]);
  const workflow = rows[0];
  if (!workflow) return res.status(404).json({ success: false });
  res.json({ success: true, workflow });
});

app.put('/internal/api/v1/workflows/:id', auth, async (req, res) => {
  const { nodes, edges } = req.body;
  await pool.query('UPDATE workflows SET nodes=$1, edges=$2 WHERE id=$3 AND user_id=$4', [
    JSON.stringify(nodes),
    JSON.stringify(edges),
    req.params.id,
    (req as any).userId
  ]);
  res.json({ success: true });
});

app.delete('/internal/api/v1/workflows/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM workflows WHERE id=$1 AND user_id=$2', [
    req.params.id,
    (req as any).userId
  ]);
  res.json({ success: true });
});

const apps = [
  { key: 'shopify', name: 'Shopify' },
  { key: 'etsy', name: 'Etsy' }
];

app.get('/internal/api/v1/apps', (_req, res) => {
  res.json({ success: true, apps });
});

app.get('/internal/api/v1/apps/:appKey/actions', (req, res) => {
  res.json({ success: true, actions: [`${req.params.appKey}-action`] });
});

app.get('/internal/api/v1/apps/:appKey/connections', (req, res) => {
  res.json({ success: true, connections: [`${req.params.appKey}-connection`] });
});

app.get('/internal/api/v1/apps/:appKey/triggers', (req, res) => {
  res.json({ success: true, triggers: [`${req.params.appKey}-trigger`] });
});

app.post('/internal/api/v1/workflows/:id/run', auth, async (req, res) => {
  const { rows } = await pool.query('SELECT nodes FROM workflows WHERE id=$1 AND user_id=$2', [
    req.params.id,
    (req as any).userId
  ]);
  const workflow = rows[0];
  if (!workflow) return res.status(404).json({ success: false });
  for (const node of workflow.nodes) {
    console.log('Processing node', node.id);
  }
  res.json({ success: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Workflow backend running on port ${port}`);
});
