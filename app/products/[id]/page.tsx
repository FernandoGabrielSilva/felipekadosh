import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

interface ProductPageProps {
  params: { id: string };
}

// Função auxiliar para buscar os dados do produto
async function fetchProductMetadata(id: string) {
  if (!id) {
    console.error("ID do produto não fornecido.");
    throw new Error("ID inválido");
  }

  try {
    const product = await db.products.findUnique({ where: { id } });
    if (!product) {
      console.warn(`Produto com ID ${id} não encontrado.`);
      return null;
    }
    return product;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw new Error("Erro no banco de dados");
  }
}

// Função para configurar a metadata da página
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await fetchProductMetadata(params.id);

    if (!product) {
      return {
        title: "Produto não encontrado",
        description: "O produto solicitado não existe ou ocorreu um erro.",
      };
    }

    const productUrl = `https://felipekadosh.com/products/${params.id}`;
    const imageUrl = product.imageUrl?.startsWith("http")
      ? product.imageUrl
      : `https://felipekadosh.com${product.imageUrl || "/placeholder.png"}`;

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
            alt: `Imagem do produto: ${product.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description,
        images: [imageUrl],
      },
      alternates: {
        canonical: productUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
    return {
      title: "Erro ao carregar",
      description: "Ocorreu um problema ao carregar as informações do produto.",
    };
  }
}

// Componente de compartilhamento
const ShareButton = ({ productUrl, productName, productDescription, productImage }: { productUrl: string, productName: string, productDescription: string, productImage: string }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url: productUrl,
          files: productImage ? [new File([], productImage, { type: 'image/jpeg' })] : undefined,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Compartilhamento não suportado neste dispositivo.");
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="icon">
      Compartilhar
    </Button>
  );
};

// Componente principal da página
const ProductPage = async ({ params }: ProductPageProps) => {
  try {
    const product = await fetchProductMetadata(params.id);

    if (!product || !product.name || !product.imageUrl || !product.description) {
      return notFound();
    }

    const productUrl = `https://felipekadosh.com/products/${params.id}`;

    return (
      <main className="flex flex-col lg:flex-row lg:h-full">
        {/* IMAGEM */}
        <div className="relative w-full h-[200px] lg:h-dvh lg:w-1/2">
          <Image
            src={product.imageUrl || "/placeholder.png"}
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
          <ShareButton 
            productUrl={productUrl} 
            productName={product.name} 
            productDescription={product.description.slice(0, 150)} 
            productImage={product.imageUrl || "/placeholder.png"} 
          />
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
            <p className="overflow-auto h-full pb-5 whitespace-pre-wrap">
              {product.description}
            </p>
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
  } catch (error) {
    console.error("Erro ao renderizar a página:", error);
    return notFound();
  }
};

export default ProductPage;

