-- CreateEnum
CREATE TYPE "Especialidade" AS ENUM ('CARDIOLOGIA', 'DERMATOLOGIA', 'ORTOPEDIA', 'PEDIATRIA', 'GINECOLOGIA');

-- CreateTable
CREATE TABLE "Medico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "conselho" TEXT NOT NULL,
    "especialidade" "Especialidade" NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);
