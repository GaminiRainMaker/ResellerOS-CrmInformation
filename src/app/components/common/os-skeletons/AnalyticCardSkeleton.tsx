import {Skeleton} from 'antd';
import React, {FC} from 'react';
import {Space} from '../antd/Space';
import {Col, Row} from '../antd/Grid';
import TableNameColumn from '../os-table/TableNameColumn';

const AnalyticCardSkeleton: FC = () => (
  <>
    {/* <Space size={18}>
      {React.Children.toArray(
        [...Array(5)].map((i) => (
          <Skeleton
            active
            key={i}
            avatar
            paragraph={{rows: 1, style: {margin: 0}}}
            title={{style: {margin: 0, marginBottom: '8px'}}}
            style={{
              padding: '36px 24px',
              // background: token?.colorBgContainer,
              borderRadius: '12px',
              // padding: '8px 16px',
              // borderRadius: '8px',
              height: '85px',
              width: '280px',
              boxShadow:
                '0px 4px 8px -2px rgba(13, 90, 88, 0.1), 0px 2px 4px -2px rgba(13, 90, 88, 0.06)',
              display: 'flex',
              alignItems: 'center',
            }}
          />
        )),
      )}
    </Space> */}

    <Row
      style={{
        borderRadius: '12px',
        boxShadow:
          '0px 4px 8px -2px rgba(13, 90, 88, 0.1), 0px 2px 4px -2px rgba(13, 90, 88, 0.06)',
        background: 'white',
        // padding: '12px',
      }}
    >
      {React.Children.toArray(
        [...Array(5)].map((i) => (
          <Skeleton
            active
            key={i}
            avatar
            paragraph={{rows: 1, style: {margin: 0}}}
            title={{style: {margin: 0, marginBottom: '8px'}}}
            style={{
              padding: '36px 24px',
              borderRadius: '12px',
              height: '85px',
              width: '180px',
              display: 'flex',
              alignItems: 'center',
            }}
          />
        )),
      )}
    </Row>
  </>
);

export default AnalyticCardSkeleton;
