import { createRealtime, rawSql } from "@neon/realtime/server";
import * as dotenv from "dotenv";
dotenv.config();

// The Live SQL connection binds to one database: the one named in DATABASE_URL
const dbName = new URL(process.env.DATABASE_URL!).pathname.slice(1);

export const realtime = createRealtime({
  secret: process.env.NEON_REALTIME_SECRET!,
  db: dbName,
});

// Per-user live queries. The frontend refetches its usual API data when these rows change,
// so each query selects just enough columns to notice an edit. UserID always comes from the verified session.
export const liveQueries = {
  tasks: (userId: number) =>
    rawSql<{ TaskID: number }>(
      `SELECT "TaskID", "Task_Title", "Task_Description", "Task_Status", "Task_Start_Date", "Task_End_Date",
         "Task_Start_Time", "Task_End_Time", "Task_Icon", "Task_Color"
       FROM "task" WHERE "UserID" = $1`,
      [userId],
    ),
  pomodoro: (userId: number) =>
    rawSql<{ Pomo_TaskId: number }>(
      `SELECT pt."Pomo_TaskId", pt."Pomo_Task_Title", pt."Pomo_Task_Short", pt."Pomo_Task_Long",
         pt."Pomo_Task_Status", pt."Pomo_Completed_Count", pt."Pomo_Target_Count", pt."SessionId"
       FROM "pomodoro_task" pt
       INNER JOIN "pomodoro_sessions" s ON s."SessionId" = pt."SessionId"
       WHERE s."UserID" = $1`,
      [userId],
    ),
};

export type LiveFeed = keyof typeof liveQueries;

export function isLiveFeed(name: string): name is LiveFeed {
  return Object.hasOwn(liveQueries, name);
}
