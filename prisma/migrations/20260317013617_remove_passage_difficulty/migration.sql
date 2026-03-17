/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `ReadingPassage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "difficulty";

-- AlterTable
ALTER TABLE "ReadingPassage" DROP COLUMN "difficulty";

-- DropEnum
DROP TYPE "Difficulty";
