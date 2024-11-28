import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import SearchInput from "../_components/SearchInput";
import { db } from "../_lib/prisma";
import ProductsItem from "../_components/ProductsItem";

export const metadata: Metadata = {
  title: "Felipe Kadosh | Producs",
  description: "Gerenciado por Felipe Kadosh",
};

const Products = async () => {
  const products = await db.products.findMany({});
  return (
    <main className="flex flex-col items-center">
      <div className="w-[95%]">
        <div className="w-full mt-6 mb-4">
          <SearchInput input="Pesquisar..." />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {products.map((product) => (
            <ProductsItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
