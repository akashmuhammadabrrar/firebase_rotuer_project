import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./components/Provider/AuthProvider";
import Orders from "./components/Orders";
import PrivetRoutes from "./components/Routes/PrivetRoutes";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Register></Register>,
      },
      {
        path: "/orders",
        element: (
          <PrivetRoutes>
            <Orders></Orders>
          </PrivetRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivetRoutes>
            <Profile></Profile>
          </PrivetRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
