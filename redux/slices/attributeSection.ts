/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertAttributeSection,
  getAllAttributeSection,
  deleteAttributeSection,
  updateAttributeSectionById,
} from '../actions/attributeSection';

type AttributeSectionState = {
  loading: boolean;
  error: string | null;
  data: any;
  attributeSection: any;
};
const initialState: AttributeSectionState = {
  loading: false,
  error: null,
  data: [],
  attributeSection: [],
};

const attributeSectionSlice = createSlice({
  name: 'attributeSection',
  initialState,
  reducers: {
    setAttributeSection: (state, action) => {
      state.attributeSection = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAttributeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAttributeSection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertAttributeSection.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteAttributeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttributeSection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteAttributeSection.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateAttributeSectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttributeSectionById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateAttributeSectionById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllAttributeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAttributeSection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllAttributeSection.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setAttributeSection} = attributeSectionSlice.actions;
export default attributeSectionSlice?.reducer;
