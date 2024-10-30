import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.context";
import Root from "./components/Root";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Add from "./pages/Add";
import Cart from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "cart",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Cart />,
          },
        ],
      },
      {
        path: "Hoodies",
        element: <Products categoryID={1} />,
      },
      {
        path: "Shirts",
        element: <Products categoryID={2} />,
      },
      {
        path: "Trousers",
        element: <Products categoryID={3} />,
      },
      {
        path: "Accessories",
        element: <Products categoryID={4} />,
      },
      {
        path: "Add_Item",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Add />,
          },
        ],
      },
      {
        path: "Profile",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
