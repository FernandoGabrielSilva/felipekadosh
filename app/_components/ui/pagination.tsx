import * as React from "react";
import { cn } from "@/app/_lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2">
      <button
        className={cn(
          "px-3 py-1 border rounded",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={cn(
            "px-3 py-1 border rounded",
            page === currentPage ? "bg-primary text-white" : ""
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={cn(
          "px-3 py-1 border rounded",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </button>
    </div>
  );
}
