'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {templateDummyData} from '@/app/utils/CONSTANTS';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {Option} from 'antd/es/mentions';
import {useEffect, useState} from 'react';
import {
  insertAttributeField,
  queryAttributeField,
} from '../../../../../redux/actions/attributeField';
import {insertAttributeSection} from '../../../../../redux/actions/attributeSection';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddNewStandardAttributeSection from './AddNewStandardAttributeSection';
import AddStandardAttributeField from './AddStandardAttributeField';
import SuperAdminDealRegAnalytic from './superAdminDealRegAnalytic';
import {standardAttributes, templateColumns} from './templateColumns';

const SuperAdminDealReg = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {loading: attributeSectionLoading} = useAppSelector(
    (state) => state.attributeSection,
  );
  const {loading: attributeFieldLoading, data: attributeFieldData} =
    useAppSelector((state) => state.attributeField);
  const [showStandardAttributeField, setshowStandardAttributeField] =
    useState<boolean>(false);
  const [showStandardAttributeSection, setShowStandardAttributeSection] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>();

  const [query, setQuery] = useState<{
    fieldLabel: string | null;
    sectionName: string | null;
  }>({
    fieldLabel: null,
    sectionName: null,
  });
  const searchQuery = useDebounceHook(query, 400);

  useEffect(() => {
    dispatch(queryAttributeField(searchQuery));
  }, [searchQuery]);

  const statusWrapper = (item: any) => {
    const getStatus = () => item;
    return <OsStatusWrapper value={getStatus()} />;
  };
  const editQuote = () => {};
  const setDeleteIds = () => {};

  const TemplateColumns = templateColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );
  const StandardAttributesColumns = standardAttributes(
    token,
    statusWrapper,
    editQuote,
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
          dataSource={templateDummyData}
          // rowSelection={rowSelection}
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
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Standard Attributes
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={StandardAttributesColumns}
          dataSource={attributeFieldData}
          scroll
          locale={[]}
          loading={false}
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
      children: <>In Development Phase....</>,
    },
  ];

  const onFinish = () => {
    const attributeSectionData = form?.getFieldsValue();
    dispatch(insertAttributeSection(attributeSectionData))?.then((d) => {
      if (d?.payload) {
        setShowStandardAttributeSection(false);
      }
    });
  };
  const onFinish2 = () => {
    const attributeFiledData = form?.getFieldsValue();
    dispatch(insertAttributeField(attributeFiledData))?.then((d) => {
      if (d?.payload) {
        setshowStandardAttributeField(false);
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
              activeTab === 2 && (
                <Space size={12}>
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
              )
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
    </>
  );
};

export default SuperAdminDealReg;
