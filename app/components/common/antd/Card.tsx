import React, {FC} from 'react';
import C, {CardProps} from 'antd/es/card';

export const Card: FC<CardProps> = (props) => <C {...props} />;
export type {CardProps};
