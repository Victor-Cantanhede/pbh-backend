/*
  Warnings:

  - Added the required column `balance` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TimeLogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "entry" DATETIME,
    "lunchIn" DATETIME,
    "lunchOut" DATETIME,
    "exit" DATETIME,
    "balance" DATETIME NOT NULL,
    "observation" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TimeLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeLogs" ("entry", "exit", "id", "lunchIn", "lunchOut", "userId") SELECT "entry", "exit", "id", "lunchIn", "lunchOut", "userId" FROM "TimeLogs";
DROP TABLE "TimeLogs";
ALTER TABLE "new_TimeLogs" RENAME TO "TimeLogs";
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "workSchedule" TEXT NOT NULL,
    "workStart" DATETIME NOT NULL,
    "lunchStart" DATETIME NOT NULL,
    "lunchEnd" DATETIME NOT NULL,
    "workEnd" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("createdAt", "email", "id", "lunchEnd", "lunchStart", "name", "password", "workEnd", "workSchedule", "workStart") SELECT "createdAt", "email", "id", "lunchEnd", "lunchStart", "name", "password", "workEnd", "workSchedule", "workStart" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
