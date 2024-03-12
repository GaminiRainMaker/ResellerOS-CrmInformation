/* eslint-disable @typescript-eslint/no-unused-expressions */
import {XCircleIcon} from '@heroicons/react/20/solid';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsButton from '../os-button';
import {OSModalPropsInterface} from './os-modal.interface';
import {OSModalStyle} from './styled-components';
import Typography from '../typography';

const OsModal: FC<OSModalPropsInterface> = ({
  body,
  primaryButtonText,
  secondaryButtonText,
  loading,
  bodyPadding,
  title,
  titleTypography = 'Heading 3/Medium',
  footer = true,
  footerPadding,
  disabledButton,
  ...rest
}) => {
  const {onCancel, open, onOk} = rest;

  
  const [token] = useThemeToken();
  return (
    <OSModalStyle
      bodyPadding={bodyPadding}
      {...rest}
      // onCancel={closeAction}
      title={<Typography name={titleTypography}>{title}</Typography>}
      destroyOnClose
      width={rest?.width ?? 500}
      open={open}
      onCancel={(e: any) => {
        onCancel && onCancel(e);
      }}
      onOk={onOk}
      mask
      closeIcon={<XCircleIcon width={30} color={token?.colorIcon} />}
      footer={
        footer && (
          <Space
            size={12}
            style={{padding: footerPadding ? `${footerPadding}px` : '0px'}}
          >
            {secondaryButtonText && (
              <OsButton
                text={secondaryButtonText}
                disabled={disabledButton}
                buttontype="SECONDARY"
                clickHandler={() => {
                  if (onOk) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    onOk(mockEvent); // Pass a mock event or any required argument
                  }
                }}
              />
            )}
            {primaryButtonText && (
              <OsButton
                loading={loading}
                text={primaryButtonText}
                disabled={disabledButton}
                buttontype="PRIMARY"
                clickHandler={() => {
                  if (onOk) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    onOk(mockEvent); // Pass a mock event or any required argument
                  }
                }}
              />
            )}
          </Space>
        )
      }
    >
      {body}
    </OSModalStyle>
  );
};

export default OsModal;
