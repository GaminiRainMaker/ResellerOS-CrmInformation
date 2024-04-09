/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deletePartnerProgram,
  deletePartnerProgramFormData,
  getAllPartnerProgram,
  getPartnerProgramById,
  insertPartnerProgram,
  updatePartnerProgramById,getUnassignedProgram
} from '../actions/partnerProgram';

type PartnerProgramState = {
  loading: boolean;
  error: string | null;
  data: any;
  partnerProgram: any;
};
const initialState: PartnerProgramState = {
  loading: false,
  error: null,
  data: [],
  partnerProgram: [],
};

const partnerProgramSlice = createSlice({
  name: 'partnerProgram',
  initialState,
  reducers: {
    setPartnerProgram: (state, action) => {
      state.partnerProgram = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertPartnerProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertPartnerProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertPartnerProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getAllPartnerProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPartnerProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getAllPartnerProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deletePartnerProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePartnerProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deletePartnerProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updatePartnerProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePartnerProgramById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updatePartnerProgramById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getPartnerProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPartnerProgramById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getPartnerProgramById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deletePartnerProgramFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePartnerProgramFormData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        deletePartnerProgramFormData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getUnassignedProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUnassignedProgram.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getUnassignedProgram.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setPartnerProgram} = partnerProgramSlice.actions;
export default partnerProgramSlice?.reducer;
