// app/api/posts/route.js

import { searchEmbeddings } from "../../../embedding";
import { getGPT4Response } from "../../../GPT/gpt";

export async function POST(req) {
  const { userPrompt } = await req.json();

  if (!userPrompt) {
    return new Response(JSON.stringify({ error: "userPrompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const searchResult = await searchEmbeddings(userPrompt);

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

    const gptResponse = await getGPT4Response(
      userPrompt,
      searchResult[0].content
    );

    // Handle the stream
    (async () => {
      try {
        for await (const chunk of gptResponse) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            // Write the chunk to the stream
            console.log("Streaming chunk:", content);
            await writer.write(encoder.encode(`data: ${content}`));
          }
        }
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
