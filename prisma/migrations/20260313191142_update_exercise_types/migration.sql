/*
  Warnings:

  - The values [FILL_BLANK,MATCHING] on the enum `ExerciseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExerciseType_new" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE_NG', 'YES_NO_NG', 'MATCHING_INFORMATION', 'MATCHING_HEADINGS', 'MATCHING_FEATURES', 'MATCHING_SENTENCE_ENDINGS', 'SENTENCE_COMPLETION', 'NOTE_TABLE_FLOWCHART_SUMMARY', 'DIAGRAM_LABEL', 'SHORT_ANSWER', 'OPEN_WRITING', 'OPEN_SPEAKING');
ALTER TABLE "Exercise" ALTER COLUMN "type" TYPE "ExerciseType_new" USING ("type"::text::"ExerciseType_new");
ALTER TYPE "ExerciseType" RENAME TO "ExerciseType_old";
ALTER TYPE "ExerciseType_new" RENAME TO "ExerciseType";
DROP TYPE "public"."ExerciseType_old";
COMMIT;
