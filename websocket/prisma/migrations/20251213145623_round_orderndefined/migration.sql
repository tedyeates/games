/*
  Warnings:

  - Added the required column `order` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Round_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("id", "roomId") SELECT "id", "roomId" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
