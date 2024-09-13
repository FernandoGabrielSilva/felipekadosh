"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LivroSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/livro?search=${search}`);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        className="bg-blue-500 text-black text-base hover:bg-transparent border-2 border-blue-500 hover:text-blue-500"
        onClick={handleSubmit}
        type="submit"
      >
        <SearchIcon />
      </Button>
    </>
  );
};

export default LivroSearch;
