import C, {CollapsePanelProps, CollapseProps} from 'antd/es/collapse';
import {FC} from 'react';

export const Collapse: FC<CollapseProps> = (props) => <C {...props} />;
export const Panel: FC<CollapsePanelProps> = (props) => <C.Panel {...props} />;
export type {CollapseProps};
