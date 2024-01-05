/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {CollapseProps} from '../antd/Collapse';
import {OsCollapseStyle} from './styled-components';

const OsCollapse: FC<CollapseProps> = ({items}, props) => (
  <OsCollapseStyle
    expandIconPosition="start"
    items={items}
    ghost
    {...props}
    //   expandIcon={() => (
    //     <ChevronDownIcon width={18} style={{color: token.colorLink}} />
    //   )}
  />
);

export default OsCollapse;
