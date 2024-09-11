import { SearchIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { db } from "../_lib/prisma";
import CursoItens from "../_components/cursosItens";

const Cursos = async () => {
  const cursos = await db.cursos.findMany({});

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-2 mt-2 gap-2">
        <Input type="text" placeholder="Pesquisa..." />
        <Button className="bg-orange-500 text-black text-base hover:bg-transparent border-2 border-orange-500 hover:text-orange-500">
          <SearchIcon />
        </Button>
      </div>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3">
        {cursos.map((cursos) => (
          <CursoItens key={cursos.id} cursos={cursos} />
        ))}
      </div>
    </div>
  );
};

export default Cursos;
