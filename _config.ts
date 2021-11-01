import lume from "https://raw.githubusercontent.com/lumeland/lume/e1184bc5824ef1f044526de1c2e290027dc754ed/mod.ts";
import onDemand from "https://raw.githubusercontent.com/lumeland/lume/e1184bc5824ef1f044526de1c2e290027dc754ed/plugins/on_demand.ts";

const site = lume({}, {}, false);

site.use(onDemand());

export default site;
