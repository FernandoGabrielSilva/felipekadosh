"use client";

import { Button } from "@/app/_components/ui/button";
import { Products } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import EditButton from "../_components/EditButton";
import { TrashIcon } from "lucide-react";

export const productsColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Titulo",
    cell: ({ row: { original: products } }) => (
      <p className="text-wrap max-h-[2.2rem] text-ellipsis">{products.name}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row: { original: products } }) => (
      <p className="text-wrap max-h-[2.2rem] text-ellipsis">
        {products.description}
      </p>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "linkUrl",
    header: "Link do Produto",
    cell: ({ row: { original: products } }) => (
      <a
        href={products.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-wrap max-h-[2.2rem] text-ellipsis"
      >
        {products.linkUrl}
      </a>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Data",
    cell: ({ row: { original: products } }) =>
      new Date(products.updatedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "Editar/Deletar",
    cell: ({ row: { original: products } }) => {
      return (
        <div className="space-x-1">
          <EditButton products={products} />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
