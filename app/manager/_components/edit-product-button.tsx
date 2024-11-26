"use client";
import { z } from "zod";
import { Category, Products } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { upsertProducts } from "@/app/_actions/add-product";
import { Button } from "@/app/_components/ui/button";
import { DialogHeader, DialogFooter } from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";

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
    message: "A imagem do produto é obrigatório",
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

interface DefaultProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: Products;
}

const EditProductsButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: DefaultProp) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      category: Category.Outros,
      imageUrl: "",
      linkUrl: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertProducts(data);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>Insira as informações</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="Link da Imagem..." {...field} />
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
                    <Input placeholder="Link do Produto.." {...field} />
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

export default EditProductsButton;
