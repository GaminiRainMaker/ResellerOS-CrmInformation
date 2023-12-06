/* eslint-disable @typescript-eslint/no-unused-expressions */
import {XCircleIcon} from '@heroicons/react/20/solid';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsButton from '../os-button';
import {OSModalPropsInterface} from './os-modal.interface';
import {OSModalStyle} from './styled-components';

const OsModal: FC<OSModalPropsInterface> = ({
  body,
  primaryButtonText,
  secondaryButtonText,
  ...rest
}) => {
  const {onCancel, afterClose, open, onOk} = rest;
  const [token] = useThemeToken();

  return (
    <OSModalStyle
      {...rest}
      title=""
      destroyOnClose
      width={rest?.width ?? 500}
      open={open}
      onCancel={(e) => {
        onCancel && onCancel(e);
      }}
      mask
      closeIcon={<XCircleIcon width={30} color={token?.colorIcon} />}
      footer={
        <Space size={12}>
          <OsButton text={secondaryButtonText} buttontype="" />
          <OsButton text={primaryButtonText} buttontype="PRIMARY" />
        </Space>
      }
    >
      {body}
    </OSModalStyle>
  );
};

export default OsModal;
