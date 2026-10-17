import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const maxDuration = 30;

const PROJECTS = [
  {
    id: "askamar",
    projectName: "AskAmar",
    description:
      "AskAmar is an intelligent chatbot designed to provide accurate and personalized answers about my professional journey, skills, and projects. It uses advanced AI capabilities to understand queries, retrieve relevant information, and offer a seamless, conversational experience.",
    techs: ["NextJS", "MongoDB", "LLM", "PineconeDB", "Javascript"],
    tags: ["ai", "chatbot", "rag", "nlp", "openai", "vector database", "full stack"],
  },
  {
    id: "fruit-catcher",
    projectName: "Fruit Catcher",
    description:
      "An engaging fruit catcher game where players catch falling fruits while avoiding obstacles. Features a dynamic leaderboard, real-time score tracking, and in-game power-ups.",
    techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
    tags: ["game", "frontend", "real-time", "leaderboard", "fun", "canvas", "backend"],
  },
  {
    id: "stockscope",
    projectName: "StockScope",
    description:
      "A dynamic user interface displaying real-time stock prices and detailed analysis powered by mock data. Offers insights into stock trends enabling users to track and assess stock performance.",
    techs: ["React", "Javascript", "D3.js"],
    tags: ["finance", "stocks", "data visualization", "charts", "d3", "frontend", "dashboard"],
  },
  {
    id: "qtrip",
    projectName: "QTrip",
    description:
      "A virtual travel hub for immersive exploration. Discover destinations with activity tags, simulate reservations, and manage bookings with hourly activity booking.",
    techs: ["ExpressJS", "React", "NodeJS", "Javascript"],
    tags: ["travel", "booking", "fullstack", "node", "express", "reservation"],
  },
  {
    id: "qkart",
    projectName: "QKart",
    description:
      "An e-commerce web app with user authentication, Add to Cart functionality, and a demo payment system. Seamless shopping experience with secure account access.",
    techs: ["React", "ExpressJS", "MongoDB", "Javascript"],
    tags: ["ecommerce", "shopping", "auth", "cart", "payment", "fullstack", "mongodb"],
  },
];

export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query || query.trim().length < 2) {
      return Response.json({ results: PROJECTS.map((p) => p.id), explanation: "" });
    }

    const systemPrompt = `You are a project search assistant for a developer portfolio. 
Given a natural language search query, analyze it and return a JSON response with:
1. "matches": array of project IDs that are relevant, ordered by relevance (most relevant first)
2. "explanation": a short 1-sentence explanation of what you found (max 12 words, friendly tone)

Available projects:
${PROJECTS.map((p) => `- ID: "${p.id}" | Name: ${p.projectName} | Techs: ${p.techs.join(", ")} | Tags: ${p.tags.join(", ")} | Summary: ${p.description.slice(0, 100)}`).join("\n")}

Rules:
- If the query is broad (e.g. "all", "everything", "show all"), return all IDs
- If nothing matches, return an empty matches array
- Return ONLY valid JSON, no markdown, no extra text`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Search query: "${query}"` },
      ],
      temperature: 0.2,
      max_tokens: 200,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw);

    return Response.json({
      results: parsed.matches ?? [],
      explanation: parsed.explanation ?? "",
    });
  } catch (error) {
    console.error("Project search error:", error);
    return Response.json(
      { error: "Search failed", results: [], explanation: "" },
      { status: 500 }
    );
  }
}
