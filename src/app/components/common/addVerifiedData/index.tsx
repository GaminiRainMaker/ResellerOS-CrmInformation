/* eslint-disable @typescript-eslint/indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import OsModal from '@/app/components/common/os-modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { getContractProductByProductCode } from '../../../../../redux/actions/contractProduct';
import { getAllGeneralSetting } from '../../../../../redux/actions/generalSetting';
import { insertOpportunityLineItem } from '../../../../../redux/actions/opportunityLineItem';
import { insertProduct } from '../../../../../redux/actions/product';
import { insertProfitability } from '../../../../../redux/actions/profitability';
import {
    getQuotesByDateFilter
} from '../../../../../redux/actions/quote';
import { insertQuoteLineItem } from '../../../../../redux/actions/quotelineitem';
import { getRebatesByProductCode } from '../../../../../redux/actions/rebate';
import { insertRebateQuoteLineItem } from '../../../../../redux/actions/rebateQuoteLineitem';
import { insertValidation } from '../../../../../redux/actions/validation';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import OsButton from '../os-button';

const AddVerifiedData: FC<any> = ({
  uploadFileData,
  existingQuoteId,
  setUploadFileData,
  buttonText,
  uploadForm,
  rowSelection,
  setShowToggleTable,
  showToggleTable,
  Quotecolumns,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [finalLoading, setFinalLoading] = useState<boolean>(false);

  useEffect(() => {
    if (existingQuoteId) {
      form?.setFieldValue('existingQuoteId', existingQuoteId);
    }
  }, [existingQuoteId]);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);


  const genericFun = (payloadArr: any, Arr: any) => {
    const newArr = Arr?.map((item: any) => ({
      ...item,
      quoteline_item_id: payloadArr?.find(
        (itm: any) => itm?.product_code === item?.product_code,
      )?.id,
    }));
    return newArr;
  };

  const addQuoteLineItem = async () => {
    const quoteId = form.getFieldValue('existingQuoteId');

    const quotesArr: any = [];
    try {
      setFinalLoading(true);

      // dispatch((insertQuoteFile({})))
      const rebateDataArray: any = [];
      const contractProductArray: any = [];
      const finalLineItems: any = [];
      for (let i = 0; i < quotesArr?.length; i++) {
        for (let j = 0; j < quotesArr[i]?.lineItems.length; j++) {
          const lineItem = quotesArr[i]?.lineItems[j];
          const insertedProduct = await dispatch(insertProduct(lineItem));
          if (insertedProduct?.payload?.id) {
            const obj1: any = {
              quote_id: quotesArr[i]?.id,
              product_id: insertedProduct?.payload?.id,
              product_code: insertedProduct?.payload?.product_code,
              line_amount: insertedProduct?.payload?.line_amount,
              list_price: insertedProduct?.payload?.list_price,
              description: insertedProduct?.payload?.description,
              quantity: insertedProduct?.payload?.quantity,
              adjusted_price: insertedProduct?.payload?.adjusted_price,
              line_number: insertedProduct?.payload?.line_number,
              organization: userInformation.organization,
              pdf_url: lineItem?.pdf_url,
              quote_config_id: lineItem?.quote_config_id,
              file_name: lineItem?.file_name,
              nanonets_id: lineItem?.nanonets_id,
            };
            const RebatesByProductCodData = await dispatch(
              getRebatesByProductCode(insertedProduct?.payload?.product_code),
            );
            if (RebatesByProductCodData?.payload?.id) {
              rebateDataArray?.push({
                ...obj1,
                rebate_id: RebatesByProductCodData?.payload?.id,
                percentage_payout:
                  RebatesByProductCodData?.payload?.percentage_payout,
              });
            }
            const contractProductByProductCode = await dispatch(
              getContractProductByProductCode(
                insertedProduct?.payload?.product_code,
              ),
            );
            if (contractProductByProductCode?.payload?.id) {
              contractProductArray?.push({
                ...obj1,
                contract_product_id: contractProductByProductCode?.payload?.id,
              });
            }
            finalLineItems?.push(obj1);
          }
        }
      }

      const finalOpportunityArray: any = [];
      if (finalLineItems && syncTableData?.length > 0) {
        const newRequiredArray: any = [];
        syncTableData?.map((item: any) => {
          if (item?.is_required) {
            newRequiredArray?.push({
              sender: item?.sender_table_col,
              reciver: item?.reciver_table_col,
            });
          }
        });
        const newArrayForOpporQuoteLineItem: any = [];
        for (let i = 0; i < finalLineItems?.length; i++) {
          const itemsss: any = finalLineItems[i];
          newRequiredArray?.map((itemsRe: any) => {
            newArrayForOpporQuoteLineItem?.push({
              key: itemsRe?.reciver,
              value: itemsss?.[itemsRe?.sender],
            });
          });
        }

        const resultArrForAllArr: any = [];
        const checkValue = syncTableData?.length;

        newArrayForOpporQuoteLineItem.forEach((item: any, index: number) => {
          if (index % checkValue === 0) {
            resultArrForAllArr.push(
              newArrayForOpporQuoteLineItem.slice(index, index + checkValue),
            );
          }
        });

        resultArrForAllArr?.map((itemss: any) => {
          const singleObjects = itemss.reduce(
            (obj: any, item: any) =>
              Object.assign(obj, {[item.key]: item.value}),
            {},
          );
          finalOpportunityArray?.push(singleObjects);
        });
      }

      if (finalLineItems && finalLineItems.length > 0) {
        dispatch(insertQuoteLineItem(finalLineItems)).then((d) => {
          if (rebateDataArray && rebateDataArray.length > 0) {
            const data = genericFun(d?.payload, rebateDataArray);
            dispatch(insertRebateQuoteLineItem(data));
          }
          if (contractProductArray && contractProductArray.length > 0) {
            const data = genericFun(d?.payload, contractProductArray);
            dispatch(insertValidation(data));
          }
          if (finalLineItems && finalLineItems.length > 0) {
            const data = genericFun(d?.payload, finalLineItems);
            dispatch(insertProfitability(data));
          }
        });
      }
      if (finalOpportunityArray && syncTableData?.length > 0) {
        dispatch(insertOpportunityLineItem(finalOpportunityArray));
      }
      setFinalLoading(false);
    } catch (err) {
      setFinalLoading(false);
      console.log('object', err);
    }
    dispatch(getQuotesByDateFilter({}));
    setShowModal(false);
    setUploadFileData([]);
    form.resetFields(['customer_id', 'opportunity_id']);
  };

  const resetFields = () => {
    setShowModal(false);
    setUploadFileData([]);
    form.resetFields(['customer_id', 'opportunity_id']);
  };

  return (
    <>
      <OsButton
        text={buttonText}
        buttontype="PRIMARY"
        icon={<PlusIcon />}
        clickHandler={() => {
          if (buttonText === 'Generate') {
            uploadForm?.submit();
          } else {
            setShowModal((p) => !p);
          }
        }}
      />
      <OsModal
        loading={finalLoading}
        bodyPadding={22}
        disabledButton={!(uploadFileData?.length > 0)}
        body={<>dddddd</>}
        width={900}
        primaryButtonText="Generate Single Quote"
        thirdButtonText={
          !existingQuoteId ? 'Save & Generate Individual Quotes' : null
        }
        open={showModal}
        onOk={() => {
          form?.setFieldValue('singleQuote', true);
          form.submit();
        }}
        // thirdButtonfunction={() => {
        //   form?.setFieldValue('singleQuote', false);
        //   form.submit();
        // }}
        onCancel={() => {
          resetFields();
        }}
      />
    </>
  );
};

export default AddVerifiedData;
