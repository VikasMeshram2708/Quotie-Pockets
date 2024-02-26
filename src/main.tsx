import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./page/About.tsx";
import NotFound from "./page/NotFound.tsx";
import Contact from "./page/Contact.tsx";
import Privacy from "./page/Privacy.tsx";
import Terms from "./page/Terms.tsx";
import Layout from "./page/Layout.tsx";
import Home from "./page/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "terms-of-use",
        element: <Terms />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
