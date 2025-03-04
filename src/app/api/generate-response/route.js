// app/api/posts/route.js

import { cookies } from "next/headers";
import { searchEmbeddings } from "../../../embedding";
import { getGPT4Response } from "../../../GPT/gpt";
import { addMessage, getMessage } from "@/utils/message";
import { bm25 } from "@/utils/bm25";
import { interpretContextualResponse } from "@/utils/interpretContextualResponse";
import { checkForForbidding } from "@/utils/forbidAccess";
export const maxDuration = 60;
export async function POST(req) {
  const { userPrompt } = await req.json();
  checkForForbidding(req);
  if (!userPrompt) {
    return new Response(JSON.stringify({ error: "userPrompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const cookiesStore = cookies();

    const lastMessageReqiured = interpretContextualResponse(userPrompt);
    let lastMessage = "";
    let bm25Res = [];
    console.log({ lastMessageReqiured });
    const userId = cookiesStore.get("userId").value;
    console.log("=====> userId", userId);
    if (lastMessageReqiured) {
      const msg = await getMessage(userId);
      lastMessage = `(meta:  this is your last response to the user last question) ${msg?.systemResponse}`;
      // lastMessage.push({ role: "assistant", content: msg.systemResponse });
    } else {
    }
    const searchResult = await searchEmbeddings(userPrompt);
    // bm25Res = bm25(
    //   userPrompt,
    //   searchResult.map((result) => result.content)
    // );
    // console.log({ searchResult: searchResult[0] });

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start the streaming response
    const streamResponse = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    let completeMessage = "";

    const gptResponse = await getGPT4Response(
      userPrompt,
      searchResult[0].content ?? "",
      lastMessage
    );

    // Handle the stream
    (async () => {
      try {
        for await (const chunk of gptResponse) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            // Write the chunk to the stream
            // console.log("Streaming chunk:", content);
            completeMessage += content;
            await writer.write(encoder.encode(`data: ${content}`));
          }
        }
        console.log("=====> adding message init", userId);
        await addMessage(userId, userPrompt, completeMessage);
        // Close the stream
        await writer.close();
      } catch (error) {
        console.error("Streaming error:", error);
        await writer.abort(error);
      }
    })();
    return streamResponse;

    // return new Response(gptResponse, {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error) {
    console.error("Error processing GPT-4 response:", error.message);
    return new Response(JSON.stringify({ error: "Internal server errror" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
