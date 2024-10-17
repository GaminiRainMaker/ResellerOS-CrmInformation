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
import {
  calculateTabBarPercentage,
  filterRadioData,
  updateSalesForceData,
} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  getDealRegById,
  updateDealRegById,
  updateDealRegStatus,
} from '../../../../../redux/actions/dealReg';
import {
  getSalesForceDealregById,
  getSalesForceDealregByOpportunityId,
  updateSalesForceDealregById,
} from '../../../../../redux/actions/salesForce';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setFinalUpdatedDealRegData} from '../../../../../redux/slices/dealReg';
import DealRegDetailForm from './DealRegDetailForm';
import {queryAttributeFieldForForm} from '../../../../../redux/actions/attributeField';

// Define the prop types for DealRegCustomTabs
type DealRegCustomTabsProps = {
  form: any;
  formData: any;
  setFormData: (data: any) => void;
  setSalesForceDealregData: (data: any) => void;
};

export type DealRegCustomTabsHandle = {
  onFinish: () => void;
};

const DealRegCustomTabs = forwardRef<
  DealRegCustomTabsHandle,
  DealRegCustomTabsProps
>(({form, formData, setFormData, setSalesForceDealregData}, ref) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const salesForceUrl = searchParams.get('instance_url');
  const getOpportunityId = searchParams && searchParams.get('opportunityId');
  const salesForceKey = searchParams.get('key');
  const {
    data: DealRegData,
    getDealRegForNew,
    finalUpdatedDealRegData,
  } = useAppSelector((state) => state.dealReg);
  const [activeKey, setActiveKey] = useState<number>();
  const [tabItems, setTabItems] = useState([]);
  const [isData, setIsData] = useState<boolean>(false);
  const {queryData} = useAppSelector((state) => state.attributeField);
  const {allPartnersById} = useAppSelector((state) => state.partner);
  const {allPartnerProgramById} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const getDealRegId = searchParams && searchParams.get('id');
  const [salesForceDealregById, setSalesForceDealregById] = useState<any>();

  useEffect(() => {
    if (
      getDealRegId &&
      DealRegData &&
      DealRegData.length > 0 &&
      !salesForceUrl
    ) {
      setActiveKey(Number(getDealRegId));
    } else if (DealRegData && DealRegData.length > 0) {
      setActiveKey(DealRegData[0]?.id);
    }
    if (DealRegData) {
      dispatch(setFinalUpdatedDealRegData(DealRegData));
    }
  }, [DealRegData]);

  useEffect(() => {
    const fetchData = async () => {
      const obj = {
        baseURL: salesForceUrl,
        token: salesForceKey,
        opportunityId: getOpportunityId,
      };
      if (getOpportunityId && salesForceUrl && salesForceKey) {
        try {
          const res: any = await dispatch(
            getSalesForceDealregByOpportunityId(obj),
          );
          if (res?.payload) {
            const finalData = await updateSalesForceData(
              res,
              allPartnersById,
              allPartnerProgramById,
              dispatch,
              setIsData,
            );
            if (finalData) {
              setSalesForceDealregData(finalData);
              setActiveKey(finalData[0]?.id);
              dispatch(setFinalUpdatedDealRegData(finalData));
            }
          }
        } catch (error) {
          console.error(
            'Error fetching salesforce deal registration data:',
            error,
          );
        }
      }
    };

    fetchData();
  }, [salesForceUrl, isData]);

  const callDealregApi = async (obj: any) => {
    try {
      // Wait for the dispatch to complete and get the result
      const d: any = await dispatch(getSalesForceDealregById(obj));

      // If the payload is present, call updateSalesForceData
      if (d?.payload) {
        const finalData = await updateSalesForceData(
          d,
          allPartnersById,
          allPartnerProgramById,
          dispatch,
          setIsData,
        );
        // console.log('finalData3333', finalData, d?.payload);
        setSalesForceDealregById(finalData);
      }

      // Set salesForceDealregById after the update
    } catch (error) {
      console.error('Error calling Dealreg API:', error);
    }
  };

  useEffect(() => {
    if (activeKey && !salesForceUrl) {
      dispatch(getDealRegById(activeKey));
    } else if (activeKey && salesForceUrl) {
      // call salesforce API get dealreg By id
      let obj = {
        baseURL: salesForceUrl,
        token: salesForceKey,
        dealregId: activeKey,
      };
      callDealregApi(obj);
    }
  }, [activeKey]);

  useEffect(() => {
    const selectedDealRegData =
      (salesForceDealregById?.length > 0 && salesForceDealregById?.[0]) ||
      getDealRegForNew;
    if (selectedDealRegData && Object.keys(selectedDealRegData).length > 0) {
      let finalDealReg = selectedDealRegData;
      let commonFormData =
        typeof finalDealReg?.common_form_data === 'string'
          ? JSON.parse(finalDealReg?.common_form_data)
          : finalDealReg?.common_form_data;
      let uniqueFormData =
        typeof finalDealReg?.unique_form_data === 'string'
          ? JSON.parse(finalDealReg?.unique_form_data)
          : finalDealReg?.unique_form_data;
      console.log('finalDealReg', finalDealReg);
      const obj = {
        common_form_data:
          commonFormData && commonFormData.length > 0
            ? JSON?.parse(commonFormData?.[0])
            : {},
        unique_form_data:
          uniqueFormData && uniqueFormData.length > 0
            ? JSON?.parse(uniqueFormData?.[0])
            : {},
        id: finalDealReg?.id,
        unique_template:
          finalDealReg?.PartnerProgram?.form_data &&
          finalDealReg?.PartnerProgram?.form_data?.length > 0
            ? JSON.parse(finalDealReg?.PartnerProgram?.form_data?.[0])
            : {},
        common_template: queryData,
        Partner: finalDealReg?.Partner,
        PartnerProgram: finalDealReg?.PartnerProgram,
        partner_approval_id: finalDealReg?.partner_approval_id,
        partner_deal_id: finalDealReg?.partner_deal_id,
        expiration_date: finalDealReg?.expiration_date,
        submitted_date: finalDealReg?.submitted_date,
        status: finalDealReg?.status,
        type: finalDealReg?.type,
      };
      setFormData(obj);
    }
  }, [getDealRegForNew, salesForceDealregById]);

  useEffect(() => {
    dispatch(queryAttributeFieldForForm(''));
  }, [dispatch]);

  const updateDealRegFinalData = (activeKey: any, formObj: any) => {
    const updatedData = finalUpdatedDealRegData?.map((item: any) =>
      item?.id === activeKey ? {...item, ...formObj} : item,
    );
    dispatch(setFinalUpdatedDealRegData(updatedData));
  };

  const onFinish = async () => {
    const commonFieldFormData = form.getFieldsValue();
    const commonFieldObject: any = {};
    const uniqueFieldObject: any = {};
    let finalCommonFieldObject: any = {};
    let finalUniqueFieldObject: any = {};
    let finalDealReg: any = {};

    if (commonFieldFormData) {
      for (const [key, value] of Object?.entries(commonFieldFormData)) {
        if (key?.startsWith('c_')) {
          commonFieldObject[key] = value;
        } else if (key?.startsWith('u_')) {
          uniqueFieldObject[key] = value;
        }
      }

      // const uniqueFieldObjectResult = filterRadioData(uniqueFieldObject);
      const selectedDealRegData =
        (salesForceDealregById?.length > 0 && salesForceDealregById?.[0]) ||
        getDealRegForNew;

      if (selectedDealRegData && Object?.keys(selectedDealRegData).length > 0) {
        finalDealReg = selectedDealRegData;

        let commonFormData =
          typeof finalDealReg?.common_form_data === 'string'
            ? JSON.parse(finalDealReg?.common_form_data)
            : finalDealReg?.common_form_data;
        let uniqueFormData =
          typeof finalDealReg?.unique_form_data === 'string'
            ? JSON.parse(finalDealReg?.unique_form_data)
            : finalDealReg?.unique_form_data;

        const parsedCommonFormData = commonFormData?.[0]
          ? JSON.parse(commonFormData[0])
          : {};
        const parsedUniqueFormData = uniqueFormData?.[0]
          ? JSON.parse(uniqueFormData[0])
          : {};
        finalCommonFieldObject = {
          ...parsedCommonFormData,
          ...commonFieldObject,
        };
        finalUniqueFieldObject = {
          ...parsedUniqueFormData,
          ...uniqueFieldObject,
        };
      }
      const tabPercentage = calculateTabBarPercentage(
        finalDealReg?.PartnerProgram?.form_data,
        queryData,
        finalUniqueFieldObject,
        finalCommonFieldObject,
        false,
        finalDealReg?.type,
      );

      const obj = {
        common_form_data: [JSON.stringify(finalCommonFieldObject)],
        unique_form_data: [JSON.stringify(finalUniqueFieldObject)],
        id: activeKey,
      };
      const formObj = {
        common_form_data: finalCommonFieldObject,
        unique_form_data: finalUniqueFieldObject,
        id: activeKey,
        unique_template:
          finalDealReg?.PartnerProgram?.form_data &&
          finalDealReg?.PartnerProgram?.form_data?.length > 0
            ? JSON.parse(finalDealReg?.PartnerProgram?.form_data?.[0])
            : {},
        common_template: queryData,
        Partner: finalDealReg?.Partner,
        PartnerProgram: finalDealReg?.PartnerProgram,
        partner_approval_id: finalDealReg?.partner_approval_id,
        partner_deal_id: finalDealReg?.partner_deal_id,
        expiration_date: finalDealReg?.expiration_date,
        submitted_date: finalDealReg?.submitted_date,
        status: finalDealReg?.status,
      };
      const outputForQuniqueFileds = Object.entries(finalUniqueFieldObject).map(
        ([key, value]) => {
          const baseKey = key
            .split(/(\d+)/)[0]
            .replace(/^u_/, '')
            .replace(/_/g, ' ');
          const userfill = key.endsWith('userfill');
          const required = key.includes('required');

          return {
            [baseKey]: value,
            userfill,
            required,
          };
        },
      );

      const outputFoCommonFileds = Object.entries(finalCommonFieldObject).map(
        ([key, value]) => {
          const baseKey = key
            .split(/(\d+)/)[0]
            .replace(/^c_/, '')
            .replace(/_/g, ' ');
          const userfill = key.endsWith('userfill');
          const required = key.includes('required');

          return {
            [baseKey]: value,
            userfill,
            required,
          };
        },
      );
      let allFiledObj = [
        {
          key: 'Response details',
          value: [
            {
              partner_approval_id: finalDealReg?.partner_approval_id,
              userfill: false,
              required: false,
            },
            {
              partner_deal_id: finalDealReg?.partner_deal_id,
              userfill: false,
              required: false,
            },
            {
              expiration_date: finalDealReg?.expiration_date,
              userfill: false,
              required: false,
            },
            {
              submitted_date: finalDealReg?.submitted_date,
              userfill: false,
              required: false,
            },
            {status: finalDealReg?.status, userfill: false, required: false},
          ],
        },
        {
          key: 'Unique Fields',
          value: outputForQuniqueFileds,
        },
        {
          key: 'Common Fileds',
          value: outputFoCommonFileds,
        },
      ];

      const newObj = {
        common_form_data: [JSON.stringify(finalCommonFieldObject)],
        unique_form_data: [JSON.stringify(finalUniqueFieldObject)],
        id: activeKey,
        unique_template: finalDealReg?.PartnerProgram?.form_data,
        common_template: queryData,
        Partner: finalDealReg?.Partner,
        PartnerProgram: finalDealReg?.PartnerProgram,
        partner_approval_id: finalDealReg?.partner_approval_id,
        partner_deal_id: finalDealReg?.partner_deal_id,
        expiration_date: finalDealReg?.expiration_date,
        submitted_date: finalDealReg?.submitted_date,
        status: finalDealReg?.status,
        form_data_all: JSON?.stringify(allFiledObj),
        percentage: tabPercentage,
      };

      setFormData(formObj);
      updateDealRegFinalData(activeKey, newObj);

      if (obj && !salesForceUrl) {
        await dispatch(updateDealRegById(obj));
        if (activeKey && tabPercentage > 0 && tabPercentage < 100) {
          const statusObj = {
            id: activeKey,
            status: 'In Progress',
          };
          dispatch(updateDealRegStatus(statusObj));
        }
      } else if (newObj && salesForceUrl) {
        let finalObj = {
          data: newObj,
          baseURL: salesForceUrl,
          token: salesForceKey,
        };
        console.log('finalObj', finalObj);
        dispatch(updateSalesForceDealregById(finalObj));
      }
    }
  };

  useEffect(() => {
    if (!finalUpdatedDealRegData) {
      setTabItems([]);
      return;
    }
    const newTabItems =
      finalUpdatedDealRegData &&
      finalUpdatedDealRegData?.map((element: any) => {
        if (element) {
          const {Partner, PartnerProgram, id, type} = element;
          const isActive = activeKey?.toString() === id?.toString();
          const tabPercentage: number = calculateTabBarPercentage(
            element?.PartnerProgram?.form_data,
            queryData,
            element?.unique_form_data,
            element?.common_form_data,
            true,
            type || 'registered',
          );
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
                  formData={formData}
                />
              </div>
            ),
          };
        }
      });

    setTabItems(newTabItems);
  }, [finalUpdatedDealRegData, activeKey, token, dispatch, formData]);

  useImperativeHandle(ref, () => ({
    onFinish,
  }));

  return (
    <CustmDealRegTab
      token={token}
      activeKey={activeKey as any}
      items={tabItems}
    />
  );
});

export default DealRegCustomTabs;
