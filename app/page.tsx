import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <>
      <div className="w-full h-full bg-cover bg1"></div>
      <div className="w-full h-full bg-cover bg2 justify-center flex flex-col p-3 gap-2 md:items-center lg:items-start">
        <h1 className="text-lg font-bold text-orange-500 oswald md:w-[70%] lg:w-[50%] xl:w-[40%] xl:text-3xl">
          APRENDA MARKETING DIGITAL DO ZERO
        </h1>
        <h2 className="text-base font-bold hind-siliguri-bold md:w-[70%] lg:w-[60%] xl:w-[40%] xl:text-xl">
          CRIE UM NEGÓCIO ONLINE SEJA UM PROFISSIONAL DA INTERNET TENHA UMA NOVA
          FONTE DE RENDA
        </h2>
        <p className="text-sm hind-siliguri-regular md:w-[70%] lg:w-[60%] xl:w-[40%] xl:text-lg">
          Faça parte do grupo de pessoas que vivem com mais liberdade,
          trabalhando com o que amam e fazendo um dinheiro de forma escalável e
          exponencial.
        </p>
        <Button className="bg-orange-500 text-black text-base w-[100%] mt-3 hover:bg-transparent border-2 border-orange-500 hover:text-orange-500 md:w-[70%] lg:w-[60%] xl:w-[40%]  xl:text-xl">
          <Link href="cursos">SAIBA MAIS</Link>
        </Button>
      </div>
      <div className="w-full h-full bg-cover bg3 justify-center flex flex-col p-3 gap-2 md:items-center lg:items-start">
        <h1 className="text-lg font-bold text-blue-500 oswald md:w-[70%] lg:w-[50%] xl:w-[40%] xl:text-3xl">
          BIBLIOTECA DOS MILIONÁRIOS
        </h1>
        <h2 className="text-base font-bold hind-siliguri-bold md:w-[70%] lg:w-[60%] xl:w-[40%] xl:text-xl">
          PORQUE NÃO PENSAR DAS MESMAS FORMAS QUE OS MILIONÁRIOS
        </h2>
        <p className="text-sm hind-siliguri-regular md:w-[70%] lg:w-[60%] xl:w-[40%] xl:text-lg]">
          Conquiste sua liberdade financeira e entre para o mundo dos
          investimentos.
        </p>
        <Button className="bg-blue-500 text-black text-base w-[100%] mt-3 hover:bg-transparent border-2 border-blue-500 hover:text-blue-500 md:w-[70%] lg:w-[60%] xl:w-[40%]  xl:text-xl">
          <Link href="livros">SAIBA MAIS</Link>
        </Button>
      </div>
    </>
  );
}
