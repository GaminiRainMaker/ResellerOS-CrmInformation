/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteAttributeField,
  insertAttributeField,
  updateAttributeFieldById,
  queryAttributeField,
} from '../actions/attributeField';

type AttributeFieldState = {
  loading: boolean;
  error: string | null;
  data: any;
  attributeField: any;
  queryData: any;
};
const initialState: AttributeFieldState = {
  loading: false,
  error: null,
  data: [],
  attributeField: [],
  queryData: [],
};

const attributeFieldSlice = createSlice({
  name: 'attributeField',
  initialState,
  reducers: {
    setAttributeField: (state, action) => {
      state.attributeField = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAttributeField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAttributeField.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        insertAttributeField.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteAttributeField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttributeField.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteAttributeField.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateAttributeFieldById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttributeFieldById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateAttributeFieldById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(queryAttributeField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        queryAttributeField.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.queryData = action.payload;
        },
      )
      .addCase(
        queryAttributeField.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setAttributeField} = attributeFieldSlice.actions;
export default attributeFieldSlice?.reducer;
