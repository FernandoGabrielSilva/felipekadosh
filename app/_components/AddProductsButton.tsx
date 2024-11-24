import { PackagePlus } from "lucide-react";
import { Button } from "./ui/button";

const AddProductsButton = () => {
  return (
    <Button className="flex items-center md:text-base">
      Adicionar Produto <PackagePlus />
    </Button>
  );
};

export default AddProductsButton;
