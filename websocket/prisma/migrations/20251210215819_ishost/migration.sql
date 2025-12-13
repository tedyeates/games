-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "socketId" TEXT NOT NULL,
    "ready" BOOLEAN NOT NULL DEFAULT false,
    "roomId" INTEGER,
    "isHost" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Player_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id", "name", "ready", "roomId", "socketId") SELECT "id", "name", "ready", "roomId", "socketId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_socketId_key" ON "Player"("socketId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
