/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import CommonSelect from '@/app/components/common/os-select';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {ExclamationCircleIcon, UsersIcon} from '@heroicons/react/24/outline';
import {Col, Row} from 'antd';
import moment from 'moment';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import EmptyContainer from '@/app/components/common/os-empty-container';
import creditCard from '../../../../../public/assets/static/card-pos.svg';
import doubleCheckIcon from '../../../../../public/assets/static/doubleCheckIcon.svg';
import {
  ReadNotificationById,
  getEarlierNotifications,
  getRecentNotifications,
} from '../../../../../redux/actions/notifications';
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
  const {earlierNotification, recentNotification, loading} = useAppSelector(
    (state) => state.notification,
  );
  const [recentData, setRecentData] = useState<any>(recentNotification);
  const [earlierData, setEarlierData] = useState<any>(earlierNotification);

  useEffect(() => {
    dispatch(getRecentNotifications(''));
    dispatch(getEarlierNotifications(''));
  }, []);

  const notificatoinOptions = [
    {
      label: 'All Notifications',
      value: 'all_notifications',
    },
    {
      label: 'Read Notifications',
      value: 'read_notifications',
    },
    {
      label: 'Unread Notifications',
      value: 'unread_notifications',
    },
  ];

  useEffect(() => {
    setRecentData(recentNotification);
    setEarlierData(earlierNotification);
  }, [recentNotification, earlierNotification]);

  const filterOptionFun = (filterValue: string) => {
    if (filterValue === 'read_notifications') {
      const filetredRecentNotification = recentNotification?.filter(
        (dataItem: any) => dataItem?.is_read,
      );
      const filetredEarlierNotification = earlierNotification?.filter(
        (dataItem: any) => dataItem?.is_read,
      );
      setRecentData(filetredRecentNotification);
      setEarlierData(filetredEarlierNotification);
    } else if (filterValue === 'unread_notifications') {
      const filetredRecentNotification = recentNotification?.filter(
        (dataItem: any) => !dataItem?.is_read,
      );
      const filetredEarlierNotification = earlierNotification?.filter(
        (dataItem: any) => !dataItem?.is_read,
      );
      setRecentData(filetredRecentNotification);
      setEarlierData(filetredEarlierNotification);
    } else {
      setRecentData(recentNotification);
      setEarlierData(earlierNotification);
    }
  };

  return (
    <>
      <GlobalLoader loading={loading}>
        <Row justify="space-between">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Notifications
            </Typography>
          </Col>
          <Col>
            <Space size={12}>
              <CommonSelect
                defaultValue="all_notifications"
                placeholder="Select"
                style={{width: '200px', background: 'none'}}
                options={notificatoinOptions}
                onChange={(e: any) => {
                  filterOptionFun(e);
                }}
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
                clickHandler={() => {
                  dispatch(ReadNotificationById(''))?.then((d) => {
                    if (d?.payload) {
                      dispatch(getRecentNotifications(''));
                      dispatch(getEarlierNotifications(''));
                    }
                  });
                }}
              />
            </Space>
          </Col>
        </Row>
        {recentData?.length > 0 || earlierData?.length > 0 ? (
          <>
            {recentData?.length > 0 && (
              <>
                <br />
                <Typography name="Body 2/Medium" color={token?.colorInfoBorder}>
                  This Week
                </Typography>
                <br />
              </>
            )}

            {recentData?.map((itemNoti: any) => {
              let fallBackIconsss;
              let fallBackBg;
              if (itemNoti?.type === 'quote') {
                fallBackIconsss = (
                  <ExclamationCircleIcon color={token?.colorError} width={24} />
                );
                fallBackBg = token?.colorErrorBg;
              } else if (itemNoti?.type === 'subscription') {
                fallBackIconsss = (
                  <Image
                    src={creditCard}
                    alt="creditCard"
                    style={{cursor: 'pointer', width: '24px', height: '24px'}}
                  />
                );
                fallBackBg = ' #E6E7EE';
              } else if (itemNoti?.type === 'partner') {
                fallBackIconsss = (
                  <UsersIcon color={token?.colorInfo} width={24} />
                );
                fallBackBg = token?.colorInfoBgHover;
              }
              return (
                <CustomNotificationWrapper>
                  <CustomNotificationCard
                    isRead={itemNoti?.is_read}
                    justify="space-between"
                    onClick={() => {
                      if (itemNoti?.type === 'formBuilder') {
                        router.push(
                          `/formBuilder?id=${itemNoti?.partner_program_id}`,
                        );
                      } else {
                        router.push(
                          userInformation?.Admin
                            ? `/superAdminPartner?tab=2`
                            : '/partners?tab=2',
                        );
                      }
                    }}
                  >
                    <Col>
                      <TableNameColumn
                        key={itemNoti?.id}
                        justifyContent="start"
                        secondaryText={itemNoti?.description}
                        primaryTextTypography="Body 1/Medium"
                        cursor="pointer"
                        secondaryEllipsis
                        size={50}
                        fallbackIcon={fallBackIconsss}
                        iconBg={fallBackBg}
                        logo={
                          itemNoti?.type === 'subscription' ||
                          itemNoti?.type === 'quote'
                            ? null
                            : itemNoti?.User?.profile_image
                        }
                        isBoldRequired
                        isSubscription={itemNoti?.type === 'subscription'}
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

            {earlierData?.length > 0 && (
              <>
                <br />
                <Typography name="Body 2/Medium" color={token?.colorInfoBorder}>
                  Earlier
                </Typography>
                <br />
              </>
            )}

            {earlierData?.map((itemNoti: any) => {
              let fallBackIconsss;
              let fallBackBg;
              if (itemNoti?.type === 'quote') {
                fallBackIconsss = (
                  <ExclamationCircleIcon color={token?.colorError} width={24} />
                );
                fallBackBg = token?.colorErrorBg;
              } else if (itemNoti?.type === 'subscription') {
                fallBackIconsss = (
                  <Image
                    src={creditCard}
                    alt="creditCard"
                    style={{cursor: 'pointer', width: '24px', height: '24px'}}
                  />
                );
                fallBackBg = ' #E6E7EE';
              } else if (itemNoti?.type === 'partner') {
                fallBackIconsss = (
                  <UsersIcon color={token?.colorInfo} width={24} />
                );
                fallBackBg = token?.colorInfoBgHover;
              }

              return (
                <CustomNotificationWrapper>
                  <CustomNotificationCard
                    isRead={itemNoti?.is_read}
                    justify="space-between"
                    onClick={() => {
                      if (itemNoti?.type === 'formBuilder') {
                        router.push(
                          `/formBuilder?id=${itemNoti?.partner_program_id}`,
                        );
                      } else {
                        router.push(
                          userInformation?.Admin
                            ? `/superAdminPartner?tab=2`
                            : '/partners?tab=2',
                        );
                      }
                    }}
                  >
                    <Col>
                      <TableNameColumn
                        key={itemNoti?.id}
                        justifyContent="start"
                        secondaryText={itemNoti?.description}
                        primaryTextTypography="Body 1/Medium"
                        cursor="pointer"
                        secondaryEllipsis
                        size={50}
                        fallbackIcon={fallBackIconsss}
                        iconBg={fallBackBg}
                        logo={
                          itemNoti?.type === 'subscription' ||
                          itemNoti?.type === 'quote'
                            ? null
                            : itemNoti?.User?.profile_image
                        }
                        isBoldRequired
                        isSubscription={itemNoti?.type === 'subscription'}
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
          </>
        ) : (
          <>
            <br />
            <EmptyContainer
              title="There are no Notification For this User."
              subTitle="Please perform some action to get the notifications."
            />
          </>
        )}
      </GlobalLoader>
    </>
  );
};

export default SuperAdminPartner;
