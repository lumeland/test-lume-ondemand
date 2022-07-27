import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import { JsonRouter } from "lume/plugins/on_demand.ts";
import { isPlainObject } from "lume/core/utils.ts";
import * as $0 from "./example2.tmpl.js";

import type { Data } from "lume/core.ts";

const server = new Server({
  port: 8000,
  root: site.dest(),
});

const router = new JsonRouter(site.src("_routes.json"));

const { reader } = site;

reader.cache.set(
  reader.getFullPath("./example2.tmpl.js"),
  Promise.resolve(toData($0)),
);

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

// Todo: import this from Lume
function toData(mod: Record<string, unknown>): Data {
  const data: Data = {};

  for (const [name, value] of Object.entries(mod)) {
    if (name === "default") {
      if (isPlainObject(value)) {
        Object.assign(data, value);
      } else {
        data.content = value;
      }
      continue;
    }

    data[name] = value;
  }

  return data;
}
