/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");
