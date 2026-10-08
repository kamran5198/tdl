// Local development only:  npm start  ->  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');
const handler = require('./api/state');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

http
  .createServer((req, res) => {
    if (req.url.startsWith('/api/state')) {
      let b = '';
      req.on('data', (c) => (b += c));
      req.on('end', () => {
        try { req.body = b ? JSON.parse(b) : undefined; } catch { req.body = undefined; }
        handler(req, res);
      });
      return;
    }
    const f = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!f.startsWith(path.join(__dirname, 'public')) || !fs.existsSync(f)) { res.statusCode = 404; return res.end('Not found'); }
    res.setHeader('content-type', types[path.extname(f)] || 'text/plain');
    fs.createReadStream(f).pipe(res);
  })
  .listen(process.env.PORT || 3000, () => console.log('Taskboard on http://localhost:' + (process.env.PORT || 3000)));
