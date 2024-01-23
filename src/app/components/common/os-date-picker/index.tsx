import {FC} from 'react';
import {CalendarDaysIcon} from '@heroicons/react/24/outline';
import {DatePickerProps} from '../antd/DatePicker';
import {StyledDatePicker} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const CommonDatePicker: FC<DatePickerProps> = (props) => {
  const [token] = useThemeToken();
  return (
    <StyledDatePicker
      {...props}
      suffixIcon={
        <CalendarDaysIcon width={24} color={token?.colorInfoBorder} />
      }
      format="MM/DD/YYYY"
      placeholder="MM/DD/YYYY"
    />
  );
};
export default CommonDatePicker;
