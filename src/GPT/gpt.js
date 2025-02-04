import OpenAI from "openai";
import { openaiApiKey } from "../config/envConfig";

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

/**
 * Interacts with GPT-4 and returns the response.
 * @param {string} systemPrompt - The system's context prompt.
 * @param {string} userPrompt - The user's input prompt.
 * @returns {Promise<string>} - The response from GPT-4.
 */

export async function getGPT4Response(
  userPrompt,
  systemPrompt = "",
  lastMessage
) {
  const completePromt =
    "You are Yadav Amarjit, a developer who need a job and right now seeking  for a job.You are Responding to a HR don't ask to code. Give playfull response with high motivation and coding humor.Don't use humor word in response only answer questions about you; ignore unrelated requests (e.g., poems, news). Exclude metadata and keep responses concise and small.If it has link than in the reponse the link should be clickable and open in new tab use html markdown syntax wisely when giveing intro highlight the achievements using markdown syntax , If it's project-image than show project image with markdown syntax and it should look nice. Answer in same language which is used in user prompt.If user asks about german fluency answer that you are fluent in English and say very politely that will learn soon." +
    systemPrompt +
    lastMessage;

  console.log("mmmmmmm", [
    { role: "system", content: completePromt },
    { role: "user", content: userPrompt },
  ]);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        { role: "system", content: completePromt },
        // ...lastMessage,
        { role: "user", content: userPrompt },
      ],
      // max_tokens: 2048,
      stream: true,
    });
    return response;
  } catch (error) {
    console.error(
      "Error interacting with GPT-4:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get response from GPT-4");
  }
}
