import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import "./fonts/AerologicaRegular-K7day.ttf";

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
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
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
            path: "menu",
            element: <MenuPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "confirmation",
            element: <ConfirmationPage />,
          },
          {
            path: "customer-history",
            element: <CustomerHistoryPage />,
          },
          {
            path: "drone-quickview",
            element: <DroneQuickviewPage />,
          },
          {
            path: "manage-drones",
            element: <ManageDronesPage />,
          },
          {
            path: "drone-history",
            element: <DroneHistoryPage />,
          },
          {
            path: "manager-quickview",
            element: <ManagerQuickviewPage />,
          },
          {
            path: "manage-inventory",
            element: <ManageInventoryPage />,
          },
          {
            path: "manage-users",
            element: <ManageUsersPage />,
          },
          {
            path: "manager-history",
            element: <ManagerHistoryPage />,
          },
        ],
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff188b",
      contrastText: "white",
    },
    secondary: {
      main: "#fc7303",
      contrastText: "white",
    },
    background: {
      default: "#2f005a",
      paper: "rgba(97, 29, 159, 0.65)",
    },
    divider: "rgba(0,169,255,0.39)",
    error: {
      main: "#c11212",
    },
    info: {
      main: "#00d9ff",
    },
    success: {
      main: "#27b12d",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*Vecteezy said we need this. If we don't use their photos we can delete this*/}
    <a hidden href="https://www.vecteezy.com/free-photos">
      Free Stock photos by Vecteezy
    </a>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
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
