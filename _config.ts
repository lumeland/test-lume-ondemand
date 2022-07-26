import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import onDemand from "lume/plugins/on_demand.ts";

const site = lume({}, {}, false);

site.use(onDemand());
site.use(date());
site.ignore("README.md");

export default site;
