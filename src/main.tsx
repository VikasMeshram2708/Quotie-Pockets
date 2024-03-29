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
import Quotie from "./page/Quotie.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SignIn from "./page/SignIn.tsx";
import SignUp from "./page/SignUp.tsx";
import Dashboard from "./page/Dashboard.tsx";
import UserState from "./context/UserState.tsx";

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
        path: "/quotie",
        element: (
          <ProtectedRoute>
            <Quotie />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
    <UserState>
      <RouterProvider router={router} />
    </UserState>
  </React.StrictMode>
);
