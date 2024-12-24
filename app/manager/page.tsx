import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { UserButton } from "@clerk/nextjs";
import { db } from "../_lib/prisma"; // Certifique-se de que o db está correto
import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_columns";
import SearchInput from "../_components/SearchInput";
import AddProductButton from "./_components/AddProductButton";
import UnifiedFilter from "../_components/UnifiedFilters"; // Corrigido o nome do componente
import PaginationComponent from "../_components/PaginationComponent";
import { Category } from "@prisma/client"; // Importando o enum Category diretamente do Prisma
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Função para configurar a metadata da página
export async function generateMetadata(): Promise<Metadata> {
// Verifique a URL gerada para Open Graph
  const productUrl = `https://felipekadosh.vercel.app/manager`;

  return {
    title: "Felipe Kadosh | Manager",
    description: "Marketing Digital",
    openGraph: {
      title: "Felipe Kadosh",
      description: "Marketing Digital",
      url: "https://felipekadosh.vercel.app/manager",
      images: [
        {
          url: "https://i.postimg.cc/G3J1PC17/link-icon-f.png",
          alt: "Felipe Kadosh",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Tipo de card Twitter
      title: "Felipe Kadosh | Login",
      description: "Marketing Digital",
      images: "https://i.postimg.cc/G3J1PC17/link-icon-f.png", // Imagem do produto
    },
    alternates: {
      canonical: productUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
  const { userId } = await auth();
    if (!userId) {
      redirect("/login");
  }
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "all|name|asc"; // Formato: "categoria|ordenarPor|direção"
  const [selectedCategory, orderBy, orderDirection] = filter.split("|");

  const page = parseInt(searchParams?.page || "1", 10);
  const perPage = parseInt(searchParams?.perPage || "10", 10);
  const skip = (page - 1) * perPage;

  // Validação de categoria com o enum Category importado diretamente do Prisma
  const validCategory =
    selectedCategory !== "Filtro..." &&
    Object.values(Category).includes(selectedCategory as Category)
      ? (selectedCategory as Category)
      : undefined;

  // Validações para os campos de ordenação
  const validOrderBy = orderBy === "name" || orderBy === "updatedAt" ? orderBy : "name";
  const validOrderDirection = orderDirection === "asc" || orderDirection === "desc" ? orderDirection : "asc";

  // Consulta de produtos com filtros e paginação
  const products = await db.products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(validCategory && { category: validCategory }), // Filtra por categoria se válida
    },
    orderBy: {
      [validOrderBy]: validOrderDirection, // Ajuste aqui
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
  const categoriesFromDb = await db.products.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  // Converter explicitamente para Category[]
  const categories: Category[] = categoriesFromDb.map((cat) => {
    return cat.category as Category; // Convertendo explicitamente para o tipo Category
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

            {/* Filtro unificado */}
            <UnifiedFilter
              categories={categories} // Passando as categorias corretamente
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

