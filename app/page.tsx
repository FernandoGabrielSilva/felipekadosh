import Image from "next/image";
import CardsComponents from "./_components/CardsComponents";
import { Button } from "./_components/ui/button";
import Link from "next/link";
import { CircleArrowDown, CircleArrowRight, Clock } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-1 items-center h-dvh">
        <div className="flex flex-col items-center p-4">
          <div className="flex flex-col items-center relative w-full h-full -mt-40">
            <div className="w-full h-full">
              <Image
                src="https://i.postimg.cc/HxNFhyCK/20240420-2134222.png"
                alt="Imagem de Perfil"
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-2/3">
              <div>
                <h2 className="text-2xl text-center font-bold pt-5">
                  Aumente suas vendas com
                  <span className="text-primary">previsibilidade</span> através
                  de um processo de vendas eficiente.
                </h2>
              </div>
              <div>
                <p className="text-lg text-center font-normal pt-5">
                  Tenha sua Equipe de Vendas Interna estruturada em 45 dias e
                  aumente suas vendas em 30% através do método que gerou 120
                  milhões, sem aumentar o investimento em anúncios e com menos
                  de 4 horas por semana.
                </p>
                <div className="flex justify-center p-4">
                  <Link href="#" className="w-full">
                    <Button variant="default" className="w-full">
                      AGENDAR UMA CONSULTORIA
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div>
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
          <div className="flex items-center justify-center my-3">
            <div className="grid grid-cols-1 w-[95%] gap-3">
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
                title="Método de Gestão"
                description="Desenvolvemos a estrutura de gestão que será utilizada pelas
            lideranças, atravês da criação do dashboard de indicadores, ritos de
            gestão, plano de carreira e processo de onboarding da equipe."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div>
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Máquina De Vendas
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              Implementação da
              <span className="text-primary">Máquina de Vendas</span>
            </h2>
          </div>
          <div className="flex items-center justify-center my-3">
            <div className="grid grid-cols-1 w-[95%] gap-3">
              <CardsComponents
                title="Kick-Off do Projeto"
                children={<Clock size={15} />}
                subtitulo="Duração: 2 Semanas"
                description="Objetivo: realizar o diagnóstico da operação atual, aprofundar em suas soluções e mapear a jornada de compra do perfil de cliente ideal."
              />
              <CardsComponents
                title="Processos Comerciais"
                children={<Clock size={15} />}
                subtitulo="Duração: 4 Semanas"
                description="Objetivos: estruturar o processo que a equipe comercial irá executar para reduzir a variabilidade de ações e gerar receita previsível."
              />
              <CardsComponents
                title="Método de Gestão"
                children={<Clock size={15} />}
                subtitulo="Duração: 1 Semanas"
                description="Objetivo: implementar a rotina de gestão e melhoria contínua, e os indicadores de performance do setor comercial."
              />
              <CardsComponents
                title="Treinamento da Equipe"
                children={<Clock size={15} />}
                subtitulo="Duração: Contínuo"
                description="Objetivo: desenvolvimento de competências técnicas comportamentais necessárias para que a equipe conduza o processo de vendas com maestria."
              />
              <CardsComponents
                title="Melhoria Contínua"
                children={<Clock size={15} />}
                subtitulo="Duração: 11 Meses"
                description="Objetivo:  analisar indicadores de performance, mapear oportunidades de melhoria e definir novos planos de ação."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div>
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Veja o que você recebe
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-4xl">
              <span className="text-primary">Entregáveis</span> da Consulta
            </h2>
          </div>
          <div>
            <ul className="grid grid-cols-1 gap-2">
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Treinamento de equipe
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Geração
                de leads qualificados
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Script
                de negociação
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Fluxos
                de prospecção
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Playbook
                de vendas
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Matriz
                de objeções
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Dashboard de indicações
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" /> Metas,
                remuneração e comissionamento
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Metadologia de onboardinhg e rampeamento
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Planejamento estratégico comercial
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Implementação de ferramentas
              </li>
              <li className="flex gap-2 border-l-4">
                <CircleArrowRight size={20} className="text-primary" />
                Metodoligia de gestão comercial
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div>
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Recrutamento
            </h3>
          </div>
          <div className="flex justify-center my-3">
            <h2 className="text-center font-semibold text-wrap text-xl">
              <span className="text-primary">
                Recrute profissionais de vendas qualificados
              </span>
              e alcance novos patamares de faturamento com previsibilidade
            </h2>
          </div>
          <div className="w-screen">
            <ul className="w-full text-center flex flex-col items-center font-semibold text-medium text-primary">
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
      <section className="mt-[15%] flex flex-col p-2 justify-center items-center">
        <div className="w-full">
          <div className="flex justify-center mb-2">
            <h3 className="text-center border rounded-full py-2 px-4 text-base">
              Sobre
            </h3>
          </div>
          <div className="flex my-3">
            <h2 className="font-semibold text-wrap text-4xl px-3">Quem é:</h2>
          </div>
          <div className="flex my-3">
            <h2 className="font-medium text-wrap text-2xl px-3 text-primary">
              Felipe Kadosh
            </h2>
          </div>
          <div>
            <h3 className="text-center font-medium text-wrap text-xl">
              Tenha sua
              <span className="text-primary">Equipe de Vendas Interna</span>
              estruturada em 45 dias e
              <span className="text-primary">aumente suas vendas em 30%</span>
              através do método que gerou
              <span className="text-primary">120 milhões</span>, sem aumentar o
              investimento em anúncios e com menos de 4 horas por semana
            </h3>
            <div className="flex justify-center p-4">
              <Link href="#" className="w-full">
                <Button variant="default" className="w-full">
                  AGENDAR UMA CONSULTORIA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
