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
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryAttributeField} from '../../../../../redux/actions/attributeField';
import {updateDealRegById} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DealRegDetailForm from './DealRegDetailForm';
import {setDealRegForNew} from '../../../../../redux/slices/dealReg';

const DealRegCustomTabs: React.FC<any> = ({form}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getOpportunityId = searchParams.get('opportunityId');
  const {
    data: DealRegData,
    dealReg,
    getDealRegForNew,
  } = useAppSelector((state) => state.dealReg);
  const [activeKey, setActiveKey] = useState<number>();
  const [tabItems, setTabItems] = useState([]);
  const {data: AttributeFieldData} = useAppSelector(
    (state) => state.attributeField,
  );

  const [commonTemplateData, setCommonTemplateData] = useState<any>();
  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();

  useEffect(() => {
    if (DealRegData && DealRegData.length > 0) {
      setActiveKey(DealRegData[0]?.id);
    }
  }, [DealRegData]);

  useEffect(() => {
    dispatch(queryAttributeField(''));
  }, [dispatch]);

  const onFinish = async () => {
    const commonFieldObject: any = {};
    const uniqueFieldObject: any = {};
    let finalCommonData: any = {};
    let finalUniqueData: any = {};
    const commonFieldFormData = form.getFieldsValue();

    if (commonFieldFormData) {
      for (const [key, value] of Object?.entries(commonFieldFormData)) {
        if (key?.startsWith('c_')) {
          commonFieldObject[key] = value;
        } else if (key?.startsWith('u_')) {
          uniqueFieldObject[key] = value;
        }
      }
      if (activeKey) {
        const commonFormData = getDealRegForNew?.[0]?.common_form_data
          ? JSON?.parse(getDealRegForNew?.[0]?.common_form_data)
          : '';
        const newFinalData = commonTemplateData
          ? commonTemplateData
          : commonFormData;

        finalCommonData = {
          ...newFinalData,
          ...commonFieldObject,
        };
        setCommonTemplateData(finalCommonData);
      }
      const obj = {
        common_form_data: [JSON.stringify(finalCommonData)],
        unique_form_data: [JSON.stringify(finalUniqueData)],
        id: getDealRegForNew?.[0]?.id,
      };

      if (obj) {
        dispatch(updateDealRegById(obj));
        // .then((response: any) => {
        // if (response?.payload) {
        //   dispatch(getDealRegByOpportunityId(Number(getOpportunityId))).then(
        //     (d) => {
        //       if (d?.payload) {
        //         const statusData = d?.payload?.reduce(
        //           (acc: any[], element: any) => {
        //             if (element?.id === dealReg?.id) {
        //               const tabPercentage = tabBarPercentageCalculations(
        //                 element?.PartnerProgram?.form_data,
        //                 AttributeFieldData,
        //                 element?.unique_form_data,
        //                 element?.common_form_data,
        //               );
        //               if (tabPercentage > 0 && tabPercentage < 100) {
        //                 acc.push({
        //                   id: element?.id,
        //                   status: 'In Progress',
        //                 });
        //               }
        //             }
        //             return acc;
        //           },
        //           [],
        //         );
        //         console.log('statusData', statusData);
        //         // dispatch(updateDealRegStatus(statusData)).then((response) => {
        //         //   if (response?.payload) {
        //         //     dispatch(
        //         //       getDealRegByOpportunityId(Number(getOpportunityId)),
        //         //     );
        //         //   }
        //         // });
        //       }
        //     },
        //   );
        // }
        // });
      }
    }
  };

  console.log('commonTemplateData', commonTemplateData);

  useEffect(() => {
    if (!DealRegData) {
      setTabItems([]);
      return;
    }

    const newTabItems =
      DealRegData &&
      DealRegData?.map((element: any) => {
        const {partner_program_id, Partner, PartnerProgram, id} = element;
        const isActive = activeKey?.toString() === id?.toString();

        const tabPercentage = tabBarPercentageCalculations(
          element?.PartnerProgram?.form_data,
          AttributeFieldData,
          element?.unique_form_data,
          element?.common_form_data,
        );

        console.log('tabPercentage', tabPercentage);

        const headerStyle = {
          background: isActive ? token.colorInfo : token.colorInfoBg,
        };

        const textColor = isActive
          ? token.colorBgContainer
          : token?.colorTextDisabled;

        return {
          key: id,
          label: (
            <Row
              key={id}
              gutter={[0, 10]}
              style={{width: 'fit-content', margin: '24px 0px'}}
            >
              <DealRegCustomTabHeaderStyle
                token={token}
                style={headerStyle}
                onClick={() => {
                  // dispatch(setDealRegForNew({}));
                  setCommonTemplateData('');
                  // dispatch(setDealReg(element));
                  setActiveKey(id);
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
            <div key={id}>
              <DealRegDetailForm
                data={element}
                activeKey={activeKey}
                form={form}
                handleBlur={onFinish}
                commonTemplateData={commonTemplateData}
                setCommonTemplateData={setCommonTemplateData}
                uniqueTemplateData={uniqueTemplateData}
                setUniqueTemplateData={setUniqueTemplateData}
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
