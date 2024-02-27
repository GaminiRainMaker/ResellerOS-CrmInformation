import styled from '@emotion/styled';
import { Divider } from 'antd';
import { Col, Row } from '../antd/Grid';

export const RowStyledForForm = styled(Row)`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  padding: 12px;
  background: #ecf6fb;
  color: #3da5d9;
  border: 1px dashed #3da5d9;
  margin-top: 10px;
  font-size: 16px;
`;
export const SectionRowStyled = styled(Row)`
  padding: 16px;
  border: 0.5px;
  border-radius: 12px;
  background: white;
  margin-top: 10px;
`;
export const SectionColStyled = styled(Col)`
  width: 96px;
  height: 26px;
  border-radius: 50px;
  padding: 4px 12px 4px 12px;
  gap: 12px;
  background: #ecf2f5;
  display: flex;
  justify-content: center;
`;
export const SectionColStyledOPtions = styled(Col)`
  width: 96px;
  height: 26px;
  border-radius: 50px;
  padding: 4px 12px 4px 12px;
  gap: 12px;
  //   background: #ecf2f5;
  display: flex;
  justify-content: center;
`;
export const SectionColDivStyled = styled(Row)`
  width: auto;
  height: 18px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  border-radius: 32px;
`;
export const SectionDivStyled1 = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

export const SectionRowStyledInner = styled(Row)`
  background: #f6f7f8;
  padding: 10px;
  margintop: 30px;
  // display: 'flex',
  justify-content: center;
  width: 100%;
  margin: 15px 0px;
`;
export const SectionColStyledInner = styled(Col)`
  height: 40px;
  border-radius: 0px 0px 1px 0px;
  gap: 8px;
  padding: 8px 12px 8px 12px;
  background: #edeff2;
  width: 100%;
  color: #0d0d0d;
  display: flex;
  justify-content: center;
  border-left: 1px solid white;
`;
export const SectionColStyledInnerContent = styled(Col)`
  height: auto;
  border-radius: 0px 0px 1px 0px;
  gap: 8px;
  padding: 8px 12px 8px 12px;
  background: white;
  color: #0d0d0d;
  display: flex;
  justify-content: center;
  border: 1px solid rgb(242 242 242);
  width: 100%;
`;

export const SectionColStyledForTextCont = styled(Col)`
  width: 100px;
  height: 26px;
  border-radius: 50px;
  gap: 12px;
  background: #ecf2f5;
  display: flex;
  justify-content: center;
`;
export const SectionColStyledForTextContDIV = styled.div`
  width: 84px;
  height: 18px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  border-radius: 32px;
`;

export const StyledDivider = styled(Divider)`
  margin: 0px;
  border: 1px solid #c7cdd5;
`;
export const ToggleColStyled = styled(Col)`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
export const SiderDivStyled = styled.div`
  width: 20%;
  background: white;
`;
