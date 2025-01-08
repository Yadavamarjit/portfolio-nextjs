import { cookies } from "next/headers";
import connectToDatabase from "../../../DB/mongo";
import user from "../../../Schema/user";

export async function POST(req) {
  try {
    await connectToDatabase();
    const userData = await req.json();
    const newUser = new user({ ...userData });
    const result = await newUser.save();
    console.log(result);
    cookies().set("userId", result._id.toString(), {
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
