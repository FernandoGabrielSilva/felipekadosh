"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Share2 } from "lucide-react";

const ShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // Atualiza o URL atual após a renderização do componente
    setCurrentUrl(window.location.href);
  }, []);

  const shareData = {
    url: currentUrl,
    // Adicione os outros dados necessários para o compartilhamento
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        //console.log("Conteúdo compartilhado com sucesso!");
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("A API de compartilhamento não é suportada neste navegador.");
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="absolute right-4 top-4 p-2 md:hidden"
        asChild
        onClick={share}
      >
        <Share2 />
      </Button>
    </>
  );
};

export default ShareButton;

