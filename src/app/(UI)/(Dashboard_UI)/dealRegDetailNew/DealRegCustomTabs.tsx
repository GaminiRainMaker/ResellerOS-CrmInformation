'use client';

import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {
  CustmDealRegTab,
  DealRegCustomTabHeaderStyle,
} from '@/app/components/common/os-custom-tab/styled-components';
import CustomProgress from '@/app/components/common/os-progress/DealregProgressBar';
import Typography from '@/app/components/common/typography';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setDealReg} from '../../../../../redux/slices/dealReg';
import DealRegDetailForm from './DealRegDetailForm';

const DealRegCustomTabs: React.FC<any> = ({
  CommonFieldForm,
  UniqueFieldForm,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {data: DealRegData} = useAppSelector((state) => state.dealReg);
  const [activeKey, setActiveKey] = useState<number>();

  const [percentage, setPercentage] = useState<number>(0);
  const handlePercentageChange = (newPercentage: number) => {
    setPercentage(newPercentage);
  };

  useEffect(() => {
    if (DealRegData && DealRegData.length > 0) {
      setActiveKey(DealRegData[0]?.partner_program_id);
    }
  }, [DealRegData]);

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };

  const tabItems = useMemo(() => {
    if (!DealRegData) return [];

    return DealRegData?.map((element: any) => {
      const {partner_program_id, id, Partner, PartnerProgram} = element;
      const isActive = activeKey?.toString() === partner_program_id?.toString();
      const headerStyle = {
        background: isActive ? token.colorInfo : token.colorInfoBg,
      };
      const textColor = isActive
        ? token.colorBgContainer
        : token?.colorTextDisabled;
      return {
        key: partner_program_id,
        label: (
          <Row
            key={id}
            gutter={[0, 10]}
            style={{width: 'fit-content', margin: '24px 0px'}}
          >
            <DealRegCustomTabHeaderStyle
              token={token}
              style={headerStyle}
              onClick={() => dispatch(setDealReg(element))}
            >
              <Space>
                <CustomProgress isActive={isActive} token={token} percent={0} />
                <Typography
                  style={{color: textColor}}
                  cursor="pointer"
                  name="Button 1"
                >
                  {`${formatStatus(Partner?.partner)} - ${formatStatus(PartnerProgram?.partner_program)}`}
                </Typography>
              </Space>
            </DealRegCustomTabHeaderStyle>
          </Row>
        ),

        children: (
          <div key={partner_program_id}>
            <DealRegDetailForm
              data={element}
              activeKey={activeKey}
              CommonFieldForm={CommonFieldForm}
              UniqueFieldForm={UniqueFieldForm}
              onPercentageChange={handlePercentageChange}
            />
          </div>
        ),
      };
    });
  }, [DealRegData, activeKey]);

  return (
    <>
      <CustmDealRegTab
        token={token}
        activeKey={activeKey as any}
        items={tabItems}
        onChange={handleTabChange}
      />
    </>
  );
};

export default DealRegCustomTabs;
