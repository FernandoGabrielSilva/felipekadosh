"use server";

import { db } from "@/app/_lib/prisma";
import { upsertProductsSchema } from "./schema";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpsertProductsParams {
  id?: string;
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  linkUrl: string;
}

export const upsertProducts = async (params: UpsertProductsParams) => {
  upsertProductsSchema.parse(params);
  await db.products.upsert({
    where: {
      id: params.id,
    },
    update: params,
    create: params,
  });
  revalidatePath("/manager");
};
