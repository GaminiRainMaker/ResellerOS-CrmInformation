/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form, notification } from 'antd';
import { Option } from 'antd/es/mentions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  deleteAttributeField,
  insertAttributeField,
  queryAttributeField,
  updateAttributeFieldById,
} from '../../../../../redux/actions/attributeField';
import {
  deleteAttributeSection,
  insertAttributeSection,
  queryAttributeSection,
  updateAttributeSectionById,
} from '../../../../../redux/actions/attributeSection';
import {
  deletePartnerProgramFormData,
  getFormDataProgram,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
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
  const { data: attributeSectionData, loading: attributeSectionLoading } =
    useAppSelector((state) => state.attributeSection);
  const { loading: attributeFieldLoading, queryData: attributeFieldData } =
    useAppSelector((state) => state.attributeField);
  const { getFormDataProgramData, loading: templatedataLoading } = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [showStandardAttributeField, setshowStandardAttributeField] =
    useState<boolean>(false);
  const [showStandardAttributeSection, setShowStandardAttributeSection] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [recordId, setRecordId] = useState<number>();
  const [formData, setformData] = useState<any>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [showSectionDrawer, setShowSectionDrawer] = useState<boolean>(false);
  const [showFieldDrawer, setShowFieldDrawer] = useState<boolean>(false);
  const [showTemplateDeleteModal, setShowTemplateDeleteModal] =
    useState<boolean>(false);
  const [templateDeleteIds, setTemplateDeleteIds] = useState<any>();
  const [sectionDeleteId, setSectionDeleteId] = useState<any>();
  const [showSectionDeleteModal, setShowSectionDeleteModal] =
    useState<boolean>(false);
  const [fieldDeleteId, setFieldDeleteId] = useState<any>();
  const [showFieldDeleteModal, setShowFieldDeleteModal] =
    useState<boolean>(false);
  const [buttonState, setButtonState] = useState<string>('Primary');

  const [query, setQuery] = useState<{
    fieldLabel: string | null;
    sectionName: string | null;
  }>({
    fieldLabel: null,
    sectionName: null,
  });
  const [templateQuery, templateSetQuery] = useState<{
    partner: string | null;
    partnerProgram: string | null;
  }>({
    partner: null,
    partnerProgram: null,
  });

  const [attributeSectionQuery, setAttributeSectionQuery] = useState<{
    sectionName: string | null;
  }>({
    sectionName: null,
  });
  const searchQuery = useDebounceHook(query, 400);
  const sectionSearchQuery = useDebounceHook(attributeSectionQuery, 400);
  const templateSearchQuery = useDebounceHook(templateQuery, 400);

  useEffect(() => {
    dispatch(getFormDataProgram(templateSearchQuery));
  }, [templateSearchQuery]);

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
      setformData({ formObject: formDataObject, Id: record?.id });
    }
  };

  const editAttributeSection = (record: any) => {
    setRecordId(record?.id);
    form.setFieldsValue({
      name: record?.name
        .split(/[\s_]+/)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
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
      name: record?.name
        ?.split(/[\s_]+/)
        ?.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' '),
      label: record?.label
        ?.split(/[\s_]+/)
        ?.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' '),
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

  const deleteSelectedSection = async () => {
    const data = { Ids: sectionDeleteId };
    await dispatch(deleteAttributeSection(data)).then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeSection(sectionSearchQuery));
        dispatch(queryAttributeField(searchQuery));
        setSectionDeleteId([]);
        setShowSectionDeleteModal(false);
      }
    });
  };
  const deleteSelectedField = async () => {
    const data = { Ids: fieldDeleteId };
    await dispatch(deleteAttributeField(data)).then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeField(searchQuery));
        setFieldDeleteId([]);
        setShowFieldDeleteModal(false);
      }
    });
  };

  const deleteSelectedTemplate = async () => {
    if (templateDeleteIds) {
      await dispatch(deletePartnerProgramFormData(templateDeleteIds))?.then(
        (d) => {
          if (d?.payload) {
            dispatch(getFormDataProgram(templateSearchQuery));
            setShowTemplateDeleteModal(false);
            setTemplateDeleteIds('');
          }
        },
      );
    }
  };

  const updateTemplate = (recordid: number, value: boolean) => {
    dispatch(
      updatePartnerProgramById({ id: recordid, form_data_active: value }),
    ).then((d) => {
      if (d?.payload) {
        dispatch(getFormDataProgram(templateSearchQuery));
      }
    });
  };

  const TemplateColumns = templateColumns(
    token,
    statusWrapper,
    editTemplate,
    updateTemplate,
    setTemplateDeleteIds,
    setShowTemplateDeleteModal,
  );

  const StandardAttributesFieldsColumns = standardAttributes(
    token,
    statusWrapper,
    editAttributeField,
    setFieldDeleteId,
    setShowFieldDeleteModal,
  );

  const StandardAttributesSectionColumns = standardAttributesSection(
    token,
    editAttributeSection,
    setSectionDeleteId,
    setShowSectionDeleteModal,
  );

  const attributesFieldLocal = {
    emptyText: (
      <EmptyContainer
        title="There is no data for Standard Attributes Fields."
        actionButton="New Attributes Fields"
        onClick={() => setshowStandardAttributeField(true)}
      />
    ),
  };
  const attributesSectionLocal = {
    emptyText: (
      <EmptyContainer
        title="There is no data for Standard Attributes Section."
        actionButton="New Attributes Section"
        onClick={() => setShowStandardAttributeSection(true)}
      />
    ),
  };
  const attributesTemplateLocal = {
    emptyText: (
      <EmptyContainer
        title="There is no data for Templates."
        subTitle="Please create the template from Partners & Partners Program."
      />
    ),
  };

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
          locale={attributesTemplateLocal}
          loading={templatedataLoading}
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
          locale={attributesSectionLocal}
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
          locale={attributesFieldLocal}
          loading={attributeFieldLoading}
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
      } else {
        notification.open({
          message: 'Attribute Section is already exist with this name.',
          type: 'info',
        });
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
    dispatch(insertAttributeField(attributeFiledData))?.then((d) => {
      if (d?.payload) {
        dispatch(queryAttributeField(searchQuery));
        if (buttonState === 'Primary') setshowStandardAttributeField(false);
        form?.resetFields();
      } else {
        notification?.open({
          message:
            'An attribute field with the same label in this attribute section already exists.',
          type: 'error',
        });
        dispatch(queryAttributeField(searchQuery));
        setshowStandardAttributeField(false);
        form?.resetFields();
      }
    });
  };

  const uniqueAttributeSection = Array.from(
    new Set(
      attributeFieldData
        ? attributeFieldData?.length > 0
          ? attributeFieldData
            .map((customer: any) => customer?.AttributeSection?.name)
            .filter(Boolean)
          : []
        : [],
    ),
  );

  const uniqueAttributeLabel = Array.from(
    new Set(attributeFieldData?.map((customer: any) => customer?.label)),
  );

  const uniqueAttributeSectionOptions = Array.from(
    new Set(
      attributeSectionData &&
      attributeSectionData?.map(
        (attributeSectionIndex: any) => attributeSectionIndex?.name,
      ),
    ),
  );

  const initialUniqueTemplatePartnerProgram = Array.from(
    new Set(
      getFormDataProgramData?.map(
        (getFormDataProgramDataItem: any) =>
          getFormDataProgramDataItem?.partner_program,
      ),
    ),
  );

  const uniqueTemplatePartnerPrograms =
    initialUniqueTemplatePartnerProgram?.map((partnerProgram: any) => ({
      value: partnerProgram,
      label: <CustomTextCapitalization text={partnerProgram} />,
    }));

  const initialUniqueTemplatePartner = Array.from(
    new Set(
      getFormDataProgramData?.map(
        (getFormDataProgramDataItem: any) =>
          getFormDataProgramDataItem?.Partner?.partner,
      ),
    ),
  );

  const uniqueTemplatePartner = initialUniqueTemplatePartner?.map(
    (partnerProgram: any) => ({
      value: partnerProgram,
      label: <CustomTextCapitalization text={partnerProgram} />,
    }),
  );

  const analyticData = {
    attributeSection: attributeSectionData,
    attributeField: attributeFieldData,
    getFormDataProgram: getFormDataProgramData,
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{ width: '100%' }}>
        <SuperAdminDealRegAnalytic data={analyticData} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Registered Forms
            </Typography>
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <Space size={12} style={{ height: '48px' }}>
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
          style={{ background: 'white', padding: '24px', borderRadius: '12px' }}
        >
          <OsTabs
            tabBarExtraContent={
              <Form layout="vertical">
                {activeTab === 1 ? (
                  <Space size={12}>
                    <SelectFormItem label="Partner">
                      <CommonSelect
                        style={{ width: '180px' }}
                        placeholder="Search Here"
                        showSearch
                        onSearch={(e) => {
                          templateSetQuery({
                            ...templateQuery,
                            partner: e,
                          });
                        }}
                        onChange={(e) => {
                          templateSetQuery({
                            ...templateQuery,
                            partner: e,
                          });
                        }}
                        value={templateQuery?.partner}
                      >
                        {uniqueTemplatePartner?.map((partner: any) => (
                          <Option key={partner?.value} value={partner?.value}>
                            {partner?.label}
                          </Option>
                        ))}
                      </CommonSelect>
                    </SelectFormItem>

                    <SelectFormItem label="Partner Program">
                      <CommonSelect
                        style={{ width: '180px' }}
                        placeholder="Search Here"
                        showSearch
                        onSearch={(e) => {
                          templateSetQuery({
                            ...templateQuery,
                            partnerProgram: e,
                          });
                        }}
                        onChange={(e) => {
                          templateSetQuery({
                            ...templateQuery,
                            partnerProgram: e,
                          });
                        }}
                        value={templateQuery?.partnerProgram}
                      >
                        {uniqueTemplatePartnerPrograms?.map(
                          (partnerProgram: any) => (
                            <Option
                              key={partnerProgram?.value}
                              value={partnerProgram?.value}
                            >
                              {partnerProgram?.label}
                            </Option>
                          ),
                        )}
                      </CommonSelect>
                    </SelectFormItem>
                    <div
                      style={{
                        marginTop: '15px',
                      }}
                    >
                      <Typography
                        cursor="pointer"
                        name="Button 1"
                        color={
                          templateQuery?.partner ||
                            templateQuery?.partnerProgram
                            ? '#0D0D0D'
                            : '#C6CDD5'
                        }
                        onClick={() => {
                          templateSetQuery({
                            partner: null,
                            partnerProgram: null,
                          });
                        }}
                      >
                        Reset
                      </Typography>
                    </div>
                  </Space>
                ) : activeTab === 2 ? (
                  <Space size={12}>
                    <SelectFormItem label="Attribute Label">
                      <CommonSelect
                        style={{ width: '180px' }}
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
                            {customer.replace(/_/g, ' ')}
                          </Option>
                        ))}
                      </CommonSelect>
                    </SelectFormItem>

                    <SelectFormItem label="Attribute Section">
                      <CommonSelect
                        style={{ width: '180px' }}
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
                        {uniqueAttributeSection?.map((name: any) => (
                          <Option key={name} value={name}>
                            {name.replace(/_/g, ' ')}
                          </Option>
                        ))}
                      </CommonSelect>
                    </SelectFormItem>
                    <div
                      style={{
                        marginTop: '15px',
                      }}
                    >
                      <Typography
                        cursor="pointer"
                        name="Button 1"
                        color={
                          query?.fieldLabel || query?.sectionName
                            ? '#0D0D0D'
                            : '#C6CDD5'
                        }
                        onClick={() => {
                          setQuery({
                            fieldLabel: null,
                            sectionName: null,
                          });
                        }}
                      >
                        Reset
                      </Typography>
                    </div>
                  </Space>
                ) : activeTab === 3 ? (
                  <Space size={12}>
                    <SelectFormItem label="Attribute Section">
                      <CommonSelect
                        style={{ width: '180px' }}
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
                        {uniqueAttributeSectionOptions?.map((name: any) => (
                          <Option key={name} value={name}>
                            {name.replace(/_/g, ' ')}
                          </Option>
                        ))}
                      </CommonSelect>
                    </SelectFormItem>

                    <div
                      style={{
                        marginTop: '15px',
                      }}
                    >
                      <Typography
                        cursor="pointer"
                        name="Button 1"
                        color={
                          attributeSectionQuery?.sectionName
                            ? '#0D0D0D'
                            : '#C6CDD5'
                        }
                        onClick={() => {
                          setAttributeSectionQuery({
                            sectionName: null,
                          });
                        }}
                      >
                        Reset
                      </Typography>
                    </div>
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
        loading={buttonState === 'Secondary' ? attributeFieldLoading : false}
        thirdLoading={buttonState === 'Primary' ? attributeFieldLoading : false}
        body={<AddStandardAttributeField form={form} onFinish={onFinish2} />}
        width={700}
        open={showStandardAttributeField}
        onCancel={() => {
          setshowStandardAttributeField(false);
          form?.resetFields();
        }}
        onOk={() => {
          setButtonState('Secondary');
          form?.submit();
        }}
        thirdButtonfunction={() => {
          setButtonState('Primary');
          form?.submit();
        }}
        thirdButtonText="Create"
        primaryButtonText="Save and Create New"
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
              style={{ display: 'flex', justifyContent: 'end' }}
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
          <Row style={{ width: '100%', float: 'right' }}>
            {' '}
            <OsButton
              loading={attributeSectionLoading}
              btnStyle={{ width: '100%' }}
              buttontype="PRIMARY"
              text="Update Changes"
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
          <Row style={{ width: '100%', float: 'right' }}>
            {' '}
            <OsButton
              loading={attributeFieldLoading}
              btnStyle={{ width: '100%' }}
              buttontype="PRIMARY"
              text="Update Changes"
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

      <DeleteModal
        loading={templatedataLoading}
        setShowModalDelete={setShowTemplateDeleteModal}
        setDeleteIds={setTemplateDeleteIds}
        showModalDelete={showTemplateDeleteModal}
        deleteSelectedIds={deleteSelectedTemplate}
        heading="Delete Template"
        description="Are you sure you want to delete this template?"
      />

      <DeleteModal
        loading={attributeSectionLoading}
        setShowModalDelete={setShowSectionDeleteModal}
        setDeleteIds={setSectionDeleteId}
        showModalDelete={showSectionDeleteModal}
        deleteSelectedIds={deleteSelectedSection}
        heading="Delete Atrribute Section"
        description="Are you sure you want to delete this section?"
      />

      <DeleteModal
        loading={attributeFieldLoading}
        setShowModalDelete={setShowFieldDeleteModal}
        setDeleteIds={setFieldDeleteId}
        showModalDelete={showFieldDeleteModal}
        deleteSelectedIds={deleteSelectedField}
        heading="Delete Atrribute Fields"
        description="Are you sure you want to delete this field?"
      />
    </>
  );
};

export default SuperAdminDealReg;
