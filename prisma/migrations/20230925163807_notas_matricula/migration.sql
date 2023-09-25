/*
  Warnings:

  - You are about to drop the column `nota1` on the `modulos` table. All the data in the column will be lost.
  - You are about to drop the column `nota2` on the `modulos` table. All the data in the column will be lost.
  - You are about to drop the column `nota3` on the `modulos` table. All the data in the column will be lost.
  - Added the required column `nota1` to the `matriculas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota2` to the `matriculas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota3` to the `matriculas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matriculas" ADD COLUMN     "nota1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nota2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nota3" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "modulos" DROP COLUMN "nota1",
DROP COLUMN "nota2",
DROP COLUMN "nota3";
