import React, {FC} from 'react';
import D, {DatePickerProps, DatePickerType} from 'antd/es/date-picker';

export const DatePicker: FC<DatePickerProps> = React.memo((props) => (
  <D {...props} />
));
