/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';


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
  // extraReducers(builder) {
  //   builder
  //     .addCase(uploadToAws.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(uploadToAws.fulfilled, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.data = [action.payload];
  //     })
  //     .addCase(uploadToAws.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(uploadToAwsForUserImage.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       uploadToAwsForUserImage.fulfilled,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.data = [action.payload];
  //       },
  //     )
  //     .addCase(
  //       uploadToAwsForUserImage.rejected,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       },
  //     )
  //     .addCase(uploadExcelFileToAws.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       uploadExcelFileToAws.fulfilled,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.data = [action.payload];
  //       },
  //     )
  //     .addCase(
  //       uploadExcelFileToAws.rejected,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       },
  //     )
  //     .addCase(uploalImageonAzure.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       uploalImageonAzure.fulfilled,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.data = [action.payload];
  //       },
  //     )
  //     .addCase(
  //       uploalImageonAzure.rejected,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       },
  //     )
  //     .addCase(uploadDocumentOnAzure.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       uploadDocumentOnAzure.fulfilled,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.data = [action.payload];
  //       },
  //     )
  //     .addCase(
  //       uploadDocumentOnAzure.rejected,
  //       (state, action: PayloadAction<any>) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       },
  //     );
  // },
});

export const {setUploadAws} = uploadSlice.actions;
export default uploadSlice?.reducer;
