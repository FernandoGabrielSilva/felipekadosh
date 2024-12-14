"use client";

import { useRouter } from "next/navigation";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Filter, BookOpen, MonitorPlay, PcCase, MoreHorizontal, CalendarFold, ChartNoAxesGantt, Text, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { Category } from "@prisma/client"; // Importando o enum diretamente do Prisma

// Mapeamento de ícones para as categorias do enum
const iconMap: Record<Category, React.ElementType> = {
  [Category.Cursos]: MonitorPlay,
  [Category.Livros]: BookOpen,
  [Category.Eletronicos]: PcCase,
  [Category.Outros]: MoreHorizontal, // Ícone padrão para "Outros"
};

interface UnifiedFilterProps {
  categories: Category[];
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
          <Filter size={15} />
          <SelectValue placeholder="Filtro">Filtros</SelectValue> {/* Sempre exibe "Filtro" */}
        </div>
      </SelectTrigger>
      <SelectContent>
        {/* Filtros por categoria */}
        <div className="px-2 py-1 text-sm font-medium text-gray-500">Categoria</div>
        <div className="space-y-1">
          <SelectItem value={`all|${orderBy}|${orderDirection}`}>
            <div className="flex gap-2 items-center">
              <ChartNoAxesGantt size={15} /> Todas as Categorias
            </div>
          </SelectItem>
          {categories.map((category) => {
            const Icon = iconMap[category]; // Busca o ícone correspondente no mapeamento
            return (
              <SelectItem
                key={category}
                value={`${category}|${orderBy}|${orderDirection}`}
              >
                <div className="flex gap-2 items-center">
                  <Icon size={15} />
                  {category}
                </div>
              </SelectItem>
            );
          })}
        </div>

        {/* Separador para ordenação */}
        <div className="px-2 py-1 text-sm font-medium text-gray-500">Ordenar Por</div>
        <div className="space-y-1">
          <SelectItem value={`${selectedCategory}|name|asc`}>
            <div className="flex gap-2 items-center">
              <Text size={15} /> Nome
            </div>
          </SelectItem>
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
              <ArrowDownAZ size={15} /> Crescente
            </div>
          </SelectItem>
          <SelectItem value={`${selectedCategory}|${orderBy}|desc`}>
            <div className="flex gap-2 items-center">
              <ArrowDownZA size={15} /> Decrescente
            </div>
          </SelectItem>
        </div>
      </SelectContent>
    </Select>
  );
};

export default UnifiedFilter;

