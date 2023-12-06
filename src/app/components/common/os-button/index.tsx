import Image from 'next/image';
import {Avatar} from 'antd';
import {ButtonProps} from '../antd/Button';
import {ButtonStyled} from './styled-components';

interface ButtonInterface extends ButtonProps {
  buttontype: any;
  text?: string;
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
  type,
  buttontype = 'PRIMARY',
  commonIcon,
}) => {
  const buttonTypeTemp = {
    PRIMARY: 'PRIMARY',
    PRIMARY_LARGE: 'PRIMARY_LARGE',
    PRIMARY_SMALL: 'PRIMARY_SMALL',
    PRIMARY_ICON: 'PRIMARY_ICON',
  };

  return (
    <ButtonStyled
      // className={style[mainClassName]}
      disabled={disabled}
      onClick={clickHandler}
      style={btnStyle}
      buttontype={buttonTypeTemp[buttontype]}
    >
      {icon && (
        <Avatar icon={icon} shape="square" style={{background: 'none'}} />
      )}
      {commonIcon && (
        <Image src={commonIcon} height={40} width={40} alt="commonIcon" />
      )}
      {text}
    </ButtonStyled>
    // <ButtonStyled buttontype={ButtonType} {...props} />
  );
};

export default OsButton;
