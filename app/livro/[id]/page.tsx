import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LivrosPageProps {
  params: {
    id: string;
  };
}

const LivroPage = async ({ params }: LivrosPageProps) => {
  const livros = await db.livros.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!livros) {
    return notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-full">
      <div className="relative w-full h-[250px] lg:h-full lg:w-1/2">
        <Image
          src={livros?.imageUrl}
          fill
          alt={livros?.name}
          className="object-cover"
        />

        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/livros">
            <ChevronLeftIcon />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col lg:h-full lg:w-1/2">
        <div className="p-5 border-b border-solid">
          <h1 className="text-2xl font-bold hind-siliguri-bold">
            {livros.name}
          </h1>
        </div>
        <div className="p-5 border-b border-solid">
          <h2 className="text-xl font-bold hind-siliguri-regular mb-2 text-gray-400 border-b border-solid">
            Descrição
          </h2>
          <p className="overflow-scroll h-[40vh] lg:overflow-scroll">{livros.description}</p>
        </div>
        <div className="p-5">
          <Button
            className="bg-blue-500 text-black text-base w-[100%] mt-3 hover:bg-transparent border-2 border-blue-500 hover:text-blue-500 xl:text-xl"
            asChild
          >
            <Link href={livros?.linkUrl} target="_blank">
              ADQUIRIR
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LivroPage;
