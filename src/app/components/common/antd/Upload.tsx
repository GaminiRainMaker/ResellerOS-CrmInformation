import React, {FC} from 'react';
import U, {UploadProps, UploadFile} from 'antd/es/upload';

export const Upload: FC<any> = (props) => <U {...props} />;
export type {UploadProps, UploadFile};
