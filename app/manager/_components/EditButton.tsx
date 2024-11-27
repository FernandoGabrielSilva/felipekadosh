"use client";
import { useState, useCallback } from "react";
import EditProductsButton from "./edit-product-button";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Products } from "@prisma/client";

interface EditProductsProps {
  products: Products;
}

const EditButton = ({ products }: EditProductsProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Função de alternância do diálogo de edição
  const toggleDialog = useCallback(() => {
    setDialogIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={toggleDialog}
      >
        <PencilIcon />
      </Button>

      <EditProductsButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={products}
      />
    </>
  );
};

export default EditButton;

