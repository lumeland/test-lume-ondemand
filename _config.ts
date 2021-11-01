import lume from "https://raw.githubusercontent.com/lumeland/lume/e9f43f352fbee0ea467820841f667cac73a06123/mod.ts";
import onDemand from "https://raw.githubusercontent.com/lumeland/lume/e9f43f352fbee0ea467820841f667cac73a06123/plugins/on_demand.ts";

const site = lume({}, {}, false);

site.use(onDemand());

export default site;
