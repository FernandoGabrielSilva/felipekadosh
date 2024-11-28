"use client";

import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchInputProps {
  input: string;
  className?: string;
}

const SearchInput = ({ input, className }: SearchInputProps) => {
  const searchParams = useSearchParams(); // Pega os parâmetros da URL
  const pathname = usePathname(); // Pega o caminho atual da URL
  const { replace } = useRouter(); // Função para substituir a URL sem recarregar a página

  // Função de pesquisa com debounce (300ms)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    // Adiciona ou remove o parâmetro 'query' com base no valor da pesquisa
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Substitui a URL atual com o novo parâmetro de pesquisa
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <Input
        placeholder={input}
        onChange={(e) => handleSearch(e.target.value)} // Chama a função de pesquisa quando o valor mudar
        defaultValue={searchParams.get("query")?.toString()} // Define o valor inicial do input
        className={`${className}`}
      />
    </>
  );
};

export default SearchInput;
