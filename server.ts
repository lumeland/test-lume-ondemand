import site from "./_config.ts";
import { listenAndServe } from "https://deno.land/std@0.111.0/http/server.ts";

async function handler(req: Request) {
  const response = await site.onDemand.response(new URL(req.url));
  return response || new Response("Not found", { status: 404 });
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
