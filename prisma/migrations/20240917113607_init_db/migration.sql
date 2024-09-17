-- CreateTable
CREATE TABLE "Cursos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livros" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);
