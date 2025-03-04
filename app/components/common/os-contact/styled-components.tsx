import styled from '@emotion/styled';
import PhoneInput from 'react-phone-number-input';

export const OsContactStyle = styled.div`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
  }
  width: 100%;
`;
export const OsPhoneInputStyle = styled(PhoneInput)`
  input {
    display: flex;
    height: 45px;
    padding: 12px;
    align-items: center;
    gap: var(--Corners, 8px);
    align-self: stretch;
    border-radius: 12px;
    border: none;
    width: 250px;
    :focus-visible {
      outline: none;
    }
  }
`;
