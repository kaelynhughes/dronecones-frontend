import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import TestPage0 from "./views/test/TestPage0";
import TestPage1 from "./views/test/TestPage1";

import background from "./assets/vecteezy_retro-style-80s-sci-fi-background.jpg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TestPage0 />,
  },
  {
    path: "test1",
    element: <TestPage1 />,
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
