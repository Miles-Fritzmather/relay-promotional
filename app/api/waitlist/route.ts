import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist API — stores emails in Vercel KV.
 *
 * Setup (one-time):
 *   1. In your Vercel project dashboard go to Storage → Create → KV.
 *   2. Link it to this project.
 *   3. Run `vercel env pull .env.local` to get KV_REST_API_URL / KV_REST_API_TOKEN locally.
 *
 * To read stored emails later:
 *   vercel kv lrange relay:waitlist 0 -1
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

  // Persist to Vercel KV when env vars are present
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import("@vercel/kv");
      await kv.lpush("relay:waitlist", entry);
    } catch (err) {
      console.error("[waitlist] KV write failed:", err);
      // Don't surface the error to the user — log it and continue
    }
  } else {
    // No KV configured — log to stdout (visible in Vercel function logs)
    console.log("[waitlist] New signup:", entry);
  }

  return NextResponse.json({ success: true });
}
