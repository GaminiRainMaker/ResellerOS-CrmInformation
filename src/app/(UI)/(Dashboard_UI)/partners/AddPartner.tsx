'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import OsButton from '@/app/components/common/os-button';
import {AddPartnerInterface} from './partners.interface';

const AddPartner: React.FC<AddPartnerInterface> = ({setShowModal}) => {
  const [token] = useThemeToken();

  const [formValue, setFormValue] = useState<any>();
  const [customerValue, setCustomerValue] = useState<any>();

  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 10px 0px 0px',
        }}
        gutter={[0, 16]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Request New Partner
        </Typography>
      </Row>

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Space
          size={4}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Typography name="Body 4/Medium">Partner Name</Typography>
          <CommonSelect
            placeholder="Partner name here"
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
          <Typography name="Body 4/Medium">Partner Program Name</Typography>
          <CommonSelect
            placeholder="Partner program here"
            style={{width: '100%'}}
          />
        </Space>
        <footer
          style={{
            width: 'max-content',
            float: 'right',
            position: 'absolute',
            bottom: '2%',
            right: '5%',
          }}
        >
          <OsButton
            text="Request"
            buttontype="PRIMARY"
          />
        </footer>
      </Space>
    </>
  );
};

export default AddPartner;
