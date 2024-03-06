/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import {EnvelopeIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import React from 'react';
import {Space} from '../antd/Space';
import TableNameColumn from '../os-table/TableNameColumn';
import Typography from '../typography';
import {OsContactCardStyle} from './styled-components';
import {Col, Row} from '../antd/Grid';
import useThemeToken from '../hooks/useThemeToken';

export const OsContactCard: React.FC<any> = ({
  data,
  onClick,
  PencilSquareIconVisible = false,
}) => {
  const [token] = useThemeToken();
  return (
    <Row gutter={[16, 16]}>
      {data?.map((item: any, index: number) => (
        <Col key={item?.id} style={{width: '100%'}}>
          <OsContactCardStyle key={`${index}`} >
            <Row justify="space-between" align="middle">
              <Col>
                <Space direction="vertical" size={8}>
                  <TableNameColumn
                    primaryText={
                      <Typography name="Body 3/Regular">
                        {item?.billing_first_name ?? item?.name}{' '}
                        {item?.billing_last_name ?? item?.last_name}
                      </Typography>
                    }
                    secondaryText={
                      <Typography name="Body 4/Regular">
                        {item?.billing_role ?? item?.role}
                      </Typography>
                    }
                    fallbackIcon={`${
                      item?.billing_first_name
                        ?.toString()
                        ?.charAt(0)
                        ?.toUpperCase() ??
                      item?.name?.toString()?.charAt(0)?.toUpperCase()
                    }${
                      item?.billing_last_name
                        ?.toString()
                        ?.charAt(0)
                        ?.toUpperCase() ??
                      item?.last_name?.toString()?.charAt(0)?.toUpperCase()
                    }`}
                    iconBg="#1EB159"
                  />

                  <Space size={8} align="center">
                    <EnvelopeIcon
                      width={24}
                      color={token?.colorInfoBorder}
                      style={{marginTop: '5px'}}
                    />
                    <Typography name="Body 4/Regular" as="span">
                      {item?.billing_email ?? item?.email}
                    </Typography>
                  </Space>
                </Space>
              </Col>
              {PencilSquareIconVisible && (
                <Col>
                  <PencilSquareIcon
                    onClick={onClick}
                    width={24}
                    color={token?.colorInfoBorder}
                    style={{cursor: 'pointer'}}
                  />
                </Col>
              )}
            </Row>
          </OsContactCardStyle>
        </Col>
      ))}
    </Row>
  );
};
