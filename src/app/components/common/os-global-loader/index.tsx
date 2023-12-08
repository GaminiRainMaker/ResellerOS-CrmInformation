/* eslint-disable prettier/prettier */
import {FC} from 'react';
import {ArrowPathIcon} from '@heroicons/react/24/outline';
import {SpinProps} from './global-loader.interface';
import {IndicatorContainer} from './styled-components';
import Typography from '../typography';
import {Spin} from '../antd/Spin';

export const Indicator: FC<{tip?: string | null}> = ({tip}) => (
  <IndicatorContainer>
    <ArrowPathIcon width={24} />
    {tip ? <Typography name="Body 2/Medium">{tip}</Typography> : null}
  </IndicatorContainer>
);
const GlobalLoader: FC<SpinProps> = ({
  children,
  loading,
  size = 'default',
  tip = null,
}) => (
  // <Spin
  //   style={{maxHeight: '100%'}}
  //   spinning={loading}
  //   size={size}
  //   indicator={<Indicator tip={tip} />}
  // >
  //   {children ?? <></>}
  // </Spin>
  <Spin spinning={loading}>{children ?? <></>}</Spin>
);

export default GlobalLoader;
