import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import apiReducer from './apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;