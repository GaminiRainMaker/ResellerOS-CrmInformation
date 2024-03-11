import {MenuProps, TabsProps} from 'antd';
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

export const tabItems: TabsProps['items'] = [
  {
    label: 'All',
    key: '1',
  },
  {
    label: 'Drafts',
    key: '2',
  },

  {
    label: 'In Progress',
    key: '3',
  },
  {
    label: 'Needs Review',
    key: '4',
  },
  {
    label: 'In Review',
    key: '5',
  },
  {
    label: 'Approved',
    key: '6',
  },
  {
    label: 'Rejected',
    key: '7',
  },
];
