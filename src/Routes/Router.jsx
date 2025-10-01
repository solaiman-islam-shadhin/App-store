import { createBrowserRouter } from "react-router";
import { Root } from "../Root/Root";
import { Home } from "../components/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AppDetails } from "../pages/AppDetails";
import { Apps } from "../pages/Apps";
import { NotFound } from "../pages/NotFound";
import { MyProfile } from "../pages/MyProfile";
import { PrivateRoute } from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/apps",
        element: <Apps />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/MyProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        )
      },
      {
        path: "/app/:id",
        element: (
          <PrivateRoute>
            <AppDetails />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;