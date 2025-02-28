import {SelectProps} from 'antd/es/select';
import {ReactNode} from 'react';

export type OsSelectProps = SelectProps & {
  prefixIcon?: ReactNode;
  inset?: boolean;
  clearIconPostion?: number;
  value?: any;
};
