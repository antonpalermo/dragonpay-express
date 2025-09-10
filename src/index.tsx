import { Hono } from "hono";
import { renderer } from "./renderer";
import App from "./app";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<App message="sample" />);
});

app.get("/sample", (c) => {
  return c.json({ message: "sample" });
});

export default app;
