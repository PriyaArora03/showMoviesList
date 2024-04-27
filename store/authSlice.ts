import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
    console.log("came inside success")
      state.isLoggedIn = true;
      state.token = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
    console.log("came inside failure")
      state.isLoggedIn = false;
      state.token = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;