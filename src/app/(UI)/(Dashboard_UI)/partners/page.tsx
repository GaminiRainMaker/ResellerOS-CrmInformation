/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddPartner from '@/app/components/common/os-add-partner';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, MenuProps, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import {getAllPartner} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {data: PartnerData, loading} = useAppSelector((state) => state.partner);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPartner());
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const PartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 295,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 295,
      render: (text: string, record: any) => <OsStatusWrapper value="Active" />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Template
        </Typography>
      ),
      dataIndex: 'template',
      key: 'template',
      width: 295,
      render: () => (
        <Typography name="Body 4/Bold" color={token?.colorLink}>
          View
        </Typography>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Request New Partner"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">Partners</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Partner Programs</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Requested</Typography>,
      key: '3',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={PartnerData}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Download Selected</Typography>,
    },
    {
      key: '3',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          onClick={() => setShowModalDelete(true)}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <PartnerAnalytics />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Partners
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              <OsButton
                text="Request Partner"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Partner Name</Typography>
                  <OsInput style={{width: '180px'}} placeholder="Search Here" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Partner Programs</Typography>
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    //   onClick={searchBillingContacts}
                  >
                    Apply
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={<AddPartner form={form} setOpen={setShowModal} />}
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer
        primaryButtonText="Request"
        onOk={form?.submit}
        footerPadding={30}
      />
    </>
  );
};

export default Partners;
