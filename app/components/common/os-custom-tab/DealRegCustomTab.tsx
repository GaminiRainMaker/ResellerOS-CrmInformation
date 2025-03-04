/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import {FormInstance} from 'antd';
import {Suspense, useEffect, useState} from 'react';
import {formatStatus} from '@/utils/CONSTANTS';
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
  activeKey?: string;
  setActiveKey?: any;
  formDataValues?: any;
}
const DealRegCustomTabs: React.FC<DealRegCustomTabsInterface> = ({
  tabs,
  selectedUserId,
  form,
  setFormDataValues,
  setCartItems,
  cartItems,
  activeKey,
  setActiveKey,
  formDataValues,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [tabItems, setTabItems] = useState([]);
  const [countOfFileds, setCountOfFields] = useState<any>();
  const [countUniFiled, setCountUniFiled] = useState<any>();

  const handleTabChange = (key: any) => {
    setActiveKey(key);
    setCartItems([]);
  };

  const totalPercentage: any =
    (countOfFileds?.commonValue +
      countUniFiled?.uniValue / countOfFileds?.commonTotal +
      countUniFiled?.uniTotal) *
    100;

  useEffect(() => {
    const tempItems: any = [];
    if (tabs) {
      tabs?.forEach((element: any, index: number) => {
        tempItems.push({
          key: element?.partner_program_id,
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
                    activeKey?.toString() ===
                    element?.partner_program_id?.toString()
                      ? token.colorInfo
                      : token.colorInfoBg,
                }}
                onClick={() => dispatch(setDealReg(element))}
              >
                <Space>
                  <OsProgress
                    type="circle"
                    percent={
                      activeKey?.toString() ===
                      element?.partner_program_id?.toString()
                        ? 0
                        : 0
                    }
                    strokeColor={
                      activeKey?.toString() ===
                      element?.partner_program_id?.toString()
                        ? token.colorBgContainer
                        : token?.colorTextDisabled
                    }
                    trailColor={
                      activeKey?.toString() ===
                      element?.partner_program_id?.toString()
                        ? token.colorTextDisabled
                        : token?.colorBorderSecondary
                    }
                    format={(percent) => (
                      <span
                        style={{
                          color:
                            activeKey?.toString() ===
                            element?.partner_program_id?.toString()
                              ? token.colorBgContainer
                              : token?.colorTextDisabled,
                        }}
                      >{`${percent}%`}</span>
                    )}
                  />

                  <Typography
                    style={{
                      color:
                        activeKey?.toString() ===
                        element?.partner_program_id?.toString()
                          ? token.colorBgContainer
                          : token?.colorTextDisabled,
                    }}
                    cursor="pointer"
                    name="Button 1"
                  >
                    {formatStatus(element?.Partner?.partner)} -{' '}
                    {formatStatus(element?.PartnerProgram?.partner_program)}
                  </Typography>
                </Space>
              </DealRegCustomTabHeaderStyle>
            </Row>
          ),
          children: (
            <div key={element?.partner_program_id}>
              {/* <DealRegDetailForm
                // setFormDataValues={setFormDataValues}
                data={element}
                selectedUserId={selectedUserId}
                form={form}
                setCartItems={setCartItems}
                cartItems={cartItems}
                formDataValues={formDataValues}
                setFormDataValues={setFormDataValues}
                activeKey={activeKey}
                setCountUniFiled={setCountUniFiled}
                setCountOfFields={setCountOfFields}
              /> */}
            </div>
          ),
        });
      });
    }
    setTabItems(tempItems);
  }, [
    tabs,
    activeKey,
    selectedUserId,
    token,
    form,
    setCartItems,
    cartItems,
    formDataValues,
    setFormDataValues,
    dispatch,
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustmDealRegTab
        token={token}
        activeKey={activeKey}
        items={tabItems}
        onChange={handleTabChange}
      />
    </Suspense>
  );
};

export default DealRegCustomTabs;
