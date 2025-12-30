import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.jsx",  
  out: "./drizzle/migrations",
  dialect: "postgresql",      
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
