/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {uploadToAws, uploadToAwsForUserImage} from '../actions/upload';

type UploadState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
};
const initialState: UploadState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadAws: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadToAws.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadToAws.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(uploadToAws.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadToAwsForUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadToAwsForUserImage.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        uploadToAwsForUserImage.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setUploadAws} = uploadSlice.actions;
export default uploadSlice?.reducer;
