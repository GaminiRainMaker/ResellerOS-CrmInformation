import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import {OsStageType} from './os-stage-interface';
import {StageSelectStyle} from './styled-components';

interface CommonStageSelectProps {
  currentStage?: keyof OsStageType;
  onChange?: any;
  options?: any;
  style?: any;
  placeholder?: string;
  disabled?: boolean;
}

const CommonStageSelect: FC<CommonStageSelectProps> = ({
  currentStage,
  onChange,
  style,
  disabled,
  placeholder = 'Select Status',
  ...rest
}) => {
  const [token] = useThemeToken();
  const Stage: OsStageType = {
    Commit: {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    Negotiate: {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    Develop: {
      color: `${token?.colorInfoHover}`,
      textColor: `${token?.colorLinkHover}`,
      border: `${token?.colorLinkHover}`,
    },
    Qualify: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Prove: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    'In Progress': {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    New: {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    Submitted: {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    Approved: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Rejected: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    Cancelled: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    Expired: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    'Closed Lost': {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    'Closed Won': {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    'Approved - Ext Submitted': {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    'Ext Approved': {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    'Vendor Received - Held': {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    Drafts: {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
  };
  const selectedStage = Stage[currentStage as string];

  return (
    <StageSelectStyle
      onChange={onChange}
      {...rest}
      style={style}
      defaultValue={currentStage}
      disabled={disabled}
      backgroundColor={selectedStage?.color}
      color={selectedStage?.textColor}
      borderColor={selectedStage?.border}
      placeholder={placeholder}
      suffixIcon={
        <ChevronDownIcon width={20} color={selectedStage?.textColor} />
      }
    />
  );
};

export default CommonStageSelect;
