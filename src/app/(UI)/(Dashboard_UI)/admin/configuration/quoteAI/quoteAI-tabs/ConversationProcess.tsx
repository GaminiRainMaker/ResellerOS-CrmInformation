'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {TabContainerStyle} from './styled-components';

const ConverSationProcess = () => {
  console.log('sdsadfs');
  return (
    <TabContainerStyle>
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
                    Attachment Process
                  </Typography>
                ),
                children: (
                  <Space
                    size={4}
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Typography name="Body 4/Medium">Attach Doc to </Typography>
                    <CommonSelect
                      placeholder="Select"
                      style={{width: '100%'}}
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
            borderRadius: '12px',
            marginTop: '30px',
            padding: '24px',
          }}
        >
          <OsCollapseAdmin
            items={[
              {
                key: '2',
                label: (
                  <Typography name="Body 2/Medium">
                    OEM Configuration{' '}
                  </Typography>
                ),
                children: (
                  <Space size={36} direction="vertical">
                    <Space size={24}>
                      <Space>
                        <Checkbox />
                        <Typography name="Body 4/Medium">
                          Include another field
                        </Typography>
                      </Space>
                      <Space>
                        <Checkbox />
                        <Typography name="Body 4/Medium">
                          Check Case for OEM Case
                        </Typography>
                      </Space>
                    </Space>
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
            borderRadius: '12px',
            marginTop: '30px',
            padding: '24px',
          }}
        >
          <OsCollapseAdmin
            items={[
              {
                key: '3',
                label: (
                  <Typography name="Body 2/Medium">
                    Existing Product configuration{' '}
                  </Typography>
                ),
                children: (
                  <Space
                    size={36}
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Space
                      direction="vertical"
                      size={4}
                      style={{width: '100%'}}
                    >
                      <Typography name="Body 4/Medium">
                        Price Book ID
                      </Typography>
                      <OsInput placeholder="Write here!" />
                    </Space>
                    <Space
                      direction="vertical"
                      size={4}
                      style={{width: '100%'}}
                    >
                      <Typography name="Body 4/Medium">
                        Match Criteria
                      </Typography>
                      <OsInput placeholder="Write here!" />
                    </Space>
                    <Space size={8}>
                      <Checkbox />
                      <Typography name="Body 4/Medium">
                        Match Existing Product
                      </Typography>
                    </Space>
                  </Space>
                ),
              },
            ]}
          />
        </Space>
      </Row>
      <footer
        style={{
          width: 'max-content',
          float: 'right',
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
      >
        <OsButton text="Save" buttontype="PRIMARY" clickHandler={() => {}} />
      </footer>
    </TabContainerStyle>
  );
};
export default ConverSationProcess;
