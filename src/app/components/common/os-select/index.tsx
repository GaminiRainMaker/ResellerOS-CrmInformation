import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {OsSelectProps} from './os-select.interface';
import {SelectStyled} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const CommonSelect: FC<OsSelectProps> = ({suffixIcon, children, ...rest}) => {
  const [token] = useThemeToken();
  return (
    <SelectStyled
      {...rest}
      suffixIcon={
        suffixIcon ?? (
          <ChevronDownIcon width={24} color={token?.colorInfoBorder} />
        )
      }
    >
      {children}
    </SelectStyled>
  );
};
export default CommonSelect;
