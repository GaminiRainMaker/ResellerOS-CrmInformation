import {TabsProps} from 'antd';

export const getTabItems = (isAdmin: boolean) => {
  const tabItems: TabsProps['items'] = [
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
      label: 'Approved',
      key: '6',
    },
    {
      label: 'Rejected',
      key: '7',
    },
  ];

  if (isAdmin) {
    tabItems.splice(4, 0, {
      label: 'In Review',
      key: '5',
    });
  }

  return tabItems;
};
