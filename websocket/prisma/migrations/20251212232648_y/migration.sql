-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Total" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "roomId" INTEGER,
    "roundId" INTEGER,
    "playerId" INTEGER,
    CONSTRAINT "Total_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Total" ("color", "id", "playerId", "roomId", "roundId", "selected", "total") SELECT "color", "id", "playerId", "roomId", "roundId", "selected", "total" FROM "Total";
DROP TABLE "Total";
ALTER TABLE "new_Total" RENAME TO "Total";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
