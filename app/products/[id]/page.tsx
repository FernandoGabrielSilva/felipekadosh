import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
//import ShareButton from "../_components/ShareButton";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  //Chamar banco de dados
  const product = await db.products.findUnique({ where: { id: params.id } });

  //Caso não exista o produto
  if (!product) {
    return notFound();
  }

  // Renderizar a página com os dados do produto
  return (
    <main className="flex flex-col lg:flex-row lg:h-full">
      {/* IMAGEM */}
      <div className="relative w-full h-[250px] lg:h-dvh lg:w-1/2">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/products">
            <ChevronLeftIcon />
          </Link>
        </Button>
        {/* <ShareButton
          title={product.name}
          description={product.description}
          image={product.imageUrl}
        /> */}
      </div>
      {/* TEXTO */}
      <div className="flex flex-col lg:h-dvh lg:w-1/2">
        <div className="p-5 border-b border-solid">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="font-semibold text-gray-500">
            Categoria: {product.category}
          </p>
        </div>
        <div className="p-5 border-b border-solid">
          <h2 className="text-lg font-bold mb-2">Descrição</h2>
          <p className="overflow-auto h-[40dvh] lg:h-[65dvh]">
            {product.description}
          </p>
        </div>
        <div className="mt-3 flex flex-col items-center">
          <Button variant="default" className="w-[90%]" asChild>
            <Link
              href={product.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ADQUIRIR
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
