import { Card, CardContent } from "../_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const CursoItens = ({ cursos }) => {
  return (
    <>
      <Card className="max-w-[100%]">
        <CardContent className="p-0">
          <div className="relative h-[159px] w-full">
            <Image
              fill
              className="object-cover"
              src={cursos.imageUrl}
              alt={cursos.name}
            />
          </div>
          <div className="px-2 py-3">
            <h3 className="hind-siliguri-bold truncate">{cursos.name}</h3>
            <p className="text-sm hind-siliguri-regular truncate">
              {cursos.description}
            </p>
            <Button
              variant="outline"
              className="bg-orange-500 text-black mt-3 w-full hover:bg-transparent border-2 border-orange-500 hover:text-orange-500"
            >
              <Link href={cursos.linkUrl}>SAIBA MAIS</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CursoItens;
