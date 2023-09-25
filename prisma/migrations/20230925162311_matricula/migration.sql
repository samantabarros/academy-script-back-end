/*
  Warnings:

  - You are about to drop the column `id_aluno` on the `modulos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "modulos" DROP CONSTRAINT "modulos_id_aluno_fkey";

-- AlterTable
ALTER TABLE "modulos" DROP COLUMN "id_aluno";

-- CreateTable
CREATE TABLE "matriculas" (
    "id" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_modulo" TEXT NOT NULL,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
