/*
  Warnings:

  - A unique constraint covering the columns `[key,section,languageId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Translation_key_languageId_key";

-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "section" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Translation_key_section_languageId_key" ON "Translation"("key", "section", "languageId");
