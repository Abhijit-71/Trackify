import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthProvider from "./pages/authContext";
import { useAuth } from "./pages/authContext";
import { PublicRoute } from "./pages/authContext";
//imports of pages

import LandingPage from "./pages/landing-pg";
import Dashboard from "./pages/dashboard";
import Pomo from "./pages/pomo";
import { LoginForm } from "./components/loginform";
import Regform from "./components/regform";
import TaskPage from "./pages/task";

//Function for main canvas(parent of all components)
function App() {
  const PrivateRoute = () => {
    const { token } = useAuth();
    if (!token) return <Navigate to="/login" />;
    return <Outlet />;
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginForm />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Regform />
        </PublicRoute>
      ),
    },
    {
      path: "/tasks",
      element: (
        <PublicRoute>
          <TaskPage />
        </PublicRoute>
      ),
    },
    {
      path: "/pomo",
      element: <Pomo />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <div className="app">
        <RouterProvider router={routes} />
      </div>
    </AuthProvider>
  );
}

export default App;
