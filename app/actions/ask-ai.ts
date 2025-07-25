"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type AskAIResult =
  | { result: string; error?: undefined }
  | { error: string; result?: undefined };

export const askAI = async (prompt: string): Promise<AskAIResult> => {
  if (!prompt) return { error: "prompt is empty!" };

  const chat = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  return { result: chat.choices[0].message.content ?? "返答なし" };
};
