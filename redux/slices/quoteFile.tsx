/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  UpdateQuoteFileById,
  deleteQuoteFileById,
  getAllQuoteFile,
  insertQuoteFile,
  getQuoteFileByQuoteId,
  getQuoteFileById,
  quoteFileVerification,
  updateFileForQuoteJson,
  queryQuoteFile,
  getQuoteFileByQuoteIdAll,
  getQuoteFileCount,
} from '../actions/quoteFile';

type QuoteFileState = {
  loading: boolean;
  error: string | null;
  data: any;
  quoteFile: any;
  quoteFileById: any;
};
const initialState: QuoteFileState = {
  loading: false,
  error: null,
  data: [],
  quoteFile: [],
  quoteFileById: [],
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
      .addCase(deleteQuoteFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuoteFileById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteQuoteFileById.rejected,
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
      )
      .addCase(getQuoteFileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteFileById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.quoteFileById = action.payload;
        },
      )
      .addCase(
        getQuoteFileById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateFileForQuoteJson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFileForQuoteJson.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.quoteFileById = action.payload;
        },
      )
      .addCase(
        updateFileForQuoteJson.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(quoteFileVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        quoteFileVerification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.quoteFileById = action.payload;
        },
      )
      .addCase(
        quoteFileVerification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryQuoteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryQuoteFile.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(queryQuoteFile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuoteFileByQuoteIdAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteFileByQuoteIdAll.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getQuoteFileByQuoteIdAll.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getQuoteFileCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getQuoteFileCount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getQuoteFileCount.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setQuoteFile} = quoteFileSlice.actions;
export default quoteFileSlice?.reducer;
