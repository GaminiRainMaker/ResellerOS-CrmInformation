/* eslint-disable prettier/prettier */
import {SpinSize} from 'antd/es/spin';

export interface SpinProps {
  children?: React.ReactNode;
  loading: boolean;
  tip?: string | null;
  size?: SpinSize;
}
