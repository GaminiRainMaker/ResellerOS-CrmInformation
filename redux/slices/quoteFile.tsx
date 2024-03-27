/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  UpdateQuoteFileById,
  deleteQuoteById,
  getAllQuoteFile,
  insertQuoteFile,
  getQuoteFileByQuoteId
} from '../actions/quoteFile';

type QuoteFileState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteFile: any;
};
const initialState: QuoteFileState = {
  loading: false,
  error: null,
  data: [],
  quoteFile: [],
};

const quoteFileSlice = createSlice({
  name: 'quoteFileSlice',
  initialState,
  reducers: {
    setQuoteFile: (state, action) => {
      state.quoteFile = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertQuoteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertQuoteFile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.data = action.payload;
        },
      )
      .addCase(
        insertQuoteFile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(UpdateQuoteFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UpdateQuoteFileById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        UpdateQuoteFileById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteQuoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuoteById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteQuoteById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllQuoteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllQuoteFile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllQuoteFile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteFileByQuoteId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteFileByQuoteId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getQuoteFileByQuoteId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuoteFile} = quoteFileSlice.actions;
export default quoteFileSlice?.reducer;
