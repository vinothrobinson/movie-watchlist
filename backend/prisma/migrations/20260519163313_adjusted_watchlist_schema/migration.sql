-- AlterTable
ALTER TABLE "WatchlistItem" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "WatchlistItem_userId_idx" ON "WatchlistItem"("userId");

-- CreateIndex
CREATE INDEX "WatchlistItem_movieId_idx" ON "WatchlistItem"("movieId");
