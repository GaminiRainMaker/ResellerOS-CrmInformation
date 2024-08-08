'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {insertAssignPartnerProgram} from '../../../../../redux/actions/assignPartnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsPartnerProgramSelect from '../os-partner-program-select';
import OsPartnerSelect from '../os-partner-select';
import {RequestPartnerInterface} from './os-add-partner.interface';
import {usePathname} from 'next/navigation';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import CommonSelect from '../os-select';
import {
  getAllPartnerandProgramFilterData,
  getAllPartnerandProgramFilterDataForOrganizationOnly,
} from '../../../../../redux/actions/partner';
import {PlusIcon} from '@heroicons/react/24/outline';
import OsModal from '../os-modal';
import AddPartner from '.';

const RequestPartner: React.FC<RequestPartnerInterface> = ({
  form,
  setOpen,
  setRequestPartnerLoading,
  getPartnerData,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const {
    AllPartnerandProgramFilterData,
    insertPartnerData,
    insertPartnerLoading,
  } = useAppSelector((state) => state.partner);
  const pathname = usePathname();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [partnerValue, setPartnerValue] = useState<number>();
  const [getTheData, setGetTheData] = useState<boolean>(false);
  const [openAddPartnerModal, setOpenAddPartnerModal] =
    useState<boolean>(false);

  useEffect(() => {
    setGetTheData(true);
  }, []);

  const onFinish = async (value: any) => {
    if (!partnerValue) {
      return;
    }
    try {
      setRequestPartnerLoading(true);
      const partnerObj = {
        ...value,
        organization: userInformation?.organization,
        requested_by: userInformation?.id,
        new_request: true,
      };
      if (partnerObj) {
        await dispatch(insertAssignPartnerProgram(partnerObj));
      }
      form?.resetFields();
      getPartnerData();
      setGetTheData(true);

      setRequestPartnerLoading(false);
    } catch (error) {
      // Handle errors here
      setRequestPartnerLoading(false);
      console.error('Error occurred:', error);
    } finally {
      setRequestPartnerLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(getAllPartnerandProgramFilterDataForOrganizationOnly({}));
  }, []);

  console.log(
    'AllPartnerandProgramFilterData',
    AllPartnerandProgramFilterData,
    'insertPartnerData',
    insertPartnerData,

    'partnerOptions',
    partnerOptions,
  );

  useEffect(() => {
    const opportunityOptions = AllPartnerandProgramFilterData?.map(
      (opportunity: any) => ({
        value: opportunity.id,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {opportunity.title}
          </Typography>
        ),
      }),
    );
    setPartnerOptions(opportunityOptions);
  }, [AllPartnerandProgramFilterData]);

  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 10px 0px 0px',
        }}
        gutter={[0, 16]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Request New Partner
        </Typography>
      </Row>

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              {/* <OsPartnerSelect
                name="partner_id"
                setPartnerValue={setPartnerValue}
                partnerValue={partnerValue}
                // form={form}
                partnerProgramName="partner_program_id"
                isRequired
                isSuperAdmin={false}
                notApprovedData
                isAddNewPartner
                allPartnerData={allPartnerData}
                setAllPartnerData={setAllPartnerData}
                getTheData={getTheData}
                setGetTheData={setGetTheData}
              /> */}

              <SelectFormItem>
                <CommonSelect
                  placeholder="Select Partner"
                  style={{width: '100%'}}
                  dropdownRender={(menu) => (
                    <>
                      <Space
                        style={{cursor: 'pointer'}}
                        size={8}
                        onClick={() => setOpenAddPartnerModal(true)}
                      >
                        <PlusIcon
                          width={24}
                          color={token?.colorInfoBorder}
                          style={{marginTop: '5px'}}
                        />
                        <Typography
                          color={token?.colorPrimaryText}
                          name="Body 3/Regular"
                          cursor="pointer"
                        >
                          Request Partner
                        </Typography>
                      </Space>

                      {menu}
                    </>
                  )}
                />
              </SelectFormItem>
            </Col>

            <Col sm={24} md={12}>
              {/* <OsPartnerProgramSelect
                name="partner_program_id"
                partnerId={partnerValue}
                form={form}
                isRequired
                isAddNewProgram
                notApprovedData
                allPartnerData={allPartnerData}
              /> */}
            </Col>
          </Row>
        </Form>
      </Space>

      <OsModal
        loading={insertPartnerLoading}
        body={<AddPartner form={form} setOpen={setOpenAddPartnerModal} />}
        width={600}
        open={openAddPartnerModal}
        onCancel={() => {
          setOpenAddPartnerModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={form?.submit}
        footerPadding={30}
      />
    </>
  );
};

export default RequestPartner;
