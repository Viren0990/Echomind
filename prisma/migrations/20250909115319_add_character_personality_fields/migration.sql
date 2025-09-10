/*
  Warnings:

  - Made the column `initialMessage` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personality` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scenario` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Character" ALTER COLUMN "initialMessage" SET NOT NULL,
ALTER COLUMN "personality" SET NOT NULL,
ALTER COLUMN "scenario" SET NOT NULL;
