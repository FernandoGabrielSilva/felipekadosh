import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import SearchInput from "../_components/SearchInput";
import { db } from "../_lib/prisma";
import ProductsItem from "../_components/ProductsItem";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Producs",
  description: "Gerenciado por Felipe Kadosh",
};

const Products = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  // Obtém o parâmetro de pesquisa 'query', caso exista
  const query = searchParams?.query || "";

  // Realiza a busca de produtos no banco de dados
  const products = await db.products.findMany({
    where: {
      name: {
        contains: query, // Filtra os produtos pelo nome, insensível a maiúsculas e minúsculas
        mode: "insensitive",
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return (
    <main className="flex flex-col items-center">
      <div className="w-[95%]">
        {/* Pesquisa */}
        <div className="w-full mt-6 mb-4">
          <SearchInput input="Pesquisar..." />
        </div>
        {/* Verifica se há produtos */}
        {products.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {products.map((product) => (
              <ProductsItem product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
