import P, {ProgressProps} from 'antd/es/progress';
import {FC} from 'react';

export const Progress: FC<ProgressProps> = (props) => <P {...props} />;

export type {ProgressProps};
