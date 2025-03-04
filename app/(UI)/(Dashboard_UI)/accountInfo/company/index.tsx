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
import Typography from '@/app/components/common/typography';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import {insertAddAddress} from '../../../../../../redux/actions/address';
import {
  getCompanyByUserId,
  insertCompany,
} from '../../../../../../redux/actions/company';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {CustomMyProfileContentDiv} from '../myProfile/styled-components';
import EditCompanyDetails from './EditCompanyDetails';

const MyCompany = () => {
  const [token] = useThemeToken();
  const [companyDetailForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getUserID = searchParams.get('id');
  const getRole = searchParams.get('role');
  const [profileDetailEditable, setProfileDetailEditable] =
    useState<boolean>(true);
  const [companyData, setCompanyData] = useState<any>();
  const [companyProfileData, setCompanyProfileData] = useState<any>();
  const {loading} = useAppSelector((state) => state.user);
  const {company} = useAppSelector((state) => state.company);

  useEffect(() => {
    if (company) {
      companyDetailForm.setFieldsValue({
        company_name: company?.company_name,
        shiping_address_line: company?.Address?.shiping_address_line,
        shiping_city: company?.Address?.shiping_city,
        shiping_state: company?.Address?.shiping_state,
        shiping_pin_code: company?.Address?.shiping_pin_code,
        shiping_country: company?.Address?.shiping_country,
      });
      setCompanyData(company);
      setCompanyProfileData({
        company_name: company?.company_name,
        user_role: '',
        job_title: '',
        profile_image: company?.company_logo,
        company_id: company?.id,
      });
    }
  }, [company]);

  useEffect(() => {
    if (getUserID) {
      dispatch(getCompanyByUserId({user_id: getUserID}));
    }
  }, [getUserID]);

  const updateCompanyDetail = () => {
    const companyFormData = companyDetailForm?.getFieldsValue();
    if (companyFormData) {
      dispatch(
        insertCompany({
          ...companyFormData,
          user_id: Number(getUserID),
          id: companyData?.id,
        }),
      ).then((d: any) => {
        if (d?.payload) {
          const newAddressObj: any = {
            ...companyFormData,
            company_id: d?.payload?.id,
            id: companyData?.Address?.id,
          };
          return dispatch(insertAddAddress(newAddressObj)).then((d: any) => {
            if (d?.payload) {
              dispatch(getCompanyByUserId({user_id: getUserID}));
              setProfileDetailEditable(true);
            }
          });
        }
      });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalLoader loading={loading}>
        <Row justify="space-between" style={{width: '100%'}} gutter={[16, 16]}>
          <MyProfileCard data={companyProfileData} isCompanyData />
          <Space direction="vertical" size={24} style={{width: '100%'}}>
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
                        Company Details
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
                            clickHandler={companyDetailForm?.submit}
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
                  <EditCompanyDetails
                    onFinish={updateCompanyDetail}
                    form={companyDetailForm}
                    isEditable={profileDetailEditable}
                  />
                </CustomMyProfileContentDiv>
              </>
            )}
          </Space>
        </Row>
      </GlobalLoader>
    </Suspense>
  );
};
export default MyCompany;
