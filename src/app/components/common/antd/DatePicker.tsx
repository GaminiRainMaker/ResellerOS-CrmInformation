import {FC} from 'react';
import D, {DatePickerProps} from 'antd/es/date-picker';
export const DatePicker: FC<DatePickerProps> = (props) => <D {...props} />;
export type {DatePickerProps};
