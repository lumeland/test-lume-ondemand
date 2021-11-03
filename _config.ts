import { lume, onDemand } from "./deps.ts";

const site = lume({}, {}, false);

site.use(onDemand());

export default site;
