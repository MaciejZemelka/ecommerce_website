// store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { Email: string; Password: string }) => {
    const response = await fetch('https://localhost:7084/api/Registration/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.text();
    if (data !== 'Valid User') {
      throw new Error('Invalid credentials');
      
    }
    if(data === 'Valid User'){
    }
    return credentials.Email;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('user'); // Usuń dane z localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', action.payload);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
