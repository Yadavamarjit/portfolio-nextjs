import { cookies } from "next/headers";
import { searchEmbeddings } from "../../../embedding";
import { getGPT4Response } from "../../../GPT/gpt";
import { addMessage } from "@/utils/message";
import { bm25 } from "@/utils/bm25";

export const maxDuration = 60;
export async function POST(req) {
  const { userPrompt } = await req.json();

  if (!userPrompt) {
    return new Response(JSON.stringify({ error: "userPrompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Create the stream first
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start the response immediately
    const streamResponse = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    // Handle the async operations in the background
    (async () => {
      try {
        // Send initial message to keep connection alive
        await writer.write(encoder.encode(`data: Starting process...\n\n`));

        // Run searchEmbeddings with timeout
        const searchPromise = searchEmbeddings(userPrompt);
        const searchResult = await Promise.race([
          searchPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Search timeout")), 8000)
          ),
        ]);

        // Process BM25 results
        const bm25Res = bm25(
          userPrompt,
          searchResult.map((result) => result.content)
        );

        let completeMessage = "";
        const gptResponse = await getGPT4Response(
          userPrompt,
          bm25Res[0].document
        );

        for await (const chunk of gptResponse) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            completeMessage += content;
            await writer.write(encoder.encode(`data: ${content}\n\n`));
          }
        }

        // Store message in background
        const cookiesStore = cookies();
        await addMessage(
          cookiesStore.get("userId").value,
          userPrompt,
          completeMessage
        );

        // Send completion message
        await writer.write(encoder.encode(`data: [DONE]\n\n`));
        await writer.close();
      } catch (error) {
        console.error("Streaming error:", error);
        // Send error message to client
        await writer.write(encoder.encode(`data: Error: ${error.message}\n\n`));
        await writer.close();
      }
    })();

    return streamResponse;
  } catch (error) {
    console.error("Error processing request:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
