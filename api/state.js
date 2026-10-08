// GET /api/state -> { mode, state }   PUT /api/state -> saves full state
// Storage: Upstash Redis (Vercel Marketplace) when env vars exist, local data.json in dev.
const fs = require('fs');
const path = require('path');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.U// GET /api/state -> { mode, state }   PUT /api/state -> saves full state
// Storage: Upstash Redis (Vercel Marketplace) when env vars exist, local data.json in dev.
const fs = require('fs');
const path = require('path');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'taskboard:state';
const FILE = path.join(process.cwd(), 'data.json');
const mode = URL_ && TOK ? 'redis' : process.env.VERCEL ? 'none' : 'file';

async function rGet() {
  const r = await fetch(`${URL_}/get/${KEY}`, { headers: { Authorization: `Bearer ${TOK}` } });
  const j = await r.json();
  return j.result ? JSON.parse(j.result) : null;
}
async function rSet(s) {
  const r = await fetch(`${URL_}/set/${KEY}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOK}` },
    body: JSON.stringify(s),
  });
  if (!r.ok) throw new Error('Redis write failed');
}
const fGet = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : null);

module.exports = async (req, res) => {
  const send = (code, obj) => {
    res.statusCode = code;
    res.setHeader('content-type', 'application/json');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify(obj));
  };
  const pw = process.env.APP_PASSWORD;
  if (pw && req.headers['x-pass'] !== pw) return send(401, { error: 'auth' });
  try {
    if (req.method === 'GET') {
      const state = mode === 'redis' ? await rGet() : mode === 'file' ? fGet() : null;
      return send(200, { mode, state });
    }
    if (req.method === 'PUT') {
      if (mode === 'none') return send(501, { mode });
      const s = req.body;
      if (!s || !Array.isArray(s.tasks) || !Array.isArray(s.cats)) return send(400, { error: 'bad state' });
      if (mode === 'redis') await rSet(s);
      else fs.writeFileSync(FILE, JSON.stringify(s));
      return send(200, { ok: true });
    }
    send(405, { error: 'method' });
  } catch (e) {
    send(500, { error: String(e) });
  }
};
PSTASH_REDIS_REST_TOKEN;
const KEY = 'taskboard:state';// GET /api/state -> { mode, state }   PUT /api/state -> saves full state
// Storage: Upstash Redis (Vercel Marketplace) when env vars exist, local data.json in dev.
const fs = require('fs');
const path = require('path');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'taskboard:state';
const FILE = path.join(process.cwd(), 'data.json');
const mode = URL_ && TOK ? 'redis' : process.env.VERCEL ? 'none' : 'file';

async function rGet() {
  const r = await fetch(`${URL_}/get/${KEY}`, { headers: { Authorization: `Bearer ${TOK}` } });
  const j = await r.json();
  return j.result ? JSON.parse(j.result) : null;
}
async function rSet(s) {
  const r = await fetch(`${URL_}/set/${KEY}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOK}` },
    body: JSON.stringify(s),
  });
  if (!r.ok) throw new Error('Redis write failed');
}
const fGet = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : null);

module.exports = async (req, res) => {
  const send = (code, obj) => {
    res.statusCode = code;
    res.setHeader('content-type', 'application/json');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify(obj));
  };
  const pw = process.env.APP_PASSWORD;
  if (pw && req.headers['x-pass'] !== pw) return send(401, { error: 'auth' });
  try {
    if (req.method === 'GET') {
      const state = mode === 'redis' ? await rGet() : mode === 'file' ? fGet() : null;
      return send(200, { mode, state });
    }
    if (req.method === 'PUT') {
      if (mode === 'none') return send(501, { mode });
      const s = req.body;
      if (!s || !Array.isArray(s.tasks) || !Array.isArray(s.cats)) return send(400, { error: 'bad state' });
      if (mode === 'redis') await rSet(s);
      else fs.writeFileSync(FILE, JSON.stringify(s));
      return send(200, { ok: true });
    }
    send(405, { error: 'method' });
  } catch (e) {
    send(500, { error: String(e) });
  }
};

const FILE = path.join(process.cwd(), 'data.json');
const mode = URL_ && TOK ? 'redis' : process.env.VERCEL ? 'none' : 'file';

async function rGet() {
  const r = await fetch(`${URL_}/get/${KEY}`, { headers: { Authorization: `Bearer ${TOK}` } });
  const j = await r.json();
  return j.result ? JSON.parse(j.result) : null;
}
async function rSet(s) {
  const r = await fetch(`${URL_}/set/${KEY}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOK}` },
    body: JSON.stringify(s),
  });
  if (!r.ok) throw new Error('Redis write failed');
}
const fGet = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : null);

module.exports = async (req, res) => {
  const send = (code, obj) => {
    res.statusCode = code;
    res.setHeader('content-type', 'application/json');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify(obj));
  };
  const pw = process.env.APP_PASSWORD;
  if (pw && req.headers['x-pass'] !== pw) return send(401, { error: 'auth' });
  try {
    if (req.method === 'GET') {
      const state = mode === 'redis' ? await rGet() : mode === 'file' ? fGet() : null;
      return send(200, { mode, state });
    }
    if (req.method === 'PUT') {
      if (mode === 'none') return send(501, { mode });
      const s = req.body;
      if (!s || !Array.isArray(s.tasks) || !Array.isArray(s.cats)) return send(400, { error: 'bad state' });
      if (mode === 'redis') await rSet(s);
      else fs.writeFileSync(FILE, JSON.stringify(s));
      return send(200, { ok: true });
    }
    send(405, { error: 'method' });
  } catch (e) {
    send(500, { error: String(e) });
  }
};
