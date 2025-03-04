/* eslint-disable @typescript-eslint/no-unused-expressions */
import Image from 'next/image';
import {FC} from 'react';
import ModalCloseIcon from '../../../../public/assets/static/modalCloseIcon.svg';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsButton from '../os-button';
import Typography from '../typography';
import {OSModalPropsInterface} from './os-modal.interface';
import {OSModalStyle} from './styled-components';

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
  singleButtonInCenter = false,
  thirdButtonText,
  thirdButtonfunction,
  thirdLoading,
  fourthButtonText,
  fourthButtonfunction,
  fifthButtonText,
  fifthButtonfunction,
  styleFooter,
  isSalesForce,
  ...rest
}) => {
  const {onCancel, open, onOk} = rest;
  const [token] = useThemeToken();

  return (
    <OSModalStyle
      bodyPadding={bodyPadding}
      styleFooter={styleFooter}
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
      closeIcon={
        <Image
          src={ModalCloseIcon}
          alt="ModalCloseIcon"
          style={{cursor: 'pointer'}}
        />
      }
      closable={isSalesForce}
      // maskStyle={
      //   !isSalesForce
      //     ? {
      //       backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent mask
      //       backdropFilter: 'blur(8px)', // Blurs the background content
      //       WebkitBackdropFilter: 'blur(8px)', // For Safari support
      //     }
      //     : {}
      // }
      footer={
        footer && (
          <Space
            size={12}
            style={{
              padding: footerPadding ? `${footerPadding}px` : '0px',
              display: singleButtonInCenter ? 'flex' : '',
              justifyContent: singleButtonInCenter ? 'center' : '',
            }}
          >
            {thirdButtonText && (
              <OsButton
                loading={thirdLoading}
                text={thirdButtonText}
                disabled={disabledButton}
                buttontype="SECONDARY"
                clickHandler={() => {
                  if (thirdButtonfunction) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    thirdButtonfunction(mockEvent); // Pass a mock event or any required argument
                  }
                }}
              />
            )}
            {secondaryButtonText && (
              <OsButton
                text={secondaryButtonText}
                disabled={disabledButton}
                buttontype="SECONDARY"
                clickHandler={() => {
                  if (onCancel) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    onCancel(mockEvent); // Pass a mock event or any required argument
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

            {fourthButtonText && (
              <OsButton
                loading={loading}
                text={fourthButtonText}
                buttontype="PRIMARY"
                clickHandler={() => {
                  if (fourthButtonfunction) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    fourthButtonfunction(mockEvent); // Pass a mock event or any required argument
                  }
                }}
              />
            )}
            {fifthButtonText && (
              <OsButton
                loading={loading}
                text={fifthButtonText}
                buttontype="PRIMARY"
                clickHandler={() => {
                  if (fifthButtonfunction) {
                    const mockEvent = {} as React.MouseEvent<HTMLButtonElement>;
                    fifthButtonfunction(mockEvent); // Pass a mock event or any required argument
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
