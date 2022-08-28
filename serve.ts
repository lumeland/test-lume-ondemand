import site from "./_config.ts";
import Server from "lume/core/server.ts";
import onDemand from "lume/middlewares/on_demand.ts";
import preload from "./_preload.ts";

const server = new Server({
  port: 8000,
  root: site.dest(),
});

preload(site);

server.use(onDemand({ site }));

server.start();

console.log("Listening on http://localhost:8000");
