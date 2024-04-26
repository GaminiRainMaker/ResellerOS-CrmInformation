import {FC} from 'react';

import useThemeToken from '../hooks/useThemeToken';
import {
  OsStatusType,
  OsStatusWrapperProps,
  StatusProp,
} from './os-status-interface';
import {CustomTag} from './styled-components';

const OsStatusWrapper: FC<OsStatusWrapperProps> = ({value}) => {
  const [token] = useThemeToken();
  const Status: OsStatusType = {
    Drafts: {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    'In Review': {
      color: `${token?.colorInfoBgHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    'In Progress': {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    Completed: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Approved: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Verified: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Active: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Reject: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    Rejected: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    'Invite Sent': {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    Accepted: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    'Needs Review': {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
  };
  const finalValue: StatusProp = Status[value as keyof OsStatusType];
  return (
    <>
      {value ? (
        <CustomTag
          color={finalValue?.color}
          textcolor={finalValue?.textColor}
          border={finalValue?.border}
        >
          {value}
        </CustomTag>
      ) : (
        '--'
      )}
    </>
  );
};

export default OsStatusWrapper;
