// import connectToDatabase from "../../lib/mongodb";
// import Message from "../../models/Message";
// import User from "../../models/User";

import user from "@/Schema/user";
import connectToDatabase from "../../../DB/mongo";
import message from "../../../Schema/message";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { userId, userMessage, systemResponse } = await req.json();

    // Create a new message
    const newMessage = new message({ userId, userMessage, systemResponse });
    const messageResult = await newMessage.save();

    // Update user's messagesId array
    const userResult = await user.updateOne(
      { _id: userId },
      { $push: { messagesId: messageResult._id } }
    );
    console.log({ userResult, userId });
    return new Response(JSON.stringify(messageResult), { status: 201 });
  } catch (error) {
    console.log("userResult", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const cookiesStore = cookies();
    const userId = cookiesStore.get("userId")?.value;
    if (!userId)
      return NextResponse.json(
        { error: "UserId doesn't exists" },
        { status: 400 }
      );
    await connectToDatabase();

    let messages;
    if (userId) {
      messages = await message.find({ userId }).populate("userId");
    }

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
