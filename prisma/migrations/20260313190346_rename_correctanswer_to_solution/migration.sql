/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "correctAnswer",
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "solution" JSONB NOT NULL;
