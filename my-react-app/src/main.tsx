import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";

import background from "./assets/vecteezy_retro-style-80s-sci-fi-background.jpg";
import HomePage from "./views/HomePage";
import SignUpPage from "./views/SignUpPage";
import LoginPage from "./views/LoginPage";
import ErrorPage from "./views/ErrorPage";
import AppPage from "./views/AppPage";
import MenuPage from "./views/customer/MenuPage";
import DroneQuickviewPage from "./views/employee/DroneQuickviewPage";
import ManagerQuickviewPage from "./views/manager/ManagerQuickviewPage";
import CartPage from "./views/customer/CartPage";
import ConfirmationPage from "./views/customer/ConfirmationPage";
import CustomerHistoryPage from "./views/customer/CustomerHistoryPage";
import ManageDronesPage from "./views/employee/ManageDronesPage";
import DroneHistoryPage from "./views/employee/DroneHistoryPage";
import ManageInventoryPage from "./views/manager/ManageInventoryPage";
import ManageUsersPage from "./views/manager/ManageUsersPage";
import ManagerHistoryPage from "./views/manager/ManagerHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <AppPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app/menu",
        element: <MenuPage />,
      },
      {
        path: "/app/cart",
        element: <CartPage />,
      },
      {
        path: "/app/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "/app/customer-history",
        element: <CustomerHistoryPage />,
      },
      {
        path: "/app/drone-quickview",
        element: <DroneQuickviewPage />,
      },
      {
        path: "/app/manage-drones",
        element: <ManageDronesPage />,
      },
      {
        path: "/app/drone-history",
        element: <DroneHistoryPage />,
      },
      {
        path: "/app/manager-quickview",
        element: <ManagerQuickviewPage />,
      },
      {
        path: "/app/manage-inventory",
        element: <ManageInventoryPage />,
      },
      {
        path: "/app/manage-users",
        element: <ManageUsersPage />,
      },
      {
        path: "/app/manager-history",
        element: <ManagerHistoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*Vecteezy said we need this. If we don't use their photos we can delete this*/}
    <a hidden href="https://www.vecteezy.com/free-photos">
      Free Stock photos by Vecteezy
    </a>
    <RouterProvider router={router} />
  </React.StrictMode>
);

{
  /*background image and formatting */
}
document.body.style.backgroundImage = `url(${background})`;
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundColor = "black";
