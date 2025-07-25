"use server";

import { formSchema } from "../schemas/formSchema";
import { askAI } from "@/app/actions/ask-ai";
import { generateSpeech } from "@/app/actions/tts";

export type SpeakState =
  | { audioBase64: string; error?: undefined }
  | { error: string; audioBase64?: undefined };

export const Speak = async (
  _: SpeakState,
  formData: FormData
): Promise<SpeakState> => {
  const personality = formData.getAll("personality").map(String);
  const habits = formData.getAll("habits").map(String);
  const weaknesses = formData.getAll("weaknesses").map(String);
  const voice = formData.get("voice");
  const level = formData.get("level");
  const style = formData.get("style");
  const tone = formData.get("tone");
  const notes = formData.get("notes");

  const raw = {
    personality,
    habits,
    weaknesses,
    voice,
    level,
    style,
    tone,
    notes,
  };

  const data = formSchema.safeParse(raw);
  if (!data.success) return { error: "入力していない項目があります。" };

  const {
    personality: p,
    habits: h,
    weaknesses: w,
    voice: v,
    level: l,
    style: s,
    tone: t,
    notes: n,
  } = data.data;

  const prompt = `あなたは非常に辛辣なプロの罵倒カウンセラーです。以下の人物に対して、性格や弱点を理解した上で、「${l}」のレベルで「${s}」スタイルの罵倒を、「${t}」の口調で行ってください。痛烈かつ的確に痛いところを突いてほしいが、ツンデレキャラの「口は悪いが、心根は優しい」態度はしっかりと意識してください。1000文字程度でお願いします。（注意：「貴方」は「あなた」と読む。「滑稽」は「こっけい」と読む！）
      性格タイプ: ${p.join(", ")}
      悪い癖: ${h.join(", ")}
      弱点やコンプレックス: ${w.join(", ")}
      補足: ${n || "特になし"}
      あなたはカウンセラーでもあるので罵倒の後、最後の2〜3文だけは、相手の成長につながるようなツンデレ風の励ましや助言を添えてください。
      `;

  const result = await askAI(prompt);
  if ("error" in result) return { error: result.error! };

  const buffer = await generateSpeech(result.result, v);
  return { audioBase64: buffer.toString("base64") };
};
