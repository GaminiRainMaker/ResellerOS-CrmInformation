/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import DealRegDetailForm from '@/app/(UI)/(Dashboard_UI)/dealRegDetail/DealRegDetailForm';
import {FormInstance} from 'antd';
import {useEffect, useState} from 'react';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {useAppDispatch} from '../../../../../redux/hook';
import {setDealReg} from '../../../../../redux/slices/dealReg';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsProgress from '../os-progress';
import Typography from '../typography';
import {
  CustmDealRegTab,
  DealRegCustomTabHeaderStyle,
} from './styled-components';

interface DealRegCustomTabsInterface {
  tabs: any;
  selectedUserId: any;
  form: FormInstance;
  setFormDataValues?: any;
  setCartItems?: any;
  cartItems?: any;
}
const DealRegCustomTabs: React.FC<DealRegCustomTabsInterface> = ({
  tabs,
  selectedUserId,
  form,
  setFormDataValues,
  setCartItems,
  cartItems,
}) => {
  const dispatch = useAppDispatch();
  const [activeKey, setActiveKey] = useState<any>(0);
  const [token] = useThemeToken();
  const [tabItems, setTabItems] = useState([]);

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };

  useEffect(() => {
    const tempItems: any = [];
    if (tabs) {
      tabs?.forEach((element: any, index: number) => {
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
                    activeKey?.toString() === index?.toString()
                      ? token.colorInfo
                      : token.colorInfoBg,
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
                      activeKey?.toString() === index?.toString()
                        ? token.colorBgContainer
                        : token?.colorTextDisabled
                    }
                    strokeColor={
                      activeKey?.toString() === index?.toString()
                        ? token.colorTextDisabled
                        : token?.colorBorderSecondary
                    }
                    format={(percent) => (
                      <span
                        style={{
                          color:
                            activeKey?.toString() === index?.toString()
                              ? token.colorBgContainer
                              : token?.colorTextDisabled,
                        }}
                      >{`${percent}%`}</span>
                    )}
                  />

                  <Typography
                    style={{
                      color:
                        activeKey?.toString() === index?.toString()
                          ? token.colorBgContainer
                          : token?.colorTextDisabled,
                    }}
                    cursor="pointer"
                    name="Button 1"
                  >
                    {formatStatus(element?.PartnerProgram?.partner_program)}
                  </Typography>
                </Space>
              </DealRegCustomTabHeaderStyle>
            </Row>
          ),
          children: (
            <div key={element.id}>
              <DealRegDetailForm
                // setFormDataValues={setFormDataValues}
                data={element}
                selectedUserId={selectedUserId}
                form={form}
                setCartItems={setCartItems}
                cartItems={cartItems}
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
      defaultActiveKey="0"
      items={tabItems}
      onChange={handleTabChange}
    />
  );
};

export default DealRegCustomTabs;
