-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Side" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "diceId" INTEGER NOT NULL,
    CONSTRAINT "Side_diceId_fkey" FOREIGN KEY ("diceId") REFERENCES "Dice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Side" ("diceId", "id", "value") SELECT "diceId", "id", "value" FROM "Side";
DROP TABLE "Side";
ALTER TABLE "new_Side" RENAME TO "Side";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
