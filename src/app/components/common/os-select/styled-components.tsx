import styled from '@emotion/styled';
import {Select} from '../antd/Select';

export const SelectStyled = styled(Select)`
  min-width: 80px;
  height: 48px;
  & .ant-select-selector {
    border-radius: 12px;
    border: none !important;
  }
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  &.ant-select-selector {
    border: none !important;
  }
  &.ant-select-open {
    .rotate {
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(180deg);
    }
  }

  //   &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  //   .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder,
  //   .ant-select-selection-item {
  //     font-size: 16px !important;
  //     line-height: 20px !important;
  //     font-weight: 400;
  //     margin-top: 5px;
  //     cursor: pointer;
  //   }

  //   &.ant-select .ant-select-clear {
  //     top: ${(props) => (props.clearIcon ? '38%' : '50%')};
  //   }

  //   & .ant-select-selection-search-input {
  //     cursor: pointer !important;
  //   }
`;

export const SearchSelectStyle = styled(Select)`
  background: #edeff2;
  border: none;
  &.ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    background: none;
    border: none;
  }
  height: 52px;
  border-radius: 50px;
  &.ant-select-focused .ant-select-selector {
    box-shadow: none !important;
  }
`;
