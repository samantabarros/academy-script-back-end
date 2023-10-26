/*
  Warnings:

  - You are about to drop the `alunos_modulos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alunos_modulos" DROP CONSTRAINT "alunos_modulos_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "alunos_modulos" DROP CONSTRAINT "alunos_modulos_id_modulo_fkey";

-- DropTable
DROP TABLE "alunos_modulos";

-- CreateTable
CREATE TABLE "matricula" (
    "id" TEXT NOT NULL,
    "nota1" DOUBLE PRECISION NOT NULL,
    "nota2" DOUBLE PRECISION NOT NULL,
    "nota3" DOUBLE PRECISION NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_modulo" TEXT NOT NULL,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "modulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
