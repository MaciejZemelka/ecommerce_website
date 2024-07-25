// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return {
      auth: {
        user: user ? user : null,
        loading: false,
        error: null,
      }
    };
  }
  return {
    auth: {
      user: null,
      loading: false,
      error: null,
    }
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
