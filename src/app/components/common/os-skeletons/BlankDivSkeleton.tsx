import React, {CSSProperties, FC} from 'react';
import Skeleton from '../antd/Skeleton';

const BlankDivSkeleton: FC<CSSProperties> = (props) => (
  <Skeleton.Node
    style={{
      height: '100%',
      width: '100%',
      borderRadius: '16px',
    }}
    active
  >
    <div style={{...props}} />
  </Skeleton.Node>
);

export default BlankDivSkeleton;
