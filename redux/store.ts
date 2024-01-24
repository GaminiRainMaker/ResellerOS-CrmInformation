/* eslint-disable import/no-extraneous-dependencies */
import {Action, AnyAction, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import quote from './slices/quote';
import quoteLineItem from './slices/quotelineitem';
import user from './slices/user';
import product from './slices/product';
import bundle from './slices/bundle';
import profitability from './slices/profitability';
import rebateQuoteLineItem from './slices/rebateQuoteLineItem';
import rebate from './slices/rebate';
import contract from './slices/contract';
import validation from './slices/validation';
import contractProduct from './slices/contractProduct';
import address from './slices/address';
import customer from './slices/customer';
import billingContact from './slices/billingAddress';
import Opportunity from './slices/opportunity';
import tableColumn from './slices/tabelColumn';
import gereralSetting from './slices/gereralSetting';
import contractSetting from './slices/contractSetting';
import syncTable from './slices/syncTable';
import dealReg from './slices/dealReg';
import dealRegAddress from './slices/dealRegAddress';

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
  },
  middleware: [thunk, logger],
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
