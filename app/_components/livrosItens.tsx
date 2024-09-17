import { Card, CardContent } from "../_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Livros } from "@prisma/client";

interface LivrosItemProps {
  livros: Livros;
}

const LivrosItens = ({ livros }: LivrosItemProps) => {
  return (
    <Card className="max-w-[100%]">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="object-cover"
            src={livros.imageUrl}
            alt={livros.name}
          />
        </div>
        <div className="px-2 py-3">
          <h3 className="hind-siliguri-bold truncate">{livros.name}</h3>
          <p className="text-sm hind-siliguri-regular truncate">
            {livros.description}
          </p>
          <Button
            variant="outline"
            className="bg-blue-500 text-black mt-3 w-full hover:bg-transparent border-2 border-blue-500 hover:text-blue-500"
            asChild
          >
            <Link href={`/livro/${livros.id}`}>SAIBA MAIS</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivrosItens;
