"use client";

import EditButton from "../_components/EditButton";
import { ColumnDef } from "@tanstack/react-table";
import { Products } from "@prisma/client";
import DeleteButton from "../_components/DeleteButton";

// Definindo as colunas da tabela de produtos
export const productsColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Título",
    cell: ({ row: { original: products } }) => (
      <p className="text-wrap max-h-[2.2rem] text-ellipsis max-w-[350px] min-w-[70px]">
        {products.name}
      </p>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row: { original: products } }) => (
      <p className="text-wrap max-h-[2.2rem] text-ellipsis max-w-[350px] min-w-[70px]">
        {products.description}
      </p>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: products } }) => (
      <span className="text-wrap max-h-[2.2rem] text-ellipsis">
        {products.category}
      </span>
    ),
  },
  {
    accessorKey: "linkUrl",
    header: "Link do Produto",
    cell: ({ row: { original: products } }) => (
      <a href={products.linkUrl} target="_blank" rel="noopener noreferrer">
        <p className="font-bold text-primary text-wrap max-h-[2.2rem] text-ellipsis max-w-[250px] min-w-[50px]">
          {products.linkUrl}
        </p>
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
    header: "Ações",
    cell: ({ row: { original: products } }) => {
      // Log para desenvolvimento, pode ser removido na produção
      if (process.env.NODE_ENV === "development") {
        //console.log("Produto para ações:", products);
      }
      return (
        <div className="space-x-1">
          {/* Botão de editar */}
          <EditButton products={products} />
          {/* Botão de deletar */}
          <DeleteButton productId={products.id} />
        </div>
      );
    },
  },
];
