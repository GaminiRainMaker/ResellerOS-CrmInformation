import React, {FC} from 'react';
import T, {TableProps} from 'antd/es/table';

export const Table: FC<TableProps<any>> = (props) => <T {...props} />;
export type {TableProps};
