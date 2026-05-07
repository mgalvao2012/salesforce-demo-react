import type { RouteObject } from 'react-router';
import AppLayout from '@/appLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { showInNavigation: true, label: 'Home' },
      },
      {
        path: 'chat',
        element: <Chat />,
        handle: { showInNavigation: true, label: 'Chat' },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
