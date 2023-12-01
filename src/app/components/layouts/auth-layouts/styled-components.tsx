import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme/interface';
import {Space} from '../../common/Space';
import {Checkbox} from '../../common/antd/Checkbox';

export const ContentSectionWrapper = styled(Space)`
  width: 458px;
  .ant-space-item {
    display: flex;
    justify-content: center;
  }

  .ant-form-vertical .ant-form-item-label {
    padding: 0px 0px 4px 0px;
  }
`;
export const CustomCheckbox = styled(Checkbox)<{token: GlobalToken}>`
  .ant-checkbox-inner {
    border-color: ${({token}) => token.colorPrimary};
    height: 19px;
    width: 19px;
  }
  &.ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }
`;
