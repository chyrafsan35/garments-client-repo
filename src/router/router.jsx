import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import Rootlayout from "../layouts/Rootlayout";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home,
      }
    ]
  },
  {
    path: '/',
    Component: Authlayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ]
  }
]);