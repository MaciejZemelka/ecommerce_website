// store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { access, stat } from 'fs';

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { Email: string; Password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7084/api/Registration/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.message === 'No user') {
          return rejectWithValue('Wrong Email');
        } else if (errorResponse.message === 'Wrong password') {
          return rejectWithValue('Wrong Password');
        } else {
          return rejectWithValue('Login failed');
        }
      }


        const data = await response.json();
        return {  
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };

    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const newAccessToken = createAsyncThunk(
  'auth/newAccessToken',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    try {
      const response = await fetch('https://localhost:7084/api/Registration/new-Access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: auth.refreshToken }),
      });

      if (!response.ok) {
        dispatch(logout());
        return rejectWithValue('Token refresh failed');
      }

      const data = await response.json();
      return {
        accessToken: data.accessToken,
      };
    } catch (error) {
      return rejectWithValue('Network error during token refresh');
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresAt = null;
      localStorage.removeItem('user'); // removing data from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
    },
    saveTokens : (state, action) => {
        state.accessToken = action.payload.accessToken;
        const expiresAt = Date.now() + 3600 * 1000;
        state.expiresAt = expiresAt;
 
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        alert(loginUser);
        state.loading = false;
        state.user = "user";
        state.error = null;

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        const expiresAt = Date.now() + 3600 * 1000;
        state.expiresAt = expiresAt;
        localStorage.setItem('user', state.user);
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(newAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(newAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        const expiresAt = Date.now() + 3600 * 1000; 
        state.expiresAt = expiresAt;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('expiresAt', expiresAt.toString());
      })
      .addCase(newAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, saveTokens} = authSlice.actions;
export default authSlice.reducer;