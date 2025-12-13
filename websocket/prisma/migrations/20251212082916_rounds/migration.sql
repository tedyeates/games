-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Round_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Total" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "roomId" INTEGER,
    "roundId" INTEGER,
    CONSTRAINT "Total_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Total_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "total" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoundToRule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoundToRule_A_fkey" FOREIGN KEY ("A") REFERENCES "Round" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoundToRule_B_fkey" FOREIGN KEY ("B") REFERENCES "Rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoundToRule_AB_unique" ON "_RoundToRule"("A", "B");

-- CreateIndex
CREATE INDEX "_RoundToRule_B_index" ON "_RoundToRule"("B");
