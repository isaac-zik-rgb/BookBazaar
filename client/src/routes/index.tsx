import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from 'pages/Home';
import BookDetails from 'pages/BookDetails';

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
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
