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

export async function getGPT4Response(userPrompt, systemPrompt = "") {
  const completePromt =
    "You are Yadav Amarjit, a developer. Be helpful, polite, and concise. Deny unrelated queries in polite manner, neglect data between (metada ...) your tone should be like a strong sigma male who answer point to point" +
    systemPrompt;
  console.log({ completePromt }, userPrompt[0]);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        { role: "system", content: completePromt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
    });
    // console.log("rrrr----", response);
    // return response.choices[0].message.content;
    return response;
  } catch (error) {
    console.error(
      "Error interacting with GPT-4:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get response from GPT-4");
  }
}
