import connectToDatabase from "@/DB/mongo";
import GameVisitor from "@/Schema/gameVisitor";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      city,
      region,
      country_name,
      country_code,
      latitude,
      longitude,
      device,
      referrer,
      screenResolution,
    } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : (req.headers.get("x-real-ip") || body.ip || "unknown");
    const userAgent = req.headers.get("user-agent") || "";

    await connectToDatabase();

    const newVisitor = new GameVisitor({
      game: "BhaagDipke",
      ip,
      city: city || req.headers.get("x-vercel-ip-city") || "",
      region: region || req.headers.get("x-vercel-ip-country-region") || "",
      country_name: country_name || req.headers.get("x-vercel-ip-country") || "",
      country_code: country_code || "",
      latitude: Number(latitude) || null,
      longitude: Number(longitude) || null,
      device: device || "",
      userAgent,
      referrer: referrer || "",
      screenResolution: screenResolution || "",
      visitedAt: new Date(),
    });

    const saved = await newVisitor.save();

    return new Response(
      JSON.stringify({ success: true, visitorId: saved._id }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving game visitor analytics:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to record visitor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
