/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import DealRegDetailForm from '@/app/(UI)/(Dashboard_UI)/dealRegDetail/DealRegDetailForm';
import {FC, useEffect, useState} from 'react';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsProgress from '../os-progress';
import Typography from '../typography';
import {
  CustmDealRegTab,
  DealRegCustomTabHeaderStyle,
} from './styled-components';
import {useAppDispatch} from '../../../../../redux/hook';
import {setDealReg} from '../../../../../redux/slices/dealReg';

interface DealRegCustomTabsInterface {
  tabs: any;
  selectedUserId: any;
}
const DealRegCustomTabs: React.FC<DealRegCustomTabsInterface> = ({
  tabs,
  selectedUserId,
}) => {
  const dispatch = useAppDispatch();
  const [activeKey, setActiveKey] = useState<string>('0');
  const [token] = useThemeToken();
  const [tabItems, setTabItems] = useState([]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const tempItems: any = [];
    if (tabs) {
      tabs?.forEach((element: any, index: string) => {
        tempItems.push({
          key: index,
          label: (
            <Row
              key={element?.id}
              gutter={[0, 10]}
              style={{
                width: 'fit-content',
                margin: '24px 0px',
              }}
            >
              <DealRegCustomTabHeaderStyle
                token={token}
                style={{
                  background:
                    activeKey === index ? token.colorInfo : token.colorInfoBg,
                }}
                onClick={() =>
                  // console.log("elementelement",element)
                  dispatch(setDealReg(element))
                }
              >
                <Space size={10}>
                  <OsProgress
                    type="circle"
                    percent={30}
                    trailColor={
                      activeKey === index
                        ? token.colorBgContainer
                        : token?.colorTextDisabled
                    }
                    strokeColor={
                      activeKey === index
                        ? token.colorTextDisabled
                        : token?.colorBorderSecondary
                    }
                    format={(percent) => (
                      <span
                        style={{
                          color:
                            activeKey === index
                              ? token.colorBgContainer
                              : token?.colorTextDisabled,
                        }}
                      >{`${percent}%`}</span>
                    )}
                  />

                  <Typography
                    style={{
                      color:
                        activeKey === index
                          ? token.colorBgContainer
                          : token?.colorTextDisabled,
                    }}
                    cursor="pointer"
                    name="Button 1"
                  >
                    {element?.title}
                  </Typography>
                </Space>
              </DealRegCustomTabHeaderStyle>
            </Row>
          ),
          children: (
            <div key={element.id}>
              <DealRegDetailForm
                data={element}
                selectedUserId={selectedUserId}
              />
            </div>
          ),
        });
      });
    }
    setTabItems(tempItems);
  }, [tabs, activeKey, selectedUserId]);

  return (
    <CustmDealRegTab
      token={token}
      activeKey={activeKey}
      defaultActiveKey="1"
      items={tabItems}
      onChange={handleTabChange}
    />
  );
};

export default DealRegCustomTabs;
