import { Hono } from "hono";
import { customAlphabet } from "nanoid";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const transaction = new Hono<{ Bindings: CloudflareBindings }>();
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 25);
const baseURL = "https://test.dragonpay.ph/api/collect/v1";

transaction.get("/", c => {
  return c.text("ok");
});

transaction.post("/create", async c => {
  const body = await c.req.json();

  const pgsql = neon(c.env.DATABASE_URL);
  const db = drizzle({ client: pgsql });

  const authToken = btoa(
    `${c.env.DP_MERCHANT_ID}:${c.env.DP_MERCHANT_API_KEY}`
  );
  try {
    const request = await fetch(`${baseURL}/${nanoid()}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authToken}`
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.log(error);
  }
  return c.text("ok");
});

export default transaction;
