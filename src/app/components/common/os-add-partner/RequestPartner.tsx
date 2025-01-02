'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import {mergeArrayWithObject} from '@/app/utils/base';
import {Form} from 'antd';
import {Suspense, useEffect, useState} from 'react';

import {formatStatus} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Option} from 'antd/lib/mentions';
import {useSearchParams} from 'next/navigation';
import AddPartner from '.';
import {
  addAssignPartnerProgramSalesForce,
  getAllOrgApprovedDataSalesForce,
  insertAssignPartnerProgram,
} from '../../../../../redux/actions/assignPartnerProgram';
import {
  getAllPartnerandProgramApprovedDataSalesForce,
  getAllPartnerandProgramFilterDataForOrganizationOnly,
} from '../../../../../redux/actions/partner';
import {upadteToRequestPartnerandprogramfromAmin} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Checkbox} from '../antd/Checkbox';
import CustomTextCapitalization from '../hooks/CustomTextCapitalizationHook';
import useDebounceHook from '../hooks/useDebounceHook';
import AddPartnerProgram from '../os-add-partner-program';
import OsInput from '../os-input';
import OsModal from '../os-modal';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import CommonSelect from '../os-select';
import OsTabs from '../os-tabs';
import {RequestPartnerInterface} from './os-add-partner.interface';
import {sendPartnerRequestEmail} from '../../../../../redux/actions/auth';

const RequestPartner: React.FC<RequestPartnerInterface> = ({
  form,
  setOpen,
  setRequestPartnerLoading,
  getPartnerData,
  partnerProgramNewId,
  setPartnerProgramNewId,
  partnerNewId,
  setPartnerNewId,
  setShowModal,
}) => {
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const salesForceUrl = searchParams.get('instance_url');
  const salesForceOrgId = searchParams.get('org');
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
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();
  const [partnerVal, setPartnerVal] = useState<number>();
  const [activetab, setActiveTab] = useState<string>('1');
  const [getTheData, setGetTheData] = useState<boolean>(false);
  const [filteredPartners, setFilteredPartners] = useState<any>();
  const [rows, setRows] = useState<{partner: string; program: string}[]>([]);

  const [openAddPartnerModal, setOpenAddPartnerModal] =
    useState<boolean>(false);
  const [openAddProgramModal, setOpenAddProgramModal] =
    useState<boolean>(false);
  const [dealerRelationShip, setDealerRelationShip] = useState<boolean>(false);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<{
    partner: string | null;
    program: string | null;
  }>({
    partner: null,
    program: null,
  });

  const searchQuery = useDebounceHook(query, 400);

  const requestForNewPartnerAndPartnerProgram = async () => {
    setRequestLoading(true);
    if (activetab === '1' && salesForceUrl) {
      const selectedData = rows.map((row) => ({
        admin_request: true,
        new_request: false,
        organization: salesForceOrgId,
        partner_program_id: JSON.parse(row?.program)?.id,
        program_name: JSON.parse(row?.program)?.partner_program,
      }));
      // Call the API for each object in selectedData
      for (const data of selectedData) {
        try {
          await dispatch(addAssignPartnerProgramSalesForce(data))?.then((d) => {
            if (d?.payload) {
              dispatch(
                sendPartnerRequestEmail({
                  organizationName: data?.organization,
                  programName: data?.program_name,
                }),
              );
            }
          });
          console.log('Successfully assigned partner program:', data);
          setShowModal(false);
          setRequestLoading(false);
        } catch (error) {
          setShowModal(false);
          setRequestLoading(false);
          console.error('Error assigning partner program:', error);
        }
      }
    } else {
      let data = {
        partner_id: partnerNewId?.value,
        partner_program_id: partnerProgramNewId?.value,
        type: 'approve',
        valueUpdate: false,
        dealer_relationship: salesForceUrl ? dealerRelationShip : false,
      };
      dispatch(upadteToRequestPartnerandprogramfromAmin(data));
      setPartnerNewId({});
      setPartnerProgramNewId({});
      setShowModal(false);
      setRequestLoading(false);
      getPartnerData && getPartnerData();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!salesForceOrgId) return;

      try {
        // Fetch partner data
        const partnerData = await dispatch(
          getAllPartnerandProgramApprovedDataSalesForce(''),
        );
        const partners: any = Array.isArray(partnerData?.payload)
          ? partnerData.payload
          : []; // Ensure it's an array

        if (partners.length > 0) {
          // Fetch organization data
          const orgData = await dispatch(
            getAllOrgApprovedDataSalesForce({organization: salesForceOrgId}),
          );
          const orgs: any = Array.isArray(orgData?.payload)
            ? orgData.payload
            : []; // Ensure it's an array

          // Filter PartnerPrograms
          const updatedPartnerData = partners
            .map((partner: any) => ({
              ...partner,
              PartnerPrograms: partner.PartnerPrograms.filter(
                (program: any) =>
                  !orgs.some(
                    (org: any) => org.partner_program_id === program.id,
                  ),
              ),
            }))
            .filter((partner: any) => partner.PartnerPrograms.length > 0); // Remove partners with empty PartnerPrograms
          setFilteredPartners(updatedPartnerData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [
    salesForceOrgId,
    dispatch,
    getAllPartnerandProgramApprovedDataSalesForce,
    getAllOrgApprovedDataSalesForce,
  ]);

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
        partner_id: JSON.parse(value?.partner_id)?.id,
        partner_program_id: JSON.parse(value?.partner_program_id)?.id,
        new_request: false,
      };
      if (partnerObj) {
        await dispatch(insertAssignPartnerProgram(partnerObj));
      }
      form?.resetFields();
      getPartnerData && getPartnerData();
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
    if (!salesForceUrl) {
      dispatch(
        getAllPartnerandProgramFilterDataForOrganizationOnly(searchQuery),
      );
    }
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
        value: JSON.stringify(partner),
        label: <CustomTextCapitalization text={partner?.partner} />,
        key: partner?.id,
      }));
    setPartnerOptions(partnerOptions);
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
        value: JSON.stringify(program),
        label: <CustomTextCapitalization text={program?.partner_program} />,
        key: program?.id,
      }));
    setPartnerProgramOptions(partnerProgram);
  }, [partnerVal, insertProgramData]);

  useEffect(() => {
    if (insertPartnerData && Object?.keys(insertPartnerData)?.length > 0) {
      form.setFieldsValue({partner_id: JSON.stringify(insertPartnerData)});
      setPartnerVal(insertPartnerData?.id);
    }
    if (insertProgramData && Object?.keys(insertProgramData)?.length > 0) {
      form.setFieldsValue({
        partner_program_id: JSON.stringify(insertProgramData),
      });
    }
  }, [insertPartnerData, insertProgramData]);

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, {partner: '', program: ''}]);
  };

  const handleSelectChange = (
    value: string,
    index: number,
    type: 'partner' | 'program',
  ) => {
    const newRows = [...rows];
    newRows[index][type] = value;

    // If Partner is changed, reset the Program selection for that row
    if (type === 'partner') {
      newRows[index].program = ''; // Reset program when partner changes
    }
    setRows(newRows);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
            Add new Partner and Partner Program
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
            {salesForceUrl ? (
              <OsTabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                  {
                    label: (
                      <Typography name="Body 4/Regular">
                        Existing Partner
                      </Typography>
                    ),
                    key: '1',
                    children: (
                      <div>
                        {rows.map((row, index) => (
                          <Row
                            align="middle"
                            gutter={[16, 16]}
                            key={index}
                            style={{
                              marginBottom: '8px',
                            }}
                            justify={'space-between'}
                          >
                            <Col span={10}>
                              <CommonSelect
                                value={row.partner}
                                onChange={(value) =>
                                  handleSelectChange(value, index, 'partner')
                                }
                                style={{width: '100%'}}
                                placeholder="Select Partner"
                                allowClear
                              >
                                {filteredPartners?.map((partner: any) => (
                                  <Option key={partner?.id} value={partner?.id}>
                                    <CustomTextCapitalization
                                      text={partner?.partner}
                                    />
                                  </Option>
                                ))}
                              </CommonSelect>
                            </Col>

                            <Col span={10}>
                              <CommonSelect
                                value={row.program}
                                onChange={(value) =>
                                  handleSelectChange(value, index, 'program')
                                }
                                style={{width: '100%'}}
                                placeholder="Select Program"
                                allowClear
                                disabled={!row.partner} // Disable Program select if no Partner is selected
                              >
                                {row?.partner &&
                                  filteredPartners
                                    .find(
                                      (partner: any) =>
                                        partner.id === row.partner,
                                    )
                                    ?.PartnerPrograms?.map((program: any) => {
                                      // Check if PartnerPrograms is an array of objects or strings
                                      if (typeof program === 'object') {
                                        return (
                                          <Option
                                            key={program?.id}
                                            value={JSON.stringify(program)}
                                          >
                                            <CustomTextCapitalization
                                              text={program?.partner_program}
                                            />

                                            {/* Assuming program.name contains the program name */}
                                          </Option>
                                        );
                                      } else {
                                        // If it's already a string (e.g., program name)
                                        return (
                                          <Option key={program} value={program}>
                                            {program}
                                          </Option>
                                        );
                                      }
                                    })}
                              </CommonSelect>
                            </Col>

                            <Col
                              span={4}
                              style={{
                                paddingTop: '5px',
                              }}
                            >
                              <TrashIcon
                                width={25}
                                color={token?.colorError}
                                onClick={() => handleDeleteRow(index)}
                                cursor="pointer"
                              />
                            </Col>
                          </Row>
                        ))}

                        <Space
                          size={4}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                          }}
                          onClick={handleAddRow}
                        >
                          <PlusIcon
                            width={24}
                            color={token?.colorLink}
                            style={{marginTop: '5px'}}
                          />
                          <Typography
                            name="Body 3/Bold"
                            color={token?.colorLink}
                            cursor="pointer"
                          >
                            Add Partner and Partner Program
                          </Typography>
                        </Space>
                      </div>
                    ),
                  },
                  {
                    label: (
                      <Typography name="Body 4/Regular">New Partner</Typography>
                    ),
                    key: '2',
                    children: (
                      <>
                        <Row justify="space-between" gutter={[24, 24]}>
                          <Col sm={24} md={12}>
                            <SelectFormItem
                              label={
                                <Typography name="Body 4/Medium">
                                  Partner
                                </Typography>
                              }
                            >
                              {partnerNewId?.value ? (
                                <OsInput
                                  disabled
                                  style={{width: '70%'}}
                                  value={formatStatus(partnerNewId?.name)}
                                />
                              ) : (
                                <Typography
                                  name="Body 3/Regular"
                                  color={token?.colorLinkHover}
                                  onClick={() => setOpenAddPartnerModal(true)}
                                >
                                  {' '}
                                  + Add New Partner
                                </Typography>
                              )}
                            </SelectFormItem>
                          </Col>

                          <Col sm={24} md={12}>
                            <SelectFormItem
                              label={
                                <Typography name="Body 4/Medium">
                                  Partner Program
                                </Typography>
                              }
                            >
                              {partnerProgramNewId?.value ? (
                                <OsInput
                                  disabled
                                  style={{width: '70%'}}
                                  value={formatStatus(
                                    partnerProgramNewId?.name,
                                  )}
                                />
                              ) : (
                                <Typography
                                  name="Body 3/Regular"
                                  color={token?.colorLinkHover}
                                  onClick={() => {
                                    if (partnerNewId?.value) {
                                      setOpenAddProgramModal(true);
                                    }
                                  }}
                                >
                                  {' '}
                                  + Add New Program Partner
                                </Typography>
                              )}
                            </SelectFormItem>
                          </Col>
                        </Row>

                        {salesForceUrl && (
                          <Row
                            style={{
                              marginTop: '40px',
                            }}
                          >
                            <Space size={15}>
                              <Checkbox
                                onChange={(e) => {
                                  setDealerRelationShip(e?.target?.checked);
                                }}
                              />
                              <Typography name="Body 4/Medium">
                                Do you have authorized dealer relationship with
                                these entities?
                              </Typography>
                            </Space>
                          </Row>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            ) : (
              <Row justify="space-between" gutter={[24, 24]}>
                <Col sm={24} md={12}>
                  <SelectFormItem
                    label={
                      <Typography name="Body 4/Medium">Partner</Typography>
                    }
                  >
                    {partnerNewId?.value ? (
                      <OsInput
                        disabled
                        style={{width: '70%'}}
                        value={formatStatus(partnerNewId?.name)}
                      />
                    ) : (
                      <Typography
                        name="Body 3/Regular"
                        color={token?.colorLinkHover}
                        onClick={() => setOpenAddPartnerModal(true)}
                      >
                        {' '}
                        + Add New Partner
                      </Typography>
                    )}
                  </SelectFormItem>
                </Col>

                <Col sm={24} md={12}>
                  <SelectFormItem
                    label={
                      <Typography name="Body 4/Medium">
                        Partner Program
                      </Typography>
                    }
                  >
                    {partnerProgramNewId?.value ? (
                      <OsInput
                        disabled
                        style={{width: '70%'}}
                        value={formatStatus(partnerProgramNewId?.name)}
                      />
                    ) : (
                      <Typography
                        name="Body 3/Regular"
                        color={token?.colorLinkHover}
                        onClick={() => {
                          if (partnerNewId?.value) {
                            setOpenAddProgramModal(true);
                          }
                        }}
                      >
                        {' '}
                        + Add New Program Partner
                      </Typography>
                    )}
                  </SelectFormItem>
                </Col>
              </Row>
            )}
          </Form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
            }}
          >
            <OsButton
              loading={requestLoading}
              text="Request"
              buttontype="PRIMARY"
              clickHandler={requestForNewPartnerAndPartnerProgram}
            />
          </div>
        </Space>

        <OsModal
          loading={insertPartnerLoading}
          body={
            <AddPartner
              form={addPartnerform}
              setPartnerNewId={setPartnerNewId}
              setOpen={setOpenAddPartnerModal}
            />
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
              setPartnerProgramNewId={setPartnerProgramNewId}
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
      </Suspense>
    </>
  );
};

export default RequestPartner;
