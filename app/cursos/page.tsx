import { SearchIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { Card, CardContent } from "../_components/ui/card";
import Image from "next/image";

const Cursos = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex p-2 mt-2 gap-2">
        <Input type="text" placeholder="Pesquisa..." />
        <Button className="bg-orange-500 text-black text-base hover:bg-transparent border-2 border-orange-500 hover:text-orange-500">
          <SearchIcon />
        </Button>
      </div>
      <div className="grid grid-cols-2 m-3 col-span-2 gap-3">
        <Card className="max-w-[100%]">
          <CardContent className="p-0">
            <div className="relative h-[159px] w-full">
              <Image
                fill
                className="object-cover"
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="Algo"
              />
            </div>
            <div className="px-2 py-3">
              <h3 className="hind-siliguri-bold truncate">Exemplo de Curso</h3>
              <p className="text-sm hind-siliguri-regular truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora voluptate aliquid placeat unde culpa totam porro amet
                tempore eos distinctio dolore quod eveniet consectetur sunt,
                maiores, impedit adipisci! Quibusdam, iure?
              </p>
              <Button
                variant="outline"
                className="bg-orange-500 text-black mt-3 w-full hover:bg-transparent border-2 border-orange-500 hover:text-orange-500"
              >
                SAIBA MAIS
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-[100%]">
          <CardContent className="p-0">
            <div className="relative h-[159px] w-full">
              <Image
                fill
                className="object-cover"
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="Algo"
              />
            </div>
            <div className="px-2 py-3">
              <h3 className="hind-siliguri-bold truncate">Exemplo de Curso</h3>
              <p className="text-sm hind-siliguri-regular truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora voluptate aliquid placeat unde culpa totam porro amet
                tempore eos distinctio dolore quod eveniet consectetur sunt,
                maiores, impedit adipisci! Quibusdam, iure?
              </p>
              <Button
                variant="outline"
                className="bg-orange-500 text-black mt-3 w-full hover:bg-transparent border-2 border-orange-500 hover:text-orange-500"
              >
                SAIBA MAIS
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-[100%]">
          <CardContent className="p-0">
            <div className="relative h-[159px] w-full">
              <Image
                fill
                className="object-cover"
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="Algo"
              />
            </div>
            <div className="px-2 py-3">
              <h3 className="hind-siliguri-bold truncate">Exemplo de Curso</h3>
              <p className="text-sm hind-siliguri-regular truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora voluptate aliquid placeat unde culpa totam porro amet
                tempore eos distinctio dolore quod eveniet consectetur sunt,
                maiores, impedit adipisci! Quibusdam, iure?
              </p>
              <Button
                variant="outline"
                className="bg-orange-500 text-black mt-3 w-full hover:bg-transparent border-2 border-orange-500 hover:text-orange-500"
              >
                SAIBA MAIS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cursos;
