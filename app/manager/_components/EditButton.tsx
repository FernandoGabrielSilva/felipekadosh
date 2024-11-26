"use client";
import { useState } from "react";
import EditProductsButton from "./edit-product-button";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Products } from "@prisma/client";

interface EditProductsProps {
  products: Products;
}
const EditButton = ({ products }: EditProductsProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
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
