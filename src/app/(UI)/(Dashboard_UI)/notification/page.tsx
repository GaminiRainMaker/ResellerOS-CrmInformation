/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Space} from '@/app/components/common/antd/Space';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import {Col, Row} from 'antd';
import moment from 'moment';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {getAllNewNotification} from '../../../../../redux/actions/notifications';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

export interface SeparatedData {
  [partnerId: number]: {
    partner_id: number;
    data: any[];
    title: string;
  };
}

const SuperAdminPartner: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {userInformation, searchDataa} = useAppSelector((state) => state.user);

  const {data: notificationData} = useAppSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    dispatch(getAllNewNotification(''));
  }, []);

  return (
    <>
      <Space size={2} direction="vertical" style={{width: '100%'}}>
        <Typography name="Body 1/Medium">All Notifications</Typography>
        {notificationData?.map((itemNoti: any) => (
          <Row
            style={{
              marginTop: '10px',
              background: 'white',
              padding: '24px',
              borderRadius: '10px',
            }}
            align="middle"
            justify="space-between"
          >
            <Col>
              <TableNameColumn
                key={itemNoti?.id}
                primaryText={itemNoti?.title}
                secondaryText={itemNoti?.description}
                primaryTextTypography="Body 1/Medium"
                cursor="pointer"
                secondaryEllipsis
              />
            </Col>
            <Col>
              <Space size={20}>
                <Space size={5}>
                  {moment(itemNoti?.createdAt)?.format('MM-DD-YYYY')}
                  {moment(itemNoti?.createdAt)?.format('hh: mm A')}
                </Space>

                <ArrowTopRightOnSquareIcon
                  cursor="pointer"
                  width={22}
                  height={22}
                  onClick={() => {
                    router.push(
                      userInformation?.Admin
                        ? `/superAdminPartner?tab=2`
                        : '/partners?tab=2',
                    );
                  }}
                />
              </Space>
            </Col>
          </Row>
        ))}
      </Space>
    </>
  );
};

export default SuperAdminPartner;
