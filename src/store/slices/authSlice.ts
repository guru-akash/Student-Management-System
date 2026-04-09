/**
 * Auth Slice - Manages user authentication state.
 * Currently supports a simple local-first registration and login flow.
 * Note: Since there is no backend, credentials are stored in the memory-only Redux state.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminUser {
  name: string;
  email: string;
}

interface AuthState {
  registeredUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  registeredUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Stores the user profile without immediate authentication.
    registerUser(state, action: PayloadAction<AdminUser>) {
      state.loading = true;
      state.error = null;
      state.registeredUser = action.payload; 
      state.isAuthenticated = false; 
      state.loading = false;
    },
    // Validates credentials against the registered user in state.
    loginUser(state, action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true;
      state.error = null;
      
      if (
        state.registeredUser &&
        state.registeredUser.email === action.payload.email
      ) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid email or password';
      }
      state.loading = false;
    },
    // Resets the authentication status.
    logoutUser(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;