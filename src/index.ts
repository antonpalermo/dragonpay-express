import debug from "debug";

import App from "./app";

const logger = debug("core:apis");

Bun.serve({
  fetch: App.fetch,
});

logger("server started on " + `http://localhost:${process.env.PORT}`);
