"use client";
import { useState, useCallback } from "react";
import { Button } from "@/app/_components/ui/button";
import { PackagePlus } from "lucide-react";
import UpsertProductsButton from "./UpsertProductsButton";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Função de alternância do diálogo de edição
  const toggleDialog = useCallback(() => {
    setDialogIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button className="flex items-center md:text-base">
        Adicionar Produto <PackagePlus />
      </Button>

      <UpsertProductsButton isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddProductButton;
