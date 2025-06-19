/*
  Warnings:

  - You are about to drop the column `isbn` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `sharedByUserId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("createdAt", "description", "id", "title", "url") SELECT "createdAt", "description", "id", "title", "url" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
