import React, {FC} from 'react';
import T, {TagProps} from 'antd/es/tag';

export const Tag: FC<TagProps> = (props) => <T {...props} />;
