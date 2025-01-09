import { cookies } from "next/headers";
import connectToDatabase from "../../../DB/mongo";
import user from "../../../Schema/user";

export async function POST(req) {
  try {
    await connectToDatabase();
    const userData = await req.json();
    const newUser = new user({ ...userData });
    const result = await newUser.save();
    cookies().set("userId", result._id.toString(), {
      path: "/", // Cookie is accessible across the entire site
    });
    cookies().set("latitude", result.latitude.toString(), {
      path: "/", // Cookie is accessible across the entire site
    });
    cookies().set("longitude", result.latitude.toString(), {
      path: "/", // Cookie is accessible across the entire site
    });
    cookies().set("country_name", result.country_name.toString(), {
      path: "/", // Cookie is accessible across the entire site
    });
    cookies().set("region", result.region.toString(), {
      path: "/", // Cookie is accessible across the entire site
    });
    const response = new Response(JSON.stringify(result), {
      status: 201,
    });

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const users = await user.find().populate("messagesId");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
