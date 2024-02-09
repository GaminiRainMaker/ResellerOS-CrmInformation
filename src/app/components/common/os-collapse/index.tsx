/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {CollapseProps} from '../antd/Collapse';
import {OsCollapseStyle} from './styled-components';

const OsCollapse: FC<CollapseProps> = ({items, defaultActiveKey}, props) => (
  <OsCollapseStyle
    expandIconPosition="start"
    defaultActiveKey={defaultActiveKey}
    items={items}
    ghost
    {...props}
    //   expandIcon={() => (
    //     <ChevronDownIcon width={18} style={{color: token.colorLink}} />
    //   )}
  />
);

export default OsCollapse;
