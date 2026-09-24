/**
 * Dev-only Vite plugin that serves the Vercel Functions in `/api` from the
 * Vite dev server, so `bun run dev` exercises the real backend code path
 * without needing `vercel dev`. Production is served by Vercel directly.
 *
 * Functions use the Web-standard signature: `export async function POST(req: Request)`.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { loadEnv, type Plugin, type ViteDevServer } from "vite";

type Handler = (request: Request) => Response | Promise<Response>;

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"] as const;

async function readBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

function toRequest(req: IncomingMessage, body: Buffer): Request {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) for (const v of value) headers.append(key, v);
    else if (value !== undefined) headers.set(key, value);
  }
  // Mimic Vercel's edge network header so rate limiting works locally.
  if (!headers.has("x-forwarded-for"))
    headers.set("x-forwarded-for", req.socket.remoteAddress ?? "127.0.0.1");
  const method = req.method ?? "GET";
  return new Request(url, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : new Uint8Array(body),
  });
}

async function sendResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.end(Buffer.from(await response.arrayBuffer()));
}

async function handle(server: ViteDevServer, req: IncomingMessage, res: ServerResponse) {
  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
  const name = pathname.replace(/^\/api\//, "").replace(/\/$/, "");
  if (!/^[a-z0-9-]+$/i.test(name)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  let mod: Record<string, unknown>;
  try {
    mod = await server.ssrLoadModule(`/api/${name}.ts`);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const method = (req.method ?? "GET").toUpperCase();
  const handler = METHODS.includes(method as (typeof METHODS)[number]) ? mod[method] : undefined;
  if (typeof handler !== "function") {
    res.statusCode = 405;
    res.setHeader("Allow", METHODS.filter((m) => typeof mod[m] === "function").join(", "));
    res.end("Method not allowed");
    return;
  }

  const response = await (handler as Handler)(toRequest(req, await readBody(req)));
  await sendResponse(res, response);
}

export function vercelApiDev(): Plugin {
  return {
    name: "veltron:vercel-api-dev",
    apply: "serve",
    configResolved(config) {
      // Expose non-VITE_ variables from .env files to the functions, like Vercel does.
      const env = loadEnv(config.mode, config.root, "");
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        handle(server, req, res).catch((error: unknown) => {
          server.config.logger.error(
            `[api] ${error instanceof Error ? error.stack : String(error)}`,
          );
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end("Internal Server Error");
          }
        });
      });
    },
  };
}
