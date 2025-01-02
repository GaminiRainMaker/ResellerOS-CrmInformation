/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {FC, Suspense, useEffect, useState} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {CustomTabStyle} from './styled-components';

const AdminCustomTabs: FC<any> = (tabs) => {
  const searchParams = useSearchParams()!;
  const getTab = searchParams.get('tab');
  const pathname = usePathname();
  const [activekeysall, setActivekeysall] = useState<number>(1);
  const [token] = useThemeToken();
  const [tempChild, setTempChild] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (tabs?.tabs?.length > 0) {
      let tabIndex;
      let superChildIndex;
      if (pathname === '/admin') {
        switch (getTab) {
          case 'Configuration':
            tabIndex = 0;
            superChildIndex = 0;
            break;
          case 'AddProducts':
            tabIndex = 0;
            superChildIndex = 1;
            break;
          case 'AddContracts':
            tabIndex = 0;
            superChildIndex = 2;
            break;
          case 'AddContractProducts':
            tabIndex = 0;
            superChildIndex = 3;
            break;
          case 'allUsers':
            tabIndex = 1;
            superChildIndex = 0;
            break;
          case 'rolesAndPermission':
            tabIndex = 1;
            superChildIndex = 1;
            break;
          case 'formstack':
            tabIndex = 2;
            superChildIndex = 0;
            break;
          default:
            tabIndex = 0;
            superChildIndex = 0;
        }
        const initialChild =
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.superChild;
        setTempChild(initialChild);
        setActivekeysall(
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.key,
        );
      } else {
        switch (getTab) {
          case 'myProfile':
            tabIndex = 0;
            superChildIndex = 0;
            break;
          case 'myTeam':
            tabIndex = 0;
            superChildIndex = 1;
            break;
          case 'partnerPassword':
            tabIndex = 1;
            superChildIndex = 0;
            break;
          case 'support':
            tabIndex = 2;
            superChildIndex = 0;
            break;
          case 'faq':
            tabIndex = 2;
            superChildIndex = 1;
            break;
          default:
            tabIndex = 0;
            superChildIndex = 0;
        }
        const initialChild =
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.superChild;
        setTempChild(initialChild);
        setActivekeysall(
          tabs.tabs[tabIndex]?.childitem?.[superChildIndex]?.key,
        );
      }
    }
  }, [getTab]);

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
    <Suspense fallback={<div>Loading...</div>}>
      <Row>
        <Col xs={24} sm={8} md={5} span={5}>
          <CustomTabStyle token={token}>
            <div style={{width: '100%'}}>
              {tabs?.tabs?.map((itemtab: any) => {
                return (
                  <Space
                    direction="vertical"
                    key={itemtab?.key}
                    size={12}
                    style={{width: '100%'}}
                  >
                    <Typography name="Body 4/Medium">
                      {itemtab?.title}
                    </Typography>
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
                                router?.push(itemild?.route);
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
    </Suspense>
  );
};

export default AdminCustomTabs;
