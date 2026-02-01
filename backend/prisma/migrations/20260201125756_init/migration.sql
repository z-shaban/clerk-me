-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "caseId" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answers_caseId_key" ON "Answers"("caseId");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
