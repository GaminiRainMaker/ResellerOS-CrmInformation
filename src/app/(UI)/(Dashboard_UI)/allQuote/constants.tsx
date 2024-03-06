import {MenuProps} from 'antd';
import Typography from '@/app/components/common/typography';

export const dropDownItems: MenuProps['items'] = [
  {
    key: '1',
    label: <Typography name="Body 3/Regular">Select All</Typography>,
  },
  {
    key: '2',
    label: <Typography name="Body 3/Regular">Download Selected</Typography>,
  },
  {
    key: '3',
    label: <Typography name="Body 3/Regular">Delete Selected</Typography>,
  },
];
