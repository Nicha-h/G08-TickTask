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
import Signup from "./pages/Authentication/Signup.jsx";
import Login from "./pages/Authentication/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {path: "/",
        element: <Home/>
      },
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
    ],
    
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>
);
