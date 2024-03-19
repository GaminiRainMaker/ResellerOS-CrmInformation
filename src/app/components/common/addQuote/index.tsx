/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import moment from 'moment';
import {FC, useEffect, useState} from 'react';
import OsModal from '@/app/components/common/os-modal';
import UploadFile from '@/app/(UI)/(Dashboard_UI)/generateQuote/UploadFile';
import {convertFileToBase64} from '@/app/utils/base';
import {useRouter} from 'next/navigation';
import {getContractProductByProductCode} from '../../../../../redux/actions/contractProduct';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {insertProduct} from '../../../../../redux/actions/product';
import {insertProfitability} from '../../../../../redux/actions/profitability';
import {
  getQuoteById,
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
import {AddQuoteInterface, FormattedData} from './types';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {uploadToAws} from '../../../../../redux/actions/upload';

const AddQuote: FC<AddQuoteInterface> = ({
  uploadFileData,
  existingQuoteId,
  setUploadFileData,
  buttonText,
  uploadForm,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: generalSettingData} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const {loading: insertQuoteLoading} = useAppSelector((state) => state.quote);
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [quoteId, setQuoteId] = useState<number>();

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  const beforeUpload = (file: File) => {
    const obj: any = {...file};
    convertFileToBase64(file)
      .then((base64String: string) => {
        obj.base64 = base64String;
        obj.file = file;
        setLoading(true);
        dispatch(uploadToAws({document: base64String})).then((payload: any) => {
          const pdfUrl = payload?.payload?.data?.Location;
          obj.pdf_url = pdfUrl;
          setLoading(false);
        });
        setUploadFileData((fileData: any) => [...fileData, obj]);
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
  };
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
    customerId: string,
    opportunityId: string,
    updatedArr: any,
    singleQuote: boolean,
  ) => {
    let quoteLineItemArr: any = [];
    const lineItemData: FormattedData = {};
    const quotesArr: any = [];
    for (let i = 0; i < updatedArr.length; i++) {
      const nanoNetsResult = updatedArr[i]?.data?.result;
      let quoteObj: any = {};
      for (let j = 0; j < nanoNetsResult.length; j++) {
        const result: any = nanoNetsResult[j];
        const lineItems: any = [];
        let quoteItem = {};
        const predictions = result?.prediction?.filter((item: any) => item);
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        predictions?.map((itemNew: any) => {
          if (itemNew.label === 'table') {
            if (itemNew?.cells) {
              itemNew?.cells.forEach((item: any) => {
                const rowNum = item.row;
                if (!lineItemData[rowNum]) {
                  lineItemData[rowNum] = {};
                }
                lineItemData[rowNum][item.label?.toLowerCase()] = item.text;
              });
            }
            quoteLineItemArr = Object.values(lineItemData);
            lineItems?.push({
              pdf_url: updatedArr[i]?.pdf_url,
              ...lineItemData,
              quote_config_id: updatedArr[i]?.quote_config_id ?? 22,
            });
          } else {
            quoteItem = {
              ...quoteItem,
              [itemNew?.label?.toLowerCase()]: itemNew?.ocr_text,
            };
          }
        });
        quoteObj = {
          ...quoteItem,
          customer_id: customerId,
          opportunity_id: opportunityId,
          organization: userInformation.organization,
          file_name: moment(new Date()).format('MM/DD/YYYY'),
          quote_json: [JSON?.stringify(lineItems)],
          lineItems,
        };
      }
      if (singleQuote || existingQuoteId) {
        if (i === 0) {
          quotesArr.push(quoteObj);
        } else {
          quotesArr[0].quote_json = [
            ...quotesArr[0].quote_json,
            JSON?.stringify(quoteObj?.quote_json),
          ];
          quotesArr[0].lineItems = [
            ...quotesArr[0].lineItems,
            quoteObj?.lineItems,
          ];
        }
      } else {
        quotesArr.push(quoteObj);
      }
    }
    if (quotesArr.length > 0 && !existingQuoteId) {
      for (let i = 0; i < quotesArr.length; i++) {
        const response = await dispatch(insertQuote([quotesArr[i]]));
        // eslint-disable-next-line no-unsafe-optional-chaining
        quotesArr[i] = {...response?.payload?.data[0], ...quotesArr[i]};
      }
    } else {
      dispatch(getQuoteById(Number(existingQuoteId))).then((payload: any) => {
        quotesArr[0] = {
          ...payload?.payload,
          quote_json:
            payload?.payload?.quote_json &&
            payload?.payload?.quote_json.length > 0
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                [...payload?.payload?.quote_json, ...quotesArr[0].quote_json]
              : [...quotesArr[0].quote_json],
          lineItems: [...quotesArr[0].lineItems],
        };
      });
      await dispatch(updateQuoteWithNewlineItemAddByID(existingQuoteId));
    }
    const rebateDataArray: any = [];
    const contractProductArray: any = [];
    const finalLineItems: any = [];
    for (let i = 0; i < quotesArr?.length; i++) {
      for (let j = 0; j < quotesArr[i]?.lineItems.length; j++) {
        const lineItem = quotesArr[i]?.lineItems[j];
        const insertedProduct = await dispatch(
          insertProduct({
            ...lineItem,
            organization: userInformation.organization,
          }),
        );
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
            pdf_url:
              generalSettingData?.attach_doc_type === 'quote_line_item'
                ? lineItem?.pdf_url
                : null,
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
          (obj: any, item: any) => Object.assign(obj, {[item.key]: item.value}),
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
    dispatch(getQuotesByDateFilter({}));
    setShowModal(false);
    setUploadFileData([]);
  };

  useEffect(() => {
    if (quoteId) {
      router.push(`/generateQuote?id=${quoteId}`);
    }
  }, [quoteId]);

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
        loading={insertQuoteLoading}
        bodyPadding={22}
        disabledButton={!(uploadFileData?.length > 0)}
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            addInExistingQuote
            addQuoteLineItem={addQuoteLineItem}
            form={form}
            beforeUpload={beforeUpload}
            cardLoading={loading}
          />
        }
        width={900}
        primaryButtonText="Generate Single Quote"
        secondaryButtonText="Save & Generate Individual Quotes"
        open={showModal}
        onOk={() => {
          form?.setFieldValue('singleQuote', true);

          form.submit();
        }}
        onCancel={() => {
          form?.setFieldValue('singleQuote', false);

          form.submit();
          setShowModal(false);
          setUploadFileData([]);
          form.resetFields(['customer_id']);
        }}
      />
    </>
  );
};

export default AddQuote;
