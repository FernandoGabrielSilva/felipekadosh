import { Category } from "@prisma/client";
import { z } from "zod";

export const upsertProductsSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  category: z.nativeEnum(Category),
  imageUrl: z.array(z.string().trim().min(1)),
  linkUrl: z.string().trim().min(1),
});
