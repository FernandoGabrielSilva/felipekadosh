import { Card, CardContent, CardHeader } from "./ui/card";

export default function CardsComponents() {
  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Recrutamento e Seleção</h3>
        </CardHeader>
        <CardContent>
          <p>
            Auxiliamos no recrutamento, seleção e treinamento dos membros de
            equipe comercial, garantindo que eles tenham as competências e a
            senioridade necessária para atingir os objetivos.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Processos Comerciais</h3>
        </CardHeader>
        <CardContent>
          <p>
            Aumentamos a produtividade e a conversão de equipe comercial,
            através da criação dos Scripts e da implementação de ferramentas de
            CRM, Omnichannel, VOIP e Sales Engagement.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Método de Gestão</h3>
        </CardHeader>
        <CardContent>
          <p>
            Desenvolvemos a estrutura de gestão que será utilizada pelas
            lideranças, atravês da criação do dashboard de indicadores, ritos de
            gestão, plano de carreira e processo de onboarding da equipe.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
