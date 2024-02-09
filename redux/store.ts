/* eslint-disable import/no-extraneous-dependencies */
import {Action, AnyAction, configureStore} from '@reduxjs/toolkit';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import address from './slices/address';
import billingContact from './slices/billingAddress';
import bundle from './slices/bundle';
import contract from './slices/contract';
import contractProduct from './slices/contractProduct';
import contractSetting from './slices/contractSetting';
import customer from './slices/customer';
import dealReg from './slices/dealReg';
import dealRegAddress from './slices/dealRegAddress';
import gereralSetting from './slices/gereralSetting';
import Opportunity from './slices/opportunity';
import partner from './slices/partner';
import product from './slices/product';
import profitability from './slices/profitability';
import quote from './slices/quote';
import quoteLineItem from './slices/quotelineitem';
import rebate from './slices/rebate';
import rebateQuoteLineItem from './slices/rebateQuoteLineItem';
import syncTable from './slices/syncTable';
import tableColumn from './slices/tabelColumn';
import user from './slices/user';
import validation from './slices/validation';

// Configure redux store
const store = configureStore({
  reducer: {
    quote,
    quoteLineItem,
    user,
    product,
    bundle,
    profitability,
    rebateQuoteLineItem,
    rebate,
    contract,
    contractProduct,
    validation,
    address,
    customer,
    billingContact,
    Opportunity,
    tableColumn,
    gereralSetting,
    contractSetting,
    syncTable,
    dealReg,
    dealRegAddress,
    partner,
  },
  middleware: [thunk],
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppDispatch, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
