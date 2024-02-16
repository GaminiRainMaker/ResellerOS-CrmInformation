/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import {useDraggable} from '@dnd-kit/core';
import {FC} from 'react';
import {CSS} from '@dnd-kit/utilities';
import {Divider, Row, Select, Space} from 'antd';
import Typography from '@/app/components/common/typography';
import MenuDivider from 'antd/es/menu/MenuDivider';
import OsInput from '@/app/components/common/os-input';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import CommonSelect from '@/app/components/common/os-select';

interface EditDetailsInterface {
  cartItems?: any;
  setCartItems?: any;
}

const EditFiledDetails: FC<EditDetailsInterface> = (props: any) => {
  console.log('dddd');

  return (
    <Row style={{backgroundColor: 'white', padding: '12px'}}>
      <Space direction="vertical" style={{width: '100%'}}>
        {' '}
        <Typography name="Body 1/Regular">Text Field</Typography>
        {/* <MenuDivider /> */}
        <Divider style={{marginTop: '0px', marginBottom: '0px'}} />
        <Typography name="Body 2/Medium" color="#2364AA">
          Quick Setup
        </Typography>
        <Typography name="Body 4/Medium">Change Label</Typography>
        <OsInput placeholder="Label" />
        <Typography name="Body 4/Medium">Field Type</Typography>
        <CommonSelect
          placeholder="Select"
          allowClear
          style={{width: '100%'}}
          options={[]}
          //   dropdownRender={(menu) => ({menu})}
        />
      </Space>
      <Space direction="vertical">
        <Typography name="Body 2/Regular" color="#2364AA">
          Options
        </Typography>
      </Space>
    </Row>
  );
};

export default EditFiledDetails;
