import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {osDatePickerProps} from './os-date-picker.interface';
import {StyledDatePicker} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const CommonDatePicker: FC<osDatePickerProps> = (props: any) => (
  <StyledDatePicker {...props} />
);
export default CommonDatePicker;
