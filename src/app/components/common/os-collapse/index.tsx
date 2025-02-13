/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {CollapseProps} from '../antd/Collapse';
import {OsCollapseStyle} from './styled-components';

const OsCollapse: FC<CollapseProps> = ({
  items,
  defaultActiveKey,
  onChange,
  activeKey,
  ...props
}) => {
  return (
    <OsCollapseStyle
      expandIconPosition="start"
      onChange={(key) => {
        if (onChange) {
          onChange(key);
        }
      }}
      activeKey={activeKey}
      items={items}
      ghost
      {...props}
      //   expandIcon={() => (
      //     <ChevronDownIcon width={18} style={{color: token.colorLink}} />
      //   )}
    />
  );
};

export default OsCollapse;
