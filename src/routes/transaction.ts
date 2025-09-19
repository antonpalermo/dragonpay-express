import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { customAlphabet } from "nanoid";

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
    `https://${c.env.DP_ENV}.dragonpay.ph/api/collect/v1/${nanoid()}/post`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json; charset=UTF8"
      },
      body
    }
  );

  if (!response.ok) {
    throw new HTTPException(500, {
      message: "unable to make request to dragonpay api"
    });
  }

  const data: {
    RefNo: string;
    Status: string;
    Message: string;
    Url: string;
  } = await response.json();

  return c.json({
    refno: data.RefNo,
    status: data.Status,
    message: data.Message,
    url: data.Url
  });
});

export default transaction;
