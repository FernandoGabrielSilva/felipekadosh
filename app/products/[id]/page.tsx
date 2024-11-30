import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "../_components/ShareButton";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

interface ProductPageProps {
  params: { id: string };
}

// Função para configurar a metadata da página
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await db.products.findUnique({ where: { id: params.id } });

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto solicitado não existe.",
    };
  }

  const productUrl = `https://felipekadosh/products/${params.id}`;
  const imageUrl = product.imageUrl;

  return {
    title: product.name,
    description: product.description.slice(0, 150),
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url: productUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}
// Componente principal da página

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
        <ShareButton />
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
