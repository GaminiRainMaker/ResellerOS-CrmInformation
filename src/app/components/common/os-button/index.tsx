import Image from 'next/image';
import {ButtonProps} from '../antd/Button';
import {ButtonStyled} from './styled-components';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  PRIMARY_LARGE = 'PRIMARY_LARGE',
  PRIMARY_SMALL = 'PRIMARY_SMALL',
}

interface ButtonInterface extends ButtonProps {
  buttontype?: ButtonType;
  text: string;
  clickHandler?: () => void;
  disabled?: boolean;
  btnStyle?: any;
  icon?: any;
  commonIcon?: any;
}

const OsButton: React.FC<ButtonInterface> = ({
  text,
  clickHandler,
  disabled,
  btnStyle,
  icon,
  commonIcon,
}) => (
  <ButtonStyled
    // className={style[mainClassName]}
    disabled={disabled}
    onClick={clickHandler}
    style={btnStyle}
  >
    {icon && <Image src={icon} alt="img" />}
    {commonIcon && <Image src={commonIcon} alt="commonIcon" />}
    {text}
  </ButtonStyled>
  // <ButtonStyled buttontype={ButtonType} {...props} />
);

export default OsButton;
