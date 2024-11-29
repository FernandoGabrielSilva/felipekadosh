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
import PaginationComponent from "../_components/PaginationComponent";

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
    page?: string; // Página atual
    perPage?: string; // Itens por página
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
  const page = parseInt(searchParams?.page || "1", 10); // Página padrão é 1
  const perPage = parseInt(searchParams?.perPage || "10", 10); // Padrão de 10 itens por página
  const skip = (page - 1) * perPage; // Calcular o deslocamento

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
    skip,
    take: perPage,
  });

  // Conta o total de produtos
  const totalProducts = await db.products.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(selectedCategory !== "all" && { category: selectedCategory }),
    },
  });

  // Total de páginas
  const totalPages = Math.ceil(totalProducts / perPage);

  // Obtem as categorias disponiveis
  const categories = await db.products.findMany({
    select: { category: true },
    distinct: ["category"], //Evita categorias duplicadas
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
              categories={categories.map((cat) => cat.category)} // Substitua pelas categorias reais
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Tabela de dados */}
          <div className="w-full mt-1">
            <DataTable columns={productsColumns} data={products} />
          </div>
          {/* Paginação */}
          <div className="mt-6 flex justify-center">
            <PaginationComponent currentPage={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Manager;
