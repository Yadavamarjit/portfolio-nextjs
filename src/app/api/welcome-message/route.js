import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const maxDuration = 30;

// Dedicated welcome greeting endpoint — streams GPT response but NEVER saves to DB.
// This keeps the internal prompt completely out of the chat message history.
export async function POST(req) {
  try {
    const { country, region } = await req.json();
    const location = [region, country].filter(Boolean).join(", ");

    const prompt = location
      ? `You are a warm, friendly AI assistant on Amarjit's developer portfolio. Write a single short greeting (1-2 sentences, no markdown, no asterisks) welcoming a visitor from ${location}. Mention their location naturally and invite them to ask about Amarjit's work, skills, or projects. Be conversational and genuine.`
      : `You are a warm, friendly AI assistant on Amarjit's developer portfolio. Write a single short greeting (1-2 sentences, no markdown, no asterisks) welcoming a visitor and inviting them to ask about Amarjit's work, skills, or projects. Be conversational and genuine.`;

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    const streamResponse = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    (async () => {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 80,
          stream: true,
        });

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            await writer.write(encoder.encode(`data: ${content}`));
          }
        }
        await writer.close();
      } catch (err) {
        console.error("Welcome message stream error:", err);
        await writer.abort(err);
      }
    })();

    return streamResponse;
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
