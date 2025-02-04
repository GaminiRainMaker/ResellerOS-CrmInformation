/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {assignLicense, getLicense, revokeLicense} from '../actions/license';

type LicenseState = {
  loading: boolean;
  error: string | null;
  data: any;
  license: any;
};
const initialState: LicenseState = {
  loading: false,
  error: null,
  data: [],
  license: [],
};

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicense: (state, action) => {
      state.license = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(assignLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignLicense.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.data = [action.payload];
      })
      .addCase(assignLicense.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(revokeLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revokeLicense.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(revokeLicense.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLicense.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(getLicense.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setLicense} = licenseSlice.actions;
export default licenseSlice?.reducer;
