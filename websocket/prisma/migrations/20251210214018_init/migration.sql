-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "socketId" TEXT NOT NULL,
    "ready" BOOLEAN NOT NULL DEFAULT false,
    "roomId" INTEGER,
    CONSTRAINT "Player_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_socketId_key" ON "Player"("socketId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomCode_key" ON "Room"("roomCode");
