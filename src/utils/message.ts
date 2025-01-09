import connectToDatabase from "../DB/mongo";
import user from "@/Schema/user";
import message from "@/Schema/message";

export const addMessage = async (
  userId: string,
  userMessage: string,
  systemResponse: string
) => {
  try {
    await connectToDatabase();

    // Create a new message
    const newMessage = new message({ userId, userMessage, systemResponse });
    const messageResult = await newMessage.save();

    // Update user's messagesId array
    await user.updateOne(
      { _id: userId },
      { $push: { messagesId: messageResult._id } }
    );
    console.log("----- added msg", messageResult);
    // return new Response(JSON.stringify(messageResult), { status: 201 });
  } catch (error) {
    console.log("-----error in adding msg", error);
    // return new Response(JSON.stringify({ error: error.message }), {
    //   status: 500,
    // });
  }
};
