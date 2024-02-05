/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {FC, useState} from 'react';
import Configuration from '../../../(UI)/(Dashboard_UI)/admin/quote-AI/configuration';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Products from '../os-add-products';
import Users from '../os-add-users';

import Typography from '../typography';
import {CustomTabStyle} from './styled-components';
import RolesAndPermission from '@/app/(UI)/(Dashboard_UI)/admin/users/rolesPermissions';

const AdminCustomTabs: FC<any> = (tabs) => {
  const [activekeysall, setActivekeysall] = useState<number>(1);
  const [token] = useThemeToken();

  return (
    <div style={{display: 'flex'}}>
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
                <div style={{marginBottom: '26px', cursor: 'pointer'}}>
                  {itemtab?.childitem?.map((itemild: any) => {
                    return (
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
                        onClick={() => setActivekeysall(itemild?.key)}
                        key={`${itemild?.key}`}
                      >
                        {itemild?.name}
                      </Typography>
                    );
                  })}
                </div>
              </Space>
            );
          })}
        </div>
      </CustomTabStyle>
      <div
        style={{
          width: '100%',
          background: 'transparent',
          padding: '24px 0px 24px 24px',
          borderRadius: '12px',
        }}
      >
        {activekeysall === 1 ? (
          <Configuration />
        ) : activekeysall === 2 ? (
          <Products />
        ) : activekeysall === 7 ? (
          <Users />
        ) : activekeysall === 8 ? (
          <RolesAndPermission />
        ) : (
          <>No Data</>
        )}
      </div>
    </div>
  );
};

export default AdminCustomTabs;
