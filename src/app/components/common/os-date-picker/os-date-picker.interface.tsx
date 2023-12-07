import {DatePickerProps} from 'antd/es/date-picker';
import {ReactNode} from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type osDatePickerProps = DatePickerProps & {
  bordered?: boolean;
  allowClear?: boolean;
};
