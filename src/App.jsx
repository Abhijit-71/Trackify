import './App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

//imports of pages

import LandingPage from './pages/landing-pg';
import Dashboard from './pages/dashboard';
import Pomo from './pages/pomo';
import { LoginForm } from './components/loginform';
import Regform from './components/regform';


//Function for main canvas(parent of all components)
function App() {
  const routes = createBrowserRouter([
    {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <Regform />,
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
