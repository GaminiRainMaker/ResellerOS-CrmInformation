import React, {FC, forwardRef} from 'react';
import A, {AvatarProps} from 'antd/es/avatar';
// import Group, {GroupProps} from 'antd/es/avatar/group';

export const Avatar: FC<AvatarProps> = forwardRef((props) => <A {...props} />);
// export const AvatarGroup: FC<GroupProps> = (props) => <Group {...props} />;
