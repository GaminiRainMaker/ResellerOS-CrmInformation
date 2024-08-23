/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteFormula,
  getAllFormulas,
  getFormulaByFormula,
  insertFormula,
} from '../actions/formulas';

type FormulaState = {
  loading: boolean;
  error: string | null;
  data: any;
  formula: any;
};
const initialState: FormulaState = {
  loading: false,
  error: null,
  data: [],
  formula: [],
};

const formulaSlice = createSlice({
  name: 'formula',
  initialState,
  reducers: {
    setformula: (state, action) => {
      state.formula = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertFormula.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertFormula.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = [action.payload];
      })
      .addCase(insertFormula.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllFormulas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllFormulas.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getAllFormulas.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFormula.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFormula.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteFormula.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFormulaByFormula.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFormulaByFormula.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getFormulaByFormula.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setformula} = formulaSlice.actions;
export default formulaSlice?.reducer;
