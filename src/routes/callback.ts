import { Hono } from "hono";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const callback = new Hono<{ Bindings: CloudflareBindings }>();

callback.post("/collection", async c => {
  const body = await c.req.parseBody();
  const pgsql = neon(c.env.DATABASE_URL);
  const db = drizzle({ client: pgsql });

  try {
  } catch (error) {}

  return c.text("ok");
});

export default callback;
