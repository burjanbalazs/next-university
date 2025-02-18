import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function ratelimithelper() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  return success;
}
