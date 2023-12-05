/*
  Warnings:

  - Added the required column `birthday` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inspiration` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "inspiration" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
