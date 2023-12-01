import {FC} from 'react';
import {ButtonProps} from '../antd/Button';
import {ButtonStyled} from './styled-components';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  PRIMARY_LARGE = 'PRIMARY_LARGE',
  PRIMARY_SMALL = 'PRIMARY_SMALL',
}

interface ButtonInterface extends ButtonProps {
  buttontype?: ButtonType;
  text?: string;
}

const OsButton: FC<ButtonInterface> = (props) => (
  <ButtonStyled buttontype={ButtonType} {...props} />
);

export default OsButton;
