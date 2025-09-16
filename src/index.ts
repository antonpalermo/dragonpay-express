import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import callbackRoute from "./routes/callback";
import transactionRoute from "./routes/transaction";

const app = new Hono<{ Bindings: CloudflareBindings }>().basePath("/api");

app.use(logger());
app.use(secureHeaders());

app.route("/callback", callbackRoute);
app.route("/transactions", transactionRoute);

export default {
  fetch: app.fetch
};
