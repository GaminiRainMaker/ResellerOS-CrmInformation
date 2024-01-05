'use client';

import {Col} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {dummyData} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Row, Space} from 'antd';

const SyncQuoteLineItemField = () => {
  const [token] = useThemeToken();
  const SyncQuoteLineItemFields = [
    {
      title: 'S No.',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Quote Line Item Fields',
      dataIndex: 'product_code',
      key: 'product_code',
      render: (text: string) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {}}
          options={[]}
        />
      ),
      width: 470,
    },
    {
      title: 'Opportunity  Line Item Fields',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {}}
          options={[]}
        />
      ),
      width: 470,
    },
    {
      title: 'Active',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      render: (text: string) => <Switch size="default" onChange={() => {}} />,
      width: 77,
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 33,
      render: (text: string, record: any) => (
        <TrashIcon
          height={24}
          width={24}
          color={token.colorError}
          style={{cursor: 'pointer'}}
          onClick={() => {
            // setDeleteIds([record?.id]);
            // setShowModalDelete(true);
          }}
        />
      ),
    },
  ];

  return (
    <Row>
      <Space
        size={24}
        direction="vertical"
        style={{
          width: '100%',
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
        }}
      >
        <OsCollapseAdmin
          items={[
            {
              key: '1',
              label: (
                <Typography name="Body 2/Medium">
                  Sync Quote Line Item
                </Typography>
              ),
              children: (
                <Space size={24} direction="vertical" style={{width: '100%'}}>
                  <OsTable
                    loading={false}
                    // rowSelection={rowSelection}
                    tableSelectionType="checkbox"
                    columns={SyncQuoteLineItemFields}
                    dataSource={dummyData}
                    scroll
                  />
                  <div style={{width: 'max-content', float: 'right'}}>
                    <OsButton
                      text="Add Field"
                      buttontype="PRIMARY"
                      icon={<PlusIcon width={24} />}
                      clickHandler={() => {}}
                    />
                  </div>
                </Space>
              ),
            },
          ]}
        />
      </Space>
      {/* <footer
          style={{
            width: 'max-content',
            float: 'right',
            position: 'absolute',
            bottom: '0%',
          }}
        >
          <OsButton
            text="Add Field"
            buttontype="PRIMARY"
            clickHandler={() => {}}
          />
        </footer> */}
    </Row>
  );
};
export default SyncQuoteLineItemField;
