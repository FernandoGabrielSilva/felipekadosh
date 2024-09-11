import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CursoPage = async ({ params }) => {
  const cursos = await db.cursos.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image
          src={cursos?.imageUrl}
          fill
          alt={cursos?.name}
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
      </div>
      <div className="p-5 border-b border-solid">
        <h1 className="text-2xl font-bold hind-siliguri-bold">{cursos.name}</h1>
      </div>
      <div className="p-5 border-b border-solid">
        <h2 className="text-xl font-bold hind-siliguri-regular mb-2 text-gray-400">
          Descrição
        </h2>
        <p>{cursos.description}</p>
      </div>
      <div className="p-5">
        <Button
          className="bg-orange-500 text-black text-base w-[100%] mt-3 hover:bg-transparent border-2 border-orange-500 hover:text-orange-500 md:w-[70%] lg:w-[60%] xl:w-[40%]  xl:text-xl"
          asChild
        >
          <Link href={cursos?.linkUrl} target="_blank">
            ADQUIRIR
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CursoPage;
