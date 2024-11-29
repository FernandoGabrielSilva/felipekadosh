import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_columns";
import SearchInput from "../_components/SearchInput";
import AddProductButton from "./_components/AddProductButton";
import CategoryFilter from "../_components/CategoryFilter";
import { Category } from "@prisma/client";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Manager",
  description: "Gerenciado por Felipe Kadosh",
};

const Manager = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: Category;
  };
}) => {
  // Verifica se o usuário está autenticado
  const { userId } = await auth();
  if (!userId) {
    redirect("/login"); // Se não estiver autenticado, redireciona
  }

  // Obtém os parâmetros de pesquisa 'query' e 'category', caso existam
  const query = searchParams?.query || "";
  const selectedCategory = searchParams?.category || "all";

  // Realiza a busca de produtos no banco de dados
  const products = await db.products.findMany({
    where: {
      name: {
        contains: query, // Filtra os produtos pelo nome, insensível a maiúsculas e minúsculas
        mode: "insensitive",
      },
      ...(selectedCategory !== "all" && { category: selectedCategory }), // Aplica filtro de categoria, se selecionada
    },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      imageUrl: true,
      linkUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Obtém as categorias disponíveis
  const categories = await db.products.findMany({
    select: { category: true },
    distinct: ["category"], // Evita categorias duplicadas
  });

  return (
    <main>
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center w-[90%]">
          <div className="w-full flex justify-end items-center">
            <UserButton showName />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center w-[90%]">
          <div className="w-full flex justify-between items-center pb-4">
            <h1 className="md:text-2xl font-bold">Produtos</h1>
            <AddProductButton />
            {/* Botão para adicionar produtos */}
          </div>

          {/* Componente de pesquisa */}
          <div className="w-full flex flex-col gap-2 items-end">
            <SearchInput input="Filtrar por nome..." />
            {/* Filtro por categoria */}
            <CategoryFilter
              categories={categories.map((cat) => cat.category)}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Tabela de dados */}
          <div className="w-full h-dvh mt-1">
            <DataTable columns={productsColumns} data={products} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Manager;
