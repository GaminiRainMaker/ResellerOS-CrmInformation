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
import {mergeArrayWithObject} from '@/app/utils/base';
import useDebounceHook from '../hooks/useDebounceHook';
import AddPartnerProgram from '../os-add-partner-program';

const RequestPartner: React.FC<RequestPartnerInterface> = ({
  form,
  setOpen,
  setRequestPartnerLoading,
  getPartnerData,
}) => {
  const [token] = useThemeToken();
  const [addPartnerform] = Form.useForm();
  const [addPartnerProgram] = Form.useForm();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const {
    AllPartnerandProgramFilterData,
    insertPartnerData,
    insertPartnerLoading,
  } = useAppSelector((state) => state.partner);
  const {insertProgramLoading, insertProgramData} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const pathname = usePathname();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();
  const [partnerVal, setPartnerVal] = useState<number>();
  const [partnerValue, setPartnerValue] = useState<number>();
  const [getTheData, setGetTheData] = useState<boolean>(false);
  const [openAddPartnerModal, setOpenAddPartnerModal] =
    useState<boolean>(false);
  const [openAddProgramModal, setOpenAddProgramModal] =
    useState<boolean>(false);
  const [query, setQuery] = useState<{
    partner: string | null;
    program: string | null;
  }>({
    partner: null,
    program: null,
  });

  const searchQuery = useDebounceHook(query, 400);

  useEffect(() => {
    setGetTheData(true);
  }, []);

  const onFinish = async (value: any) => {
    if (!partnerVal) {
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
      console.log('partnerObj', partnerObj);
      return;
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
    dispatch(getAllPartnerandProgramFilterDataForOrganizationOnly(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    const mergedArray = mergeArrayWithObject(
      AllPartnerandProgramFilterData,
      insertPartnerData,
    );
    const partnerOptions =
      mergedArray &&
      mergedArray?.length > 0 &&
      mergedArray?.map((partner: any) => ({
        value: partner?.partner,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {partner?.partner}
          </Typography>
        ),
        key: partner?.id,
      }));
    setPartnerOptions(partnerOptions);
    // if (insertPartnerData) {
    //   form.setFieldsValue(['partner_id', insertPartnerData?.id]);
    // }
  }, [JSON.stringify(AllPartnerandProgramFilterData), insertPartnerData]);

  useEffect(() => {
    const filteredPartnerProgramData = AllPartnerandProgramFilterData?.filter(
      (dataItem: any) => dataItem?.id === partnerVal,
    );
    const mergedArray = mergeArrayWithObject(
      filteredPartnerProgramData?.[0]?.PartnerPrograms,
      insertProgramData,
    );
    const partnerProgram =
      mergedArray &&
      mergedArray?.length > 0 &&
      mergedArray?.map((program: any) => ({
        value: program?.partner_program,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {program?.partner_program}
          </Typography>
        ),
        key: program?.id,
      }));
    setPartnerProgramOptions(partnerProgram);
    // if (insertProgramData) {
    //   form.setFieldsValue(['partner_program_id', insertProgramData?.id]);
    // }
  }, [partnerVal, insertProgramData]);

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
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Partner</Typography>}
                name="partner_id"
                rules={[
                  {
                    required: true,
                    message: 'Partner is required!',
                  },
                ]}
              >
                <CommonSelect
                  allowClear
                  showSearch
                  placeholder="Select Partner"
                  // defaultValue={insertPartnerData?.partner}
                  style={{width: '100%'}}
                  options={partnerOptions}
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
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      partner: e,
                    });
                  }}
                  onChange={(e, record: any) => {
                    console.log('dataaa', record?.key);
                    setPartnerVal(record?.key);
                  }}
                  onClear={() =>
                    setQuery({
                      ...query,
                      partner: null,
                      program: null,
                    })
                  }
                />
              </SelectFormItem>
            </Col>

            <Col sm={24} md={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Partner Program</Typography>
                }
                name="partner_program_id"
                rules={[
                  {
                    required: true,
                    message: 'Partner Program is required!',
                  },
                ]}
              >
                <CommonSelect
                  // defaultValue={insertProgramData?.partner_program}
                  allowClear
                  showSearch
                  placeholder="Select Partner Program"
                  style={{width: '100%'}}
                  options={partnerProgramOptions}
                  dropdownRender={(menu) => (
                    <>
                      <Space
                        style={{cursor: 'pointer'}}
                        size={8}
                        onClick={() => setOpenAddProgramModal(true)}
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
                          Request Partner Program
                        </Typography>
                      </Space>

                      {menu}
                    </>
                  )}
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      program: e,
                    });
                  }}
                  onChange={(e, record: any) => {
                    console.log('dataaa', record?.key);
                  }}
                  onClear={() =>
                    setQuery({
                      ...query,
                      program: null,
                    })
                  }
                />
              </SelectFormItem>
            </Col>
          </Row>
        </Form>
      </Space>

      <OsModal
        loading={insertPartnerLoading}
        body={
          <AddPartner form={addPartnerform} setOpen={setOpenAddPartnerModal} />
        }
        width={600}
        open={openAddPartnerModal}
        onCancel={() => {
          setOpenAddPartnerModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={addPartnerform?.submit}
        footerPadding={30}
      />

      <OsModal
        loading={insertProgramLoading}
        body={
          <AddPartnerProgram
            form={addPartnerProgram}
            setOpen={setOpenAddProgramModal}
            partnerId={partnerVal}
          />
        }
        width={600}
        open={openAddProgramModal}
        onCancel={() => {
          setOpenAddProgramModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={addPartnerProgram?.submit}
        footerPadding={30}
      />
    </>
  );
};

export default RequestPartner;
