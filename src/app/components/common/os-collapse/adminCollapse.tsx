/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {CollapseProps} from '../antd/Collapse';
import {OsCollapseStyleForAdmin} from './styled-components';

const OsCollapseAdmin: FC<CollapseProps> = ({items}, props) => (
  <OsCollapseStyleForAdmin
    expandIconPosition="end"
    items={items}
    ghost
    {...props}
    //   expandIcon={() => (
    //     <ChevronDownIcon width={18} style={{color: token.colorLink}} />
    //   )}
  />
);

export default OsCollapseAdmin;
