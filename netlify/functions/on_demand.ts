import site from "../../_config.ts";
import { contentType } from "lume/deps/media_types.ts";
import { posix } from "lume/deps/path.ts";

import type { Router } from "lume/middlewares/on_demand.ts";
import type { Config } from "https://edge.netlify.com";

export const config: Config = {
  path: "/example/",
};

export default async function (request: Request) {
  const router = await createDefaultRouter(
    site.root("/_routes.json"),
  );

  const url = new URL(request.url);
  const file = router(url);

  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  const page = await site.renderPage(file);

  if (!page || !page.outputPath) {
    return new Response("Not found", { status: 404 });
  }

  // Redirect /example to /example/
  const pageUrl = page.data.url as string;
  if (!url.pathname.endsWith("/") && pageUrl.endsWith("/")) {
    return new Response(null, {
      status: 301,
      headers: {
        "location": posix.join(url.pathname, "/"),
      },
    });
  }

  const pageResponse = new Response(
    page.content,
    { status: 200 },
  );

  const type = contentType(posix.extname(page.outputPath));

  if (type) {
    pageResponse.headers.set("content-type", type);
  }

  return pageResponse;
}

async function createDefaultRouter(file: string): Promise<Router> {
  const routes: Record<string, string> = JSON.parse(
    await Deno.readTextFile(file),
  );
  return getRouter(new Map(Object.entries(routes)));
}

function getRouter(routes: Map<string, string>): Router {
  return function match(url: URL): string | undefined {
    const { pathname } = url;
    const path = routes.get(pathname);

    // Handle urls like /example as /example/
    if (!path && !pathname.endsWith("/")) {
      return routes.get(pathname + "/");
    }

    return path;
  };
}
