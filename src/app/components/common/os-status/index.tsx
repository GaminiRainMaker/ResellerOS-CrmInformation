import {FC} from 'react';

import {CustomTag} from './styled-components';
import {
  OsStatusType,
  OsStatusWrapperProps,
  StatusProp,
} from './os-status-interface';
import useThemeToken from '../hooks/useThemeToken';

const OsStatusWrapper: FC<OsStatusWrapperProps> = ({value}) => {
  const [token] = useThemeToken();
  const Status: OsStatusType = {
    Drafts: {
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
    Reject: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
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
