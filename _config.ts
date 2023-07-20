import lume from "lume/mod.ts";
import onDemand from "lume/plugins/on_demand.ts";

const site = lume();

site.use(onDemand({
  extraData(request: Request) {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    return {
      params,
      request,
    };
  },
}));
site.ignore("README.md");
site.data("now", () => new Date());

export default site;
