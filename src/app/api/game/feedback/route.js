import connectToDatabase from "@/DB/mongo";
import GameFeedback from "@/Schema/gameFeedback";

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
    const { name, email, feedback, distance, coins, city, region, country_name, device } = body;

    if (!feedback || typeof feedback !== "string" || !feedback.trim()) {
      return new Response(
        JSON.stringify({ error: "Feedback message is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : (req.headers.get("x-real-ip") || "unknown");
    const userAgent = req.headers.get("user-agent") || "";

    await connectToDatabase();

    const newFeedback = new GameFeedback({
      name: name?.trim() || "Anonymous Runner",
      email: email?.trim() || "",
      feedback: feedback.trim(),
      game: "BhaagDipke",
      distance: Number(distance) || 0,
      coins: Number(coins) || 0,
      ip,
      city: city || req.headers.get("x-vercel-ip-city") || "",
      region: region || req.headers.get("x-vercel-ip-country-region") || "",
      country_name: country_name || req.headers.get("x-vercel-ip-country") || "",
      device: device || "",
      userAgent,
      createdAt: new Date(),
    });

    const saved = await newFeedback.save();

    return new Response(
      JSON.stringify({ success: true, id: saved._id, message: "Feedback saved successfully!" }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error saving game feedback:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to save feedback" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
