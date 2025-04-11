import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DefaultLayout from './layout/DefaultLayout';
import BoardsPage from './pages/boards/BoardsPage';
import IssuesPage from './pages/issues/IssuesPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import '@ant-design/v5-patch-for-react-19';

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
      {
        path: '/board/:id',
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  </StrictMode>
);
