import {FC} from 'react';
import Image from 'next/image';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {EmptyContainerInterface} from './os-empty-container';
import EmptyDataIcon from '../../../../../public/assets/static/emptyDataIcon.svg';

const EmptyContainer: FC<EmptyContainerInterface> = ({title, subTitle}) => {
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
        borderRadius: '12px',
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
    </Space>
  );
};

export default EmptyContainer;
