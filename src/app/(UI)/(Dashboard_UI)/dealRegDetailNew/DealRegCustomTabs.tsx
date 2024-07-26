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
import {tabBarPercentageCalculations} from '@/app/utils/base';
import {useEffect, useState} from 'react';
import {queryAttributeField} from '../../../../../redux/actions/attributeField';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setDealReg} from '../../../../../redux/slices/dealReg';
import DealRegDetailForm from './DealRegDetailForm';
import {
  getDealRegByOpportunityId,
  updateDealRegById,
} from '../../../../../redux/actions/dealReg';
import {useSearchParams} from 'next/navigation';

const DealRegCustomTabs: React.FC<any> = ({form}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getOpportunityId = searchParams.get('opportunityId');
  const {data: DealRegData, dealReg} = useAppSelector((state) => state.dealReg);
  const [activeKey, setActiveKey] = useState<number>();
  const [tabItems, setTabItems] = useState([]);
  const {data: AttributeFieldData} = useAppSelector(
    (state) => state.attributeField,
  );
  useEffect(() => {
    if (DealRegData && DealRegData.length > 0) {
      setActiveKey(DealRegData[0]?.partner_program_id);
    }
  }, [DealRegData]);

  useEffect(() => {
    dispatch(queryAttributeField(''));
  }, [dispatch]);

  const handleTabChange = (key: any) => {
    setActiveKey(key);
  };

  const onFinish = () => {
    const commonFieldObject: any = {};
    const uniqueFieldObject: any = {};
    const commonFieldFormData = form.getFieldsValue();

    if (commonFieldFormData) {
      for (const [key, value] of Object?.entries(commonFieldFormData)) {
        if (key?.startsWith('c_')) {
          commonFieldObject[key] = value;
        } else if (key?.startsWith('u_')) {
          uniqueFieldObject[key] = value;
        }
      }

      const obj = {
        common_form_data: [JSON.stringify(commonFieldObject)],
        unique_form_data: [JSON.stringify(uniqueFieldObject)],
        id: dealReg?.id,
      };

      if (obj) {
        dispatch(updateDealRegById(obj)).then((response: any) => {
          if (response?.payload) {
            dispatch(getDealRegByOpportunityId(Number(getOpportunityId))).then(
              (d) => {
                if (d?.payload) {
                  const statusData = d?.payload?.reduce(
                    (acc: any[], element: any) => {
                      if (element?.id === dealReg?.id) {
                        const tabPercentage = tabBarPercentageCalculations(
                          element?.PartnerProgram?.form_data,
                          AttributeFieldData,
                          element?.unique_form_data,
                          element?.common_form_data,
                        );

                        if (tabPercentage > 0 && tabPercentage < 100) {
                          acc.push({
                            id: element?.id,
                            status: 'In Progress',
                          });
                        }
                      }
                      return acc;
                    },
                    [],
                  );
                  console.log('statusData', statusData);
                }
              },
            );
          }
        });
      }
    }

    // const tabPercentage = tabBarPercentageCalculations(
    //   dealReg?.PartnerProgram?.form_data,
    //   AttributeFieldData,
    //   dealReg?.unique_form_data,
    //   dealReg?.common_form_data,
    // );
    // console.log('tabPercentagetabPercentage', tabPercentage);
  };

  useEffect(() => {
    if (!DealRegData) {
      setTabItems([]);
      return;
    }

    const newTabItems =
      DealRegData &&
      DealRegData?.map((element: any) => {
        const {partner_program_id, Partner, PartnerProgram} = element;
        const isActive =
          activeKey?.toString() === partner_program_id?.toString();

        const tabPercentage = tabBarPercentageCalculations(
          element?.PartnerProgram?.form_data,
          AttributeFieldData,
          element?.unique_form_data,
          element?.common_form_data,
        );

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
              key={partner_program_id}
              gutter={[0, 10]}
              style={{width: 'fit-content', margin: '24px 0px'}}
            >
              <DealRegCustomTabHeaderStyle
                token={token}
                style={headerStyle}
                onClick={() => {
                  dispatch(setDealReg(element));
                }}
              >
                <Space>
                  <CustomProgress
                    isActive={isActive}
                    token={token}
                    percent={tabPercentage}
                  />
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
                form={form}
                handleBlur={onFinish}
              />
            </div>
          ),
        };
      });

    setTabItems(newTabItems);
  }, [DealRegData, activeKey, AttributeFieldData, token, dispatch, form]);

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

// const tabItems = useMemo(() => {
//   if (!DealRegData) return [];
//   return DealRegData?.map((element: any) => {
//     const {partner_program_id, Partner, PartnerProgram} = element;
//     const isActive = activeKey?.toString() === partner_program_id?.toString();

//     const tabPercentage = tabBarPercentageCalculations(
//       element?.PartnerProgram?.form_data,
//       AttributeFieldData,
//       element?.unique_form_data,
//       element?.common_form_data,
//     );
//     const headerStyle = {
//       background: isActive ? token.colorInfo : token.colorInfoBg,
//     };
//     const textColor = isActive
//       ? token.colorBgContainer
//       : token?.colorTextDisabled;
//     return {
//       key: partner_program_id,
//       label: (
//         <Row
//           key={partner_program_id}
//           gutter={[0, 10]}
//           style={{width: 'fit-content', margin: '24px 0px'}}
//         >
//           <DealRegCustomTabHeaderStyle
//             token={token}
//             style={headerStyle}
//             onClick={() => {
//               dispatch(setDealReg(element));
//             }}
//           >
//             <Space>
//               <CustomProgress
//                 isActive={isActive}
//                 token={token}
//                 percent={tabPercentage}
//               />
//               <Typography
//                 style={{color: textColor}}
//                 cursor="pointer"
//                 name="Button 1"
//               >
//                 {`${formatStatus(Partner?.partner)} - ${formatStatus(PartnerProgram?.partner_program)}`}
//               </Typography>
//             </Space>
//           </DealRegCustomTabHeaderStyle>
//         </Row>
//       ),

//       children: (
//         <div key={partner_program_id}>
//           <DealRegDetailForm
//             data={element}
//             activeKey={activeKey}
//             form={form}
//           />
//         </div>
//       ),
//     };
//   });
// }, [DealRegData, activeKey]);
