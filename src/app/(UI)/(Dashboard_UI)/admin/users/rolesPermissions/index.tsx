'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import DailogModal from '@/app/components/common/os-modal/DialogModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {ShieldCheckIcon} from '@heroicons/react/20/solid';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {
  getOranizationSeats,
  getUserByOrganization,
  updateUserById,
} from '../../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';
import {
  getAllCacheFLowProposal,
  getCacheFLowProposalById,
  getSubscriptionDetails,
} from '../../../../../../../redux/actions/cacheFlow';
import Cryptr from 'cryptr';

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {data, loading, userInformation} = useAppSelector(
    (state) => state.user,
  );
  const {cache} = useAppSelector((state) => state.cacheFLow);
  const [userRules, setUserRules] = useState<any>(data);
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<number>();
  const [proposalData, setProPosalData] = useState<any>();
  const [seatOccupied, setSeatOccuiped] = useState<any>();
  const [purchasedProposal, setPurchasedProposal] = useState<boolean>(false);
  const cryptr = new Cryptr('myTotallySecretKey', {
    encoding: 'base64',
    pbkdf2Iterations: 10000,
    saltLength: 10,
  });

  const encryptedString = cryptr?.encrypt('bacon');

  console.log(encryptedString, '1111111'); // CPbKO/FFLQ8lVKxV+jYJcLcpTU0ZvW3D+JVfUecmJmLYY10UxYEa/wf8PWDQqhw=
  // console.log(decryptedString, '1111111'); // bacon
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
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_quote: e?.target?.checked,
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
          Deal Reg
        </Typography>
      ),
      dataIndex: 'is_dealReg',
      key: 'is_dealReg',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_dealReg: e?.target?.checked,
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
          Orders AI
        </Typography>
      ),
      dataIndex: 'is_order',
      key: 'is_order',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_order: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    setUserRules(data);
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

  const getAllCacheFlowProposalData = async (subscription: any) => {
    try {
      let allProposalDataa = await dispatch(getAllCacheFLowProposal(''))?.then(
        (payload: any) => {
          return payload?.payload?.sucess;
        },
      );

      let proposalItem = allProposalDataa?.find(
        (itemsPro: any) =>
          itemsPro?.proposalNumber === subscription?.proposalNumber,
      );
      let matchDataaValue: any;
      if (proposalItem?.id) {
        matchDataaValue = await dispatch(
          getCacheFLowProposalById(proposalItem?.id),
        ).then((payload: any) => {
          return payload?.payload?.sucess;
        });
      }
      console.log('allProposalDataa', matchDataaValue);
    } catch (error) {
      console.log('error', error);
    }
  };
  const getSubsCription = async () => {
    try {
      let subscriptionData = await dispatch(getSubscriptionDetails(''))?.then(
        (subScriptionPayload: any) => {
          if (subScriptionPayload?.payload) {
            return subScriptionPayload?.payload?.sucess?.[0];
          }
        },
      );
      if (subscriptionData) {
        getAllCacheFlowProposalData(subscriptionData);
      }
    } catch (error: any) {
      console.log('error', error.message);
    }
  };
  useEffect(() => {
    getSubsCription();

    dispatch(getAllCacheFLowProposal(''))?.then((payload: any) => {
      if (payload?.payload?.sucess) {
        let allProPosalData = payload?.payload?.sucess;

        // let itemWithSameOrg = allProPosalData?.find(
        //   (items: any) =>
        //     items?.name?.replace(/\s/g, '') === userInformation?.organization,
        // );
        // if (itemWithSameOrg) {
        //   let proposalArrayL: any = [];
        //   dispatch(getCacheFLowProposalById(itemWithSameOrg?.id))?.then(
        //     (payloadDtaa) => {
        //       if (payloadDtaa?.payload?.sucess) {
        //         setPurchasedProposal(true);
        //         let ProposalItems = payloadDtaa?.payload?.sucess?.proposalItems;
        //         ProposalItems?.map((itemspro: any) => {
        //           let newObj: any;
        //           if (
        //             itemspro?.name === 'QuoteAI' ||
        //             itemspro?.name === 'DealRegAI Bundle'
        //           ) {
        //             proposalArrayL?.push({
        //               [itemspro?.name]: itemspro?.quantity,
        //             });
        //           }
        //         });

        //         // "QuoteAI"
        //         // "DealRegAI Bundle"
        //       }
        //     },
        //   );

        //   setProPosalData(proposalArrayL);
        // }
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getOranizationSeats(''))?.then((payload) => {
      setSeatOccuiped(payload?.payload);
    });
  }, []);
  // ?.replace(/\s/g, '')

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
            {cache?.QuoteAISeats}/30
          </Typography>
        </Typography>

        <Typography color={token?.colorBgContainer} name="Body 3/Medium">
          DealReg AI:{' '}
          <Typography color={token?.colorBgContainer} name="Body 3/Bold">
            {' '}
            {cache?.DealRegSeats}/09
          </Typography>
        </Typography>
      </span>
    </Space>
  );
  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Roles and Permissions
            </Typography>
          </Col>

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
        </Row>

        <OsTable
          columns={RolesAndPermissionsColumns}
          dataSource={userRules}
          scroll
          loading={loading}
        />
      </Space>

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
