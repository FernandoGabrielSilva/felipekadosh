import Image from "next/image";
import CardsComponents from "./_components/CardsComponents";
import { Button } from "./_components/ui/button";
import Link from "next/link";
import { CircleArrowDown, CircleArrowRight, Clock } from "lucide-react";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

// Função para configurar a metadata da página
export async function generateMetadata(): Promise<Metadata> {
// Verifique a URL gerada para Open Graph
  const productUrl = `https://felipekadosh.vercel.app`;

  return {
    title: "Felipe Kadosh",
    description: "Marketing Digital",
    openGraph: {
      title: "Felipe Kadosh",
      description: "Marketing Digital",
      url: "https://felipekadosh.vercel.app/",
      images: [
        {
          url: "https://i.postimg.cc/G3J1PC17/link-icon-f.png",
          alt: "Felipe Kadosh",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Tipo de card Twitter
      title: "Felipe Kadosh",
      description: "Marketing Digital",
      images: "https://i.postimg.cc/G3J1PC17/link-icon-f.png", // Imagem do produto
    },
    alternates: {
      canonical: productUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Home() {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual dinamicamente

  return (
    <main>
      {/* INICIAL */}
      <section className="flex items-center h-dvh">
        <div className="flex items-center p-4 md:justify-center">
          <div className="grid grid-cols-1 items-center relative -mt-40 w-full h-full md:mt-0 md:grid-cols-2 md:w-[80%]">
            {/* IMAGEM */}
            <div className="w-full h-full">
              <Image
                src="https://i.postimg.cc/HxNFhyCK/20240420-2134222.png"
                alt="Imagem de Perfil"
                width={450}
                height={450}
                className="w-full h-auto"
              />
            </div>
            {/* TEXTO */}
            <div className="absolute top-2/3 md:static">
              <div>
                <h2 className="text-2xl text-center font-bold pt-5 md:text-4xl md:text-start">
                  Aumente suas vendas com
                  <span className="text-primary"> previsibilidade</span> através
                  de um processo de vendas eficiente.
                </h2>
              </div>
              <div>
                <p className="text-lg text-center font-normal pt-5 md:text-2xl md:text-justify">
                  Tenha sua Equipe de Vendas Interna estruturada em 37 dias e
                  aumente suas vendas em 30% através do método que gerou 800 Mil, 
                  sem aumentar o investimento em anúncios e com menos
                  de 5 horas por semana.
                </p>
                {/* BOTÃO QUE LEVA PRO WHATSAPP */}
                <div className="flex justify-center p-4 md:p-0 md:my-5">
                  <Link href="#" className="w-full">
                    <Button variant="default" className="w-full md:text-xl">
                      AGENDAR UMA CONSULTORIA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* EQUIPE DE VENDAS */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Conheça nossos métodos
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              Método
              <span className="text-primary"> Equipe de Vendas Interna</span>
            </h2>
          </div>
          <div className="flex items-center justify-center my-3 md:w-[70%]">
            {/* CARDS */}
            <div className="grid grid-cols-1 w-[95%] gap-3 md:grid-cols-2">
              <CardsComponents
                title="Recrutamento e Seleção"
                description="Auxiliamos no recrutamento, seleção e treinamento dos membros de
            equipe comercial, garantindo que eles tenham as competências e a
            senioridade necessária para atingir os objetivos."
              />
              <CardsComponents
                title="Processos Comerciais"
                description="Aumentamos a produtividade e a conversão de equipe comercial,
            através da criação dos Scripts e da implementação de ferramentas de
            CRM, Omnichannel, VOIP e Sales Engagement."
              />
              <CardsComponents
                title="Comunicação"
                className="md:col-span-2"
                description="
                Aumentamos a eficiência da equipe comercial, através da criação de
                ferramentas de comunicação comercial e de marketing, como
                Omnichannel, VOIP e Sales Engagement."
              />
            </div>
          </div>
        </div>
      </section>
      {/* MAQUINA DE VENDAS */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Máquina De Vendas
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              Implementação da
              <span className="text-primary"> Máquina de Vendas</span>
            </h2>
          </div>
          <div className="flex items-center justify-center my-3">
            {/* CARDS */}
            <div className="grid grid-cols-1 w-[95%] gap-3 md:grid-cols-2 md:w-[70%]">
              <CardsComponents
                title="Kick-Off do Projeto"
                className="text-primary"
                children={<Clock size={15} className="text-primary" />}
                subtitulo="Duração: 2 Semanas"
                description="Objetivo: realizar o diagnóstico da operação atual, aprofundar em suas soluções e mapear a jornada de compra do perfil de cliente ideal."
              />
              <CardsComponents
                title="Processos Comerciais"
                className="text-primary"
                children={<Clock size={15} className="text-primary" />}
                subtitulo="Duração: 4 Semanas"
                description="Objetivos: estruturar o processo que a equipe comercial irá executar para reduzir a variabilidade de ações e gerar receita previsível."
              />
              <CardsComponents
                title="Comunicação"
                className="text-primary"
                children={<Clock size={15} className="text-primary" />}
                subtitulo="Duração: 1 Semanas"
                description="Objetivo: Aumentamos a eficiência da equipe comercial, através da criação de
                ferramentas de comunicação comercial e de marketing."
              />
              <CardsComponents
                title="Treinamento da Equipe"
                className="text-primary"
                children={<Clock size={15} className="text-primary" />}
                subtitulo="Duração: Contínuo"
                description="Objetivo: desenvolvimento de competências técnicas comportamentais necessárias para que a equipe conduza o processo de vendas com maestria."
              />
              <CardsComponents
                title="Melhoria Contínua"
                className="md:col-span-2 text-primary"
                children={<Clock size={15} className="text-primary" />}
                subtitulo="Duração: 11 Meses"
                description="Objetivo:  analisar indicadores de performance, mapear oportunidades de melhoria e definir novos planos de ação."
              />
            </div>
          </div>
        </div>
      </section>
      {/* ENTREGAVEIS DA CONSULTA */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div>
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Veja o que você recebe
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              <span className="text-primary">Entregáveis</span> da Consultoria
            </h2>
          </div>
          {/* FUNIL */}
          <div>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2  md:text-xl md:gap-4">
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" />
                Treinamento de equipe
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" /> Geração
                de leads qualificados
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" /> Script
                de negociação
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" /> Fluxos
                de prospecção
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" /> Matriz
                de objeções
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" />
                Metadologia de onboardinhg e rampeamento
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" />
                Planejamento estratégico comercial
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" />
                Implementação de ferramentas
              </li>
              <li className="flex gap-2 border-l-4 items-center">
                <CircleArrowRight size={20} className="text-primary" />
                Metodoligia de gestão comercial
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* RECRUTAMENTO */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="md:w-[70%]">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Recrutamento
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-xl md:text-4xl">
              <span className="text-primary">
                Recrute profissionais de vendas qualificados{" "}
              </span>
              e alcance novos patamares de faturamento com previsibilidade
            </h2>
          </div>
          <div className="w-full">
            <ul className="w-full text-center flex flex-col items-center font-semibold text-medium text-primary md:text-xl">
              <li className="border-2 p-6 w-[95%] rounded-b-[2rem] rounded-t-xl bg-card">
                Reunião de Fit Cultura
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[90%] rounded-b-[2rem] rounded-t-xl bg-card">
                Divulgação e Triagem
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[85%] rounded-b-[2rem] rounded-t-xl bg-card">
                Pré-entrevistas
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[80%] rounded-b-[2rem] rounded-t-xl bg-card">
                Teste de perfil comportamental
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[75%] rounded-b-[2rem] rounded-t-xl bg-card">
                Case técnico
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[70%] rounded-b-[2rem] rounded-t-xl bg-card">
                Entrevista final
              </li>
              <CircleArrowDown />
              <li className="border-2 p-6 w-[65%] rounded-b-[2rem] rounded-t-xl bg-card">
                Onboarding
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* PRODUTOS */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="flex flex-col w-full items-center md:w-[70%]">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Produtos
            </h3>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-center font-medium text-wrap text-xl md:text-2xl md:w-[60%]">
              Vender não é um dom, mas é uma arte reproduzida dos seu
              conhecimentos, e agora te pergunto, será que você está tendo
              conhecimentos suficientes?
            </p>
          </div>
          <div className="flex justify-center p-4 md:my-4 md:w-[40%]">
            <Link href="/products" className="w-full">
              <Button variant="default" className="w-full md:text-xl">
                BUSCAR CONHECIMENTO
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* SOBRE */}
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="flex flex-col w-full items-center">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Sobre
            </h3>
          </div>
          <div className="md:w-[70%] flex flex-col items-start">
            <div className="flex my-3">
              <h2 className="font-semibold text-wrap text-4xl px-3">Quem é:</h2>
            </div>
            <div className="flex flex-col my-3">
              <h2 className="font-medium text-wrap text-2xl px-3 text-primary mb-2">
                Felipe Kadosh
              </h2>
              <p className="text-center font-medium text-wrap text-xl md:text-2xl">
                Entusiasta de processos comerciais e da formação de equipes
                fortes e orientadas por propósito. Atua há 5 anos na área de
                vendas, onde descobriu sua paixão por conectar pessoas e
                negócios a soluções de alto valor agregado. Já agregou mais de 1
                milhão em receita aos seus clientes e às empresas em que
                trabalhou, onde pode conhecer as boas práticas que fazem grandes
                empresas obterem sucesso com suas máquinas de vendas.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-[70%]">
            <div className="md:w-[60%]">
              <h3 className="text-center font-medium text-wrap text-xl md:text-2xl">
                Tenha sua
                <span className="text-primary"> Equipe de Vendas Interna </span>
                estruturada em 37 dias e
                <span className="text-primary">
                  {" "}
                  aumente suas vendas em 30%{" "}
                </span>
                através do método que gerou
                <span className="text-primary"> 800 Mil</span>, sem aumentar
                o investimento em anúncios e com menos de 5 horas por semana
              </h3>
            </div>
            <div className="flex justify-center p-4 md:my-4 md:w-[50%]">
              <Link href="#" className="w-full">
                <Button variant="default" className="w-full md:text-xl">
                  AGENDAR UMA CONSULTORIA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-col items-center mt-4 text-center text-sm text-gray-600 py-2">
        <p>
          &copy; {currentYear} | Todos os direitos reservados para Felipe Kadosh
        </p>
        <p>
          Feito por{" "}
          <Link
            href="https://fernandogabriel.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Fernando Gabriel
          </Link>
        </p>
      </footer>
    </main>
  );
}
