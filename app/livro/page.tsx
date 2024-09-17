import LivroItens from "../_components/livrosItens";
import LivroSearch from "../_components/livrosSearch";
import { db } from "../_lib/prisma";

interface LivrosPageProps {
  searchParams: {
    search?: string;
  };
}

const LivroPageSearch = async ({ searchParams }: LivrosPageProps) => {
  const livros = await db.livros.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <div className="m-3">
      <div className="flex my-3 gap-2">
        <LivroSearch />
      </div>

      <h2 className="my-3 text-gray-400">
        Resultados para &quot;{searchParams.search}&quot;
      </h2>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {livros.map((livros) => (
          <LivroItens key={livros.id} livros={livros} />
        ))}
      </div>
    </div>
  );
};

export default LivroPageSearch;
