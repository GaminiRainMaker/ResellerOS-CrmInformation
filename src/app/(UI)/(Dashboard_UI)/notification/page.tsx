/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import CommonSelect from '@/app/components/common/os-select';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  ArrowTopRightOnSquareIcon,
  ExclamationCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Col, Row} from 'antd';
import moment from 'moment';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {NotificationData} from '@/app/utils/CONSTANTS';
import doubleCheckIcon from '../../../../../public/assets/static/doubleCheckIcon.svg';
import creditCard from '../../../../../public/assets/static/card-pos.svg';
import {getAllNewNotification} from '../../../../../redux/actions/notifications';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  CustomNotificationCard,
  CustomNotificationWrapper,
} from './styled-component';

export interface SeparatedData {
  [partnerId: number]: {
    partner_id: number;
    data: any[];
    title: string;
  };
}

const SuperAdminPartner: React.FC = () => {
  const router = useRouter();
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);

  const {data: notificationData} = useAppSelector(
    (state) => state.notification,
  );

  console.log('notificationData', notificationData);

  useEffect(() => {
    dispatch(getAllNewNotification(''));
  }, []);

  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            Notifications
          </Typography>
        </Col>
        <Col>
          <Space size={12}>
            <CommonSelect
              placeholder="All Notifications"
              style={{width: '200px', background: 'none'}}
            />
            <OsButton
              text="Mark All as Read"
              buttontype="PRIMARY"
              icon={
                <Image
                  src={doubleCheckIcon}
                  alt="doubleCheckIcon"
                  style={{cursor: 'pointer', width: '18px', height: '16px'}}
                  sizes="10px"
                />
              }
              // clickHandler={() => setShowModal((p) => !p)}
            />
            <OsDropdown menu={{items: []}} />
          </Space>
        </Col>
      </Row>
      <br />
      <Typography name="Body 2/Medium" color={token?.colorInfoBorder}>
        This Week
      </Typography>
      <br />
      {NotificationData?.map((itemNoti: any) => {
        let fallBackIconsss;
        let fallBackBg;
        if (itemNoti?.type === 'quote') {
          fallBackIconsss = (
            <ExclamationCircleIcon color={token?.colorError} width={24} />
          );
          fallBackBg = token?.colorErrorBg;
        } else if (itemNoti?.type === 'Subscriptions') {
          fallBackIconsss = (
            <Image
              src={creditCard}
              alt="creditCard"
              style={{cursor: 'pointer', width: '24px', height: '24px'}}
            />
          );
          fallBackBg = ' #E6E7EE';
        }

        return (
          <CustomNotificationWrapper>
            <Checkbox />
            <CustomNotificationCard
              justify="space-between"
              onClick={() => {
                router.push(
                  userInformation?.Admin
                    ? `/superAdminPartner?tab=2`
                    : '/partners?tab=2',
                );
              }}
            >
              <Col>
                <TableNameColumn
                  key={itemNoti?.id}
                  secondaryText={itemNoti?.description}
                  primaryTextTypography="Body 1/Medium"
                  cursor="pointer"
                  secondaryEllipsis
                  size={50}
                  fallbackIcon={fallBackIconsss}
                  iconBg={fallBackBg}
                  logo={itemNoti?.User?.profile_image}
                  isBoldRequired
                  isSubscription={itemNoti?.type === 'Subscriptions'}
                />
              </Col>
              <Col>
                <Typography name="Body 4/Medium" color="#757575">
                  {moment(itemNoti?.createdAt)?.format('LL | hh: mm A')}
                </Typography>
              </Col>
            </CustomNotificationCard>
          </CustomNotificationWrapper>
        );
      })}

      <br />
      <br />
      <Typography name="Body 2/Medium" color={token?.colorInfoBorder}>
        Earlier
      </Typography>
      <br />
      <br />

      {/* {notificationData?.map((itemNoti: any) => (
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
      ))} */}
    </div>
  );
};

export default SuperAdminPartner;
