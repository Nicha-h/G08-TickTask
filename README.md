## :pushpin: TickTask

   As students, we often face the problem of forgetting to submit assignments due to procrastination and burnout. Sometimes we forget that there is an upcoming deadline or something that needs to be done soon. This brings us to our web application where users can create a to-do list that can be customized as desired. It can create categories to organize tasks. Moreover, there is a Pomodoro that helps to focus and increase efficiency. This helps to manage your life schedule better and know which tasks should be completed first.


## :rocket: Getting Started

You need Node.js 22+ and access to the project's Neon project (Postgres, Neon Auth and Neon Realtime).

1. Clone the repository:
   ```bash
   git clone https://github.com/CSC105-2024/G08-TickTask.git
   cd G08-TickTask
   npm install
   ```
2. Install the Neon CLI, link the repo to the TickTask Neon project and pull its environment variables into the repo root `.env.local` (both apps load it):
   ```bash
   npm install -g neon
   neon login
   neon link --project-id <project-id>   # ask a teammate, or copy it from the Neon Console
   neon env pull
   ```
   `backend/.env.example` lists every variable, including the Cloudinary keys you add yourself.
3. Start the backend (runs database migrations first):
   ```bash
   cd backend
   npm install
   npm run db:migrate
   npm run dev
   ```
   The API runs on `http://localhost:3000`, with Swagger UI at `/swagger` and the OpenAPI spec at `/doc`.
4. Start the frontend in another terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The app runs on `http://localhost:5173/`.

**Docker (single container):** `npm run docker:build` then `npm run docker:start` serves the built frontend and the API together on `http://localhost:3000`.

---
## :hammer: Frontend - React
### :wrench: Tech Stack
- React
- React Router DOM
- Tailwind CSS
- Neon Auth (`@neon/auth`)
- Neon Realtime (`@neon/realtime`) for live task and Pomodoro sync
- Axios
- React Hook Form
- Zod
- Day.js
- date-fns
- Framer Motion
- Iconify
- react-colorful
- react-responsive
- react-swipeable
- jwt-decode
- Vite

---
## :wrench: Backend - Node.js
### :hammer_and_wrench: Tech Stack

- Node.js + tsx
- Hono with `@hono/zod-openapi` and Swagger UI
- Prisma
- PostgreSQL on Neon
- Neon Auth (JWTs verified with `jose`)
- Neon Realtime
- Cloudinary (profile pictures)
- Zod

---
## :closed_lock_with_key: Authentication

Sign-up, login and password reset go straight from the browser to [Neon Auth](https://neon.com/docs/auth/overview). The API never sees passwords; it only checks the JWT that Neon Auth issues.

**Password reset**
1. On the login page, choose **Forgot password? Click here** and enter your email.
2. A 6-digit code is emailed to you. It expires after 5 minutes and stops working after 3 wrong tries.
3. Enter the code and your new password (at least 8 characters), then sign in again.

You can resend the code once every 60 seconds. The page shows the same message whether or not the email has an account, so it can't be used to find out who is registered.

**Email verification:** once email verification is turned on in Neon, sign-up and login ask for a 6-digit code sent to your email before you can continue.

---
## :electric_plug: API Endpoints

Every `/api/*` route needs the Neon Auth JWT in an `Authorization: Bearer <token>` header.

### 📥 Create (POST / PUT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/category` | Create a category |
| PUT  | `/api/category/:id/assign` | Assign a task to a category |
| POST | `/api/pomodoroSession` | Create a Pomodoro session |
| POST | `/api/pomodoroSession/start` | Start a session |
| POST | `/api/pomodoroTask` | Create a Pomodoro task |
| POST | `/api/pomodoroTask/:id/increment` | Increment the Pomodoro counter |
| POST | `/api/pomodoroTask/:id/reset` | Reset the Pomodoro counter |
| POST | `/api/pomodoroTask/:id/target` | Set the Pomodoro target count |
| POST | `/api/tasks` | Create a task |
| POST | `/api/users/profile/upload-profile-pic` | Upload a profile picture |
| POST | `/api/live/:feed` | Get a live query for realtime sync |

---

### 📄 Read (GET)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/category` | Get all categories |
| GET | `/api/category/:id/progress` | Get category progress |
| GET | `/api/category/:id/count` | Get the task count in a category |
| GET | `/api/category/:id/tasks` | Get the tasks in a category |
| GET | `/api/pomodoroSession/user/:userId` | Get all sessions for a user |
| GET | `/api/pomodoroSession/:id` | Get a session by ID |
| GET | `/api/pomodoroSession/active/:userId` | Get the active session for a user |
| GET | `/api/pomodoroTask` | Get all Pomodoro tasks |
| GET | `/api/pomodoroTask/session/:sessionId` | Get tasks by session |
| GET | `/api/pomodoroTask/:id` | Get a Pomodoro task by ID |
| GET | `/api/pomodoroTask/:id/progress` | Get Pomodoro task progress |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/by-date` | Get tasks by date |
| GET | `/api/tasks/overview` | Get the task overview |
| GET | `/api/users/profile` | Get the user profile |

---

### ♻️ Update (PUT / PATCH)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/category/:id` | Update a category |
| PATCH | `/api/category/:id` | Partially update a category |
| PUT | `/api/pomodoroSession/:id` | Update a session |
| PUT | `/api/pomodoroSession/:id/pause` | Pause a session |
| PUT | `/api/pomodoroSession/:id/resume` | Resume a session |
| PUT | `/api/pomodoroSession/:id/complete` | Complete a session |
| PUT | `/api/pomodoroSession/:id/time` | Update the remaining time |
| PUT | `/api/pomodoroTask/:id` | Update a Pomodoro task |
| PUT | `/api/pomodoroTask/:id/assign` | Assign a task to a session |
| PUT | `/api/pomodoroTask/:id/complete` | Complete a Pomodoro task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id` | Partially update a task |
| PUT | `/api/users/profile` | Update the user profile |

---

### ❌ Delete (DELETE)

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/api/category/:id` | Delete a category |
| DELETE | `/api/pomodoroSession/:id` | Delete a session |
| DELETE | `/api/pomodoroTask/:id` | Delete a Pomodoro task |
| DELETE | `/api/tasks/:id` | Delete a task |
