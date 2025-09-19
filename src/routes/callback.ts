import { Hono } from "hono";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { transactions } from "../database/schemas/transaction";
import { HTTPException } from "hono/http-exception";

const callback = new Hono<{ Bindings: CloudflareBindings }>();

type PostbackTransaction = {
  txnid: string;
  refno: string;
  status: string;
  message: string;
  amount: string;
  ccy: string;
  procid: string;
  digest: string;
  signature: string;
  signatures: string;
  param1: string;
  param2: string;
  settledate: string;
};

callback.post("/collection", async c => {
  const body = await c.req.parseBody<PostbackTransaction>();

  const pgsql = neon(c.env.DATABASE_URL);
  const db = drizzle({ client: pgsql });

  /**
   * txnid
   * refno
   * status
   * message
   * amount
   * ccy
   * procid
   * digest
   * signature
   * signatures
   * param1
   * param2
   * settledate
   */

  try {
    const result = await db
      .insert(transactions)
      .values({
        refno: body.refno,
        txnid: body.txnid,
        status: body.status
      })
      .onConflictDoUpdate({
        target: transactions.refno,
        set: { status: body.status }
      });

    console.log(result.rows[0]);

    return c.text("status=ok");
  } catch (error) {
    throw new HTTPException(500, {
      message: "unable to upsert transaction",
      cause: error
    });
  }
});

export default callback;
