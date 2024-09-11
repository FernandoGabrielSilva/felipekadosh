import { SearchIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { db } from "../_lib/prisma";
import LivrosItens from "../_components/livrosItens";

const Livros = async () => {
  const livros = await db.livros.findMany({});

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-2 mt-2 gap-2">
        <Input type="text" placeholder="Pesquisa..." />
        <Button className="bg-blue-500 text-black text-base hover:bg-transparent border-2 border-blue-500 hover:text-blue-500">
          <SearchIcon size="icon" />
        </Button>
      </div>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3">
        {livros.map((livros) => (
          <LivrosItens key={livros.id} livros={livros} />
        ))}
      </div>
    </div>
  );
};

export default Livros;
