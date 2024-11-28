import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {insertAttributeField} from '../actions/attributeField';

type CanvasState = {
  loading: boolean;
  error: string | null;
  data: any;
  isCanvas: boolean;
};
const initialState: CanvasState = {
  loading: false,
  isCanvas: false,
  error: null,
  data: {},
};

const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action) => {
      state.data = action.payload;
    },
    setIsCanvas: (state, action) => {
      state.isCanvas = action.payload;
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
      );
  },
});

export const {setCanvas, setIsCanvas} = CanvasSlice.actions;
export default CanvasSlice?.reducer;
