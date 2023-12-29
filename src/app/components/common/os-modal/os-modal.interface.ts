import {ModalProps} from 'antd/es/modal';
import {StyleName} from '../typography/typography.interface';

export interface OSModalPropsInterface extends ModalProps {
  styleFooter?: boolean;
  subTitle?: string;
  title?: string;
  titleTypography?: StyleName;
  subTitleTypography?: StyleName;
  subtitleColor?: string;
  titleColor?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  body?: React.ReactNode;
  loading?: boolean;
  bodyPadding?: number;
}
