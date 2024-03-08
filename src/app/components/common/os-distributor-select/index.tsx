import {Form} from 'antd';
import React, {FC} from 'react';
import CommonSelect from '../os-select';
import {OsDistriButorInterface} from './os-distributor.interface';

const OsDistributorSelect: FC<OsDistriButorInterface> = ({form, name}) => (
  <Form.Item
    // label="distributor"
    name={name}
    rules={[{required: false, message: 'Please Select Distributor!'}]}
  >
    <CommonSelect
      placeholder="Select"
      allowClear
      style={{width: '100%'}}
      //   options={partnerOptions}
      //   onChange={(e) => {
      //     setPartnerValue && setPartnerValue(e);
      //     form?.resetFields([partnerProgramName]);
      //   }}
    />
  </Form.Item>
);

export default OsDistributorSelect;
