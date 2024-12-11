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

  // A URL da imagem é proveniente diretamente do banco de dados
  const imageUrl = product.imageUrl;  // URL da imagem armazenada no banco de dados

  // Verifique se a URL é válida (deve ser uma URL pública)
  if (!imageUrl || !imageUrl.startsWith("http")) {
    console.error("URL da imagem não é válida:", imageUrl);
    return {
      title: product.name,
      description: product.description.slice(0, 150),
      openGraph: {
        type: "website",
        title: product.name,
        description: product.description,
        url: `https://felipekadosh.com/products/${params.id}`,
        images: [
          {
            url: 'https://felipekadosh.com/default-image.jpg', // Imagem de fallback
            width: 1200,
            height: 630,
            alt: `Imagem do produto: ${product.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: ['https://felipekadosh.com/default-image.jpg'], // Imagem de fallback
      },
      alternates: {
        canonical: `https://felipekadosh.com/products/${params.id}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const productUrl = `https://felipekadosh.com/products/${params.id}`;

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
          url: imageUrl,  // Agora a URL da imagem vem diretamente do banco de dados
          width: 1200,
          height: 630,
          alt: `Imagem do produto: ${product.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],  // A URL da imagem do banco
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
  const product = await fetchProductMetadata(params.id);

  if (!product || !product.name || !product.imageUrl || !product.description) {
    return notFound();
  }

  return (
    <main className="flex flex-col lg:flex-row lg:h-full">
      {/* IMAGEM */}
      <div className="relative w-full h-[200px] lg:h-dvh lg:w-1/2">
        <Image
          src={product.imageUrl}  // Aqui usamos a URL da imagem diretamente do banco
          alt={product.name}
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
      <div className="flex flex-col pb-2 h-[calc(100dvh-200px)] lg:h-dvh lg:w-1/2">
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

