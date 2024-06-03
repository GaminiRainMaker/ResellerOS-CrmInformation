/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllFormStack,
  getFormStackByDocId,
  insertFormStack,
} from '../actions/formStackSync';

type FormStackState = {
  loading: boolean;
  error: string | null;
  data: any;
  formStack: any;
};
const initialState: FormStackState = {
  loading: false,
  error: null,
  data: [],
  formStack: [],
};

const formStackSlice = createSlice({
  name: 'formStack',
  initialState,
  reducers: {
    setFormStack: (state, action) => {
      state.formStack = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertFormStack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertFormStack.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        insertFormStack.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllFormStack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllFormStack.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllFormStack.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getFormStackByDocId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFormStackByDocId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getFormStackByDocId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setFormStack} = formStackSlice.actions;
export default formStackSlice?.reducer;
