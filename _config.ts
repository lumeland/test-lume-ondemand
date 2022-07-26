import lume from "lume/mod.ts";
import onDemand from "lume/plugins/on_demand.ts";

const site = lume({}, {}, false);

site.use(onDemand());
site.ignore("README.md");

export default site;
