'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import InputOptions from './inputOptions';

const FormBuilder = () => {
  console.log('32432532432');

  return (
    <Row>
      <Col span={8}>
        <InputOptions />
      </Col>
      <Col span={16}>eee</Col>
    </Row>
  );
};

export default FormBuilder;
