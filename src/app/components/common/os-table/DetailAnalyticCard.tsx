'use client';

import {FC} from 'react';
import {Col, Row} from '../antd/Grid';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {DetailAnalyticAvatarStyled} from './styled-components';

const DetailAnalyticCard: FC<any> = ({
  logo,
  fallbackIcon,
  primaryText,
  secondaryText,
  avtarLeftMargin,
  onClick,
  cursor,
  primaryTextTypography = 'Heading 1/Bold',
  secondaryTextTypography = 'Body 4/Regular',
  maxWidth,
  tooltip = false,
  iconBg,
}) => {
  const imgUrl = logo && ``;

  const [token] = useThemeToken();
  return (
    <Row
      justify="space-between"
      style={{background: 'white', padding: '24px', borderRadius: '12px'}}
    >
      <Col>
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
      </Col>
      {iconBg && (
        <Col>
          <DetailAnalyticAvatarStyled
            background={iconBg}
            src={imgUrl}
            icon={fallbackIcon}
          />
        </Col>
      )}
    </Row>
  );
};
export default DetailAnalyticCard;
