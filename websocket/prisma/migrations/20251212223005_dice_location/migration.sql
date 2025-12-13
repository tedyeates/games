/*
  Warnings:

  - Added the required column `location` to the `Dice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "playerId" INTEGER,
    CONSTRAINT "Dice_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Dice" ("color", "id", "playerId") SELECT "color", "id", "playerId" FROM "Dice";
DROP TABLE "Dice";
ALTER TABLE "new_Dice" RENAME TO "Dice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
