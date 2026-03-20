import { z } from "zod";

export const sheetRequestSchema = z.object({
  contentType: z.enum(["json", "markdown"]).default("json"),
  content: z.string().min(1, "O conteúdo da ficha não pode estar vazio"),
  options: z.object({
    refreshImage: z.boolean().optional().default(false),
  }).optional().default({}),
});

export type SheetRequest = z.infer<typeof sheetRequestSchema>;
