import { Hono } from "hono";
import { customAlphabet } from "nanoid";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const transaction = new Hono<{ Bindings: CloudflareBindings }>();
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 25);

transaction.get("/", c => {
  return c.text("ok");
});

transaction.post("/create", async c => {
  const body = JSON.stringify(await c.req.json());

  const token = btoa(`${c.env.DP_MERCHANT_ID}:${c.env.DP_MERCHANT_API_KEY}`);

  const response = await fetch(
    `https://test.dragonpay.ph/api/collect/v1/${nanoid()}/post`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json; charset=UTF8"
      },
      body
    }
  );

  const data = await response.json<{
    refno: string;
    status: string;
    message: string;
    url: string;
  }>();

  return c.json(data);
});

export default transaction;
