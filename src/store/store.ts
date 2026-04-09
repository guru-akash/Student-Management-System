/**
 * Central Redux Store.
 * Configures the global state by combining various slices:
 * - auth: Handles user login status and credentials.
 * - students: Manages the collection of student records.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import studentsReducer from './slices/studentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
