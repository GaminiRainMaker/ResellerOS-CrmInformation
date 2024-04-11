'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {standardAttributesData, templateDummyData} from '@/app/utils/CONSTANTS';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useState} from 'react';
import AddStandardAttributeField from './AddStandardAttributeField';
import SuperAdminDealRegAnalytic from './superAdminDealRegAnalytic';
import {standardAttributes, templateColumns} from './templateColumns';
import AddNewStandardAttributeSection from './AddNewStandardAttributeSection';

const SuperAdminDealReg = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showStandardAttributeField, setshowStandardAttributeField] =
    useState<boolean>(false);
  const [showStandardAttributeSection, setShowStandardAttributeSection] =
    useState<boolean>(false);

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
      label: <Typography name="Body 4/Regular">Templates</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={TemplateColumns}
          dataSource={templateDummyData}
          // rowSelection={rowSelection}
          scroll
          locale={[]}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Standard Attributes</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={StandardAttributesColumns}
          dataSource={standardAttributesData}
          // rowSelection={rowSelection}
          scroll
          locale={[]}
          loading={false}
        />
      ),
    },
    // {
    //   label: (
    //     <Typography name="Body 4/Regular">
    //       Standard Attributes Sections
    //     </Typography>
    //   ),
    //   key: '3',
    //   children: <>In Development Phase....</>,
    // },
  ];

  const onFinish = () => {
    console.log('formData', form?.getFieldsValue());
  };

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

              <OsDropdown menu={{items: []}} />
            </Space>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              <Form layout="vertical">
                <Space size={12}>
                  <Form.Item label="Attribute Label">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>

                  <Form.Item label="Attribute Section">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    onClick={() => {}}
                  >
                    Reset
                  </Typography>
                </Space>
              </Form>
            }
            items={superAdmintabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={false}
        body={<AddStandardAttributeField form={form} onFinish={onFinish} />}
        width={700}
        open={showStandardAttributeField}
        onCancel={() => {
          setshowStandardAttributeField(false);
        }}
        onOk={() => {
          form?.submit();
        }}
        thirdButtonText="Create"
        primaryButtonText="Save and Create New"
        footerPadding={40}
      />

      <OsModal
        loading={false}
        body={
          <AddNewStandardAttributeSection form={form} onFinish={onFinish} />
        }
        width={700}
        open={showStandardAttributeSection}
        onCancel={() => {
          setShowStandardAttributeSection(false);
        }}
        onOk={() => {
          form?.submit();
        }}
        secondaryButtonText="Cancel"
        primaryButtonText="Save"
        footerPadding={40}
      />
    </>
  );
};

export default SuperAdminDealReg;
