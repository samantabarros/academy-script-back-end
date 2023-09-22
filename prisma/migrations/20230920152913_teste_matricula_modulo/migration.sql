/*
  Warnings:

  - You are about to drop the column `alunoId` on the `modulos` table. All the data in the column will be lost.
  - Added the required column `id_aluno` to the `modulos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "modulos" DROP CONSTRAINT "modulos_alunoId_fkey";

-- AlterTable
ALTER TABLE "modulos" DROP COLUMN "alunoId",
ADD COLUMN     "id_aluno" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "modulos" ADD CONSTRAINT "modulos_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
