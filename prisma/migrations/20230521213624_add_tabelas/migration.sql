/*
  Warnings:

  - Added the required column `email` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "alunos" (
    "id" TEXT NOT NULL,
    "nome_aluno" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulos" (
    "id" TEXT NOT NULL,
    "nome_modulo" TEXT NOT NULL,
    "nota1" DOUBLE PRECISION NOT NULL,
    "nota2" DOUBLE PRECISION NOT NULL,
    "nota3" DOUBLE PRECISION NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_cpf_key" ON "alunos"("cpf");

-- AddForeignKey
ALTER TABLE "modulos" ADD CONSTRAINT "modulos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
