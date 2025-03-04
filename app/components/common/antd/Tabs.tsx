import React, {FC} from 'react';
import T, {TabsProps} from 'antd/es/tabs';

export const Tabs: FC<TabsProps> = (props) => <T {...props} />;
export type {TabsProps};
