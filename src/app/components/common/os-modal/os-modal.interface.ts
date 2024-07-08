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
  primaryButtonText?: any;
  secondaryButtonText?: string;
  thirdButtonText?: any;
  fourthButtonText?: string;
  body?: React.ReactNode;
  loading?: boolean;
  thirdLoading?: boolean;
  bodyPadding?: number;
  footer?: boolean;
  footerPadding?: number;
  disabledButton?: boolean;
  singleButtonInCenter?: boolean;
  thirdButtonfunction?: any;
  fourthButtonfunction?: any;
  fifthButtonText?: any;
  fifthButtonfunction?: any;
}

export interface OSDailogInterface extends ModalProps {
  title?: string;
  subTitle?: string;
  titleTypography?: StyleName;
  subTitleTypography?: StyleName;
  subtitleColor?: string;
  titleColor?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  body?: React.ReactNode;
  loading?: boolean;
  showDailogModal?: boolean;
  setShowDailogModal?: any;
  icon?: React.ReactNode;
  onOk?: any;
  secondryButtontype?: string;
  width?: number;
}
