import site from "./_config.ts";

addEventListener("fetch", (event) => {
  // @ts-ignore: Deno.RequestEvent
  responseHandler(event);
});

async function responseHandler(event: Deno.RequestEvent) {
  const url = new URL(event.request.url);
  console.log({ url });

  const response = new Response("Noop", { status: 404 });
  await event.respondWith(response);
}

async function handler(req: Request) {
  const result = await site.onDemand.response(new URL(req.url));
  console.log(result);
  if (result) {
    const [body, response] = result;
    // return new Response(body, response);
  }

  return new Response("Not found", { status: 404 });
}
