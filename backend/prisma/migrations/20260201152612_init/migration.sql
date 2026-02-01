/*
  Warnings:

  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_caseId_fkey";

-- DropTable
DROP TABLE "Answers";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "answerHistory" JSONB NOT NULL DEFAULT '[]',
    "caseId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_caseId_key" ON "Answer"("caseId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
