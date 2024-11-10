import Image from "next/image";
import CardsComponents from "./_components/_CardsComponents";

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-1 items-center justify-items-center h-dvh">
        <div className="flex flex-col items-center justify-center w-[90%] h-[50%] p-4">
          <div className="flex justify-center items-center relative w-full h-full">
            <Image
              src="https://i.postimg.cc/zDMwtSFw/20240420-213422.png"
              alt="Imagem de Perfil"
              width="350"
              height="350"
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold pt-5">Felipe Kadosh</h1>
          </div>
        </div>
      </section>
      <section className="flex flex-col p-2 justify-center items-center">
        <div>
          <div className="flex justify-center mb-2">
            <h3 className="w-[70%] text-center border rounded-full p-3 text-base">
              Conheça nossos métodos
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              Método Equipe de Vendas Interna
            </h2>
          </div>
          <div className="flex items-center justify-center my-3">
            <div className="grid grid-cols-1 w-[95%] gap-3">
              <CardsComponents />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col p-2 justify-center items-center">
        <div className="w-full">
          <div className="flex justify-center mb-2">
            <h3 className="w-[50%] text-center border rounded-full px-5 p-3 text-base">
              Sobre
            </h3>
          </div>
          <div className="flex my-3">
            <h2 className="font-semibold text-wrap text-4xl px-3">Quem é:</h2>
          </div>
          <div className="flex my-3">
            <h2 className="font-medium text-wrap text-2xl px-3">
              Felipe Kadosh
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}
