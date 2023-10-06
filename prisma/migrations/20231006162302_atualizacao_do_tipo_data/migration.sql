/*
  Warnings:

  - Changed the type of `data_nascimento` on the `alunos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "alunos" DROP COLUMN "data_nascimento",
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL;
