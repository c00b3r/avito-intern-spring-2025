import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DefaultLayout from './layout/DefaultLayout';
import BoardsPage from './pages/boards/BoardsPage';
import IssuesPage from './pages/issues/IssuesPage';

const route = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '/boards',
        element: <BoardsPage />,
      },
      {
        path: '/issues',
        element: <IssuesPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
