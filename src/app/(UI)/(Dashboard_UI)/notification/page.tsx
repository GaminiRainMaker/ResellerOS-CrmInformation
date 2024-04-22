/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {Col, Form, Row} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import moment from 'moment';
import {SelectOutlined} from '@ant-design/icons';
import {
  getAllNewNotification,
  getCountOfNotification,
} from '../../../../../redux/actions/notifications';
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

  const {data: notificationData, loading: notificationLoading} = useAppSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    dispatch(getAllNewNotification(''));
  }, []);

  return (
    <>
      <Space size={2} direction="vertical" style={{width: '100%'}}>
        <Typography name="Body 1/Medium">All Notifications</Typography>
        {notificationData?.map((itemNoti: any, itemIndex: number) => (
          <Row
            style={{
              marginTop: '20px',
              background: 'white',
              padding: '10px',
              width: '100%',
              borderRadius: '0px 10px 0px 10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Col>
              {' '}
              <Row style={{marginBottom: '10px', alignContent: 'center'}}>
                <Typography name="Body 3/Medium">
                  {' '}
                  {itemNoti?.title}{' '}
                </Typography>{' '}
              </Row>{' '}
              <Row>
                {' '}
                <Typography name="Body 4/Medium">
                  {itemNoti?.description}{' '}
                </Typography>
              </Row>
            </Col>
            <Col>
              {' '}
              {moment(itemNoti?.createdAt)?.format('MM-DD-YYYY')}{' '}
              {moment(itemNoti?.createdAt)?.format('hh: mm A')}
              <SelectOutlined
                onClick={() => {
                  router.push(
                    userInformation?.Admin
                      ? `/superAdminPartner?tab=2`
                      : '/partners?tab=2',
                  );
                }}
                rotate={90}
                style={{
                  fontSize: '18px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
                // onClick={() =>

                // }
              />
            </Col>
          </Row>
        ))}
      </Space>
    </>
  );
};

export default SuperAdminPartner;
