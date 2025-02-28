import React from 'react';
import {Progress} from '../antd/Progress';

interface ProgressProps {
  isActive: boolean;
  token: {
    colorBgContainer: string;
    colorTextDisabled: string;
    colorBorderSecondary: string;
  };
  percent: number;
}

const CustomProgress: React.FC<ProgressProps> = ({
  isActive,
  token,
  percent = 0,
}) => {
  return (
    <Progress
      type="circle"
      size="small"
      strokeWidth={10}
      strokeLinecap="butt"
      gapPosition="left"
      percent={percent ?? 0}
      strokeColor={isActive ? token.colorBgContainer : token.colorTextDisabled}
      trailColor={
        isActive ? token.colorTextDisabled : token.colorBorderSecondary
      }
      format={(percent) => (
        <span
          style={{
            color: isActive ? token.colorBgContainer : token.colorTextDisabled,
          }}
        >
          {`${percent}%`}
        </span>
      )}
    />
  );
};

export default CustomProgress;
