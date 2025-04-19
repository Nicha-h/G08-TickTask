import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
//import Signup from "./pages/Signup.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import Calendar from "./pages/Calendar.jsx";
import Overview from "./pages/Overview.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";


const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {path: "/home",
        element: <Home/>
        },
      {path: "/pomodoro",
      element: <Pomodoro/>
      },
      {path: "/calendar",
        element: <Calendar/>
      },
      {path: "/overview",
        element: <Overview/>
      },
      {path: "/category",
        element: <Category/>
      },
    ]
  },
  

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Provide the router to the app */}
  </StrictMode>
);
