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
    Recent: {
      color: `${token?.colorPrimaryHover}`,
      textColor: `${token?.colorInfo}`,
      border: `${token?.colorInfo}`,
    },
    Drafts: {
      color: `${token?.colorWarningBg}`,
      textColor: `${token?.colorWarning}`,
      border: `${token?.colorWarning}`,
    },
    Completed: {
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
  };
  const finalValue: StatusProp = Status[value as keyof OsStatusType];
  return (
    <CustomTag
      color={finalValue?.color}
      textcolor={finalValue?.textColor}
      border={finalValue?.border}
    >
      {value}
    </CustomTag>
  );
};

export default OsStatusWrapper;
