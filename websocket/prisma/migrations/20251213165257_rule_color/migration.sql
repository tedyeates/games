/*
  Warnings:

  - Added the required column `color` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "restriction" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "total" INTEGER NOT NULL
);
INSERT INTO "new_Rule" ("category", "id", "restriction", "total", "type") SELECT "category", "id", "restriction", "total", "type" FROM "Rule";
DROP TABLE "Rule";
ALTER TABLE "new_Rule" RENAME TO "Rule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
