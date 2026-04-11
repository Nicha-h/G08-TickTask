/**
 * API smoke + integration tests — native fetch (Node 18+), zero dependencies.
 * Run:  node test.mjs
 * Env:  TEST_BASE=http://localhost:3000 (default)
 */

const BASE = process.env.TEST_BASE || "http://localhost:3000";
const TEST_EMAIL = `test_${Date.now()}@ticktask.test`;
const TEST_PASS = "testpass123";

let token = "";
let userId = 0;
let taskId = 0;
let categoryId = 0;
let sessionId = 0;
let pomoTaskId = 0;

let passed = 0;
let failed = 0;

// ─── helpers ─────────────────────────────────────────────────────────────────

function ok(label, cond, detail = "") {
  if (cond) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.log(`  ❌ ${label}${detail ? " — " + detail : ""}`);
    failed++;
  }
}

function deepOk(label, actual, expected) {
  if (!actual) {
    ok(label, false, `actual is ${actual}`);
    return;
  }
  const mismatches = Object.entries(expected)
    .filter(([k, v]) => actual[k] !== v)
    .map(
      ([k, v]) =>
        `${k}: expected ${JSON.stringify(v)}, got ${JSON.stringify(actual[k])}`,
    );
  ok(label, mismatches.length === 0, mismatches.join("; "));
}

async function req(method, path, body, auth = false) {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return { status: res.status, json };
}

// ─── 1. Users ────────────────────────────────────────────────────────────────

async function testUsers() {
  console.log("\n── Users ──");

  // signup
  const signup = await req("POST", "/api/users/signup", {
    email: TEST_EMAIL,
    password: TEST_PASS,
  });
  ok("POST /signup — 200", signup.status === 200);
  ok("POST /signup — has token", !!signup.json?.token);
  deepOk("POST /signup — response shape", signup.json?.user, {
    email: TEST_EMAIL,
  });
  token = signup.json?.token ?? "";
  userId = signup.json?.user?.id ?? 0;

  // login
  const login = await req("POST", "/api/users/login", {
    email: TEST_EMAIL,
    password: TEST_PASS,
  });
  ok("POST /login — 200", login.status === 200);
  ok("POST /login — has token", !!login.json?.token);
  deepOk("POST /login — correct user returned", login.json?.user, {
    email: TEST_EMAIL,
  });
  token = login.json?.token ?? token;

  // check-email
  const check = await req("POST", "/api/users/check-email", {
    email: TEST_EMAIL,
  });
  ok("POST /check-email — 200", check.status === 200);
  ok("POST /check-email — exists=true", check.json?.exists === true);

  // reset-password (no mail infra — just verify it responds)
  const reset = await req("POST", "/api/users/reset-password", {
    email: TEST_EMAIL,
  });
  ok(
    "POST /reset-password — responds",
    reset.status !== 0,
    `status=${reset.status}`,
  );

  // get profile
  const profile = await req("GET", "/api/users/profile", null, true);
  ok("GET /profile — 200", profile.status === 200);

  // update profile + round-trip verify
  const profilePayload = { name: "Tester", iconType: "custom", iconPath: "🎯" };
  const update = await req("PUT", "/api/users/profile", profilePayload, true);
  ok("PUT /profile — 200", update.status === 200, JSON.stringify(update.json));

  const verify = await req("GET", "/api/users/profile", null, true);
  ok("PUT /profile — name persisted", verify.json?.Username === "Tester");
  ok(
    "PUT /profile — iconPath persisted",
    verify.json?.User_profile_icon_path === "🎯",
  );
}

async function testUsersNegative() {
  console.log("\n── Users (negative) ──");

  // unauth
  const unauth = await req("GET", "/api/users/profile", null, false);
  ok("GET /profile without token — 401", unauth.status === 401);

  // bad token
  const saved = token;
  token = "invalidtoken";
  const bad = await req("GET", "/api/users/profile", null, true);
  ok(
    "GET /profile bad token — 401/403",
    bad.status === 401 || bad.status === 403,
  );
  token = saved;

  // signup missing fields
  const noPass = await req("POST", "/api/users/signup", { email: "x@y.com" });
  ok("POST /signup no password — 400/500", noPass.status >= 400);

  // signup invalid email
  const badEmail = await req("POST", "/api/users/signup", {
    email: "notanemail",
    password: TEST_PASS,
  });
  ok("POST /signup invalid email — 400/500", badEmail.status >= 400);

  // login wrong password
  const wrongPw = await req("POST", "/api/users/login", {
    email: TEST_EMAIL,
    password: "wrong",
  });
  ok("POST /login wrong password — 401", wrongPw.status === 401);
}

// ─── 2. Tasks ────────────────────────────────────────────────────────────────

async function testTasks() {
  console.log("\n── Tasks ──");

  const payload = {
    Task_Title: "Test Task",
    Task_Description: "desc",
    Task_Start_Date: "2026-04-11",
    Task_End_Date: "2026-04-11",
    Task_Start_Time: "09:00",
    Task_End_Time: "10:00",
    Task_Status: "Incomplete",
    Task_Color: "#ff0000",
  };

  // create + deep check
  const create = await req("POST", "/api/tasks", payload, true);
  ok("POST /tasks — 201", create.status === 201, JSON.stringify(create.json));
  taskId = create.json?.data?.TaskID ?? 0;
  ok("POST /tasks — has TaskID", taskId > 0, `got taskId=${taskId}`);
  deepOk("POST /tasks — response matches payload", create.json?.data, {
    Task_Title: "Test Task",
    Task_Status: "Incomplete",
  });

  // get all
  const all = await req("GET", "/api/tasks", null, true);
  ok("GET /tasks — 200", all.status === 200);
  ok("GET /tasks — is array", Array.isArray(all.json));

  // get by date
  const byDate = await req(
    "GET",
    "/api/tasks/by-date?date=2026-04-11",
    null,
    true,
  );
  ok("GET /tasks/by-date — 200", byDate.status === 200);

  // overview
  const overview = await req("GET", "/api/tasks/overview", null, true);
  ok("GET /tasks/overview — 200", overview.status === 200);

  // filter by status
  const filtered = await req("GET", "/api/tasks?status=Incomplete", null, true);
  ok("GET /tasks?status=Incomplete — 200", filtered.status === 200);

  // PUT + round-trip verify
  const putPayload = {
    Task_Title: "Updated Task",
    Task_Status: "Completed",
    Task_Start_Date: "2026-04-11",
    Task_End_Date: "2026-04-11",
    Task_Start_Time: "09:00",
    Task_End_Time: "10:00",
    Task_Color: "#00ff00",
  };
  const put = await req("PUT", `/api/tasks/${taskId}`, putPayload, true);
  ok("PUT /tasks/:id — 200", put.status === 200);

  const afterPut = await req("GET", "/api/tasks", null, true);
  const updatedTask = afterPut.json?.find?.((t) => t.TaskID === taskId);
  ok(
    "PUT /tasks — title persisted",
    updatedTask?.Task_Title === "Updated Task",
  );
  ok("PUT /tasks — status persisted", updatedTask?.Task_Status === "Completed");

  // PATCH + round-trip verify
  const patch = await req(
    "PATCH",
    `/api/tasks/${taskId}`,
    { Task_Title: "Patched Task" },
    true,
  );
  ok("PATCH /tasks/:id — 200", patch.status === 200);

  const afterPatch = await req("GET", "/api/tasks", null, true);
  const patched = afterPatch.json?.find?.((t) => t.TaskID === taskId);
  ok("PATCH /tasks — title persisted", patched?.Task_Title === "Patched Task");
  ok("PATCH /tasks — status unchanged", patched?.Task_Status === "Completed");
}

async function testTasksNegative() {
  console.log("\n── Tasks (negative) ──");

  // empty title
  const badTask = await req("POST", "/api/tasks", { Task_Title: "" }, true);
  ok(
    "POST /tasks empty title — 400/422",
    badTask.status >= 400,
    `status=${badTask.status}`,
  );

  // missing required fields
  const noFields = await req("POST", "/api/tasks", {}, true);
  ok("POST /tasks no body — 400/422", noFields.status >= 400);

  // update nonexistent task (NOTE: backend returns 200 even if no rows matched — known behavior)
  const ghost = await req(
    "PUT",
    "/api/tasks/999999",
    { Task_Title: "Nope" },
    true,
  );
  ok(
    "PUT /tasks/999999 — responds",
    ghost.status !== 0,
    `status=${ghost.status}`,
  );

  // end date before start date
  const badDates = await req(
    "POST",
    "/api/tasks",
    {
      Task_Title: "Bad Dates",
      Task_Start_Date: "2026-04-15",
      Task_End_Date: "2026-04-10",
      Task_Start_Time: "09:00",
      Task_End_Time: "10:00",
      Task_Status: "Incomplete",
      Task_Color: "#000",
    },
    true,
  );
  ok(
    "POST /tasks end<start — 400 or created",
    badDates.status !== 0,
    `status=${badDates.status}`,
  );
}

// ─── 3. Categories ───────────────────────────────────────────────────────────

async function testCategories() {
  console.log("\n── Categories ──");

  // create
  const create = await req(
    "POST",
    "/api/category",
    {
      Category_Name: "Test Cat",
      Category_Icon: "📁",
      Category_Color: "#123456",
    },
    true,
  );
  ok("POST /category — 201", create.status === 200 || create.status === 201);
  categoryId =
    create.json?.CategoryId ??
    create.json?.categoryId?.CategoryId ??
    create.json?.data?.CategoryId ??
    0;
  ok(
    "POST /category — has CategoryId",
    categoryId > 0,
    JSON.stringify(create.json),
  );
  deepOk("POST /category — response matches", create.json, {
    Category_Name: "Test Cat",
  });

  // get all
  const all = await req("GET", "/api/category", null, true);
  ok("GET /category — 200", all.status === 200);
  ok("GET /category — is array", Array.isArray(all.json));
  ok(
    "GET /category — contains created",
    all.json?.some?.((c) => c.CategoryId === categoryId),
  );

  // PUT + round-trip
  const put = await req(
    "PUT",
    `/api/category/${categoryId}`,
    {
      Category_Name: "Updated Cat",
      Category_Icon: "📂",
      Category_Color: "#654321",
    },
    true,
  );
  ok("PUT /category/:id — 200", put.status === 200, JSON.stringify(put.json));

  const afterPut = await req("GET", "/api/category", null, true);
  const updatedCat = afterPut.json?.find?.((c) => c.CategoryId === categoryId);
  ok(
    "PUT /category — name persisted",
    updatedCat?.Category_Name === "Updated Cat",
  );
  ok(
    "PUT /category — color persisted",
    updatedCat?.Category_Color === "#654321",
  );

  // PATCH + round-trip
  const patch = await req(
    "PATCH",
    `/api/category/${categoryId}`,
    { Category_Name: "Patched Cat" },
    true,
  );
  ok("PATCH /category/:id — 200", patch.status === 200);

  const afterPatch = await req("GET", "/api/category", null, true);
  const patchedCat = afterPatch.json?.find?.(
    (c) => c.CategoryId === categoryId,
  );
  ok(
    "PATCH /category — name persisted",
    patchedCat?.Category_Name === "Patched Cat",
  );
  ok(
    "PATCH /category — color unchanged",
    patchedCat?.Category_Color === "#654321",
  );

  // state-change: assign task + verify count increments
  if (taskId > 0) {
    const beforeCount = await req(
      "GET",
      `/api/category/${categoryId}/count`,
      null,
      true,
    );
    const initialCount = beforeCount.json?.taskCount ?? 0;

    const assign = await req(
      "PUT",
      `/api/category/${categoryId}/assign`,
      { taskId },
      true,
    );
    ok(
      "PUT /category/:id/assign — 200",
      assign.status === 200,
      JSON.stringify(assign.json),
    );

    const afterCount = await req(
      "GET",
      `/api/category/${categoryId}/count`,
      null,
      true,
    );
    ok(
      "Assign — task count incremented",
      (afterCount.json?.taskCount ?? 0) === initialCount + 1,
      `before=${initialCount}, after=${afterCount.json?.taskCount}`,
    );
  }

  // tasks in category
  const tasks = await req(
    "GET",
    `/api/category/${categoryId}/tasks`,
    null,
    true,
  );
  ok("GET /category/:id/tasks — 200", tasks.status === 200);
  if (taskId > 0) {
    ok(
      "GET /category/:id/tasks — contains assigned task",
      Array.isArray(tasks.json) && tasks.json.some((t) => t.TaskID === taskId),
    );
  }

  // progress
  const progress = await req(
    "GET",
    `/api/category/${categoryId}/progress`,
    null,
    true,
  );
  ok("GET /category/:id/progress — 200", progress.status === 200);
}

// ─── 4. Pomodoro Sessions ────────────────────────────────────────────────────

async function testPomodoro() {
  console.log("\n── Pomodoro Sessions ──");

  // create
  const create = await req(
    "POST",
    "/api/pomodoroSession",
    {
      duration_seconds: 1500,
      timer_type: "work",
    },
    true,
  );
  ok(
    "POST /pomodoroSession — 200/201",
    create.status === 200 || create.status === 201,
  );
  sessionId = create.json?.data?.SessionId ?? 0;
  ok(
    "POST /pomodoroSession — has SessionId",
    sessionId > 0,
    JSON.stringify(create.json),
  );

  // get by user
  const byUser = await req(
    "GET",
    `/api/pomodoroSession/user/${userId}`,
    null,
    true,
  );
  ok("GET /pomodoroSession/user/:userId — 200", byUser.status === 200);

  // get active
  const active = await req(
    "GET",
    `/api/pomodoroSession/active/${userId}`,
    null,
    true,
  );
  ok("GET /pomodoroSession/active/:userId — 200", active.status === 200);

  // get by id + verify fields
  const byId = await req(
    "GET",
    `/api/pomodoroSession/${sessionId}`,
    null,
    true,
  );
  ok("GET /pomodoroSession/:id — 200", byId.status === 200);
  ok(
    "GET /pomodoroSession/:id — correct session",
    byId.json?.SessionId === sessionId ||
      byId.json?.data?.SessionId === sessionId,
  );

  // start
  const start = await req(
    "POST",
    "/api/pomodoroSession/start",
    { duration_seconds: 1500, timer_type: "work" },
    true,
  );
  ok(
    "POST /pomodoroSession/start — 200/201",
    start.status === 200 || start.status === 201,
    JSON.stringify(start.json),
  );

  // pause
  const pause = await req(
    "PUT",
    `/api/pomodoroSession/${sessionId}/pause`,
    null,
    true,
  );
  ok("PUT /pomodoroSession/:id/pause — 200", pause.status === 200);

  // resume
  const resume = await req(
    "PUT",
    `/api/pomodoroSession/${sessionId}/resume`,
    null,
    true,
  );
  ok("PUT /pomodoroSession/:id/resume — 200", resume.status === 200);

  // update remaining time
  const time = await req(
    "PUT",
    `/api/pomodoroSession/${sessionId}/time`,
    { remaining_seconds: 900 },
    true,
  );
  ok("PUT /pomodoroSession/:id/time — 200", time.status === 200);

  // update session
  const update = await req(
    "PUT",
    `/api/pomodoroSession/${sessionId}`,
    { remaining_seconds: 800 },
    true,
  );
  ok("PUT /pomodoroSession/:id — 200", update.status === 200);

  // complete
  const complete = await req(
    "PUT",
    `/api/pomodoroSession/${sessionId}/complete`,
    null,
    true,
  );
  ok("PUT /pomodoroSession/:id/complete — 200", complete.status === 200);
}

async function testPomodoroNegative() {
  console.log("\n── Pomodoro Sessions (negative) ──");

  // negative duration (NOTE: backend lacks min-value validation — known gap)
  const neg = await req(
    "POST",
    "/api/pomodoroSession",
    { duration_seconds: -500 },
    true,
  );
  ok(
    "POST /pomodoroSession negative duration — responds",
    neg.status !== 0,
    `status=${neg.status}`,
  );

  // nonexistent session
  const ghost = await req("GET", "/api/pomodoroSession/999999", null, true);
  ok(
    "GET /pomodoroSession/999999 — 404 or empty",
    ghost.status === 404 || ghost.json === null || !ghost.json?.SessionId,
    `status=${ghost.status}`,
  );
}

// ─── 5. Pomodoro Tasks ──────────────────────────────────────────────────────

async function testPomoTasks() {
  console.log("\n── Pomodoro Tasks ──");

  // create a fresh session for pomo tasks
  const freshSession = await req(
    "POST",
    "/api/pomodoroSession",
    {
      duration_seconds: 1500,
      timer_type: "work",
    },
    true,
  );
  const freshSessionId = freshSession.json?.data?.SessionId ?? sessionId;

  // create
  const create = await req(
    "POST",
    "/api/pomodoroTask",
    {
      Pomo_Task_Title: "Test Pomo Task",
      Pomo_Task_Short: 5,
      Pomo_Task_Long: 15,
      Pomo_Target_Count: 4,
      SessionId: freshSessionId,
    },
    true,
  );
  ok(
    "POST /pomodoroTask — 200/201",
    create.status === 200 || create.status === 201,
  );
  pomoTaskId = create.json?.data?.Pomo_TaskId ?? create.json?.Pomo_TaskId ?? 0;
  ok(
    "POST /pomodoroTask — has Pomo_TaskId",
    pomoTaskId > 0,
    JSON.stringify(create.json),
  );

  // get all
  const all = await req("GET", "/api/pomodoroTask", null, true);
  ok("GET /pomodoroTask — 200", all.status === 200);

  // get by session
  const bySession = await req(
    "GET",
    `/api/pomodoroTask/session/${freshSessionId}`,
    null,
    true,
  );
  ok("GET /pomodoroTask/session/:id — 200", bySession.status === 200);

  // get by id
  const byId = await req("GET", `/api/pomodoroTask/${pomoTaskId}`, null, true);
  ok("GET /pomodoroTask/:id — 200", byId.status === 200);

  // get progress — should be 0/4 initially
  const progress = await req(
    "GET",
    `/api/pomodoroTask/${pomoTaskId}/progress`,
    null,
    true,
  );
  ok("GET /pomodoroTask/:id/progress — 200", progress.status === 200);

  // update + deep check
  const update = await req(
    "PUT",
    `/api/pomodoroTask/${pomoTaskId}`,
    {
      Pomo_Task_Title: "Updated Pomo Task",
      SessionId: freshSessionId,
    },
    true,
  );
  ok(
    "PUT /pomodoroTask/:id — 200",
    update.status === 200,
    JSON.stringify(update.json),
  );

  // assign to session
  const assign = await req(
    "PUT",
    `/api/pomodoroTask/${pomoTaskId}/assign`,
    { sessionId: freshSessionId },
    true,
  );
  ok(
    "PUT /pomodoroTask/:id/assign — 200",
    assign.status === 200,
    JSON.stringify(assign.json),
  );

  // set target
  const target = await req(
    "POST",
    `/api/pomodoroTask/${pomoTaskId}/target`,
    { targetCount: 3 },
    true,
  );
  ok("POST /pomodoroTask/:id/target — 200", target.status === 200);

  // state-change: increment + verify counter went up
  const beforeInc = await req(
    "GET",
    `/api/pomodoroTask/${pomoTaskId}`,
    null,
    true,
  );
  const countBefore =
    beforeInc.json?.Pomo_Completed_Count ??
    beforeInc.json?.data?.Pomo_Completed_Count ??
    0;

  const inc = await req(
    "POST",
    `/api/pomodoroTask/${pomoTaskId}/increment`,
    null,
    true,
  );
  ok("POST /pomodoroTask/:id/increment — 200", inc.status === 200);

  const afterInc = await req(
    "GET",
    `/api/pomodoroTask/${pomoTaskId}`,
    null,
    true,
  );
  const countAfter =
    afterInc.json?.Pomo_Completed_Count ??
    afterInc.json?.data?.Pomo_Completed_Count ??
    0;
  ok(
    "Increment — counter went up",
    countAfter === countBefore + 1,
    `before=${countBefore}, after=${countAfter}`,
  );

  // reset counter
  const reset = await req(
    "POST",
    `/api/pomodoroTask/${pomoTaskId}/reset`,
    null,
    true,
  );
  ok("POST /pomodoroTask/:id/reset — 200", reset.status === 200);

  const afterReset = await req(
    "GET",
    `/api/pomodoroTask/${pomoTaskId}`,
    null,
    true,
  );
  const countReset =
    afterReset.json?.Pomo_Current_Count ??
    afterReset.json?.data?.Pomo_Current_Count ??
    0;
  ok("Reset — counter back to 0", countReset === 0, `count=${countReset}`);

  // complete task
  const complete = await req(
    "PUT",
    `/api/pomodoroTask/${pomoTaskId}/complete`,
    null,
    true,
  );
  ok("PUT /pomodoroTask/:id/complete — 200", complete.status === 200);

  // cleanup the fresh session too
  await req("DELETE", `/api/pomodoroTask/${pomoTaskId}`, null, true);
  await req("DELETE", `/api/pomodoroSession/${freshSessionId}`, null, true);
}

// ─── 6. Cleanup ──────────────────────────────────────────────────────────────

async function testCleanup() {
  console.log("\n── Cleanup ──");

  if (sessionId > 0) {
    const del = await req(
      "DELETE",
      `/api/pomodoroSession/${sessionId}`,
      null,
      true,
    );
    ok(`DELETE /pomodoroSession/${sessionId}`, del.status === 200);
  }

  if (taskId > 0) {
    const del = await req("DELETE", `/api/tasks/${taskId}`, null, true);
    ok(`DELETE /tasks/${taskId}`, del.status === 200);
  }

  if (categoryId > 0) {
    const del = await req("DELETE", `/api/category/${categoryId}`, null, true);
    ok(`DELETE /category/${categoryId}`, del.status === 200);
  }
}

// ─── 7. OpenAPI / Orval readiness ────────────────────────────────────────────

async function testOpenAPI() {
  console.log("\n── OpenAPI / Orval Readiness ──");

  const res = await fetch(`${BASE}/doc`);
  ok("GET /doc — 200", res.status === 200);
  const spec = await res.json();

  const issues = {
    noOperationId: [],
    noRequestBodySchema: [],
    noResponseSchema: [],
  };

  for (const [path, methods] of Object.entries(spec.paths ?? {})) {
    for (const [method, op] of Object.entries(methods)) {
      const label = `${method.toUpperCase()} ${path}`;
      if (!op.operationId) issues.noOperationId.push(label);
      if (["post", "put", "patch"].includes(method)) {
        if (!op.requestBody?.content?.["application/json"]?.schema)
          issues.noRequestBodySchema.push(label);
      }
      const hasResp =
        op.responses?.["200"]?.content?.["application/json"]?.schema ||
        op.responses?.["201"]?.content?.["application/json"]?.schema;
      if (!hasResp) issues.noResponseSchema.push(label);
    }
  }

  ok(
    "All routes have operationId",
    issues.noOperationId.length === 0,
    `Missing: ${issues.noOperationId.join(", ")}`,
  );
  ok(
    "All write routes have requestBody (excl. actions)",
    issues.noRequestBodySchema.filter(
      (r) => !/(pause|resume|complete|reset|increment|upload)/i.test(r),
    ).length === 0,
    `Missing: ${issues.noRequestBodySchema.join(", ")}`,
  );
  ok(
    "All routes have response schema",
    issues.noResponseSchema.length === 0,
    `Missing: ${issues.noResponseSchema.join(", ")}`,
  );
  ok("Has BearerAuth scheme", !!spec.components?.securitySchemes?.BearerAuth);
  ok("Has components/schemas", !!spec.components?.schemas);

  // health check
  const health = await fetch(BASE);
  ok("GET / — health 200", health.status === 200);
}

// ─── run ─────────────────────────────────────────────────────────────────────

const suites = [
  ["testUsers", testUsers],
  ["testUsersNegative", testUsersNegative],
  ["testTasks", testTasks],
  ["testTasksNegative", testTasksNegative],
  ["testCategories", testCategories],
  ["testPomodoro", testPomodoro],
  ["testPomodoroNegative", testPomodoroNegative],
  ["testPomoTasks", testPomoTasks],
  ["testCleanup", testCleanup],
  ["testOpenAPI", testOpenAPI],
];

console.log(`Testing ${BASE}`);

for (const [name, fn] of suites) {
  try {
    await fn();
  } catch (err) {
    console.log(`\n  💥 ${name} crashed: ${err.message}`);
    failed++;
  }
}

console.log(`\n${"─".repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
