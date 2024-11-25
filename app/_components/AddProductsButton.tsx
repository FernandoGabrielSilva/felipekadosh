"use client";
import { PackagePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { UploadDropzone } from "../utils/uploadthing";
import Image from "next/image";

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
    value: Category.Outros,
    label: "Outros",
  },
];

type FormSchema = z.infer<typeof formSchema>;

const AddProductsButton = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: Category.Outros,
      linkUrl: "",
    },
  });

  const [images, setImages] = useState("");
  const onSubmit = (data: FormSchema) => {};

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          setImages("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center md:text-base">
          Adicionar Produto <PackagePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>Insira as informações</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="w-full relative">
              {images ? (
                <Image
                  src={images}
                  alt="Image Product"
                  width={1000}
                  height={1000}
                  className="object-contain max-h-[160px]"
                />
              ) : (
                <UploadDropzone
                  //className="h-full"
                  appearance={{
                    container: "w-full h-full",
                    uploadIcon: "hidden",
                    allowedContent: "hidden",
                  }}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    setImages(res[0].appUrl);
                    console.log(res);
                    //const json = JSON.stringify(res);
                    // Do something with the response
                    //console.log(json);
                    //alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo do produto..." {...field} />
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
                    <Input placeholder="Descrição do produto..." {...field} />
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
                        <SelectValue placeholder="Selecione a categoria do produto..." />
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
              name="linkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Link do produto..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 md:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductsButton;
