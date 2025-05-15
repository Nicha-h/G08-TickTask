/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[User_Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserID` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_User_Password_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pomodoro_sessions" (
    "SessionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "StartTime" TEXT NOT NULL,
    "EndTime" TEXT,
    "PausedTime" TEXT NOT NULL,
    "duration_seconds" INTEGER NOT NULL DEFAULT 1500,
    "remaining_seconds" INTEGER NOT NULL DEFAULT 1500,
    "timer_type" TEXT NOT NULL,
    "last_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pomodoro_sessions_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pomodoro_sessions" ("EndTime", "PausedTime", "SessionId", "StartTime", "Status", "UserID", "duration_seconds", "last_updated", "timer_type") SELECT "EndTime", "PausedTime", "SessionId", "StartTime", "Status", "UserID", "duration_seconds", "last_updated", "timer_type" FROM "pomodoro_sessions";
DROP TABLE "pomodoro_sessions";
ALTER TABLE "new_pomodoro_sessions" RENAME TO "pomodoro_sessions";
CREATE TABLE "new_pomodoro_task" (
    "Pomo_TaskId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Pomo_Task_Title" TEXT NOT NULL,
    "Pomo_Task_Short" INTEGER NOT NULL DEFAULT 5,
    "Pomo_Task_Long" INTEGER NOT NULL DEFAULT 15,
    "Pomo_Task_Status" BOOLEAN NOT NULL DEFAULT false,
    "Pomo_Completed_Count" INTEGER NOT NULL DEFAULT 0,
    "Pomo_Target_Count" INTEGER NOT NULL DEFAULT 4,
    "SessionId" INTEGER NOT NULL,
    CONSTRAINT "pomodoro_task_SessionId_fkey" FOREIGN KEY ("SessionId") REFERENCES "pomodoro_sessions" ("SessionId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pomodoro_task" ("Pomo_Completed_Count", "Pomo_Target_Count", "Pomo_TaskId", "Pomo_Task_Long", "Pomo_Task_Short", "Pomo_Task_Status", "Pomo_Task_Title", "SessionId") SELECT "Pomo_Completed_Count", "Pomo_Target_Count", "Pomo_TaskId", "Pomo_Task_Long", "Pomo_Task_Short", "Pomo_Task_Status", "Pomo_Task_Title", "SessionId" FROM "pomodoro_task";
DROP TABLE "pomodoro_task";
ALTER TABLE "new_pomodoro_task" RENAME TO "pomodoro_task";
CREATE TABLE "new_profile" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT,
    "User_profile_icon_type" TEXT NOT NULL DEFAULT 'preset',
    "User_profile_icon_path" TEXT NOT NULL,
    CONSTRAINT "profile_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("UserID", "User_profile_icon_path", "User_profile_icon_type", "Username") SELECT "UserID", "User_profile_icon_path", "User_profile_icon_type", "Username" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE TABLE "new_task" (
    "TaskID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Task_Title" TEXT NOT NULL,
    "Task_Description" TEXT,
    "Task_Start_Date" TEXT,
    "Task_End_Date" TEXT,
    "Task_Start_Time" TEXT,
    "Task_End_Time" TEXT,
    "Task_Icon" TEXT DEFAULT 'default.svg',
    "Task_Status" TEXT NOT NULL DEFAULT 'Incomplete',
    "Task_Color" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,
    CONSTRAINT "task_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_task" ("TaskID", "Task_Color", "Task_Description", "Task_End_Date", "Task_End_Time", "Task_Start_Date", "Task_Start_Time", "Task_Status", "Task_Title") SELECT "TaskID", "Task_Color", "Task_Description", "Task_End_Date", "Task_End_Time", "Task_Start_Date", "Task_Start_Time", "Task_Status", "Task_Title" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Email_key" ON "User"("User_Email");
