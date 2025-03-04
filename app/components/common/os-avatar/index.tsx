import React, {forwardRef} from 'react';
import {AvatarProps} from 'antd';
import {AvatarStyled} from './styled-component';

const OsAvatar: React.FC<AvatarProps> = forwardRef((props, ref) => (
  <AvatarStyled shape="square" {...props} />
));

export default OsAvatar;
