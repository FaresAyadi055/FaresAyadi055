
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './db/schema';
import { getConnInfo } from 'hono/cloudflare-workers';
import { eq } from 'drizzle-orm';

const SYSTEM_PROMPT = `You are a helpful assistant representing a digital handyman. 
You are capable of software engineering tasks, including building full-stack web applications, debugging, and providing technical advice.

Your goal is to assist visitors, answer their questions, and identify potential clients for services.

When a user shows strong interest in hiring or has a serious project:
1. Gather all necessary details: project scope, timeline, and budget.
2. Call the 'notify_owner' tool with a summary of the project request and any provided contact details.

Base your knowledge on the fact that you are a expert at JavaScript, TypeScript, React, Node.js, Hono, and Cloudflare workers.`;

const app = new Hono<{
  Bindings: {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    ADMIN_ACCESS_TOKEN: string;
    GEMINI_API_KEY_1: string;
    GEMINI_API_KEY_2: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHAT_ID: string;
  }
}>();

app.use('/*', cors());

const db = (env: any) => drizzle(createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
}));

// Admin Dashboard - Protected
app.use('/admin/*', async (c, next) => {
  const token = c.req.header('ADMIN_ACCESS_TOKEN');
  if (token !== c.env.ADMIN_ACCESS_TOKEN) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
});

app.get('/admin', (c) => c.text('Admin Dashboard'));

// Analytics API
app.post('/api/analytics', async (c) => {
  const { path } = await c.req.json();
  const info = getConnInfo(c);
  await db(c.env).insert(schema.analytics).values({
    path,
    timestamp: Date.now(),
    ipAddress: info.remote.address
  });
  return c.json({ success: true });
});

// AI Proxy API
let keyRotationIndex = 0;

app.post('/api/chat', async (c) => {
  const { sessionId, message } = await c.req.json();
  const database = db(c.env);

  // Store user message
  await database.insert(schema.chatMessages).values({
    sessionId,
    role: 'user',
    content: message,
    timestamp: Date.now()
  });

  // Key Rotation
  const keys = [c.env.GEMINI_API_KEY_1, c.env.GEMINI_API_KEY_2];
  const apiKey = keys[keyRotationIndex % keys.length];
  keyRotationIndex++;

  // Call Gemini with Tool Definition
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }] }],
      tools: [{
        functionDeclarations: [{
          name: 'notify_owner',
          description: 'Notifies the owner about a potential client project.',
          parameters: {
            type: 'object',
            properties: {
              projectSummary: { type: 'string', description: 'Summary of the project.' },
              contactDetails: { type: 'string', description: 'User contact details.' }
            },
            required: ['projectSummary']
          }
        }]
      }]
    })
  });

  const data = await response.json();
  const candidate = data.candidates[0];
  const content = candidate.content;

  let aiReply = '';
  
  // Check for tool call
  if (content.parts[0].functionCall) {
    const call = content.parts[0].functionCall;
    if (call.name === 'notify_owner') {
      await notifyClient(c.env, `New potential client request: ${call.args.projectSummary}. Contact: ${call.args.contactDetails || 'N/A'}`);
      aiReply = 'I have notified the owner about your project request. They will get back to you soon.';
    }
  } else {
    aiReply = content.parts[0].text;
  }

  // Store assistant message
  await database.insert(schema.chatMessages).values({
    sessionId,
    role: 'assistant',
    content: aiReply,
    timestamp: Date.now()
  });

  return c.json({ reply: aiReply });
});

// Telegram Notification Tool
async function notifyClient(env: any, message: string) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: message }),
  });
}

export default app;
