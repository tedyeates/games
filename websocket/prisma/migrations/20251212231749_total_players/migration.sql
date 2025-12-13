/*
  Warnings:

  - You are about to drop the `_PlayerToTotal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_PlayerToTotal_B_index";

-- DropIndex
DROP INDEX "_PlayerToTotal_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlayerToTotal";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Total" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "roomId" INTEGER,
    "roundId" INTEGER,
    "playerId" INTEGER,
    CONSTRAINT "Total_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Total" ("color", "id", "roomId", "roundId", "selected", "total") SELECT "color", "id", "roomId", "roundId", "selected", "total" FROM "Total";
DROP TABLE "Total";
ALTER TABLE "new_Total" RENAME TO "Total";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
