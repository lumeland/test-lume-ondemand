import lume from "./deps.ts";
import onDemand from "./on_demand.ts";

const site = lume({}, {}, false);

site.use(onDemand());

export default site;
