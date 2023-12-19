import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsPieChart from '@/app/components/common/os-piechart';
import Typography from '@/app/components/common/typography';
import React from 'react';

const Matrix = () => {
  console.log('object');
  return (
    <Row justify="space-between">
      <Col
        style={{
          padding: '24px',
          background: '#f6f7f8',
          borderRadius: '12px',
        }}
      >
        <Space direction="vertical">
          <Typography name="Body 1/Regular">
            Revenue by Product Category
          </Typography>
          <Typography name="Body 3/Regular">(Product Family)</Typography>
        </Space>

        <OsPieChart />
      </Col>
      <Col
        style={{
          padding: '24px',
          background: '#f6f7f8',
          borderRadius: '12px',
        }}
      >
        <Space direction="vertical">
          <Typography name="Body 1/Regular">
            Profit by Product Category
          </Typography>
          <Typography name="Body 3/Regular">(Product Family)</Typography>
        </Space>

        <OsPieChart />
      </Col>
    </Row>
  );
};

export default Matrix;
