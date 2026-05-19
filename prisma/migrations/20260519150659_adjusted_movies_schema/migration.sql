/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tmdbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_createdBy_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "createdBy",
DROP COLUMN "releaseYear",
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "tmdbId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");
