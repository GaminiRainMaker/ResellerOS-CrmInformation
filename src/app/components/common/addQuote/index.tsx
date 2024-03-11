/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import moment from 'moment';
import {FC, useEffect, useState} from 'react';
import OsModal from '@/app/components/common/os-modal';
import UploadFile from '@/app/(UI)/(Dashboard_UI)/generateQuote/UploadFile';
import {getContractProductByProductCode} from '../../../../../redux/actions/contractProduct';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {insertProduct} from '../../../../../redux/actions/product';
import {insertProfitability} from '../../../../../redux/actions/profitability';
import {
  getQuotesByDateFilter,
  insertQuote,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {getRebatesByProductCode} from '../../../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../../../redux/actions/rebateQuoteLineitem';
import {insertValidation} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsButton from '../os-button';
import {AddQuoteInterface, FormattedData} from './addQuote.interface';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';

const AddQuote: FC<AddQuoteInterface> = ({
  uploadFileData,
  existingQuoteId,
  setUploadFileData,
  loading,
  buttonText,
  uploadForm,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: generalSettingData} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [form] = Form.useForm();

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

  const addQuoteLineItem = async (
    customerId?: string,
    opportunityId?: string,
  ) => {
    const labelOcrMap: any = [];
    let formattedArray: any = [];
    const formattedData: FormattedData = {};
    uploadFileData?.map((uploadFileDataItem: any) => {
      const tempLabelOcrMap: any = {};
      const arrayOfTableObjects =
        uploadFileDataItem?.data?.result?.[0]?.prediction?.filter(
          (item: any) => item.label === 'table',
        );
      arrayOfTableObjects?.[0]?.cells.forEach((item: any) => {
        const rowNum = item.row;
        if (!formattedData[rowNum]) {
          formattedData[rowNum] = {};
        }
        formattedData[rowNum][item.label?.toLowerCase()] = item.text;
      });

      formattedArray = Object.values(formattedData);

      <>
        {uploadFileDataItem?.data?.result?.[0]?.prediction?.forEach(
          (item: any) => {
            tempLabelOcrMap[item?.label?.toLowerCase()] = item?.ocr_text;
          },
        )}
      </>;
      labelOcrMap?.push({
        ...tempLabelOcrMap,
        pdf_url: uploadFileDataItem?.pdf_url,
        customer_id: customerId,
        opportunity_id: opportunityId,
        organization: userInformation.organization,
        file_name: moment(new Date()).format('MM/DD/YYYY'),
        quote_json: [JSON?.stringify(formattedArray)],
      });
    });
    const newrrLineItems: any = [];
    const rebateDataArray: any = [];
    const contractProductArray: any = [];
    if (labelOcrMap && uploadFileData.length > 0 && !existingQuoteId) {
      const response = await dispatch(insertQuote(labelOcrMap));
      form.resetFields(['customer_id']);
      for (let j = 0; j < response?.payload?.data?.length; j++) {
        const item = response?.payload?.data[j];
        if (item?.id) {
          for (let i = 0; i < formattedArray?.length; i++) {
            const items = formattedArray[i];
            const insertedProduct = await dispatch(
              insertProduct({
                ...items,
                organization: userInformation.organization,
              }),
            );
            if (insertedProduct?.payload?.id) {
              const obj1: any = {
                quote_id: item?.id,
                product_id: insertedProduct?.payload?.id,
                product_code: insertedProduct?.payload?.product_code,
                line_amount: insertedProduct?.payload?.line_amount,
                list_price: insertedProduct?.payload?.list_price,
                adjusted_price: insertedProduct?.payload?.adjusted_price,
                description: insertedProduct?.payload?.description,
                quantity: insertedProduct?.payload?.quantity,
                line_number: insertedProduct?.payload?.line_number,
                pdf_url:
                  generalSettingData?.attach_doc_type === 'quote_line_item'
                    ? item?.pdf_url
                    : null,
                organization: userInformation.organization,
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
                  contract_product_id:
                    contractProductByProductCode?.payload?.id,
                });
              }
              newrrLineItems?.push(obj1);
            }
          }
        }
      }
    } 
    else if (existingQuoteId) {
      await dispatch(updateQuoteWithNewlineItemAddByID(existingQuoteId));
      for (let i = 0; i < formattedArray?.length; i++) {
        const items = formattedArray[i];
        const insertedProduct = await dispatch(
          insertProduct({
            ...items,
            organization: userInformation.organization,
          }),
        );
        if (insertedProduct?.payload?.id) {
          const obj1: any = {
            quote_id: existingQuoteId,
            product_id: insertedProduct?.payload?.id,
            product_code: insertedProduct?.payload?.product_code,
            line_amount: insertedProduct?.payload?.line_amount,
            list_price: insertedProduct?.payload?.list_price,
            description: insertedProduct?.payload?.description,
            quantity: insertedProduct?.payload?.quantity,
            adjusted_price: insertedProduct?.payload?.adjusted_price,
            line_number: insertedProduct?.payload?.line_number,
            organization: userInformation.organization,
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
          newrrLineItems?.push(obj1);
        }
      }
    }

    const finalOpportunityArray: any = [];
    if (newrrLineItems && syncTableData?.length > 0) {
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
      for (let i = 0; i < newrrLineItems?.length; i++) {
        const itemsss: any = newrrLineItems[i];
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
          (obj: any, item: any) => Object.assign(obj, {[item.key]: item.value}),
          {},
        );
        finalOpportunityArray?.push(singleObjects);
      });
    }
    if (newrrLineItems && newrrLineItems.length > 0) {
      dispatch(insertQuoteLineItem(newrrLineItems)).then((d) => {
        if (rebateDataArray && rebateDataArray.length > 0) {
          const data = genericFun(d?.payload, rebateDataArray);
          dispatch(insertRebateQuoteLineItem(data));
        }
        if (contractProductArray && contractProductArray.length > 0) {
          const data = genericFun(d?.payload, contractProductArray);
          dispatch(insertValidation(data));
        }
        if (newrrLineItems && newrrLineItems.length > 0) {
          const data = genericFun(d?.payload, newrrLineItems);
          dispatch(insertProfitability(data));
        }
      });
    }
    if (finalOpportunityArray && syncTableData?.length > 0) {
      dispatch(insertOpportunityLineItem(finalOpportunityArray));
    }

    dispatch(getQuotesByDateFilter({}));
    setShowModal(false);
    setUploadFileData([]);
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
        bodyPadding={22}
        loading={loading}
        disabledButton={!(uploadFileData?.length > 0)}
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            addInExistingQuote
            addQuoteLineItem={addQuoteLineItem}
            form={form}
          />
        }
        width={900}
        primaryButtonText="Generate Single Quote"
        secondaryButtonText="Save & Generate Individual Quotes"
        open={showModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setShowModal(false);
          setUploadFileData([]);
          form.resetFields(['customer_id']);
        }}
      />
    </>
  );
};

export default AddQuote;
