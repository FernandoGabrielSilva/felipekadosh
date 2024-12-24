import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

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
    icons: {
      icon: "https://i.postimg.cc/7LkRZKBC/favicon2.png", // Caminho para o favicon
      apple: "https://i.postimg.cc/7LkRZKBC/favicon2.png", // Para dispositivos da Apple
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
