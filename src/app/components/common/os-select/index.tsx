import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {OsSelectProps} from './os-select.interface';
import {SelectStyled} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const CommonSelect: FC<OsSelectProps> = ({
  suffixIcon,
  children,
  value,

  ...rest
}) => {
  const [token] = useThemeToken();
  return (
    <SelectStyled
      {...rest}
      value={value}
      suffixIcon={
        suffixIcon ?? (
          <ChevronDownIcon width={24} color={token?.colorInfoBorder} />
        )
      }
      dropdownStyle={{
        border: `1px solid ${token?.colorBorder}`,
        borderRadius: '12px',
      }}
    >
      {children}
    </SelectStyled>
  );
};
export default CommonSelect;
