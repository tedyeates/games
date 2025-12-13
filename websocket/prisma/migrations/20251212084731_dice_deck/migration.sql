/*
  Warnings:

  - Added the required column `selected` to the `Total` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Dice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER,
    CONSTRAINT "Dice_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Side" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "diceId" INTEGER NOT NULL,
    CONSTRAINT "Side_diceId_fkey" FOREIGN KEY ("diceId") REFERENCES "Dice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PlayerToTotal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PlayerToTotal_A_fkey" FOREIGN KEY ("A") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlayerToTotal_B_fkey" FOREIGN KEY ("B") REFERENCES "Total" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    CONSTRAINT "Total_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Total" ("color", "id", "roomId", "roundId", "total") SELECT "color", "id", "roomId", "roundId", "total" FROM "Total";
DROP TABLE "Total";
ALTER TABLE "new_Total" RENAME TO "Total";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTotal_AB_unique" ON "_PlayerToTotal"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTotal_B_index" ON "_PlayerToTotal"("B");
