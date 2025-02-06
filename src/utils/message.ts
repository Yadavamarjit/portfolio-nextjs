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
    const userResult = await user.updateOne(
      { _id: userId },
      { $push: { messagesId: messageResult._id } }
    );

    // return new Response(JSON.stringify(messageResult), { status: 201 });
  } catch (error) {
    console.log("-----error in adding msg", error);
    return new Response(JSON.stringify({ error }));
    // return new Response(JSON.stringify({ error: error.message }), {
    //   status: 500,
    // });
  }
};

export const getMessage = async (userId: string) => {
  await connectToDatabase();
  try {
    const messages = await message.find({ userId }).sort({ _id: -1 }).limit(1);
    if (messages.length > 0) {
      return messages[0];
    }
    return null;
  } catch (error) {
    console.log("-----error in getting msg", error);
    return null;
  }
};
