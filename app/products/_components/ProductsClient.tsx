"use client";

import { useState, useEffect } from "react";
import ProductsItem from "./ProductsItem";
import PaginationComponent from "@/app/_components/PaginationComponent";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Products } from "@prisma/client";

interface ProductsClientProps {
  initialProducts: Products[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

const ProductsClient = ({
  initialProducts,
  totalProducts,
  totalPages,
  currentPage,
}: ProductsClientProps) => {
  const [products, setProducts] = useState<Products[] | null>(null);

  useEffect(() => {
    // Simula carregamento no cliente
    const timeout = setTimeout(() => {
      setProducts(initialProducts);
    }, 1000); // Simulando 1s de carregamento

    return () => clearTimeout(timeout);
  }, [initialProducts]);

  return (
    <div className="flex flex-col h-[calc(100dvh-120px)] justify-between">
      <div className="grid grid-cols-1 gap-2 w-full md:grid-cols-4 lg:grid-cols-5">
        {/* Se produtos estiverem carregando, mostra os Skeletons */}
        {products === null
          ? Array.from({ length: 10 }).map((_, idx) => (
              <ProductsItem key={idx} isLoading={true} />
            ))
          : products.map((product) => (
              <ProductsItem key={product.id} product={product} isLoading={false} />
            ))}
      </div>
      <div className="py-4 flex justify-center">
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ProductsClient;

