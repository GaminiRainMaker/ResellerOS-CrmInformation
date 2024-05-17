/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {CustomTabStyle} from './styled-components';

const AdminCustomTabs: FC<any> = (tabs) => {
  const searchParams = useSearchParams();
  const getTab = searchParams.get('tab');
  const [activekeysall, setActivekeysall] = useState<number>(1);
  const [token] = useThemeToken();
  const [tempChild, setTempChild] = useState<any>();

  useEffect(() => {
    if (tabs?.tabs?.length > 0) {
      let tabIndex;
      switch (getTab) {
        case 'account':
          tabIndex = 0;
          break;
        case 'settings':
          tabIndex = 1;
          break;
        case 'support':
          tabIndex = 2;
          break;
        default:
          tabIndex = 0;
      }
      const initialChild = tabs.tabs[tabIndex]?.childitem?.[0]?.superChild;
      setTempChild(initialChild);
      setActivekeysall(tabs.tabs[tabIndex]?.childitem?.[0]?.key);
    }
  }, [tabs, getTab]);

  const getSuperChild = () => {
    return (
      <div
        style={{
          width: '100%',
          background: 'transparent',
          padding: '0px 0px 24px 24px',
          borderRadius: '12px',
        }}
      >
        {tempChild ?? 'No Data'}
      </div>
    );
  };

  return (
    <Row>
      <Col xs={24} sm={8} md={5} span={5}>
        <CustomTabStyle token={token}>
          <div>
            {tabs?.tabs?.map((itemtab: any) => {
              return (
                <Space
                  direction="vertical"
                  key={itemtab?.key}
                  size={12}
                  style={{width: '100%'}}
                >
                  <Typography name="Body 4/Medium">{itemtab?.title}</Typography>
                  <div style={{marginBottom: '15px', cursor: 'pointer'}}>
                    {itemtab?.childitem?.map((itemild: any) => {
                      return (
                        <>
                          <Typography
                            style={{
                              padding: '12px 24px',
                              background:
                                activekeysall === itemild?.key
                                  ? token.colorInfo
                                  : '',
                              color:
                                activekeysall === itemild?.key
                                  ? token.colorBgContainer
                                  : token.colorTextDisabled,
                              borderRadius: '12px',
                            }}
                            as="div"
                            cursor="pointer"
                            name="Button 1"
                            onClick={() => {
                              setTempChild(itemild?.superChild);
                              setActivekeysall(itemild?.key);
                            }}
                            key={`${itemild?.key}`}
                          >
                            {itemild?.name}
                          </Typography>
                        </>
                      );
                    })}
                  </div>
                </Space>
              );
            })}
          </div>
        </CustomTabStyle>
      </Col>
      <Col xs={24} sm={16} md={19} span={19}>
        {getSuperChild()}
      </Col>
    </Row>
  );
};

export default AdminCustomTabs;
