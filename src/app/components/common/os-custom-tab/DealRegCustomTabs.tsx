/* eslint-disable no-nested-ternary */
import {FC, useState} from 'react';
import DealRegDetailForm from '@/app/(UI)/(Dashboard_UI)/dealRegDetail/DealRegDetailForm';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsProgress from '../os-progress';
import Typography from '../typography';
import {
  DealRegCustomTabHeaderStyle,
  DealRegCustomTabStyle,
} from './styled-components';
import {TabInterface} from './tabs.interface';

const DealRegCustomTabs: FC<TabInterface> = (tabs) => {
  const [activekeysall, setActivekeysall] = useState<number>(1);
  const [token] = useThemeToken();

  return (
    <div>
      <DealRegCustomTabStyle token={token}>
        {tabs?.tabs?.map((itemtab: any) => (
          <Row
            key={itemtab?.key}
            gutter={[0, 10]}
            style={{width: 'fit-content', margin: '24px 0px'}}
          >
            <DealRegCustomTabHeaderStyle
              token={token}
              style={{
                background:
                  activekeysall === itemtab?.key
                    ? token.colorInfo
                    : token.colorInfoBg,
              }}
              onClick={() => setActivekeysall(itemtab?.key)}
            >
              <Space size={10}>
                <OsProgress
                  type="circle"
                  percent={itemtab?.progressbarPercentage}
                  trailColor={
                    activekeysall === itemtab?.key
                      ? token.colorBgContainer
                      : token?.colorTextDisabled
                  }
                  strokeColor={
                    activekeysall === itemtab?.key
                      ? token.colorTextDisabled
                      : token?.colorBorderSecondary
                  }
                />

                <Typography
                  style={{
                    color:
                      activekeysall === itemtab?.key
                        ? token.colorBgContainer
                        : token?.colorTextDisabled,
                  }}
                  cursor="pointer"
                  name="Button 1"
                  key={`${itemtab?.key}`}
                >
                  {itemtab?.title}
                </Typography>
              </Space>
            </DealRegCustomTabHeaderStyle>
          </Row>
        ))}
      </DealRegCustomTabStyle>
      {activekeysall === 1 ? (
        <DealRegDetailForm />
      ) : activekeysall === 2 ? (
        <>No Data</>
      ) : (
        <DealRegDetailForm />
      )}
    </div>
  );
};

export default DealRegCustomTabs;
