import {FC} from 'react';
import Image from 'next/image';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {EmptyContainerInterface} from './os-empty-container';
import EmptyDataIcon from '../../../../../public/assets/static/emptyDataIcon.svg';
import OsButton from '../os-button';

const EmptyContainer: FC<EmptyContainerInterface> = ({
  title,
  subTitle,
  actionButton,
  onClick,
}) => {
  const [token] = useThemeToken();
  return (
    <Space
      align="center"
      direction="vertical"
      size={28}
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#F6F7F8',
        padding: '24px',
      }}
    >
      <Image
        src={EmptyDataIcon}
        alt="EmptyDataIcon"
        style={{cursor: 'pointer', marginTop: '50px'}}
      />
      <Typography name="Body 3/Medium">{title}</Typography>
      {subTitle && (
        <Typography name="Body 4/Regular" color={token?.colorTextSecondary}>
          {subTitle}
        </Typography>
      )}
      {actionButton && (
        <OsButton
          text={actionButton}
          buttontype="PRIMARY"
          icon={<PlusIcon />}
          clickHandler={() => onClick}
        />
      )}
    </Space>
  );
};

export default EmptyContainer;
