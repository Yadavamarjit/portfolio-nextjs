import { cookies } from "next/headers";
import connectToDatabase from "../../../DB/mongo";
import user from "../../../Schema/user";

export async function POST(req) {
  try {
    const userData = await req.json().catch(() => ({}));
    let savedUser = null;

    try {
      await connectToDatabase();
      const newUser = new user({ ...userData });
      savedUser = await newUser.save();
    } catch (dbError) {
      console.warn("DB user save fallback:", dbError.message);
    }

    const userId = savedUser?._id?.toString() || `anon_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cookieStore = cookies();

    cookieStore.set("userId", userId, {
      path: "/",
      maxAge: 100 * 365 * 24 * 60 * 60,
    });

    if (userData.latitude != null) {
      cookieStore.set("latitude", String(userData.latitude), {
        path: "/",
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
    }

    if (userData.longitude != null) {
      cookieStore.set("longitude", String(userData.longitude), {
        path: "/",
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
    }

    if (userData.country_name) {
      cookieStore.set("country_name", String(userData.country_name), {
        path: "/",
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
    }

    if (userData.region) {
      cookieStore.set("region", String(userData.region), {
        path: "/",
        maxAge: 100 * 365 * 24 * 60 * 60,
      });
    }

    return new Response(JSON.stringify(savedUser || { _id: userId, ...userData }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/users POST:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 200, // Return 200 with fallback so client doesn't retry in infinite loops
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const users = await user.find().populate("messagesId");

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, users: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
