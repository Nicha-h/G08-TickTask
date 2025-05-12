-- CreateTable
CREATE TABLE "User" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "User_Email" TEXT NOT NULL,
    "User_Password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "task" (
    "TaskID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Task_Title" TEXT NOT NULL,
    "Task_Description" TEXT NOT NULL,
    "Task_Start_Date" DATETIME NOT NULL,
    "Task_End_Date" DATETIME NOT NULL,
    "Task_Start_Time" TEXT NOT NULL,
    "Task_End_Time" TEXT NOT NULL,
    "Task_Status" TEXT NOT NULL DEFAULT 'Incomplete',
    "Task_Color" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "profile" (
    "UserID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "User_profile_icon_type" TEXT NOT NULL DEFAULT 'preset',
    "User_profile_icon_path" TEXT NOT NULL,
    CONSTRAINT "profile_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "CategoryId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Category_Name" TEXT NOT NULL,
    "Category_icon" TEXT NOT NULL,
    "Category_Color" TEXT NOT NULL DEFAULT '#A7A7A7',
    "Category_is_Primary" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "task_category" (
    "TaskID" INTEGER NOT NULL,
    "CategoryId" INTEGER NOT NULL,

    PRIMARY KEY ("TaskID", "CategoryId"),
    CONSTRAINT "task_category_TaskID_fkey" FOREIGN KEY ("TaskID") REFERENCES "task" ("TaskID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_category_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "category" ("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pomodoro_sessions" (
    "SessionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserID" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,
    "StartTime" DATETIME NOT NULL,
    "EndTime" DATETIME NOT NULL,
    "PausedTime" INTEGER NOT NULL,
    "duration_seconds" INTEGER NOT NULL DEFAULT 1500,
    "timer_type" TEXT NOT NULL,
    "last_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pomodoro_sessions_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User" ("UserID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pomodoro_task" (
    "Pomo_TaskId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Pomo_Task_Title" TEXT NOT NULL,
    "Pomo_Task_Short" INTEGER NOT NULL DEFAULT 5,
    "Pomo_Task_Long" INTEGER NOT NULL DEFAULT 15,
    "Pomo_Task_Status" BOOLEAN NOT NULL DEFAULT false,
    "Pomo_Completed_Count" INTEGER NOT NULL DEFAULT 0,
    "Pomo_Target_Count" INTEGER NOT NULL DEFAULT 4,
    "SessionId" INTEGER NOT NULL,
    CONSTRAINT "pomodoro_task_SessionId_fkey" FOREIGN KEY ("SessionId") REFERENCES "pomodoro_sessions" ("SessionId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_Password_key" ON "User"("User_Password");
