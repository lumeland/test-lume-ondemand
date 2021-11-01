import site from "./_config.ts";

addEventListener("fetch", (event) => {
  // @ts-ignore: Deno.RequestEvent
  responseHandler(event);
});

async function responseHandler(event: Deno.RequestEvent) {
  if (site.options.server.router) {
    const url = new URL(event.request.url);
    const result = await site.options.server.router(url);
    console.log(site.options.watcher);
    if (result) {
      const [body, response] = result;
      return await event.respondWith(new Response(body, response));
    }
  }

  return await event.respondWith(new Response("Noop", { status: 404 }));
}
