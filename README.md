## :pushpin: TickTask

This is a To-Do List App for 


## :rocket: Getting Started
1. Clone the repository: bash git clone https://github.com/CSC105-2024/G08-TickTask.git cd G08-TickTask


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
1. Navigate to the frontend directory: bash cd frontend
2. Install dependencies: bash npm install
3. Start the development server: bash npm run dev
4. The client will be running on http://localhost:5173/ 

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

## :electric_plug: API Endpoints
Method	Endpoint	Description
GET	/api/items	Fetch all items
GET	/api/items/:id	Fetch a specific item by ID
POST	/api/items	Create a new item
PUT	/api/items/:id	Update an existing item by ID
DELETE	/api/items/:id	Delete an item by ID
Add, modify, or remove endpoints based on your project.

## :rocket: Getting Started - Node.js Server

1. Navigate to the backend directory: bash cd backend
2. Install dependencies: bash npm install
3. Create a .env file and configure the following variables:
JWT_SECRET=amogussussybaka

DATABASE_URL="file:./dev.db"

EMAIL_USER=nichahongsri@gmail.com
EMAIL_PASSWORD=jqpluldihxbqltfr

CLOUDINARY_CLOUD_NAME=demkf5dzm
CLOUDINARY_API_KEY=359364352434188
CLOUDINARY_API_SECRET=u-8v2P8TwWGXItLRzVgfVy65xuQ
CLOUDINARY_URL=cloudinary://359364352434188:u-8v2P8TwWGXItLRzVgfVy65xuQ@demkf5dzm

4. Start the development server: bash npm run dev
5. The server will be running on http://localhost:3000
