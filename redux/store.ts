/* eslint-disable import/no-extraneous-dependencies */
import {Action, AnyAction, configureStore} from '@reduxjs/toolkit';
import {ThunkAction, ThunkDispatch, thunk} from 'redux-thunk';
import address from './slices/address';
import billingContact from './slices/billingAddress';

import contractProduct from './slices/contractProduct';
import customer from './slices/customer';

import Opportunity from './slices/opportunity';
import product from './slices/product';
import profitability from './slices/profitability';
import tableColumn from './slices/tabelColumn';
import user from './slices/user';
import validation from './slices/validation';
import auth from './slices/auth';
import cacheFLow from './slices/cacheFLow';
import notification from './slices/notificatios';

import license from './slices/license';
import canvas from './slices/canvas';
// Configure redux store
const store = configureStore({
  reducer: {

    user,
    product,
    profitability,
    contractProduct,
    validation,
    address,
    customer,
    billingContact,
    Opportunity,
    tableColumn,
    canvas,
    auth,
    notification,
    cacheFLow,
  
    license,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
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
