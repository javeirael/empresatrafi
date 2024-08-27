const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    tours: {
      root: (destinyId) => `${ROOTS.DASHBOARD}/tours/list/${destinyId}`,
      details: (id) => `${ROOTS.DASHBOARD}/tours/detail/${id}`,
    },
    transfers: `${ROOTS.DASHBOARD}/transfers`,
  },
};
