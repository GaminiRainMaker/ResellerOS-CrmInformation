import {FC} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {OSModalPropsInterface} from './os-modal.interface';
import {OSModalStyle} from './styled-components';

const OsModal: FC<OSModalPropsInterface> = ({
  styleFooter = true,
  title,
  subTitle,
  body,
  primaryButtonText,
  secondaryButtonText,
  titleTypography,
  subTitleTypography,
  subtitleColor,
  titleColor,
  ...rest
}) => {
  const {onCancel, afterClose, open, onOk} = rest;
  const [token] = useThemeToken();

  return (
    <OSModalStyle
      {...rest}
      styleFooter={styleFooter}
      title=""
      destroyOnClose
      width={rest?.width ?? 600}
      open={open}
      onCancel={(e) => {
        // onCancel && onCancel(e);
        // afterClose && afterClose();
      }}
      onOk={(e) => {
        // onOk && onOk(e);
      }}
      okText={
        <Typography
          cursor="pointer"
          name="Button 1"
          //   color={token.colorBgContainer}
        >
          {primaryButtonText}
        </Typography>
      }
      cancelText={
        <Typography
          cursor="pointer"
          name="Button 1"
          //   color={token.colorLink}
        >
          {secondaryButtonText || 'Cancel'}
        </Typography>
      }
    >
      {body}
    </OSModalStyle>
  );
};

export default OsModal;
