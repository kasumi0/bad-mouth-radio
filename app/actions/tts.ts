"use server";
import OpenAI from "openai";
import { z } from "zod";
import { formSchema } from "../schemas/formSchema";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Voice = z.infer<typeof formSchema.shape.voice>;

export const generateSpeech = async (text: string, v: Voice): Promise<Buffer> => {
  const response = await openaiClient.audio.speech.create({
    model: "tts-1-hd",
    voice: v,
    input: text,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer;
};
