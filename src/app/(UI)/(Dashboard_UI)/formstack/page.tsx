/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */

'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {useEffect, useState} from 'react';

import {TabsProps} from 'antd';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import FormStackApiKey from './formStackApiKey';
import FormStackSync from './formStackSync';

const FormStackMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>();
  const [tabItem, setTabItem] = useState<any>();
  const {data: GeneralSettingData, loading} = useAppSelector(
    (state) => state.gereralSetting,
  );
  useEffect(() => {
    dispatch(getAllSyncTable('QuoteLineItem'));
  }, []);

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Sync FormStack Value
        </Typography>
      ),
      key: '1',
      children: <FormStackSync />,
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveTab(2);
          }}
        >
          FormStack API KEY
        </Typography>
      ),
      key: '2',
      children: <FormStackApiKey />,
    },
  ];
  useEffect(() => {
    let itemss = tabItems;

    if (GeneralSettingData?.api_key && GeneralSettingData?.secret_key) {
      itemss = tabItems;
      setTabItem(itemss);
      setActiveTab('1');
    } else {
      let othIndex = itemss?.[0];
      let firstIndex = itemss?.[1];
      let newArr = [firstIndex];
      newArr?.push(othIndex);
      setTabItem(newArr);
      setActiveTab('2');
    }
  }, [GeneralSettingData]);

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            items={tabItem}
          />
        </Row>
      </Space>
    </>
  );
};

export default FormStackMain;
