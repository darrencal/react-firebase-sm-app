import { createBrowserRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/layout';
import Dashboard from './components/dashboard';

export const ROOT = '/';
export const DASHBOARD = '/dashboard';
export const LOGIN = '/login';
export const REGISTER = '/register';

export const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
]);
