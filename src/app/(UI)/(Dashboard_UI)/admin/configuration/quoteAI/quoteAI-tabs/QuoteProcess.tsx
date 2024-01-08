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

const QuoteProcess = () => (
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
                  Contract Configuration
                </Typography>
              ),
              children: (
                <Space
                  size={36}
                  direction="vertical"
                  style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '12px',
                  }}
                >
                  <Space
                    size={4}
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Typography name="Body 4/Medium">Object Name </Typography>
                    <CommonSelect
                      placeholder="Select"
                      style={{width: '100%'}}
                    />
                  </Space>
                  <Space
                    size={4}
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Typography name="Body 4/Medium">
                      Matching Field Name
                    </Typography>
                    <CommonSelect
                      placeholder="Select"
                      style={{width: '100%'}}
                    />
                  </Space>
                </Space>
              ),
            },
          ]}
        />
      </Space>
      <Space
        size={36}
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
                <Typography name="Body 2/Medium">
                  Validation Tab Visibility Configuration
                </Typography>
              ),
              children: (
                <Space
                  size={36}
                  direction="vertical"
                  style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '12px',
                  }}
                >
                  <Space size={8}>
                    <Checkbox />
                    <Typography name="Body 4/Medium">
                      Show Validation Tab
                    </Typography>
                  </Space>
                  <Space
                    size={4}
                    direction="vertical"
                    style={{
                      width: '100%',
                    }}
                  >
                    <Typography name="Body 4/Medium">
                      Quote AI screen min width
                    </Typography>
                    <OsInput placeholder="Write here!" />
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
export default QuoteProcess;
