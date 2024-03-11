import React, {FC} from 'react';
import Skeleton from '../antd/Skeleton';
import AnalyticCardSkeleton from './AnalyticCardSkeleton';
// import TableHeaderSkeleton from './TableHeaderSkeleton';
import {Space} from '../antd/Space';
import BlankDivSkeleton from './BlankDivSkeleton';

const PageSkeleton: FC = () => (
  <Space size={24} direction="vertical" style={{width: '100%'}}>
    {/* <Skeleton paragraph={{rows: 1}} active title /> */}
    <AnalyticCardSkeleton />{' '}
    {/* <Space size={16} style={{justifyContent: 'end', width: '100%'}}>
      Export <Skeleton.Button shape="round" size="large" active style={{height:"32px", width:"130px"}} />
      <Skeleton.Button
        shape="round"
        size="large"
        active
        style={{float: 'right', height: '32px', width: '132px'}}
      />
    </Space> */}
    {/* <TableHeaderSkeleton /> */}
    {/* <BlankDivSkeleton
      height="calc(100vh - 500px)"
      width="calc(100vw - 100px)"
    /> */}
  </Space>
);

export default PageSkeleton;
