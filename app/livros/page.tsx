import { db } from "../_lib/prisma";
import LivrosItens from "../_components/livrosItens";
import LivroSearch from "../_components/livrosSearch";

const Livros = async () => {
  const livros = await db.livros.findMany({});

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-2 mt-2 gap-2">
        <LivroSearch />
      </div>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {livros.map((livros) => (
          <LivrosItens key={livros.id} livros={livros} />
        ))}
      </div>
    </div>
  );
};

export default Livros;
