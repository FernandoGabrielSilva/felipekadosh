import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export interface CardComponentsProps {
  title: string;
  subtitulo?: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CardsComponents(props: CardComponentsProps) {
  return (
    <>
      <Card className={`${props.className}`}>
        <CardHeader>
          <CardTitle className={`${props.className}`}>{props.title}</CardTitle>
          <CardDescription>
            <div className="flex gap-2 items-center">
              {props.children}
              {props.subtitulo}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{props.description}</p>
        </CardContent>
      </Card>
    </>
  );
}
