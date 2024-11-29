"use client";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CategoryFilterProps {
  categories: string[]; // Lista de categorias
  selectedCategory?: string; // Categoria atual selecionada
}

const CategoryFilter = ({
  categories,
  selectedCategory,
}: CategoryFilterProps) => {
  const handleCategoryChange = (value: string) => {
    const url = new URL(window.location.href);
    if (value === "all") {
      url.searchParams.delete("category"); // Remove o filtro de categoria
    } else {
      url.searchParams.set("category", value); // Aplica o filtro de categoria
    }
    window.location.href = url.toString(); // Recarrega a página com o filtro aplicado
  };

  return (
    <Select
      onValueChange={handleCategoryChange}
      defaultValue={selectedCategory || "all"} // Define a categoria selecionada ou "all"
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecionar Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as Categorias</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
