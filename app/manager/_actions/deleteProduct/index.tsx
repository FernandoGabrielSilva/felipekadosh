"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const DeleteProduct = async ({ productId }: DeleteProductSchema) => {
  // Implementar a lógica para deletar um produto
  // Exemplos:
  // - Remover o produto do banco de dados

  // Revalidate path para atualizar a página após o deletado
  await db.products.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/manager");
  revalidatePath("/products");
};
