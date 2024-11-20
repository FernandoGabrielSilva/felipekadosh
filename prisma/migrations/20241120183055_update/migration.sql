/*
  Warnings:

  - You are about to drop the column `nomeCategoria` on the `Products` table. All the data in the column will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Cursos', 'Livros', 'Eletronicos', 'Outros');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "nomeCategoria",
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
