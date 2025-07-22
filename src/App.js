import './App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

//imports of pages

import {Login, Register} from './pages/auth';
import LandingPage from './pages/landing-pg';
import Dashboard from './pages/dashboard';
import Pomo from './pages/pomo';




//Function for main canvas(parent of all components)
function App() {
  const routes = createBrowserRouter([
    {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/pomo",
    element: <Pomo />,
  },
])

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
