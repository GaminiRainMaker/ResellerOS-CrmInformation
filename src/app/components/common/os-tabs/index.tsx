import {TabsProps} from 'antd';
import {TabsStyled} from './styled-components';

export enum ButtonType {
  PRIMARY = 'PRIMARY',
  PRIMARY_LARGE = 'PRIMARY_LARGE',
  PRIMARY_SMALL = 'PRIMARY_SMALL',
}

const OsTabs: React.FC<TabsProps> = (props) => <TabsStyled {...props} />;

export default OsTabs;
