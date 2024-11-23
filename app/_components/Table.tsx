import { Products } from "@prisma/client";

interface ProductsItensProps {
  product: Products;
}
const Table = ({ product }: ProductsItensProps) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>{product.linkUrl}</td>
      <td>{new Date(product.updatedAt).toLocaleDateString("pt-BR")}</td>
    </tr>
  );
};

export default Table;
