import {Avatar} from 'antd';
import {ButtonProps} from '../antd/Button';
import {ButtonStyled} from './styled-components';

interface ButtonInterface extends ButtonProps {
  buttontype: string;
  text?: string;
  clickHandler?: () => void;
  disabled?: boolean;
  btnStyle?: any;
  icon?: any;
  commonIcon?: any;
  loading?: any;
  htmlType?: any;
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
  loading,
  htmlType,
}) => {
  const buttonTypeTemp: Record<string, string> = {
    PRIMARY: 'PRIMARY',
    PRIMARY_LARGE: 'PRIMARY_LARGE',
    PRIMARY_SMALL: 'PRIMARY_SMALL',
    PRIMARY_ICON: 'PRIMARY_ICON',
    PRIMARY_DISABLED: 'PRIMARY_DISABLED',
    SECONDARY: 'SECONDARY',
    SECONDARY_DISABLED: 'SECONDARY_DISABLED',
    BUILD_BUTTON: 'BUILD_BUTTON',
  };

  return (
    <ButtonStyled
      loading={loading}
      // className={style[mainClassName]}
      disabled={disabled}
      onClick={clickHandler}
      style={btnStyle}
      buttontype={buttonTypeTemp[buttontype]}
      htmlType={htmlType}
    >
      {icon && (
        <Avatar
          icon={icon}
          src={commonIcon}
          shape="square"
          style={{
            background: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      {/* {commonIcon && (
        <Image src={commonIcon} height={40} width={40} alt="commonIcon" />
      )} */}
      {text}
    </ButtonStyled>
  );
};

export default OsButton;
