import React, {CSSProperties, FC} from 'react';
import Skeleton from '../antd/Skeleton';

const BlankDivSkeleton: FC<CSSProperties> = (props) => (
  <div
    style={{
      padding: '24px',
      borderRadius: '12px',
      background: 'white',
      boxShadow:
        '0px 4px 8px -2px rgba(13, 90, 88, 0.1), 0px 2px 4px -2px rgba(13, 90, 88, 0.06)',
    }}
  >
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
  </div>
);

export default BlankDivSkeleton;
