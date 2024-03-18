import {Skeleton} from 'antd';
import React, {FC} from 'react';
import {Col, Row} from '../antd/Grid';

const AnalyticCardSkeleton: FC = () => (
  <>
    <Row
      style={{
        borderRadius: '12px',
        boxShadow:
          '0px 4px 8px -2px rgba(13, 90, 88, 0.1), 0px 2px 4px -2px rgba(13, 90, 88, 0.06)',
        background: 'white',
        padding: '42px 24px',
      }}
      justify="space-between"
    >
      {React.Children.toArray(
        [...Array(5)].map((i) => (
          <Col key={i}>
            <Skeleton
              active
              key={i}
              avatar={{size: 'large'}}
              paragraph={{rows: 1, style: {margin: 0}}}
              title={{style: {margin: 0, marginBottom: '8px'}}}
              style={{
                borderRadius: '12px',
                width: '180px',
                display: 'flex',
                alignItems: 'center',
              }}
            />
          </Col>
        )),
      )}
    </Row>
  </>
);

export default AnalyticCardSkeleton;
