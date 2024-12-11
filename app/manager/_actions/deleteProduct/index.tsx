"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteProductSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const DeleteProduct = async ({ productId }: DeleteProductSchema) => {
  try {
    // Tentando excluir o produto com o productId fornecido
    await db.products.delete({
      where: {
        id: productId,
      },
    });

    // Revalidando as páginas para garantir que a interface seja atualizada
    revalidatePath("/manager");
    revalidatePath("/products");

    return { success: true, message: "Produto excluído com sucesso!" };
  } catch (error) {
    // Em caso de erro, retornando uma mensagem de erro
    console.error("Erro ao excluir produto:", error);
    return { success: false, message: "Erro ao excluir o produto. Tente novamente." };
  }
};

