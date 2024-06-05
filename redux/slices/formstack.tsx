import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getAllDocuments,
  getDocumentById
} from '../actions/formstack';

type formStackState = {
  loading: boolean;
  error: string | null;
  data: any;
  formstack: any;
};

const initialState: formStackState = {
  loading: false,
  error: null,
  data: [],
  formstack: {},
};

const formstackSlice = createSlice({
  name: 'formstack',
  initialState,
  reducers: {
    setFormstack: (state, action) => {
      state.formstack = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDocuments.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload?.success;
        },
      )
      .addCase(
        getAllDocuments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDocumentById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload?.success;
        },
      )
      .addCase(
        getDocumentById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setFormstack} = formstackSlice.actions;
export default formstackSlice?.reducer;
