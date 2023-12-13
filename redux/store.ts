/* eslint-disable import/no-extraneous-dependencies */
import {Action, AnyAction, configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import quote from './slices/quote';
import quoteLineItem from './slices/quotelineitem';
import user from './slices/user';
import product from './slices/product';
import bundle from './slices/bundle';

// Configure redux store
const store = configureStore({
  reducer: {quote, quoteLineItem, user, product, bundle},
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
