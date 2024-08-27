import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home/home'));
// Tours
const ToursPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TransfersPage = lazy(() => import('src/pages/dashboard/transfers/transfers'));
// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'tours',
        children: [
          {
            index: true,
            element: <ToursPage />,
          },
          { path: 'list/:destinyId?', element: <ToursPage /> },
          { path: 'detail/:id', element: <TourDetailsPage /> },
        ],
      },
      { path: 'transfers', element: <TransfersPage /> },
    ],
  },
];
