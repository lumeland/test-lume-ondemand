import site from "./_config.ts";
import { serveFile } from "./deps.ts";

import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";

async function handler(request: Request) {
  try {
    const url = new URL(request.url);
    const [body, response] = await serveFile(url, {
      root: site.dest(),
      page404: site.options.server.page404,
      directoryIndex: false,
      router: site.options.server.router,
    });
    return new Response(body, response);
  } catch (error) {
    console.error(error);
    return new Response(`Error 500: ${error.message}`, { status: 500 });
  }
}

console.log("Listening on http://localhost:8000");
await listenAndServe(":8000", handler);
