import * as dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const BACKEND_URL: string = isProd
  ? requireEnv("BACKEND_URL")
  : `http://localhost:${process.env.PORT || 3000}`;

export const FRONTEND_URL: string = isProd
  ? requireEnv("FRONTEND_URL")
  : "http://localhost:5173";

export const PORT = Number(process.env.PORT) || 3000;
