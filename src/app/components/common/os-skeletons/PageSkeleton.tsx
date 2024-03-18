'use client';

import {FC} from 'react';
import {Col, Row} from '../antd/Grid';
import Skeleton from '../antd/Skeleton';
import {Space} from '../antd/Space';
import AnalyticCardSkeleton from './AnalyticCardSkeleton';
import BlankDivSkeleton from './BlankDivSkeleton';

const PageSkeleton: FC = () => (
  <Space size={24} direction="vertical" style={{width: '100%'}}>
    <AnalyticCardSkeleton />{' '}
    <Row justify="space-between" align="middle">
      <Col span={12}>
        <Skeleton.Button
          shape="default"
          size="large"
          active
          style={{height: '35px', width: '250px', borderRadius: '8px'}}
        />
      </Col>
      <Col>
        <Space size={8}>
          <Skeleton.Button
            shape="default"
            size="large"
            active
            style={{height: '48px', width: '150px', borderRadius: '8px'}}
          />
          <Skeleton.Avatar
            active
            size="default"
            shape="square"
            style={{height: '48px', width: '48px', borderRadius: '8px'}}
          />
        </Space>
      </Col>
    </Row>
    <BlankDivSkeleton
      height="calc(100vh - 300px)"
      width="calc(100vw - 200px)"
    />
  </Space>
);

export default PageSkeleton;
