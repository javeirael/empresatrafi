import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

import { useTranslation } from 'react-i18next'

const AuthPages = {
  SignInPage: lazy(() => import('src/pages/auth/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/sign-up')),
  ForgotPassword: lazy(() => import('src/pages/auth/forgot-password')),
  ResetPassword: lazy(() => import('src/pages/auth/reset-password')),
};

const auth = {
  path: '',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <AuthPages.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout >
            <AuthPages.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <AuthPages.ForgotPassword />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <AuthPages.ResetPassword />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [auth],
  },
];
