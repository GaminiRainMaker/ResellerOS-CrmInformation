/* eslint-disable array-callback-return */

'use client';

import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Row, Space, TabsProps} from 'antd';
import {useState} from 'react';
import ContractValidationConfiguration from './configuration-tabs/ContractValidationConfiguration';
import ConverSationProcess from './configuration-tabs/ConversationProcess';
import FieldDisplayConfiguration from './configuration-tabs/FieldDisplayConfiguration';
import QuoteProcess from './configuration-tabs/QuoteProcess';
import SyncQuoteField from './configuration-tabs/SyncQuoteFields';
import SyncQuoteLineItemField from './configuration-tabs/SyncQuoteLineItemFields';

const QuoteAI = () => {
  const [activeTab, setActiveTab] = useState<any>('1');

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">Conversion Process</Typography>,
      key: '1',
      children: <ConverSationProcess />,
    },
    {
      label: <Typography name="Body 4/Regular">Quote Process</Typography>,
      key: '2',
      children: <QuoteProcess />,
    },

    {
      label: (
        <Typography name="Body 4/Regular">
          Sync Quote Line Item Fields
        </Typography>
      ),
      key: '3',
      children: <SyncQuoteLineItemField />,
    },
    {
      label: <Typography name="Body 4/Regular">Sync Quote Fields</Typography>,
      key: '4',
      children: <SyncQuoteField />,
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Contract Validation Configuration
        </Typography>
      ),
      key: '5',
      children: <ContractValidationConfiguration />,
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Field Display Configuration
        </Typography>
      ),
      key: '6',
      children: <FieldDisplayConfiguration />,
    },
  ];
  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Row>
        <OsTabs
          style={{background: 'transparent'}}
          onChange={(e) => {
            setActiveTab(e);
          }}
          activeKey={activeTab}
          items={tabItems.map((tabItem: any, index: number) => ({
            key: `${index + 1}`,
            label: tabItem?.label,
            ...tabItem,
          }))}
        />
      </Row>
    </Space>
  );
};
export default QuoteAI;
