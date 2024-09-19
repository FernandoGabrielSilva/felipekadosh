"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CursoSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/curso?search=${search}`);
  };

  const input = document.getElementsByClassName("input")
  input.document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementsByClassName("button").click();
    }
  });

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />
      <Button
        className="bg-orange-500 text-black text-base hover:bg-transparent border-2 border-orange-500 hover:text-orange-500 button"
        onClick={handleSubmit}
        type="submit"
      >
        <SearchIcon />
      </Button>
    </>
  );
};

export default CursoSearch;
