import { Products } from "@prisma/client";
import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface ProductsItemProps {
  product: Products;
}
const ProductsItem = ({ product }: ProductsItemProps) => {
  return (
    <Card className="min-w-[150px]">
      <CardContent className="flex-rows-2 gap-1 p-0 flex  md:flex-col md:gap-0">
        {/* IMAGEM */}
        <div className="relative h-[150px] w-[calc(100%-150px)] md:w-full">
          {product.imageUrl ? (
            <Image
              fill
              className="object-cover rounded-xl"
              src={product.imageUrl}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, 50vw" // Sugestão para otimizar carregamento
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              Imagem não disponível
            </div>
          )}
        </div>
        {/* TEXTO */}
        <div className="pt-3 pb-0 w-full md:pb-2 px-1">
          <h3 className="font-semibold overflow-hidden text-ellipsis h-6">{product.name}</h3>
          <p className="text-sm text-gray-500">Categoria: {product.category}</p>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis h-10">
            {product.description}
          </p>
          <Button variant="secondary" className="w-full mt-3" asChild>
            <Link href={`/products/${product.id}`}>ADQUIRIR</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsItem;
