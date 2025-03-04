import {FC} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import {OsSelectProps} from './os-select.interface';
import {SearchSelectStyle} from './styled-components';

const SearchSelect: FC<OsSelectProps> = ({children, value, ...rest}) => {
  const [token] = useThemeToken();
  return (
    <SearchSelectStyle
      {...rest}
      value={value}
      suffixIcon={false}
      dropdownStyle={{
        border: `1px solid ${token?.colorBorder}`,
        borderRadius: '12px',
      }}
    >
      {children}
    </SearchSelectStyle>
  );
};

export default SearchSelect;
