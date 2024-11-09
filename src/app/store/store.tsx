// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresAt = localStorage.getItem('expiresAt');

    return {
      auth: {
        user: user ? user : null, 
        loading: false,
        error: null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        expiresAt: expiresAt ? parseInt(expiresAt, 10) : null, 
      },
    };
  }
 
  return {
    auth: {
      user: null,
      loading: false,
      error: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    },
  };
};

const preloadedState = getInitialState();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
