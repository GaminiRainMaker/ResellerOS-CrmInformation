/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  insertAssignPartnerProgram,
  updateAssignPartnerProgramById,
  deleteAssignPartnerProgram,
  getAssignPartnerProgramByOrganization,
} from '../actions/assignPartnerProgram';

type AssignPartnerProgramState = {
  loading: boolean;
  error: string | null;
  data: any;
  assignPartnerProgram: any;
};
const initialState: AssignPartnerProgramState = {
  loading: false,
  error: null,
  data: [],
  assignPartnerProgram: [],
};

const assignPartnerProgramSlice = createSlice({
  name: 'assignPartnerProgramSlice',
  initialState,
  reducers: {
    setAssignPartnerProgramSlice: (state, action) => {
      state.assignPartnerProgram = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAssignPartnerProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertAssignPartnerProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertAssignPartnerProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteAssignPartnerProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAssignPartnerProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deleteAssignPartnerProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateAssignPartnerProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAssignPartnerProgramById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateAssignPartnerProgramById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAssignPartnerProgramByOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAssignPartnerProgramByOrganization.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAssignPartnerProgramByOrganization.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setAssignPartnerProgramSlice} = assignPartnerProgramSlice.actions;
export default assignPartnerProgramSlice?.reducer;
