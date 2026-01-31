-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "systemprompt" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "conversationHistory" JSONB NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);
