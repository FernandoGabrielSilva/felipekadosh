import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { db } from "../_lib/prisma";
import UnifiedFilter from "../_components/UnifiedFilters";
import ProductsItem from "./_components/ProductsItem";
import PaginationComponent from "../_components/PaginationComponent";
import SearchInput from "../_components/SearchInput";
// Importando o enum Category do Prisma
import { Category } from "@prisma/client";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Products",
  description: "Gerenciado por Felipe Kadosh",
};

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filter?: string; // Combinação de categoria e ordenação
    page?: string;
    perPage?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "all|name|asc"; // Formato: "categoria|ordenarPor|direção"
  const [selectedCategory, orderBy, orderDirection] = filter.split("|");

  const page = parseInt(searchParams?.page || "1", 10);
  const perPage = parseInt(searchParams?.perPage || "10", 10);
  const skip = (page - 1) * perPage;

  // Validação do valor de selectedCategory com o enum Category do Prisma
  const validCategory = selectedCategory !== "Filto..." && Object.values(Category).includes(selectedCategory as Category)
    ? selectedCategory as Category
    : undefined;

  // Valida se `orderBy` tem um valor válido
  const validOrderBy = orderBy === "name" || orderBy === "updatedAt" ? orderBy : "name";
  const validOrderDirection = orderDirection === "asc" || orderDirection === "desc" ? orderDirection : "asc";

  // Busca no banco de dados
  const products = await db.products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(validCategory && { category: validCategory }), // Se categoria válida, aplica o filtro
    },
    orderBy: {
      [validOrderBy]: validOrderDirection as "asc" | "desc", // Ordenação válida
    },
    skip,
    take: perPage,
  });

  const totalProducts = await db.products.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(validCategory && { category: validCategory }),
    },
  });

  const totalPages = Math.ceil(totalProducts / perPage);

  // Obter categorias distintas do banco de dados
  const categories = await db.products.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  return (
    <main className="flex flex-col items-center h-dvh">
      <div className="flex flex-col w-[95%]">
        {/* Pesquisa */}
        <div className="flex flex-col w-full mt-6 mb-4 gap-2 items-end">
          <SearchInput input="Pesquisar..." />
          {/* Filtro unificado */}
          <UnifiedFilter
            categories={categories.map((cat) => cat.category)}
            selectedFilter={filter}
          />
        </div>
        {/* Produtos */}
        {products.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100dvh-120px)] justify-between">
            {/* Lista de Produtos */}
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

