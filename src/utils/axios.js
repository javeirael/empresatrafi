import axios from 'axios';

import { CONFIG } from 'src/config-global';

const axiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
  headers: {
    'Accept-Language': 'en',
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    const accessToken = sessionStorage.getItem('jwt_access_token');

    if (accessToken) {
      config.headers.setAuthorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  accounts: {
    root: '/api/accounts',
  },
  tours: {
    list: '/api/excursions',
    details: `/api/excursions`,
  },
  destinations: {
    list: '/api/destinations',
  },
  categories: {
    list: '/api/categories',
  },
};
