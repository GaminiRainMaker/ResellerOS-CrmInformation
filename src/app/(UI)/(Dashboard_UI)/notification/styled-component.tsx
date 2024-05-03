import {Row} from '@/app/components/common/antd/Grid';
import styled from '@emotion/styled';

export const CustomNotificationCard = styled(Row)<{isRead?: boolean}>`
  width: 100%;
  height: Hug (82px) px;
  gap: 0px;
  border-radius: 12px;
  border: 0px 0px 1px 0px;
  background: ${(props) => (props.isRead ? '#ffffff' : '#e9f0f7')};
  padding: 18px;
  cursor: pointer;
  :hover {
    background: #e9f0f7;
  }
`;

export const CustomNotificationWrapper = styled.div`
  padding: 18px 0px 0px 0px;
  display: flex;
  gap: 10px;
  opacity: 0px;
`;
