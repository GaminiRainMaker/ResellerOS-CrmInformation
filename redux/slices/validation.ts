/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  getAllValidation,
  insertValidation,
  updateValidationById,
} from '../actions/validation';

type ValidationState = {
  loading: boolean;
  error: string | null;
  data: any;
  validation: any;
};
const initialState: ValidationState = {
  loading: false,
  error: null,
  data: [],
  validation: [],
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setValidation: (state, action) => {
      state.validation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertValidation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertValidation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertValidation.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllValidation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllValidation.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllValidation.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateValidationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateValidationById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateValidationById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setValidation} = validationSlice.actions;
export default validationSlice?.reducer;
