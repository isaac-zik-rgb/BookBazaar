import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from 'pages/Home';
import BookDetails from 'pages/BookDetails';
import DashboardLayout from 'layouts/DashboardLayout';
import BookManagement from 'pages/BookManagement';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/books/:id',
      element: <BookDetails />,
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: 'books-management',
          element: <BookManagement />,
        },
      ],
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
