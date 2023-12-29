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
  ...rest
}) => {
  const {onCancel, afterClose, open, onOk} = rest;
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
      onCancel={(e) => {
        onCancel && onCancel(e);
      }}
      onOk={onOk}
      mask
      closeIcon={<XCircleIcon width={30} color={token?.colorIcon} />}
      footer={
        <Space size={12}>
          {secondaryButtonText && (
            <OsButton
              text={secondaryButtonText}
              buttontype="SECONDARY"
              clickHandler={() => {
                onOk();
              }}
            />
          )}
          {primaryButtonText && (
            <OsButton
              loading={loading}
              text={primaryButtonText}
              buttontype="PRIMARY"
              clickHandler={() => {
                onOk();
              }}
            />
          )}
        </Space>
      }
    >
      {body}
    </OSModalStyle>
  );
};

export default OsModal;
