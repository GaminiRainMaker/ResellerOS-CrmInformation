import React, {forwardRef} from 'react';
import {InputProps} from '../antd/Input';
import {SearchInputStyled, SearchInputStyled2} from './styled-components';
import {OsSelectProps} from '../os-select/os-select.interface';

const SearchInput: React.FC<InputProps> = forwardRef((props, ref) => (
  <SearchInputStyled {...props} />
));
const SearchInput2: React.FC<OsSelectProps> = forwardRef((props, ref) => (
  <SearchInputStyled2 {...props} />
));

export {SearchInput, SearchInput2};
