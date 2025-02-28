import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  deleteMappedOptionss,
  getALlMappedOptions,
  getMappedOptionsBYId,
  insertMappedOptions,
  updateMappedOptions,
} from '../actions/mappedOptions';

type MappedOptions = {
  loading: boolean;
  error: string | null;
  data: any;
  MappedOptions: any;
};

const initialState: MappedOptions = {
  loading: false,
  error: null,
  data: [],
  MappedOptions: {},
};

const MappedOptionsSlice = createSlice({
  name: 'MappedOptions',
  initialState,
  reducers: {
    setMappedOptions: (state, action) => {
      state.MappedOptions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertMappedOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertMappedOptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.MappedOptions = action.payload;
        },
      )
      .addCase(
        insertMappedOptions.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getMappedOptionsBYId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getMappedOptionsBYId.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.MappedOptions = action.payload;
        },
      )
      .addCase(
        getMappedOptionsBYId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(deleteMappedOptionss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteMappedOptionss.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.MappedOptions = action.payload;
        },
      )
      .addCase(
        deleteMappedOptionss.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(updateMappedOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateMappedOptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.MappedOptions = action.payload;
        },
      )
      .addCase(
        updateMappedOptions.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )
      .addCase(getALlMappedOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getALlMappedOptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.MappedOptions = action.payload;
        },
      )
      .addCase(
        getALlMappedOptions.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setMappedOptions} = MappedOptionsSlice.actions;
export default MappedOptionsSlice?.reducer;
