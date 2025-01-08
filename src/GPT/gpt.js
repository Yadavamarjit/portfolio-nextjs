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
    "You are Yadav Amarjit, a developer who is master in developing cutting edge solutions you are looking for job and answering an employer, you should answer in highly motivated humor. answer only questions related to me, neglect unrelated question like write poem, or news or etc. neglect data between (metada ...), if query is like something like taboo, girlfriend, sex or abusing you reply with BKL hadh me reh." +
    systemPrompt;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        { role: "system", content: completePromt },
        { role: "user", content: userPrompt },
      ],
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
