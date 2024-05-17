/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import MyProfileCard from '@/app/components/common/os-profile-card/MyProfileCard';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getAllOpportunityByOrganization} from '../../../../../../redux/actions/opportunity';
import {getAllQuotesByOrganization} from '../../../../../../redux/actions/quote';
import {
  getUserByIdLogin,
  updateUserById,
  updateUserPasswordForNew,
} from '../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import ChangePassword from './ChangePassword';
import EditUserDetails from './EditUserDetails';
import {CustomMyProfileContentDiv} from './styled-components';

const MyProfile = () => {
  const [token] = useThemeToken();
  const [userDetailForm] = Form.useForm();
  const [changePasswordForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getUserID = searchParams.get('id');
  const getOrganization = searchParams.get('organization');
  const getRole = searchParams.get('role');
  const [profileDetailEditable, setProfileDetailEditable] =
    useState<boolean>(true);
  const [changePasswordEditable, setChangePasswordEditable] =
    useState<boolean>(true);
  const {loginUserInformation: UserDataById, loading} = useAppSelector(
    (state) => state.user,
  );
  const {getAllOpportunityDataByOrganization} = useAppSelector(
    (state) => state.Opportunity,
  );
  const {getAllQuotesDataByOrganization} = useAppSelector(
    (state) => state.quote,
  );

  const analyticsData = [
    {
      key: 1,
      primary: <div>{getAllOpportunityDataByOrganization?.length ?? 0}</div>,
      secondry: 'Total Opportunities',
      icon: <CheckCircleIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 2,
      primary: <div>{getAllQuotesDataByOrganization?.length}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: (
        <div>
          {getAllQuotesDataByOrganization?.filter(
            (getAllQuotesDataByOrganizationItem: any) =>
              getAllQuotesDataByOrganizationItem?.status === 'Completed',
          ).length ?? 0}
        </div>
      ),
      secondry: 'Completed Quotes',
      icon: <CheckCircleIcon width={36} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
  ];

  useEffect(() => {
    if (UserDataById) {
      userDetailForm.setFieldsValue({
        first_name: UserDataById?.first_name,
        last_name: UserDataById?.last_name,
        phone_number: UserDataById?.phone_number,
        job_title: UserDataById?.job_title,
        email: UserDataById?.email,
      });
    }
  }, [UserDataById]);

  useEffect(() => {
    if (getUserID) {
      dispatch(getUserByIdLogin(getUserID));
      dispatch(
        getAllOpportunityByOrganization({organization: getOrganization}),
      );
      dispatch(getAllQuotesByOrganization({organization: getOrganization}));
    }
  }, [getUserID]);

  const updateUserDetail = () => {
    const userData = userDetailForm?.getFieldsValue();
    if (userData) {
      dispatch(updateUserById({...userData, id: Number(getUserID)})).then(
        (d) => {
          if (d?.payload) {
            dispatch(getUserByIdLogin(getUserID));
          }
        },
      );
    }
    console.log('userDetailForm', userData);
    setProfileDetailEditable(true);
  };

  const changePasswordValue = () => {
    const changePasswordFormData = changePasswordForm?.getFieldsValue();
    if (changePasswordFormData) {
      dispatch(
        updateUserPasswordForNew({
          ...changePasswordFormData,
          id: Number(getUserID),
        }),
      )
        .then((d) => {
          changePasswordForm?.resetFields();
        })
        .catch((err: any) => {
          console.log('err', err);
          changePasswordForm?.resetFields();
        });
    }
    setChangePasswordEditable(true);
  };

  return (
    <>
      <GlobalLoader loading={loading}>
        <Row justify="space-between" style={{width: '100%'}} gutter={[16, 16]}>
          <MyProfileCard data={UserDataById} />
          <Space direction="vertical" size={24} style={{width: '100%'}}>
            {UserDataById?.master_admin ? (
              <></>
            ) : (
              <Row gutter={[16, 16]} justify="center">
                {analyticsData?.map((item: any) => (
                  <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                    <DetailAnalyticCard
                      primaryText={item?.primary}
                      secondaryText={item?.secondry}
                      fallbackIcon={item?.icon}
                      iconBg={item?.iconBg}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {getRole === 'admin' || getRole === 'superAdmin' ? (
              <></>
            ) : (
              <>
                <CustomMyProfileContentDiv>
                  <Row justify="space-between">
                    <Col>
                      <Typography
                        name="Body 2/Medium"
                        color={token?.colorPrimaryText}
                      >
                        Profile Details
                      </Typography>
                    </Col>
                    <Col>
                      {!profileDetailEditable ? (
                        <Space size={5}>
                          <OsButton
                            text="Cancel"
                            buttontype="SECONDARY"
                            clickHandler={() => {
                              setProfileDetailEditable(true);
                            }}
                          />
                          <OsButton
                            text="Save"
                            buttontype="PRIMARY"
                            clickHandler={userDetailForm?.submit}
                          />
                        </Space>
                      ) : (
                        <OsButton
                          text="Edit"
                          buttontype="PRIMARY"
                          icon={<PencilSquareIcon width={20} />}
                          clickHandler={() => {
                            setProfileDetailEditable(false);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <EditUserDetails
                    onFinish={updateUserDetail}
                    form={userDetailForm}
                    isEditable={profileDetailEditable}
                  />
                </CustomMyProfileContentDiv>

                <CustomMyProfileContentDiv>
                  <Row justify="space-between">
                    <Col>
                      <Typography
                        name="Body 2/Medium"
                        color={token?.colorPrimaryText}
                      >
                        Change Password
                      </Typography>
                    </Col>
                    <Col>
                      {!changePasswordEditable ? (
                        <Space size={5}>
                          <OsButton
                            text="Cancel"
                            buttontype="SECONDARY"
                            clickHandler={() => {
                              setChangePasswordEditable(true);
                            }}
                          />
                          <OsButton
                            text="Save"
                            buttontype="PRIMARY"
                            clickHandler={changePasswordForm?.submit}
                          />
                        </Space>
                      ) : (
                        <OsButton
                          text="Edit"
                          buttontype="PRIMARY"
                          icon={<PencilSquareIcon width={20} />}
                          clickHandler={() => {
                            setChangePasswordEditable(false);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <ChangePassword
                    onFinish={changePasswordValue}
                    form={changePasswordForm}
                    isEditable={changePasswordEditable}
                  />
                </CustomMyProfileContentDiv>
              </>
            )}
          </Space>
        </Row>
      </GlobalLoader>
    </>
  );
};
export default MyProfile;
