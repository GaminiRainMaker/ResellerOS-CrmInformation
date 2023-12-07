import styled from '@emotion/styled';
import {DatePicker} from '../antd/DatePicker';

export const StyledDatePicker = styled(DatePicker)`
  &.ant-picker {
    border-radius: 12px;
    height: 48px;
    width: 201px;
    padding: 12px;
    align-item: center;
    gap: var(--Corners, 8px);
    border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  }
  &.ant-picker-input {
    color: red !important;
  }
`;
