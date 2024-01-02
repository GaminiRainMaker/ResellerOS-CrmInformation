import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import useThemeToken from '../hooks/useThemeToken';
import {OsStageType, OsStageWrapperProps} from './os-stage-interface';
import {StageSelectStyle} from './styled-components';

interface CommonStageSelectProps extends OsStageWrapperProps {
  currentStage: keyof OsStageType;
  options?: any;
}

const CommonStageSelect: FC<CommonStageSelectProps> = ({
  currentStage,
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
      color: `${token?.colorSuccessBg}`,
      textColor: `${token?.colorSuccess}`,
      border: `${token?.colorSuccess}`,
    },
    Qualify: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
    Prove: {
      color: `${token?.colorErrorBg}`,
      textColor: `${token?.colorError}`,
      border: `${token?.colorError}`,
    },
  };

  const selectedStage = Stage[currentStage];

  return (
    <StageSelectStyle
      {...rest}
      backgroundColor={selectedStage?.color}
      color={selectedStage?.textColor}
      borderColor={selectedStage?.border}
    >
      <ChevronDownIcon width={24} color={selectedStage?.textColor} />
    </StageSelectStyle>
  );
};

export default CommonStageSelect;
