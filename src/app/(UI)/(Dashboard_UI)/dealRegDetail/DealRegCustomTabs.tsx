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
import {calculateTabBarPercentage} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryAttributeField} from '../../../../../redux/actions/attributeField';
import {
  getDealRegById,
  updateDealRegById,
  updateDealRegStatus,
} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setFinalUpdatedDealRegData} from '../../../../../redux/slices/dealReg';
import DealRegDetailForm from './DealRegDetailForm';

const DealRegCustomTabs: React.FC<any> = ({form}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const {
    data: DealRegData,
    getDealRegForNew,
    finalUpdatedDealRegData,
  } = useAppSelector((state) => state.dealReg);
  const [activeKey, setActiveKey] = useState<number>();
  const [tabItems, setTabItems] = useState([]);
  const {queryData} = useAppSelector((state) => state.attributeField);
  const [formData, setFormData] = useState<any>();
  const getDealRegId = searchParams.get('id');

  useEffect(() => {
    if (getDealRegId && DealRegData && DealRegData.length > 0) {
      setActiveKey(Number(getDealRegId));
    } else if (DealRegData && DealRegData.length > 0) {
      setActiveKey(DealRegData[0]?.id);
    }
    dispatch(setFinalUpdatedDealRegData(DealRegData));
  }, [DealRegData]);

  useEffect(() => {
    if (activeKey) {
      dispatch(getDealRegById(activeKey));
    }
  }, [activeKey]);

  useEffect(() => {
    if (getDealRegForNew && Object.keys(getDealRegForNew).length > 0) {
      let finalDealReg = getDealRegForNew;
      const obj = {
        common_form_data:
          finalDealReg?.common_form_data &&
          finalDealReg?.common_form_data.length > 0
            ? JSON?.parse(finalDealReg?.common_form_data?.[0])
            : {},
        unique_form_data:
          finalDealReg?.unique_form_data &&
          finalDealReg?.unique_form_data.length > 0
            ? JSON?.parse(finalDealReg?.unique_form_data?.[0])
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
      };
      setFormData(obj);
    }
  }, [getDealRegForNew]);

  useEffect(() => {
    dispatch(queryAttributeField(''));
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

      if (getDealRegForNew && Object?.keys(getDealRegForNew).length > 0) {
        finalDealReg = getDealRegForNew;
        const parsedCommonFormData = finalDealReg?.common_form_data?.[0]
          ? JSON.parse(finalDealReg.common_form_data[0])
          : {};
        const parsedUniqueFormData = finalDealReg?.unique_form_data?.[0]
          ? JSON.parse(finalDealReg.unique_form_data[0])
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
      };
      setFormData(formObj);
      updateDealRegFinalData(activeKey, newObj);

      if (obj) {
        await dispatch(updateDealRegById(obj));
        if (activeKey && tabPercentage > 0 && tabPercentage < 100) {
          const statusObj = {
            id: activeKey,
            status: 'In Progress',
          };
          dispatch(updateDealRegStatus(statusObj));
        }
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
        const {Partner, PartnerProgram, id} = element;
        const isActive = activeKey?.toString() === id?.toString();

        const tabPercentage: number = calculateTabBarPercentage(
          element?.PartnerProgram?.form_data,
          queryData,
          element?.unique_form_data,
          element?.common_form_data,
          true,
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
      });

    setTabItems(newTabItems);
  }, [finalUpdatedDealRegData, activeKey, token, dispatch, formData]);

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
