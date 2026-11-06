import type { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "../middlewares/authenticator.js";
import { isLiveFeed, liveQueries, realtime } from "../utils/realtime.js";

export function setupLiveRoutes(app: OpenAPIHono) {
  app.use("/api/live/*", authMiddleware);

  // Returns a short-lived sealed live query for the signed-in user; the client calls it again to renew
  app.post("/api/live/:feed", async (c) => {
    const feed = c.req.param("feed");
    if (!isLiveFeed(feed)) {
      return c.json({ error: "Unknown live feed" }, 404);
    }

    const user = c.get("user" as never) as { id: number };
    const sealedQuery = await realtime.seal({ query: liveQueries[feed](user.id) });
    return c.json(sealedQuery);
  });
}
