"use client";

import { Products } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const productsColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Titulo",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "linkUrl",
    header: "Link do Produto",
    cell: ({ row: { original: products } }) => (
      <a href={products.linkUrl} target="_blank" rel="noopener noreferrer">
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
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
