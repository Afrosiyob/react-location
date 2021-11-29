import "./App.css";
import { Navigate, ReactLocation, Router } from "react-location";
import Auth from "./pages/auth/Auth";
import PageOne from "./pages/admin/pageOne/PageOne";
import PageTwo from "./pages/admin/pageTwo/PageTwo";
import Admin from "./pages/admin/Admin";

function App() {
  // Set up a ReactLocation instance
  const location = new ReactLocation();

  const accessToken = localStorage.getItem("accessToken");

  return (
    <Router
      location={location}
      routes={[
        {
          path: "/",
          element: <Navigate to="/admin" replace={true} />,
        },
        {
          path: "admin",
          element: accessToken ? (
            <Admin />
          ) : (
            <Navigate to="/auth" replace={true} />
          ),
          children: [
            {
              path: "/",
              element: <Navigate to="/admin/page-one" replace={true} />,
            },
            {
              path: "page-one",
              element: <PageOne />,
            },
            {
              path: "page-two",
              element: <PageTwo />,
            },
            {
              path: "*",
              element: <Navigate to="/admin/page-one" replace={true} />,
            },
          ],
        },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "*",
          element: <Navigate to="/admin" replace={true} />,
        },
      ]}
    />
  );
}

export default App;
