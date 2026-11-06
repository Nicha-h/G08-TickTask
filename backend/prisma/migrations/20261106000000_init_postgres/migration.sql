-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Completed', 'Incomplete');

-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('preset', 'custom');

-- CreateEnum
CREATE TYPE "PomoStatus" AS ENUM ('active', 'paused', 'completed');

-- CreateEnum
CREATE TYPE "TimerType" AS ENUM ('work', 'short', 'long');

-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "User_Email" TEXT NOT NULL,
    "authUserId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "task" (
    "TaskID" SERIAL NOT NULL,
    "Task_Title" TEXT NOT NULL,
    "Task_Description" TEXT,
    "Task_Start_Date" TEXT,
    "Task_End_Date" TEXT,
    "Task_Start_Time" TEXT,
    "Task_End_Time" TEXT,
    "Task_Icon" TEXT DEFAULT 'default.svg',
    "Task_Status" "TaskStatus" NOT NULL DEFAULT 'Incomplete',
    "Task_Color" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("TaskID")
);

-- CreateTable
CREATE TABLE "profile" (
    "UserID" INTEGER NOT NULL,
    "Username" TEXT,
    "User_profile_icon_type" "IconType" NOT NULL DEFAULT 'preset',
    "User_profile_icon_path" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "category" (
    "CategoryId" SERIAL NOT NULL,
    "Category_Name" TEXT NOT NULL,
    "Category_icon" TEXT NOT NULL,
    "Category_Color" TEXT NOT NULL DEFAULT '#A7A7A7',
    "Category_is_Primary" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "task_category" (
    "TaskID" INTEGER NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    CONSTRAINT "task_category_pkey" PRIMARY KEY ("TaskID","CategoryId")
);

-- CreateTable
CREATE TABLE "pomodoro_sessions" (
    "SessionId" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Status" "PomoStatus" NOT NULL,
    "StartTime" TEXT NOT NULL,
    "EndTime" TEXT,
    "PausedTime" TEXT NOT NULL,
    "duration_seconds" INTEGER NOT NULL DEFAULT 1500,
    "remaining_seconds" INTEGER NOT NULL DEFAULT 1500,
    "timer_type" "TimerType" NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pomodoro_sessions_pkey" PRIMARY KEY ("SessionId")
);

-- CreateTable
CREATE TABLE "pomodoro_task" (
    "Pomo_TaskId" SERIAL NOT NULL,
    "Pomo_Task_Title" TEXT NOT NULL,
    "Pomo_Task_Short" INTEGER NOT NULL DEFAULT 5,
    "Pomo_Task_Long" INTEGER NOT NULL DEFAULT 15,
    "Pomo_Task_Status" BOOLEAN NOT NULL DEFAULT false,
    "Pomo_Completed_Count" INTEGER NOT NULL DEFAULT 0,
    "Pomo_Target_Count" INTEGER NOT NULL DEFAULT 4,
    "SessionId" INTEGER NOT NULL,

    CONSTRAINT "pomodoro_task_pkey" PRIMARY KEY ("Pomo_TaskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Email_key" ON "User"("User_Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_authUserId_key" ON "User"("authUserId");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_category" ADD CONSTRAINT "task_category_TaskID_fkey" FOREIGN KEY ("TaskID") REFERENCES "task"("TaskID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_category" ADD CONSTRAINT "task_category_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "category"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_task" ADD CONSTRAINT "pomodoro_task_SessionId_fkey" FOREIGN KEY ("SessionId") REFERENCES "pomodoro_sessions"("SessionId") ON DELETE CASCADE ON UPDATE CASCADE;

