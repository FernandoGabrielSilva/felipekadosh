import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { db } from "../_lib/prisma";
import ProductsClient from "./_components/ProductsClient"; // Novo componente cliente
import UnifiedFilter from "../_components/UnifiedFilters";
import SearchInput from "../_components/SearchInput";
import { Category } from "@prisma/client";

// Função para configurar a metadata da página
export async function generateMetadata(): Promise<Metadata> {
// Verifique a URL gerada para Open Graph
  const productUrl = `https://felipekadosh.vercel.app/products`;

  return {
    title: "Felipe Kadosh | Produtos",
    description: "Marketing Digital",
    openGraph: {
      title: "Felipe Kadosh",
      description: "Marketing Digital",
      url: "https://felipekadosh.vercel.app/products",
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
      title: "Felipe Kadosh | Produtos",
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

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filter?: string;
    page?: string;
    perPage?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "all|name|asc";
  const [selectedCategory, orderBy, orderDirection] = filter.split("|");

  const page = parseInt(searchParams?.page || "1", 10);
  const perPage = parseInt(searchParams?.perPage || "10", 10);
  const skip = (page - 1) * perPage;

  const validCategory =
    selectedCategory !== "Filto..." && Object.values(Category).includes(selectedCategory as Category)
      ? (selectedCategory as Category)
      : undefined;

  const validOrderBy = orderBy === "name" || orderBy === "updatedAt" ? orderBy : "name";
  const validOrderDirection = orderDirection === "asc" || orderDirection === "desc" ? orderDirection : "asc";

  const products = await db.products.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      ...(validCategory && { category: validCategory }),
    },
    orderBy: {
      [validOrderBy]: validOrderDirection as "asc" | "desc",
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
    <main className="flex flex-col items-center h-dvh">
      <div className="flex flex-col w-[95%]">
        <div className="flex flex-col w-full mt-6 mb-4 gap-2 items-end">
          <SearchInput input="Pesquisar..." />
          <UnifiedFilter
            categories={categories.map((cat) => cat.category)}
            selectedFilter={filter}
          />
        </div>
        <ProductsClient
          initialProducts={products}
          totalProducts={totalProducts}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    </main>
  );
};

export default Products;

