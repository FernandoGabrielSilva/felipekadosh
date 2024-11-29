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
  try {
    // Validação dos parâmetros
    upsertProductsSchema.parse(params);

    // Divisão da lógica de criação/atualização
    if (params.id) {
      // Atualiza o produto ou cria um novo caso o ID não seja encontrado
      await db.products.upsert({
        where: { id: params.id },
        update: params,
        create: params,
      });
    } else {
      // Criação do novo produto caso o ID esteja ausente
      await db.products.create({
        data: params,
      });
    }

    // Revalidação do cache após a operação
    revalidatePath("/manager");
    revalidatePath("/products");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao salvar o produto:", error.message);
    } else {
      console.error("Erro desconhecido ao salvar o produto");
    }
    throw new Error("Erro ao salvar o produto.");
  }
};
