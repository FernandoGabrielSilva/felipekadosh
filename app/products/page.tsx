import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import SearchInput from "../_components/SearchInput";
import { db } from "../_lib/prisma";
import ProductsItem from "./_components/ProductsItem";
import { Category } from "@prisma/client";
import CategoryFilter from "../_components/CategoryFilter";
import PaginationComponent from "../_components/PaginationComponent";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Producs",
  description: "Gerenciado por Felipe Kadosh",
};

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: Category;
    page?: string; // Página atual
    perPage?: string; // Itens por página
  };
}) => {
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
    <main className="flex flex-col items-center h-dvh">
      <div className="flex flex-col w-[95%]">
        {/* Pesquisa */}
        <div className="flex flex-col w-full mt-6 mb-4 gap-2 items-end">
          <SearchInput input="Pesquisar..." />
          {/* Filtro por categoria */}
          <CategoryFilter
            categories={categories.map((cat) => cat.category)} // Substitua pelas categorias reais
            selectedCategory={selectedCategory}
          />
        </div>
        {/* Verifica se há produtos */}
        {products.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100dvh-120px)] justify-between">
            {/* Produtos */}
            <div className="grid grid-cols-1 gap-2 w-full md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <ProductsItem product={product} key={product.id} />
              ))}
            </div>

            {/* Paginação */}
            <div className="py-4 flex justify-center">
              <PaginationComponent currentPage={page} totalPages={totalPages} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
