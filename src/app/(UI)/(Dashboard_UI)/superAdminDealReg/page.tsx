/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import OsDrawer from '@/app/components/common/os-drawer';
import {
  insertAttributeField,
  queryAttributeField,
  updateAttributeFieldById,
} from '../../../../../redux/actions/attributeField';
import {
  insertAttributeSection,
  queryAttributeSection,
  updateAttributeSectionById,
} from '../../../../../redux/actions/attributeSection';
import {
  getFormDataProgram,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddNewStandardAttributeSection from './AddNewStandardAttributeSection';
import AddStandardAttributeField from './AddStandardAttributeField';
import SuperAdminDealRegAnalytic from './superAdminDealRegAnalytic';
import {
  standardAttributes,
  standardAttributesSection,
  templateColumns,
} from './templateColumns';

const SuperAdminDealReg = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {data: attributeSectionData, loading: attributeSectionLoading} =
    useAppSelector((state) => state.attributeSection);
  const {loading: attributeFieldLoading, data: attributeFieldData} =
    useAppSelector((state) => state.attributeField);
  const {getFormDataProgramData} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [showStandardAttributeField, setshowStandardAttributeField] =
    useState<boolean>(false);
  const [showStandardAttributeSection, setShowStandardAttributeSection] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>();
  const [recordId, setRecordId] = useState<number>();
  const [formData, setformData] = useState<any>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [showSectionDrawer, setShowSectionDrawer] = useState<boolean>(false);
  const [showFieldDrawer, setShowFieldDrawer] = useState<boolean>(false);

  const [query, setQuery] = useState<{
    fieldLabel: string | null;
    sectionName: string | null;
  }>({
    fieldLabel: null,
    sectionName: null,
  });

  const [attributeSectionQuery, setAttributeSectionQuery] = useState<{
    sectionName: string | null;
  }>({
    sectionName: null,
  });
  const searchQuery = useDebounceHook(query, 400);
  const sectionSearchQuery = useDebounceHook(attributeSectionQuery, 400);

  useEffect(() => {
    dispatch(getFormDataProgram());
  }, []);

  useEffect(() => {
    dispatch(queryAttributeField(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    dispatch(queryAttributeSection(sectionSearchQuery));
  }, [sectionSearchQuery]);

  const statusWrapper = (item: any) => {
    const getStatus = () => item;
    return <OsStatusWrapper value={getStatus()} />;
  };

  const editTemplate = (record: any) => {
    if (record?.form_data) {
      setOpenPreviewModal(true);
      const formDataObject = JSON?.parse(record?.form_data);
      setformData({formObject: formDataObject, Id: record?.id});
    }
  };

  const editAttributeSection = (record: any) => {
    setRecordId(record?.id);
    form.setFieldsValue({
      name: record?.name,
      order: record?.order,
      is_active: record?.is_active,
      is_required: record?.is_required,
      is_view: record?.is_view,
    });
    setShowSectionDrawer(true);
  };

  const editAttributeField = (record: any) => {
    setRecordId(record?.id);
    form.setFieldsValue({
      name: record?.name,
      label: record?.label,
      data_type: record?.data_type,
      order: record?.order,
      map_from: record?.map_from,
      map_to: record?.map_to,
      help_text: record?.help_text,
      attribute_section_id: record?.attribute_section_id,
      is_active: record?.is_active,
      is_required: record?.is_required,
      is_view: record?.is_view,
    });
    setShowFieldDrawer(true);
  };
  const setDeleteIds = () => {};
  const updateTemplate = (recordid: number, value: boolean) => {
    dispatch(
      updatePartnerProgramById({id: recordid, form_data_active: value}),
    ).then((d) => {
      if (d?.payload) {
        dispatch(getFormDataProgram());
      }
    });
  };

  const TemplateColumns = templateColumns(
    token,
    statusWrapper,
    editTemplate,
    updateTemplate,
    setDeleteIds,
    setShowModalDelete,
  );

  const StandardAttributesFieldsColumns = standardAttributes(
    token,
    statusWrapper,
    editAttributeField,
    setDeleteIds,
    setShowModalDelete,
  );

  const StandardAttributesSectionColumns = standardAttributesSection(
    token,
    editAttributeSection,
    setDeleteIds,
    setShowModalDelete,
  );

  const superAdmintabItems = [
    {
      label: (
        <Typography
          onClick={() => {
            setActiveTab(1);
          }}
          cursor="pointer"
          name="Body 4/Regular"
        >
          Templates
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          columns={TemplateColumns}
          dataSource={getFormDataProgramData}
          scroll
          locale={[]}
          loading={attributeFieldLoading}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(3);
          }}
          name="Body 4/Regular"
        >
          Standard Attributes Sections
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={StandardAttributesSectionColumns}
          dataSource={attributeSectionData}
          scroll
          locale={[]}
          loading={attributeSectionLoading}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Standard Attributes Fields
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={StandardAttributesFieldsColumns}
          dataSource={attributeFieldData}
          scroll
          locale={[]}
          loading={false}
        />
      ),
    },
  ];

  const onFinish = () => {
    const attributeSectionFormData = form?.getFieldsValue();
    dispatch(insertAttributeSection(attributeSectionFormData))?.then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeSection(sectionSearchQuery));
        setShowStandardAttributeSection(false);
        form?.resetFields();
      }
    });
  };

  const onUpdateSection = () => {
    const Data = form?.getFieldsValue();
    const obj = {
      id: recordId,
      ...Data,
    };
    dispatch(updateAttributeSectionById(obj))?.then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeSection(sectionSearchQuery));
        setShowSectionDrawer(false);
        form?.resetFields();
      }
    });
  };

  const onUpdateField = () => {
    const Data = form?.getFieldsValue();
    const obj = {
      id: recordId,
      ...Data,
    };
    dispatch(updateAttributeFieldById(obj))?.then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeField(searchQuery));
        setShowFieldDrawer(false);
        form?.resetFields();
      }
    });
  };

  const onFinish2 = () => {
    const attributeFiledData = form?.getFieldsValue();
    attributeFiledData.label = attributeFiledData.label.toLowerCase();
    dispatch(insertAttributeField(attributeFiledData))?.then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeField(searchQuery));
        setshowStandardAttributeField(false);
        form?.resetFields();
      }
    });
  };

  const uniqueAttributeSection = Array.from(
    new Set(
      attributeFieldData?.map(
        (customer: any) => customer?.AttributeSection?.name,
      ),
    ),
  );
  const uniqueAttributeLabel = Array.from(
    new Set(attributeFieldData?.map((customer: any) => customer?.label)),
  );

  const uniqueAttributeSectionOptions = Array.from(
    new Set(
      attributeSectionData?.map(
        (attributeSectionIndex: any) => attributeSectionIndex?.name,
      ),
    ),
  );

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <SuperAdminDealRegAnalytic data={[]} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Registered Forms
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              <OsButton
                text="New Standard Attribute Section"
                buttontype="SECONDARY"
                icon={<PlusIcon color={token?.colorPrimary} />}
                clickHandler={() => {
                  setShowStandardAttributeSection(true);
                }}
              />

              <OsButton
                text="New Attribute Fields"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setshowStandardAttributeField(true);
                }}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              <Form layout="vertical">
                {activeTab === 2 ? (
                  <Space size={12}>
                    <Form.Item label="Attribute Label">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                        showSearch
                        onSearch={(e) => {
                          setQuery({
                            ...query,
                            fieldLabel: e,
                          });
                        }}
                        onChange={(e) => {
                          setQuery({
                            ...query,
                            fieldLabel: e,
                          });
                        }}
                        value={query?.fieldLabel}
                      >
                        {uniqueAttributeLabel?.map((customer: any) => (
                          <Option key={customer} value={customer}>
                            {customer}
                          </Option>
                        ))}
                      </CommonSelect>
                    </Form.Item>

                    <Form.Item label="Attribute Section">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                        showSearch
                        onSearch={(e) => {
                          setQuery({
                            ...query,
                            sectionName: e,
                          });
                        }}
                        onChange={(e) => {
                          setQuery({
                            ...query,
                            sectionName: e,
                          });
                        }}
                        value={query?.sectionName}
                      >
                        {uniqueAttributeSection?.map((customer: any) => (
                          <Option key={customer} value={customer}>
                            {customer}
                          </Option>
                        ))}
                      </CommonSelect>
                    </Form.Item>
                    <Typography
                      cursor="pointer"
                      name="Button 1"
                      color="#C6CDD5"
                      onClick={() => {
                        setQuery({
                          fieldLabel: null,
                          sectionName: null,
                        });
                      }}
                    >
                      Reset
                    </Typography>
                  </Space>
                ) : activeTab === 3 ? (
                  <Space size={12}>
                    <Form.Item label="Attribute Section">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                        showSearch
                        onSearch={(e) => {
                          setAttributeSectionQuery({
                            ...attributeSectionQuery,
                            sectionName: e,
                          });
                        }}
                        onChange={(e) => {
                          setAttributeSectionQuery({
                            ...attributeSectionQuery,
                            sectionName: e,
                          });
                        }}
                        value={attributeSectionQuery?.sectionName}
                      >
                        {uniqueAttributeSectionOptions?.map((data: any) => (
                          <Option key={data} value={data}>
                            {data}
                          </Option>
                        ))}
                      </CommonSelect>
                    </Form.Item>
                    <Typography
                      cursor="pointer"
                      name="Button 1"
                      color="#C6CDD5"
                      onClick={() => {
                        setAttributeSectionQuery({
                          sectionName: null,
                        });
                      }}
                    >
                      Reset
                    </Typography>
                  </Space>
                ) : (
                  <></>
                )}
              </Form>
            }
            items={superAdmintabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={attributeSectionLoading}
        body={
          <AddNewStandardAttributeSection form={form} onFinish={onFinish} />
        }
        width={700}
        open={showStandardAttributeSection}
        onCancel={() => {
          setShowStandardAttributeSection(false);
          form?.resetFields();
        }}
        onOk={() => {
          form?.submit();
        }}
        secondaryButtonText="Cancel"
        primaryButtonText="Save"
        footerPadding={40}
      />

      <OsModal
        loading={false}
        thirdLoading={attributeFieldLoading}
        body={<AddStandardAttributeField form={form} onFinish={onFinish2} />}
        width={700}
        open={showStandardAttributeField}
        onCancel={() => {
          setshowStandardAttributeField(false);
          form?.resetFields();
        }}
        onOk={() => {}}
        thirdButtonfunction={() => {
          form?.submit();
        }}
        thirdButtonText="Create"
        primaryButtonText="Save and Create New"
        // secondaryButtonText='Cancel'
        footerPadding={40}
      />

      <OsModal
        bodyPadding={22}
        loading={false}
        body={
          <>
            {' '}
            <FormBuilderMain
              cartItems={formData?.formObject}
              form={form}
              // eslint-disable-next-line react/jsx-boolean-value
              previewFile
            />
            <Space
              align="end"
              size={8}
              style={{display: 'flex', justifyContent: 'end'}}
            >
              <OsButton
                buttontype="PRIMARY"
                text="EDIT"
                color="red"
                clickHandler={() => {
                  router?.push(`/formBuilder?id=${formData?.Id}`);
                }}
              />{' '}
            </Space>
          </>
        }
        width={900}
        open={openPreviewModal}
        onCancel={() => {
          setOpenPreviewModal(false);
        }}
      />

      <OsDrawer
        title={
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Edit Standard Attribute Section
          </Typography>
        }
        placement="right"
        onClose={() => {
          setShowSectionDrawer(false);
          form?.resetFields();
        }}
        open={showSectionDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              loading={attributeSectionLoading}
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE CHANGES"
              clickHandler={() => {
                form.submit();
              }}
            />
          </Row>
        }
      >
        <AddNewStandardAttributeSection
          form={form}
          onFinish={onUpdateSection}
          isDrawer
        />
      </OsDrawer>

      <OsDrawer
        title={
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Edit Standard Attribute Fields
          </Typography>
        }
        placement="right"
        onClose={() => {
          setShowFieldDrawer(false);
          form?.resetFields();
        }}
        open={showFieldDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              loading={attributeFieldLoading}
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE CHANGES"
              clickHandler={() => {
                form?.submit();
              }}
            />
          </Row>
        }
      >
        <AddStandardAttributeField
          form={form}
          onFinish={onUpdateField}
          isDrawer
        />
      </OsDrawer>
    </>
  );
};

export default SuperAdminDealReg;
