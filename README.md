## :pushpin: TickTask

   As students, we often face the problem of forgetting to submit assignments due to procrastination and burnout. Sometimes we forget that there is an upcoming deadline or something that needs to be done soon. This brings us to our web application where users can create a to-do list that can be customized as desired. It can create categories to organize tasks. Moreover, there is a Pomodoro that helps to focus and increase efficiency. This helps to manage your life schedule better and know which tasks should be completed first.


## :rocket: Getting Started
1. Clone the repository: bash git clone https://github.com/CSC105-2024/G08-TickTask.git `cd G08-TickTask`


## :hammer: Frontend - React
### :wrench: Tech Stack
- React
- Axios
- React Router DOM
- Tailwind CSS
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
- Cloudinary
- Vite

## :rocket: Getting Started - React Client
1. Navigate to the frontend directory: `bash cd frontend`
2. Install dependencies: `bash npm install`
3. Start the development server: `bash npm run dev`
4. The client will be running on `http://localhost:5173/`

---
## :wrench: Backend - Node.js
### :hammer_and_wrench: Tech Stack

- Node.js
- Hono
- MySQL
- Prisma
- Axios
- bcrypt
- Cloudinary
- dotenv
- formidable
- jsonwebtoken
- nodemailer
- Zod

---
## :electric_plug: API Endpoints


### 📥 Create (POST / PUT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/category` | Create a new category |
| PUT  | `/category/:id/assign` | Assign tasks to a category |
| POST | `/session` | Create a new session |
| POST | `/session/start` | Start a new session |
| POST | `/pomo-task` | Create a new Pomo task |
| POST | `/pomo-task/:id/increment` | Increment Pomodoro counter |
| POST | `/pomo-task/:id/reset` | Reset Pomodoro counter |
| POST | `/pomo-task/:id/target` | Set Pomodoro target count |
| POST | `/task` | Create a new task |
| POST | `/user/signup` | Create new user |
| POST | `/user/login` | User login |
| POST | `/user/check-email` | Check if email is registered |
| POST | `/user/reset-password` | Request password reset |
| POST | `/user/profile/upload-profile-pic` | Upload user profile picture |

---

### 📄 Read (GET)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/category` | Get all categories |
| GET | `/category/:id/progress` | Get progress of a category |
| GET | `/category/:id/count` | Get task count in a category |
| GET | `/category/:id/tasks` | Get tasks in a category |
| GET | `/session/user/:userId` | Get all sessions for a user |
| GET | `/session/:id` | Get session by ID |
| GET | `/session/active/:userId` | Get active session for a user |
| GET | `/pomo-task` | Get all Pomo tasks |
| GET | `/pomo-task/session/:sessionId` | Get tasks by session ID |
| GET | `/pomo-task/:id` | Get Pomo task by ID |
| GET | `/pomo-task/:id/progress` | Get Pomo task progress |
| GET | `/task` | Get all tasks (with status filter) |
| GET | `/task/by-date` | Get tasks by date |
| GET | `/task/overview` | Get overview of tasks |
| GET | `/user/profile` | Get user profile |

---

### ♻️ Update (PUT / PATCH)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/category/:id` | Update a category |
| PATCH | `/category/:id` | Partially update a category |
| PUT | `/session/:id` | Update a session |
| PUT | `/session/:id/pause` | Pause a session |
| PUT | `/session/:id/resume` | Resume a session |
| PUT | `/session/:id/complete` | Complete a session |
| PUT | `/session/:id/time` | Update remaining time in session |
| PUT | `/pomo-task/:id` | Update a Pomo task |
| PUT | `/pomo-task/:id/assign` | Assign task to session |
| PUT | `/pomo-task/:id/complete` | Complete a Pomo task |
| PUT | `/task/:id` | Update a task |
| PATCH | `/task/:id` | Partially update a task |
| PUT | `/user/profile` | Update user profile |

---

### ❌ Delete (DELETE)

| Method | Endpoint | Description |
|--------|----------|-------------|
| DELETE | `/category/:id` | Delete a category |
| DELETE | `/session/:id` | Delete a session |
| DELETE | `/pomo-task/:id` | Delete a Pomo task |
| DELETE | `/task/:id` | Delete a task |
---



```
4. Start the development server: `bash npm run dev`
5. The server will be running on `http://localhost:3000`


