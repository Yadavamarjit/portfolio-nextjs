#!/usr/bin/env node
/**
 * Local sync script — runs every 6h via Windows Task Scheduler
 * Calls /api/sync/run on the running Next.js server (localhost:3000 or Vercel URL)
 *
 * Usage: node scripts/sync.js
 */

const TARGET_URL = process.env.SYNC_TARGET_URL ?? "http://localhost:3000";
const SYNC_SECRET = process.env.SYNC_SECRET;

if (!SYNC_SECRET) {
  console.error("[sync] ✗ SYNC_SECRET env var is not set. Aborting.");
  process.exit(1);
}

async function run() {
  const startedAt = new Date().toISOString();
  console.log(`[sync] ▶ Starting sync at ${startedAt}`);
  console.log(`[sync]   Target: ${TARGET_URL}/api/sync/run`);

  try {
    const res = await fetch(`${TARGET_URL}/api/sync/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": SYNC_SECRET,
      },
    });

    const data = await res.json();

    if (!res.ok && res.status !== 207) {
      console.error(`[sync] ✗ HTTP ${res.status}:`, JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log(`[sync] ✓ Sync complete at ${new Date().toISOString()}`);
    console.log(`[sync]   GitHub chunks upserted : ${data.results?.github?.chunksUpserted ?? "N/A"}`);
    console.log(`[sync]   Todo chunks upserted   : ${data.results?.todos?.chunksUpserted ?? "N/A"}`);

    if (data.results?.errors?.length > 0) {
      console.warn("[sync] ⚠ Partial errors:", data.results.errors.join(", "));
    }
  } catch (err) {
    console.error("[sync] ✗ Network error:", err.message);
    console.error("[sync]   Is the Next.js server running at", TARGET_URL, "?");
    process.exit(1);
  }
}

run();
