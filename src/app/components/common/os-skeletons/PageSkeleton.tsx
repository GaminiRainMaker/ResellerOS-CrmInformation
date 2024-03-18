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
    <Row justify="space-between">
      <Col span={12}>
        <Skeleton paragraph={{rows: 0}} active />
      </Col>
      <Col>
        <Space size={8}>
          <Skeleton.Button
            shape="default"
            size="large"
            active
            style={{height: '48px', width: '150px'}}
          />
          <Skeleton.Avatar
            active
            size="default"
            shape="square"
            style={{height: '48px', width: '48px'}}
          />
        </Space>
      </Col>
    </Row>
    <BlankDivSkeleton
      height="calc(100vh - 300px)"
      width="calc(100vw - 150px)"
    />
  </Space>
);

export default PageSkeleton;
