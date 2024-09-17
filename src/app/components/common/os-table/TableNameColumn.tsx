/* eslint-disable import/no-cycle */

'use client';

import { CustomUpload } from '@/app/(UI)/(Dashboard_UI)/layouts/Header';
import ImgCrop from 'antd-img-crop';
import { FC } from 'react';
import { Avatar } from '../antd/Avatar';
import { Space } from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import { AvatarStyled } from './styled-components';
import OsButton from '../os-button';

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
  secondaryEllipsis = false,
  justifyContent = 'center',
  secondaryTextColor = '#0D0D0D',
  imageUpload = false,
  debounceFn,
  size = 50,
  imgCursor = 'pointer',
  isBoldRequired = false,
  isSubscription,
  secondarySize,
  marginBottom = 0,
}) => {
  const [token] = useThemeToken();

  const getStyledText = (text: string, requiredValue: boolean) => {
    if (requiredValue) {
      const tempValue: string = text?.split(' ')?.[0];
      const remainingText = text && text?.split(' ').slice(1).join(' ');
      return (
        <span style={{ cursor }}>
          <span style={{ fontWeight: 800 }}>{tempValue}</span> {remainingText}
        </span>
      );
    }
    return <span style={{ cursor }}>{text}</span>;
  };
  return (
    <>
      <Space
        size={12}
        align="center"
        style={{
          width: '100%',
          marginLeft: `${avtarLeftMargin}px`,
          display: 'flex',
          justifyContent,
          textAlign: 'start',
          marginBottom: `${marginBottom}px`,
        }}
      >
        {imageUpload ? (
          <ImgCrop
            onModalOk={(list: any) => {
              debounceFn(list);
            }}
          >
            <CustomUpload showUploadList={false}>
              <Avatar
                src={logo}
                icon={fallbackIcon}
                shape="circle"
                size={size}
                style={{ cursor: imgCursor }}
              />
            </CustomUpload>
          </ImgCrop>
        ) : (
          <AvatarStyled
            background={iconBg}
            src={logo}
            icon={fallbackIcon}
            size={secondarySize}
          />
        )}

        <span style={{ cursor }}>
          <Typography
            maxWidth={maxWidth}
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
            // onClick={onClick}
            align="left"
            ellipsis={secondaryEllipsis}
            as="div"
            name={secondaryTextTypography}
            color={secondaryTextColor}

          >
            <div dangerouslySetInnerHTML={{ __html: secondaryText }} />
          </Typography>

          {/* {/* {getStyledText(secondaryText, isBoldRequired)}
            {`${secondaryText}`}  */}

        </span>
      </Space >
      {isSubscription && (
        <Space size={12} style={{ marginLeft: '60px' }}>
          <OsButton buttontype="SECONDARY" text="Renew Subscription" />
          <OsButton buttontype="PRIMARY" text="Change Plan" />
        </Space>
      )
      }
    </>
  );
};

// export default memo(TableNameColumn, (p, n) => p.primaryText === n.primaryText);
export default TableNameColumn;
