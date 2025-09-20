/*
  Warnings:

  - Made the column `profilePhotoURL` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Character" ALTER COLUMN "profilePhotoURL" SET NOT NULL;
