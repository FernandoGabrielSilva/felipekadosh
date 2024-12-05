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
  let product = null;
  try {
    product = await db.products.findUnique({ where: { id: params.id } });
  } catch (error) {
    console.error("Erro ao buscar metadados do produto:", error);
  }

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto solicitado não existe ou ocorreu um erro.",
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
  let product = null;
  try {
    product = await db.products.findUnique({ where: { id: params.id } });
  } catch (err) {
    console.error("Erro ao acessar o banco de dados:", err);
  }

  if (!product) {
    return notFound();
  }

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
          <Link href="/products" aria-label="Voltar para a lista de produtos">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <ShareButton />
      </div>

      {/* TEXTO */}
      <div className="flex flex-col pb-2 h-[calc(100dvh-250px)] lg:h-dvh lg:w-1/2">
        <div className="p-5 border-b border-solid">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="font-semibold text-gray-500">
            Categoria: {product.category}
          </p>
        </div>
        <div className="p-5 border-b h-[calc(100dvh-403.19px)] overflow-hidden border-solid md:h-[calc(100dvh-153.19px)]">
          <h2 className="text-lg font-bold mb-2">Descrição</h2>
          <p className="overflow-auto h-full">{product.description}</p>
        </div>
        <div className="py-3 flex flex-col items-center">
          <Button variant="default" className="w-[90%]" asChild>
            <Link
              href={product.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Adquirir ${product.name}`}
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

