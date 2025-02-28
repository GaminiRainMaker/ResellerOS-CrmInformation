/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {insertOpportunityLineItem} from '../actions/opportunityLineItem';

type OpportunityLineItemState = {
  loading: boolean;
  error: string | null;
  data: any;
  product: any;
  filteredData: any;
  deletedCount?: any;
};
const initialState: OpportunityLineItemState = {
  loading: false,
  error: null,
  data: [],
  product: [],
  filteredData: [],
  deletedCount: null,
};

const opportunityLineItemSlice = createSlice({
  name: 'opportunityLineItem',
  initialState,
  reducers: {
    setOpportunityLineItem: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertOpportunityLineItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        insertOpportunityLineItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = [action.payload];
        },
      )
      .addCase(
        insertOpportunityLineItem.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const {setOpportunityLineItem} = opportunityLineItemSlice.actions;
export default opportunityLineItemSlice?.reducer;
