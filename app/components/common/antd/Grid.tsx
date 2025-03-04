import React, {FC} from 'react';
import GridRow, {RowProps} from 'antd/es/row';
import GridCol, {ColProps} from 'antd/es/col';
import Grid from 'antd/es/grid';

export const Row: FC<RowProps> = (props) => <GridRow {...props} />;
export const Col: FC<ColProps> = (props) => <GridCol {...props} />;
export const {useBreakpoint} = Grid;
