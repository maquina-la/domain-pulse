import { serve } from '@hono/node-server';
import { app } from './app.js';

const PORT = Number(process.env.PORT) || 3000;

console.log(`⚡ Domain Pulse API Gateway running at http://localhost:${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
