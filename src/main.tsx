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
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./page/Dashboard.tsx";

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
    <Auth0Provider
      domain="bharatbuzzfeed.us.auth0.com"
      clientId="1EeiyGovbr84qD7Au60OW6h0yCYf7Mp4"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
