import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import { JsonRouter } from "lume/plugins/on_demand.ts";

const server = new Server({
  port: 8000,
  root: site.dest(),
});

const router = new JsonRouter(site.src("_routes.json"));

// Todo: Fix this
server.use(async (request, next) => {
  const response = await next(request);
  const type = response.headers.get("content-type");

  if (!type || type === "text/plain;charset=UTF-8") {
    response.headers.set("content-type", "text/html;charset=UTF-8");
  }

  return response;
});

server.use(onDemand({
  site,
  router: (url) => router.match(url),
}));

server.start();

console.log("Listening on http://localhost:8000");
