'use client';

import {FC} from 'react';
import {TagIcon} from '@heroicons/react/24/outline';
import {Avatar} from '../antd/Avatar';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';

const TableNameColumn: FC<any> = ({
  logo,
  fallbackIcon,
  primaryText,
  secondaryText,
  avtarLeftMargin,
  onClick,
  cursor,
  primaryTextTypography = 'Heading 3/Medium',
  secondaryTextTypography = 'Body 4/Regular',
  maxWidth,
  tooltip = false,
  iconBg,
}) => {
  const imgUrl = logo && ``;

  const [token] = useThemeToken();
  return (
    <Space
      size={12}
      align="center"
      style={{width: '100%', marginLeft: `${avtarLeftMargin}px`}}
    >
      <Avatar
        className="irys-entity-avatar"
        size="large"
        style={{
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          width: '48px',
        }}
        src={imgUrl}
        icon={fallbackIcon}
      />
      <span style={{cursor}}>
        <Typography
          cursor={cursor}
          onClick={onClick}
          align="left"
          ellipsis
          as="div"
          name={primaryTextTypography}
          color={token.colorPrimaryText}
        >
          {primaryText}
        </Typography>
        <Typography
          // tooltip={tooltip ? secondaryText : ''}
          maxWidth={maxWidth}
          onClick={onClick}
          align="left"
          ellipsis
          as="div"
          name={secondaryTextTypography}
          color={token.colorPrimaryText}
        >
          {secondaryText}
        </Typography>
      </span>
    </Space>
  );
};

// export default memo(TableNameColumn, (p, n) => p.primaryText === n.primaryText);
export default TableNameColumn;
