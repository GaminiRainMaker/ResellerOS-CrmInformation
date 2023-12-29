/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertBundle,
  getAllBundle,
  updateBundleQuantity,
} from '../actions/bundle';

type BundleState = {
  loading: boolean;
  error: string | null;
  data: any;
  bundle: any;
};

const initialState: BundleState = {
  loading: false,
  error: null,
  data: [],
  bundle: [],
};

const bundleSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {
    setBundle: (state, action) => {
      state.bundle = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBundle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertBundle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBundle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBundle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBundle.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBundleQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateBundleQuantity.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateBundleQuantity.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setBundle} = bundleSlice.actions;
export default bundleSlice?.reducer;
