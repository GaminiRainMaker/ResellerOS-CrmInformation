import React, {FC} from 'react';
import S, {SelectProps} from 'antd/es/select';

export const Select: FC<SelectProps> = (props) => <S {...props} />;
export type {SelectProps};
