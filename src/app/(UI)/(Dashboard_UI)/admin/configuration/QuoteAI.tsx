'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Row, Space, TabsProps} from 'antd';
import {useState} from 'react';

const QuoteAI = () => {
  const tabs = [
    {
      key: 1,
      title: 'Configuration',
      childitem: [
        {key: 1, name: 'Quote AI'},
        {key: 2, name: 'DealReg AI'},
      ],
    },
    {
      key: 2,
      title: 'Subscription Management',
      childitem: [
        {key: 3, name: 'Subscriptions'},
        {key: 4, name: 'Invoices'},
      ],
    },
    {
      key: 3,
      title: 'Users',
      childitem: [
        {key: 5, name: 'All users'},
        {key: 6, name: 'Roles and Permissions'},
      ],
    },
    {
      key: 4,
      title: 'Integration',
      childitem: [
        {key: 7, name: 'Subscriptions'},
        {key: 8, name: 'CRM accounts'},
      ],
    },
    {
      key: 5,
      title: 'Account',
      childitem: [
        {key: 9, name: 'Profiles'},
        {key: 10, name: 'Settings'},
      ],
    },
  ];

  // return <CustomTabs tabs={tabs} />;

  const [activeTab, setActiveTab] = useState<any>('1');

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">Conversion Process</Typography>,
      key: '1',
    },
    {
      label: <Typography name="Body 4/Regular">Quote Process</Typography>,
      key: '2',
    },

    {
      label: (
        <Typography name="Body 4/Regular">
          Sync Quote Line Item Fields
        </Typography>
      ),
      key: '3',
    },
    {
      label: <Typography name="Body 4/Regular">Sync Quote Fields</Typography>,
      key: '4',
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Contract Validation Configuration
        </Typography>
      ),
      key: '5',
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Field Display Configuration
        </Typography>
      ),
      key: '6',
    },
  ];
  return (
    <Space size={24} direction="vertical" style={{width: '86%'}}>
      <Row
        style={{
          background: 'transparent',
          padding: '24px',
          borderRadius: '12px',
        }}
      >
        <OsTabs
          style={{background: 'transparent', width: '90%'}}
          onChange={(e) => {
            setActiveTab(e);
          }}
          activeKey={activeTab}
          items={tabItems.map((tabItem: any, index: number) => ({
            key: `${index + 1}`,
            label: tabItem?.label,
            children: (
              <Row>
                <Space
                  size={24}
                  direction="vertical"
                  style={{
                    width: '89%',
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
                          <>
                            <Space>
                              <Typography name="Body 2/Medium">
                                Contract Configuration
                              </Typography>
                            </Space>
                          </>
                        ),
                        children: (
                          <Space
                            size={24}
                            direction="vertical"
                            style={{
                              width: '89%',
                              background: 'white',
                              padding: '24px',
                              paddingTop: '10px',
                              borderRadius: '12px',
                              paddingLeft: '15px',
                            }}
                          >
                            <Typography name="Body 4/Medium">
                              Object Name
                            </Typography>
                            <CommonSelect
                              placeholder="Select"
                              style={{width: '100%', marginTop: '-10px'}}
                            />
                            <Typography name="Body 4/Medium">
                              Matching Field Name
                            </Typography>
                            <CommonSelect
                              placeholder="Select"
                              style={{width: '100%', marginTop: '-10px'}}
                            />
                          </Space>
                        ),
                      },
                    ]}
                  />
                </Space>
                <Space
                  size={24}
                  direction="vertical"
                  style={{
                    width: '89%',
                    background: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    marginTop: '30px',
                  }}
                >
                  <OsCollapseAdmin
                    items={[
                      {
                        key: '2',
                        label: (
                          <>
                            <Space>
                              <Typography name="Body 2/Medium">
                                Validation Tab Visibility Configuration
                              </Typography>
                            </Space>
                          </>
                        ),
                        children: (
                          <Space
                            size={24}
                            direction="vertical"
                            style={{
                              width: '100%',
                              background: 'white',
                              padding: '24px',
                              paddingTop: '10px',
                              borderRadius: '12px',
                              paddingLeft: '15px',
                            }}
                          >
                            <Typography name="Body 4/Medium">
                              <Checkbox style={{marginRight: '10px'}} />{' '}
                              <span>Show Validation Tab</span>
                            </Typography>

                            <Typography name="Body 4/Medium">
                              Quote AI screen min width
                            </Typography>
                            <OsInput
                              placeholder="Write here!"
                              style={{width: '89%', marginTop: '-10px'}}
                            />
                          </Space>
                        ),
                      },
                    ]}
                  />
                </Space>
              </Row>
            ),
            ...tabItem,
          }))}
        />
      </Row>
    </Space>
  );
};
export default QuoteAI;
