import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Signup from "../signup/Signup";
import Home from "../Home/Home";
import Health from "../Health/Health";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        index: true,
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Signup></Signup>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/health",
        element: <Health></Health>,
      },
    ],
  },
]);
