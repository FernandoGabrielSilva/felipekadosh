import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButton from "../_components/ShareButton";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";

interface ProductPageProps {
  params: { id: string };
}

// Função auxiliar para buscar os dados do produto
async function fetchProductMetadata(id: string) {
  try {
    const product = await db.products.findUnique({ where: { id } });
    return product;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

// Função para configurar a metadata da página
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await fetchProductMetadata(params.id);

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto solicitado não existe ou ocorreu um erro.",
    };
  }

  // Verifique a URL gerada para Open Graph
  const productUrl = `https://felipekadosh.vercel.app/products/${params.id}`;

  return {
    title: product.name,
    description: product.description || "Sem descrição disponível",
    openGraph: {
      title: product.name,
      description: product.description || "Sem descrição disponível",
      url: `https://felipekadosh.vercel.app/products/${params.id}`, // URL do produto
      images: [
        {
          url: product.imageUrl,
          alt: product.name,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Tipo de card Twitter
      title: product.name,
      description: product.description || "Sem descrição disponível",
      images: [product.imageUrl], // Imagem do produto
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

// Componente principal da página
const ProductPage = async ({ params }: ProductPageProps) => {
  // Verificar se o parâmetro id está sendo passado corretamente
  console.log('params.id:', params.id);  // Verifique se o id está correto
  
  const product = await fetchProductMetadata(params.id);

  if (!product || !product.name || !product.imageUrl || !product.description) {
    return notFound();
  }
  
  // Supondo que o produto tenha um array de URLs de imagens
  const productImages = product.imageUrls || [product.imageUrl];

  return (
    <main className="flex flex-col lg:flex-row lg:h-full">
      {/* IMAGEM */}
      <div className="relative w-full h-[250px] lg:h-dvh lg:w-1/2">
        <Carousel>
          <CarouselContent>
            {productImages.map((imageUrl, index) => (
              <CarouselItem key={index} className="relative w-full h-full">
                <div className="relative w-full h-[250px] lg:h-dvh">
		    <Image
		      src={imageUrl}
		      alt={`${product.name} - Imagem ${index + 1}`}
		      fill
		      className="object-cover"
		    />
		</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute inset-x-1/2 left-4"/>
          <CarouselNext className="absolute inset-y-1/2 right-4"/>
        </Carousel>
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
            Categoria: {product.category || "Não especificado"}
          </p>
        </div>
        <div className="p-5 border-b h-[calc(100dvh-403.19px)] overflow-hidden border-solid md:h-[calc(100dvh-153.19px)]">
          <h2 className="text-lg font-bold mb-2">Descrição</h2>
          <p className="overflow-auto h-full pb-5 whitespace-pre-wrap">{product.description}</p>
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

