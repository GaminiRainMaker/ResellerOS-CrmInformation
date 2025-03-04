import React, {forwardRef} from 'react';
import {InputProps} from '../antd/Input';
import {SearchInputStyled} from './styled-components';

const SearchInput: React.FC<InputProps> = forwardRef((props, ref) => (
  <SearchInputStyled {...props} />
));

export default SearchInput;
