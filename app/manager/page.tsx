import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { UserButton } from "@clerk/nextjs";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_columns";
import SearchInput from "../_components/SearchInput";
import AddProductButton from "./_components/AddProductButton";
import UnifiedFilter from "../_components/UnifiedFilters";
import PaginationComponent from "../_components/PaginationComponent";
import { Category } from "@prisma/client"; // Importando o enum Category

export const metadata: Metadata = {
  title: "Felipe Kadosh | Manager",
  description: "Gerenciado por Felipe Kadosh",
};

const Manager = async ({
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

  // Validação do valor de selectedCategory
  // Garantindo que selectedCategory seja um valor válido do enum Category ou "all"
  const validCategory: Category | undefined =
    selectedCategory !== "Filto..." &&
    selectedCategory !== "all" &&
    Object.values(Category).includes(selectedCategory as Category)
      ? (selectedCategory as Category) // Convertendo para o tipo Category
      : undefined;

  // Valida se `orderBy` tem um valor válido
  const validOrderBy =
    orderBy === "name" || orderBy === "updatedAt" ? orderBy : "name";
  const validOrderDirection =
    orderDirection === "asc" || orderDirection === "desc"
      ? orderDirection
      : "asc";

  // Busca no banco
  const products = await db.products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(validCategory && { category: validCategory }), // Só filtra por categoria se for um valor válido
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

  const categories = await db.products.findMany({
    select: { category: true },
    distinct: ["category"],
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
          </div>

          {/* Componente de pesquisa */}
          <div className="w-full flex flex-col gap-2 items-end">
            <SearchInput input="Filtrar por nome..." />
            <UnifiedFilter
              categories={categories.map((cat) => cat.category)}
              selectedFilter={filter}
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
