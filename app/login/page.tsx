import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Função para configurar a metadata da página
export async function generateMetadata(): Promise<Metadata> {
// Verifique a URL gerada para Open Graph
  const productUrl = `https://felipekadosh.vercel.app/login`;

  return {
    title: "Felipe Kadosh | Login",
    description: "Marketing Digital",
    openGraph: {
      title: "Felipe Kadosh",
      description: "Marketing Digital",
      url: "https://felipekadosh.vercel.app/login",
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
      title: "Felipe Kadosh | Login",
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

const Login = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/manager");
  }
  return (
    <main>
      <section className="flex flex-col items-center justify-center w-dvw h-dvh">
        <div className="w-[90%] md:w-[30%]">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login in Manager</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div>
                  <div className="flex flex-col space-y-2">
                    <h1>Felipe Kadosh</h1>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <SignInButton>
                <Button className="w-full">Login</Button>
              </SignInButton>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Login;
