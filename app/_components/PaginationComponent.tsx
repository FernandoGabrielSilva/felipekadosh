"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "./ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
}: PaginationComponentProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    router.push(url.toString());
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default PaginationComponent;
