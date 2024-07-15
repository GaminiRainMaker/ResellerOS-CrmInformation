'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Tag} from '@/app/components/common/antd/Tag';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import DailogModal from '@/app/components/common/os-modal/DialogModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {ShieldCheckIcon} from '@heroicons/react/20/solid';
import {
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {Avatar, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {
  getUserByOrganization,
  updateUserById,
} from '../../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {data, loading, userInformation} = useAppSelector(
    (state) => state.user,
  );
  const {cacheAvailableSeats, cacheTotalDealRegSeats, cacheTotalQuoteSeats} =
    useAppSelector((state) => state.cacheFLow);
  const [userRules, setUserRules] = useState<any>([]);
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<number>();
  const {isSubscribed, loading: cacheFlowLoading} = useAppSelector(
    (state) => state.cacheFLow,
  );

  const [quoteCount, setQuoteCount] = useState<number>(0);
  const [dealCount, setDealCount] = useState<number>(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setDealCount(cacheAvailableSeats?.DealRegSeats);
    setQuoteCount(cacheAvailableSeats?.QuoteAISeats);
  }, [cacheAvailableSeats]);

  const providePermissions = () => {
    setUserRules((prev: any) =>
      prev.map((prevItem: any) => {
        if (prevItem.id === recordId) {
          return {
            ...prevItem,
            is_admin: true,
            is_quote: true,
            is_dealReg: true,
            is_order: true,
          };
        }
        return prevItem;
      }),
    );
    setShowDailogModal(false);
  };

  const RolesAndPermissionsColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          User Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Admin Access
        </Typography>
      ),
      dataIndex: 'is_admin',
      key: 'is_admin',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onClick={(d: any) => {
            if (d?.target?.checked) {
              setShowDailogModal(true);
              setRecordId(record?.id);
            }
          }}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_admin: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote AI
        </Typography>
      ),
      dataIndex: 'is_quote',
      key: 'is_quote',
      width: 173,
      render: (text: any, record: any) => {
        return (
          <Checkbox
            disabled={record.isQuoteDisabled}
            checked={text}
            onChange={(e) => {
              let trueCount = 0;
              if (e?.target?.checked) trueCount += 1;
              else trueCount -= 1;
              setUserRules((prev: any) => {
                prev.forEach((element: any) => {
                  if (element.is_quote) trueCount += 1;
                });
                return prev?.map((prevItem: any) => {
                  if (prevItem?.id === record?.id) {
                    return {
                      ...prevItem,
                      is_quote: e?.target?.checked,
                      isQuoteDisabled: false,
                    };
                  }
                  return {
                    ...prevItem,
                    isQuoteDisabled:
                      cacheTotalQuoteSeats.TotalQuoteSeats === trueCount
                        ? !prevItem.is_quote
                        : false,
                  };
                });
              });
            }}
          />
        );
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Deal Reg
        </Typography>
      ),
      dataIndex: 'is_dealReg',
      key: 'is_dealReg',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          disabled={record.isDealRegDisabled}
          checked={text}
          onChange={(e) => {
            let dealRegCount = 0;
            if (e?.target?.checked) dealRegCount += 1;
            else dealRegCount -= 1;
            setUserRules((prev: any) => {
              prev.forEach((element: any) => {
                if (element.is_dealReg) dealRegCount += 1;
              });
              return prev?.map((prevItem: any) => {
                if (prevItem?.id === record?.id) {
                  return {
                    ...prevItem,
                    is_dealReg: e?.target?.checked,
                    isDealRegDisabled: false,
                  };
                }
                return {
                  ...prevItem,
                  isDealRegDisabled:
                    cacheTotalDealRegSeats.TotalDealRegSeats === dealRegCount
                      ? !prevItem.is_dealReg
                      : false,
                };
              });
            });
          }}
        />
      ),
    },
    // {
    //   title: (
    //     <Typography name="Body 4/Medium" className="dragHandler">
    //       Orders AI
    //     </Typography>
    //   ),
    //   dataIndex: 'is_order',
    //   key: 'is_order',
    //   width: 173,
    //   render: (text: any, record: any) => (
    //     <Checkbox
    //       checked={text}
    //       onChange={(e) => {
    //         setUserRules((prev: any) =>
    //           prev.map((prevItem: any) => {
    //             if (prevItem.id === record?.id) {
    //               return {
    //                 ...prevItem,
    //                 is_order: e?.target?.checked,
    //               };
    //             }
    //             return prevItem;
    //           }),
    //         );
    //       }}
    //     />
    //   ),
    // },
  ];

  useEffect(() => {
    // if (
    //   cacheAvailableSeats.QuoteAISeats &&
    //   cacheTotalQuoteSeats.TotalQuoteSeats &&
    //   cacheTotalDealRegSeats.TotalDealRegSeats &&
    //   cacheAvailableSeats.DealRegSeats
    // ) {
    setUserRules(
      data?.map((item: any) => ({
        ...item,
        isQuoteDisabled:
          cacheAvailableSeats.QuoteAISeats ===
          cacheTotalQuoteSeats.TotalQuoteSeats
            ? !item.is_quote
            : false,
        isDealRegDisabled:
          cacheAvailableSeats.DealRegSeats ===
          cacheTotalDealRegSeats.TotalDealRegSeats
            ? !item.is_dealReg
            : false,
      })),
    );
    // }
  }, [data]);

  useEffect(() => {
    dispatch(getUserByOrganization(userInformation?.organization));
  }, []);

  const onFinish = () => {
    for (let i = 0; i < userRules.length; i++) {
      const items = userRules[i];
      dispatch(updateUserById(items)).then((d: any) => {
        if (d?.payload) {
          dispatch(getUserByOrganization(userInformation?.organization));
          window.location.reload();
        }
      });
    }
  };

  const toolTipData = (
    <Space direction="vertical" size={6}>
      <Typography color={token?.colorBgContainer} name="Body 3/Medium">
        Limit Left
      </Typography>
      <span>
        <Typography
          color={token?.colorBgContainer}
          name="Body 3/Medium"
          as="div"
        >
          Quote AI:{' '}
          <Typography color={token?.colorBgContainer} name="Body 3/Bold">
            {' '}
            {cacheAvailableSeats?.QuoteAISeats}/
            {cacheTotalQuoteSeats?.TotalQuoteSeats}
          </Typography>
        </Typography>

        <Typography color={token?.colorBgContainer} name="Body 3/Medium">
          DealReg AI:{' '}
          <Typography color={token?.colorBgContainer} name="Body 3/Bold">
            {' '}
            {cacheAvailableSeats?.DealRegSeats}/
            {cacheTotalDealRegSeats?.TotalDealRegSeats}
          </Typography>
        </Typography>
      </span>
    </Space>
  );

  const handleClose = () => {
    setVisible(false);
  };

  let StatementForExpired =
    quoteCount === cacheTotalQuoteSeats?.TotalQuoteSeats &&
    cacheTotalDealRegSeats?.TotalDealRegSeats === dealCount
      ? 'Quote AI and Deal Reg'
      : quoteCount === cacheTotalQuoteSeats?.TotalQuoteSeats
        ? 'Quote AI'
        : cacheTotalDealRegSeats?.TotalDealRegSeats === dealCount
          ? 'Deal Reg'
          : '';
  return (
    <>
      {(quoteCount === cacheTotalQuoteSeats?.TotalQuoteSeats ||
        cacheTotalDealRegSeats?.TotalDealRegSeats === dealCount) && (
        <Tag
          style={{
            padding: '4px',
            borderRadius: '4px',
            border: `1px solid ${token?.colorError}`,
            marginBottom: '24px',
            width: '100%',
          }}
          color="error"
          bordered
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Space size={2}>
                <Avatar
                  size={24}
                  style={{
                    background: 'none',
                  }}
                  icon={<XCircleIcon color={token?.colorError} width={20} />}
                />

                <Typography name="Body 4/Medium" color={token?.colorError}>
                  {`The Limit for ${StatementForExpired} permissions has completed. You cannot
                  assign this permission to anyone else.`}
                </Typography>
              </Space>
            </Col>
            <Col>
              <Avatar
                size={24}
                style={{
                  background: 'none',
                }}
                icon={
                  <XMarkIcon
                    cursor="pointer"
                    onClick={handleClose}
                    color={token?.colorError}
                    width={16}
                  />
                }
              />
            </Col>
          </Row>
        </Tag>
      )}
      <GlobalLoader loading={cacheFlowLoading}>
        <Space direction="vertical" size={24} style={{width: '100%'}}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
              >
                Roles and Permissions
              </Typography>
            </Col>
            {isSubscribed && (
              <Col>
                <Space size={8}>
                  <Tooltip
                    placement="leftBottom"
                    title={toolTipData}
                    overlayInnerStyle={{
                      background: '#19304f',
                    }}
                  >
                    <InformationCircleIcon
                      width={24}
                      cursor={'pointer'}
                      color={'#A0AAB8'}
                    />
                  </Tooltip>
                  <OsButton text="CANCEL" buttontype="SECONDARY" />
                  <OsButton
                    text="SAVE"
                    buttontype="PRIMARY"
                    clickHandler={onFinish}
                  />
                </Space>
              </Col>
            )}
          </Row>

          {!isSubscribed ? (
            <OsTable
              columns={RolesAndPermissionsColumns}
              dataSource={userRules}
              scroll
              loading={loading}
            />
          ) : (
            <Tag
              style={{
                display: 'flex',
                padding: '20px',
                borderRadius: '4px',
                border: `1px solid ${token?.colorError}`,
              }}
              color="error"
            >
              <Row
                justify="space-between"
                style={{width: '100%'}}
                align="middle"
              >
                <Col span={12}>
                  <>
                    <Avatar
                      size={24}
                      style={{
                        marginTop: '-12px',
                        marginRight: '5px',
                        background: 'none',
                      }}
                      icon={
                        <InformationCircleIcon
                          width={24}
                          color={token?.colorError}
                        />
                      }
                    />

                    <Space direction="vertical" size={0}>
                      <Typography
                        color={token?.colorError}
                        name="Heading 3/Bold"
                      >
                        Unsubscribed User
                      </Typography>

                      <Typography
                        color={token?.colorError}
                        name="Body 3/Medium"
                        as="span"
                        // style={{display: 'flex', flexWrap: 'wrap'}}
                      >
                        Unlock premium features and exclusive content by
                        subscribing to our web application today!
                      </Typography>
                    </Space>
                  </>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    color={token?.colorLink}
                    name="Button 1"
                    style={{fontWeight: 700}}
                    hoverOnText
                  >
                    Subscribe Now
                  </Typography>
                </Col>
              </Row>
            </Tag>
          )}
        </Space>
      </GlobalLoader>

      <DailogModal
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Permissions"
        subTitle="Do you wish to grant full access to this administrator?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        icon={
          <ShieldCheckIcon width={35} height={35} color={token?.colorSuccess} />
        }
        onOk={providePermissions}
      />
    </>
  );
};

export default RolesAndPermission;
