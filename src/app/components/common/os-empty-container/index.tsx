import {ArchiveBoxIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {EmptyContainerInterface} from './os-empty-container';

const EmptyContainer: FC<EmptyContainerInterface> = ({title, subTitle}) => {
  const [token] = useThemeToken();
  return (
    <Space
      align="center"
      direction="vertical"
      size={2}
      style={{display: 'flex', justifyContent: 'center'}}
    >
      <AvatarStyled
        icon={<ArchiveBoxIcon width={24} color={token?.colorError} />}
        background={token?.colorErrorBg}
      />
      <Typography name="Body 1/Medium">{title}</Typography>
      {subTitle && (
        <Typography name="Body 4/Regular" color={token?.colorTextSecondary}>
          {subTitle}
        </Typography>
      )}
    </Space>
  );
};

export default EmptyContainer;
