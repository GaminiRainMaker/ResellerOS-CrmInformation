import {FC} from 'react';
import M, {ModalProps} from 'antd/es/modal';

export const Modal: FC<ModalProps> = (props) => <M {...props} />;
export type {ModalProps};
