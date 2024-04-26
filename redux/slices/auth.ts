/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {sendForgotPasswordEmail, sendNewUserEmail, signUpAuth, verifyAuth} from '../actions/auth';

type AuthState = {
  loading: boolean;
  error: string | null;
  data: any;
  address: any;
};
const initialState: AuthState = {
  loading: false,
  error: null,
  data: [],
  address: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.address = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(signUpAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendNewUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendNewUserEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendNewUserEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendForgotPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendForgotPasswordEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendForgotPasswordEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setAuth} = authSlice.actions;
export default authSlice?.reducer;
