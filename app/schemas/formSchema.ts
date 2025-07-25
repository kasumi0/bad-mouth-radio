import { z } from "zod";

export const formSchema = z.object({
  personality: z.array(z.string()).min(1),
  habits: z.array(z.string()).min(1),
  weaknesses: z.array(z.string()).min(1),
  voice: z.enum([
    "alloy",
    "ash",
    "fable",
    "onyx",
    "nova",
    "shimmer",
    "sage",
    "coral",
  ]),
  level: z.enum(["軽め", "中間", "ガチ罵倒"]),
  style: z.enum([
    "冷静に理詰め",
    "感情的な",
    "皮肉たっぷり",
    "ネチネチ",
    "シンプルにキツい",
  ]),
  tone: z.enum(["標準", "関西弁", "丁寧語", "フランク"]),
  notes: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
