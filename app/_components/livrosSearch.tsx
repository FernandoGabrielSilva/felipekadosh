"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LivroSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/livro?search=${search}`);
  };

  /*document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const element: HTMLElement = document.getElementsByClassName(
        "button"
      )[0] as HTMLElement;
      element.click();

      if (element instanceof HTMLElement) {
        element.click();
      }
    }
  });*/

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="bg-blue-500 text-black text-base hover:bg-transparent border-2 border-blue-500 hover:text-blue-500 button"
        onClick={handleSubmit}
        type="submit"
      >
        <SearchIcon />
      </Button>
    </>
  );
};

export default LivroSearch;
