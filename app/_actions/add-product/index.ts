"use server";

import { db } from "@/app/_lib/prisma";
import { addProductSchema } from "./schema";
import { Category } from "@prisma/client";

interface AddProductParams {
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  linkUrl: string;
}

export const addProduct = async (params: AddProductParams) => {
  addProductSchema.parse(params);
  await db.products.create({
    data: params,
  });
};
