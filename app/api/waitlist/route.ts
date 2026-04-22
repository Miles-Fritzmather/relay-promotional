import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist API — stores emails in Upstash Redis (Vercel Marketplace).
 *
 * Setup (one-time, if not already done):
 *   1. Vercel dashboard → Integrations → Browse Marketplace → search "Upstash Redis"
 *   2. Install and create a Redis database, then connect it to this project.
 *   3. Vercel will auto-inject UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 *   4. Run `vercel env pull .env.local` to get the vars locally.
 *
 * Read stored emails:
 *   From Upstash console, or via: redis.lrange("relay:waitlist", 0, -1)
 */
export async function POST(request: NextRequest) {
  let email: string;

  try {
    const body = await request.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const entry = JSON.stringify({ email, joinedAt: new Date().toISOString() });

  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.lpush("relay:waitlist", entry);
    } catch (err) {
      console.error("[waitlist] Redis write failed:", err);
    }
  } else {
    console.log("[waitlist] No Redis configured. New signup:", entry);
  }

  return NextResponse.json({ success: true });
}
