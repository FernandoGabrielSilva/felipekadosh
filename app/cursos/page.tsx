import { db } from "../_lib/prisma";
import CursoItens from "../_components/cursosItens";
import CursoSearch from "../_components/cursosSeach";

const Cursos = async () => {
  const cursos = await db.cursos.findMany({});

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-2 mt-2 gap-2">
        <CursoSearch />
      </div>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {cursos.map((cursos) => (
          <CursoItens key={cursos.id} cursos={cursos} />
        ))}
      </div>
    </div>
  );
};

export default Cursos;
