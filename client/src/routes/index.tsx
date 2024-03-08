import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import BookDetails from 'pages/BookDetails';
import DashboardLayout from 'layouts/DashboardLayout';
import BookManagement from 'pages/BookManagement';
import { AuthProvider } from 'contexts';
import useAuth from 'hooks/useAuth';
import Trades from 'pages/Trades';
import Conversations from 'pages/Conversations';

function Router() {
  useAuth();
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

        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'Trades',
          element: <Trades />,
        },
        {
          path: 'Conversations',
          element: <Conversations />,
        }
      ],
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <AuthProvider>
      {' '}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default Router;
