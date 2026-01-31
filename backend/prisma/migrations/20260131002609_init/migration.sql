/*
  Warnings:

  - Added the required column `name` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "name" TEXT NOT NULL;
