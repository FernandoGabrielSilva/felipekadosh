"use client";
// Componente Filters: combina filtros de categoria, ordenação e direção

import { useRouter } from "next/navigation";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Filter, BookA, CalendarFold, ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";

interface UnifiedFilterProps {
  categories: string[];
  selectedFilter: string; // Formato: "categoria|campo|direção"
}

const UnifiedFilter = ({ categories, selectedFilter }: UnifiedFilterProps) => {
  const router = useRouter();

  const [selectedCategory, orderBy, orderDirection] = selectedFilter.split("|");

  const handleFilterChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("filter", value); // Define o filtro completo no formato "categoria|campo|direção"
    router.push(url.toString());
  };

  return (
    <Select onValueChange={handleFilterChange} defaultValue={selectedFilter}>
      <SelectTrigger className="w-[150px]">
     	<div className="flex gap-2 items-center">
		<Filter size={15}/>
		<SelectValue placeholder="Filtro">Filtros</SelectValue> {/* Sempre exibe "Filtro" */}
     	</div>
      </SelectTrigger>
      <SelectContent>
        {/* Filtros por categoria */}
        <div className="px-2 py-1 text-sm font-medium text-gray-500">Categoria</div>
        <div className="space-y-1">
          <SelectItem value={`all|${orderBy}|${orderDirection}`}>
            Todas as Categorias
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={`${category}|${orderBy}|${orderDirection}`}
            >
              {category}
            </SelectItem>
          ))}
        </div>

        {/* Separador para ordenação */}
        <div className="px-2 py-1 text-sm font-medium text-gray-500">Ordenar Por</div>
        <div className="space-y-1">
          <SelectItem value={`${selectedCategory}|name|asc`}>
          	<div className="flex gap-2 items-center">
          		<BookA size={15} /> Name
          	</div></SelectItem>
          <SelectItem value={`${selectedCategory}|updatedAt|asc`}>
          	<div className="flex gap-2 items-center">
          		<CalendarFold size={15} /> Data
          	</div>
          </SelectItem>
        </div>

        {/* Separador para direção de ordenação */}
        <div className="px-2 py-1 text-sm font-medium text-gray-500">Direção</div>
        <div className="space-y-1">
		<SelectItem value={`${selectedCategory}|${orderBy}|asc`}>
			<div className="flex gap-2 items-center">
				<ArrowUpNarrowWide size={15} /> Crescente
			</div>
		</SelectItem>
		<SelectItem value={`${selectedCategory}|${orderBy}|desc`}>
			<div className="flex gap-2 items-center">
				<ArrowDownNarrowWide size={15}  /> Decrescente
			</div>
		</SelectItem>     
        </div>
      </SelectContent>
    </Select>
  );
};

export default UnifiedFilter;

