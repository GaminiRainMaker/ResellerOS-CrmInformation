/* eslint-disable import/no-extraneous-dependencies */

'use client';

import {ReactNode, Suspense} from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store';

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>{props?.children}</Provider>
  </Suspense>
);

export default Providers;
