import React, {FC} from 'react';
import T, {AbstractTooltipProps} from 'antd/es/tooltip';

export const Tooltip: FC<AbstractTooltipProps> = (props) => <T {...props} />;
