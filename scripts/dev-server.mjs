import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 8080);
const clients = new Set();
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff':'font/woff','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const reloadScript = `const stream = new EventSource('/__dev_events'); stream.onmessage = () => location.reload();`;
const heartbeat = setInterval(() => clients.forEach(response => response.write(': heartbeat\n\n')), 20000);
heartbeat.unref();
const server = http.createServer(async (request, response) => {
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (pathname === '/__dev_events' && request.method === 'GET') {
      response.writeHead(200, {'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});
      response.write(': connected\n\n'); clients.add(response);
      request.on('close', () => clients.delete(response)); return;
    }
    if (pathname === '/__dev_reload.js') {
      response.writeHead(200, {'Content-Type':mime['.js'],'Cache-Control':'no-store'});
      response.end(request.method === 'HEAD' ? undefined : reloadScript); return;
    }
    if (pathname.includes('\0')) { response.writeHead(400); response.end(); return; }
    let file = path.resolve(root, `.${pathname}`);
    if (file !== path.resolve(root) && !file.startsWith(path.resolve(root) + path.sep)) { response.writeHead(403); response.end(); return; }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let body = await readFile(file);
    const extension = path.extname(file).toLowerCase();
    if (extension === '.html') body = Buffer.from(body.toString().replace('</body>', '<script src="/__dev_reload.js"></script></body>'));
    response.writeHead(200, {'Content-Type':mime[extension] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404, {'Content-Type':'text/plain; charset=utf-8'});
    response.end(request.method === 'HEAD' ? undefined : 'Arquivo não encontrado.');
  }
});
let refreshTimer;
const watcher = watch(root, {recursive:true}, () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => clients.forEach(response => response.write('data: reload\n\n')), 180);
});
server.listen(port, '127.0.0.1', () => {
  console.log(`YU.MED: http://localhost:${port}`);
  console.log('Salve um arquivo em dist para atualizar a prévia automaticamente.');
});
server.on('error', error => { console.error(error.message); watcher.close(); process.exitCode = 1; });
function stop() { clearTimeout(refreshTimer); clearInterval(heartbeat); watcher.close(); clients.forEach(response => response.end()); server.close(); }
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
