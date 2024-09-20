import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CursosPageProps {
  params: {
    id: string;
  };
}

const CursoPage = async ({ params }: CursosPageProps) => {
  const cursos = await db.cursos.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!cursos) {
    return notFound();
  }

  const share = (navigator) => {
    if (navigator.share !== undefined) {
      navigator.share({
         title:{cursos.name},
         url:'https://felipekadosh.vercel.app/curso/{cursos.id}',
         image:{cursos.imageUrl},
         description:{cursos.description},
       })
     }
   }

  return (
    <div className="flex flex-col lg:flex-row lg:h-full">
      <div className="relative w-full h-[250px] lg:h-full lg:w-1/2">
        <Image
          src={cursos?.imageUrl}
          fill
          alt={cursos.name}
          className="object-cover"
        />

        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/cursos">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-4 top-4"
          asChild
          onClick={share}
        >
          <Share2 />
        </Button>
      </div>
      <div className="flex flex-col lg:h-full lg:w-1/2">
        <div className="p-5 border-b border-solid">
          <h1 className="text-2xl font-bold hind-siliguri-bold">
            {cursos.name}
          </h1>
        </div>
        <div className="p-5 border-b border-solid lg:h-3/4">
          <h2 className="text-xl font-bold hind-siliguri-regular mb-2 text-gray-400 border-b border-solid">
            Descrição
          </h2>
          <p className="overflow-scroll h-[40vh] lg:overflow-scroll">{cursos.description}</p>
        </div>
        <div className="flex p-5 lg:text-end">
          <Button
            className="bg-orange-500 text-black text-base w-[100%] mt-3 hover:bg-transparent border-2 border-orange-500 hover:text-orange-500 xl:text-xl"
            asChild
          >
            <Link href={cursos?.linkUrl} target="_blank">
              ADQUIRIR
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CursoPage;
