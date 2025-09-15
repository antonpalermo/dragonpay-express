import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

const environment = process.env.NODE_ENV;

// load corresponding env file based on
// NODE_ENV flag
dotenv.config({
  path: environment === "production" ? ".env" : ".env.development"
});

export default defineConfig({
  out: "./migrations",
  schema: "./src/database/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
