/* eslint-disable prettier/prettier */

'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import OsCollapse from '@/app/components/common/os-collapse';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Row, Space, TabsProps} from 'antd';
import {useState} from 'react';

const AdminPage = () => {
  console.log('345345');
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
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Row
        style={{
          background: 'transparent',
          padding: '24px',
          borderRadius: '12px',
        }}
      >
        <OsTabs
          style={{background: 'transparent'}}
          onChange={(e) => {
            setActiveTab(e);
          }}
          activeKey={activeTab}
          items={tabItems.map((tabItem: any, index: number) => ({
            key: `${index + 1}`,
            label: (
              <div>
                <div>{tabItem?.label}</div>
                <div
                  style={{
                    // eslint-disable-next-line eqeqeq
                    borderBottom:
                      // eslint-disable-next-line eqeqeq
                      activeTab == tabItem?.key ? '2px solid #1C3557' : '',
                    // marginTop: '3px',
                  }}
                />
              </div>
            ),
            children: (
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
                              width: '100%',
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
                    width: '100%',
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
                              style={{width: '100%', marginTop: '-10px'}}
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

export default AdminPage;
