import CursoItens from "../_components/cursosItens";
import CursoSearch from "../_components/cursosSeach";
import { db } from "../_lib/prisma";

interface CursosPageProps {
  searchParams: {
    search?: string;
  };
}

const CursoPageSearch = async ({ searchParams }: CursosPageProps) => {
  const cursos = await db.cursos.findMany({
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
        <CursoSearch />
      </div>

      <h2 className="my-3 text-gray-400">
        Resultados para &quot;{searchParams.search}&quot;
      </h2>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {cursos.map((cursos) => (
          <CursoItens key={cursos.id} cursos={cursos} />
        ))}
      </div>
    </div>
  );
};

export default CursoPageSearch;
