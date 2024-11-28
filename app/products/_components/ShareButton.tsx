"use client";

import { Button } from "@/app/_components/ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProp {
  // Adicione os props necessários para o botão de compartilhamento
  // Ex: link, title, description, etc.
  title: string;
  description: string;
  image: string;
}

const ShareButton = ({ title, description, image }: ShareButtonProp) => {
  const shareData = {
    title: title,
    description: description,
    image: image,
  };

  const share = () => {
    navigator.share(shareData);
  };
  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="absolute right-4 top-4"
        asChild
        onClick={share}
      >
        <Share2 />
      </Button>
    </>
  );
};

export default ShareButton;
