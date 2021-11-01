import site from "./_config.ts";

import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";

async function handler(request: Request) {
  if (site.options.server.router) {
    const url = new URL(request.url);
    try {
      const result = await site.options.server.router(url);
  
      if (result) {
        const [body, response] = result;
        return new Response(body, response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return new Response("Noop", { status: 404 });
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
