"use client";

import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { z } from "zod";
import { Category, Products } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useState, useEffect } from "react";
import { UploadDropzone } from "../utils/uploadthing";
import { upsertProducts } from "../_actions/add-product";
import { toast } from "sonner";
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import Image from "next/image";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  description: z.string().trim().min(1, {
    message: "A descrição do produto é obrigatória",
  }),
  category: z.nativeEnum(Category, {
    required_error: "A categoria do produto é obrigatória",
  }),
  imageUrl: z.string().trim().min(1, {
    message: "A imagem do produto é obrigatória",
  }),
  linkUrl: z.string().trim().min(1, {
    message: "O link do produto é obrigatório",
  }),
});

const PRODUCTS_CATEGORY_OPTIONS = [
  {
    value: Category.Cursos,
    label: "Cursos",
  },
  {
    value: Category.Livros,
    label: "Livros",
  },
  {
    value: Category.Eletronicos,
    label: "Eletronicos",
  },
  {
    value: Category.Costume,
    label: "Costume",
  },
  {
    value: Category.Outros,
    label: "Outros",
  },
];

type FormSchema = z.infer<typeof formSchema>;

interface DefaultProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: Products & { imageUrl: string | string[] };
}

const UpsertProductsButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: DefaultProp) => {
  const [images, setImages] = useState<string[]>([]); // URL da imagem
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: Category.Outros,
      imageUrl: "", // Mantém como string
      linkUrl: "",
      ...(defaultValues && {
        name: defaultValues.name,
        description: defaultValues.description,
        category: defaultValues.category,
        imageUrl: defaultValues.imageUrl ? defaultValues.imageUrl.join(",") : "",
        linkUrl: defaultValues.linkUrl,
      }),
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (defaultValues) {
    // Se defaultValues.imageUrl for um array, converta para uma string
    const existingImages = Array.isArray(defaultValues.imageUrl)
      ? defaultValues.imageUrl.join(",") // Converte array de imagens para uma string
      : defaultValues.imageUrl; // Caso já seja uma string, use diretamente

    setImages(existingImages.split(",")); // Atualiza o estado com o array de imagens
    form.reset({
      ...defaultValues,
      imageUrl: existingImages, // Passa a string com imagens para o formulário
    });
  }
}, [defaultValues, form]);

  const handleImageUpload = (imageUrl: string) => {
    const updatedImages = [...images, imageUrl];
    setImages(updatedImages); // Atualiza o estado com a nova imagem
    form.setValue("imageUrl", updatedImages.join(",")); // Atualiza o campo com os links das imagens
  };

  const handleImageRemove = (imageUrl: string) => {
    const updatedImages = images.filter((img) => img !== imageUrl);
    setImages(updatedImages); // Remove a imagem do estado
    form.setValue("imageUrl", updatedImages.join(",")); // Atualiza o campo com os links restantes
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      if (!images) {
        toast.error("Por favor, carregue uma imagem.");
        return; // Impede o envio do formulário sem imagem
      }

      setLoading(true);
      await upsertProducts({
        id: defaultValues?.id, // Passando o 'id' para o upsert
        ...data,
      });
      toast.success("Produto Adicionado/Atualizado!");
      resetForm(); // Chama a função para resetar o formulário e a imagem
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
      toast.error("Não foi possível adicionar/atualizar o produto.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.reset(); // Resetando o formulário
    setImages([]) // Resetando o estado da imagem
    setIsOpen(false); // Fechando o modal
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm(); // Resetar o formulário e imagem quando o modal for fechado
        }
      }}
    >
      <DialogContent className="h-[90%]">
        <DialogHeader>
          <DialogTitle>Informações do Produto</DialogTitle>
          <DialogDescription>Insira as informações do produto</DialogDescription>
        </DialogHeader>
          <div className="w-full h-full flex flex-col overflow-hidden">
            <ScrollArea className="h-full px-2">
		<Form {...form}>
		  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
		    <div className="w-full relative">
		        <UploadDropzone
		          appearance={{
		            container: "w-full h-full",
		            uploadIcon: "hidden",
		            allowedContent: "hidden",
		          }}
		          endpoint="imageUploader"
		          onClientUploadComplete={(res) => {
		            const imageUrl = res[0].url;
		            setImages((prevImages) => [...prevImages, imageUrl]); // Atualiza o estado local com a URL da imagem
		            form.setValue("imageUrl", imageUrl); // Preenche o campo imageUrl automaticamente
		          }}
		          onUploadError={(error: Error) => {
		            alert(`ERROR! ${error.message}`);
		          }}
		        />
		    </div>
		    {images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {images.map((image) => (
                    <div key={image} className="w-24 h-24 relative group">
                      <Image
                        src={image}
                        alt="Produto"
                        fill
                        className="object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 opacity-100 bg-red-500 text-white rounded-full p-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        onClick={() => handleImageRemove(image)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
		    <FormField
		      control={form.control}
		      name="name"
		      render={({ field }) => (
		        <FormItem>
		          <FormLabel>Título</FormLabel>
		          <FormControl>
		            <Input placeholder="Título do produto..." {...field} />
		          </FormControl>
		          <FormMessage />
		        </FormItem>
		      )}
		    />
		    <FormField
		      control={form.control}
		      name="description"
		      render={({ field }) => (
		        <FormItem>
		          <FormLabel>Descrição</FormLabel>
		          <FormControl>
		            <Textarea placeholder="Descrição do produto..." {...field} />
		          </FormControl>
		          <FormMessage />
		        </FormItem>
		      )}
		    />
		    <FormField
		      control={form.control}
		      name="category"
		      render={({ field }) => (
		        <FormItem>
		          <FormLabel>Categoria</FormLabel>
		          <Select
		            onValueChange={field.onChange}
		            defaultValue={field.value}
		          >
		            <FormControl>
		              <SelectTrigger>
		                <SelectValue placeholder="Selecione a categoria..." />
		              </SelectTrigger>
		            </FormControl>
		            <SelectContent>
		              {PRODUCTS_CATEGORY_OPTIONS.map((option) => (
		                <SelectItem key={option.value} value={option.value}>
		                  {option.label}
		                </SelectItem>
		              ))}
		            </SelectContent>
		          </Select>
		          <FormMessage />
		        </FormItem>
		      )}
		    />
		    <FormField
		      control={form.control}
		      name="imageUrl"
		      render={({ field }) => (
		        <FormItem className="hidden">
		          <FormLabel>Link da Imagem</FormLabel>
		          <FormControl>
		            <Input
		              placeholder="Link da Imagem..."
		              {...field}
		              value={images} // Mantém o valor da URL da imagem
		            />
		          </FormControl>
		          <FormMessage />
		        </FormItem>
		      )}
		    />
		    <FormField
		      control={form.control}
		      name="linkUrl"
		      render={({ field }) => (
		        <FormItem>
		          <FormLabel>Link do Produto</FormLabel>
		          <FormControl>
		            <Input placeholder="Link do Produto..." {...field} />
		          </FormControl>
		          <FormMessage />
		        </FormItem>
		      )}
		    />
		    <DialogFooter className="gap-2 md:gap-0">
		      <DialogClose asChild>
		        <Button
		          type="button"
		          variant="outline"
		          onClick={() => resetForm()} // Resetar quando clicar em Cancelar
		        >
		          Cancelar
		        </Button>
		      </DialogClose>
		      <Button type="submit" disabled={loading}>
		        {loading ? "Carregando..." : "Confirmar"}
		      </Button>
		    </DialogFooter>
		  </form>
		</Form>
	   </ScrollArea>
	</div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProductsButton;

