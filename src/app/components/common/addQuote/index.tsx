/* eslint-disable @typescript-eslint/indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import UploadFile from '@/app/(UI)/(Dashboard_UI)/generateQuote/UploadFile';
import OsModal from '@/app/components/common/os-modal';
import {convertFileToBase64} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import {useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {insertProduct} from '../../../../../redux/actions/product';
import {
  getQuoteById,
  getQuotesByDateFilter,
  insertQuote,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteFile} from '../../../../../redux/actions/quoteFile';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {uploadToAws} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsButton from '../os-button';
import {AddQuoteInterface, FormattedData} from './types';

const AddQuote: FC<AddQuoteInterface> = ({
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

  const addQuoteLineItem = async (
    customerId: string,
    opportunityId: string,
    updatedArr: any,
    singleQuote: boolean,
  ) => {
    const quoteId = form.getFieldValue('existingQuoteId');
    let quoteLineItemArr: any = [];
    const lineItemData: FormattedData = {};
    const quotesArr: any = [];
    try {
      setFinalLoading(true);
      for (let i = 0; i < updatedArr.length; i++) {
        const nanoNetsResult = updatedArr[i]?.data?.result;
        let quoteObj: any = {};
        const lineItems: any = [];
        let quoteItem = {};
        let quoteJson: any = [];
        for (let j = 0; j < nanoNetsResult?.length; j++) {
          const result: any = nanoNetsResult[j];
          const predictions = result?.prediction?.filter((item: any) => item);
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          predictions?.map((itemNew: any, predictionIndex: number) => {
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
              quoteJson =
                predictionIndex > 0
                  ? [...quoteLineItemArr, ...quoteJson]
                  : quoteLineItemArr;
              quoteLineItemArr?.forEach((obj: any) => {
                const newObj = {
                  ...obj,
                  organization: userInformation.organization,
                  user_id: userInformation.id,
                };
                lineItems.push(newObj);
              });
            } else {
              quoteItem = {
                ...quoteItem,
                [itemNew?.label?.toLowerCase()]: itemNew?.ocr_text,
              };
            }
          });
          const newObjForNanonets = {
            uid: updatedArr[i]?.file?.uid,
            lastModified: updatedArr[i]?.file?.lastModified,
            lastModifiedDate: updatedArr[i]?.file?.lastModifiedDate,
            size: updatedArr[i]?.file?.size,
            name: updatedArr[i]?.file?.name,
            type: updatedArr[i]?.file?.type,
            webkitRelativePath: updatedArr[i]?.file?.webkitRelativePath,
          };

          quoteObj = {
            ...quoteItem,
            nanonets_id: result?.id,
            quote_config_id: updatedArr[i]?.quote_config_id ?? 22,
            pdf_url: updatedArr[i]?.pdf_url,
            user_id: userInformation.id,
            customer_id: customerId,
            opportunity_id: opportunityId,
            organization: userInformation.organization,
            quoteFileObj: [
              {
                file_name: updatedArr[i]?.file?.name,
                pdf_url: updatedArr[i]?.pdf_url,
                quote_config_id: updatedArr[i]?.quote_config_id ?? 22,
                nanonets_id: result?.id,
                // quote_json: [JSON.stringify(quoteJson)],
                quote_file: [JSON?.stringify(newObjForNanonets)],
                lineItems: lineItems.length > 0 ? lineItems : [],
              },
            ],
          };
        }
        if (singleQuote || quoteId) {
          if (i === 0) {
            quotesArr.push(quoteObj);
          } else {
            quotesArr[0].quoteFileObj = [
              ...quotesArr[0].quoteFileObj,
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...quoteObj?.quoteFileObj,
            ];
          }
        } else {
          quotesArr.push(quoteObj);
        }
      }
      if (quotesArr.length > 0 && !quoteId) {
        for (let i = 0; i < quotesArr.length; i++) {
          const response = await dispatch(insertQuote([quotesArr[i]]));
          // eslint-disable-next-line no-unsafe-optional-chaining
          quotesArr[i] = {...response?.payload?.data[0], ...quotesArr[i]};
        }
      } else {
        const payload = await dispatch(getQuoteById(quoteId));
        quotesArr[0] = {
          ...payload?.payload,
          quoteFileObj: [...quotesArr[0].quoteFileObj],
        };
        await dispatch(updateQuoteWithNewlineItemAddByID(Number(quoteId)));
      }

      const finalLineItems: any = [];
      for (let i = 0; i < quotesArr?.length; i++) {
        for (let k = 0; k < quotesArr[i].quoteFileObj.length; k++) {
          const quoteFile = {
            ...quotesArr[i].quoteFileObj[k],
            quote_id: quotesArr[i]?.id,
          };
          const insertedQuoteFile = await dispatch(insertQuoteFile(quoteFile));
          for (
            let j = 0;
            j < quotesArr[i].quoteFileObj[k]?.lineItems.length;
            j++
          ) {
            const lineItem = quotesArr[i].quoteFileObj[k]?.lineItems[j];
            const insertedProduct = await dispatch(insertProduct(lineItem));
            if (insertedProduct?.payload?.id) {
              const obj1: any = {
                quote_id: quotesArr[i]?.id,
                quote_file_id: insertedQuoteFile?.payload?.id,
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
              finalLineItems?.push(obj1);
            }
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
        dispatch(insertQuoteLineItem(finalLineItems));
      }
      // if (finalOpportunityArray && syncTableData?.length > 0) {
      //   dispatch(insertOpportunityLineItem(finalOpportunityArray));
      // }
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
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            addInExistingQuote
            addQuoteLineItem={addQuoteLineItem}
            form={form}
            beforeUpload={beforeUpload}
            cardLoading={loading}
            rowSelection={rowSelection}
            setShowToggleTable={setShowToggleTable}
            showToggleTable={showToggleTable}
            Quotecolumns={Quotecolumns}
            existingQuoteId={existingQuoteId}
          />
        }
        width={900}
        primaryButtonText="Generate Single Quote"
        thirdButtonText={
          !existingQuoteId ? 'Save & Generate Individual Quotes' : null
        }
        open={showModal}
        onOk={() => {
          form?.setFieldValue('singleQuote', true);
          form.submit();
          // resetFields();
        }}
        thirdButtonfunction={() => {
          form?.setFieldValue('singleQuote', false);
          form.submit();
          // resetFields();
        }}
        onCancel={() => {
          resetFields();
        }}
      />
    </>
  );
};

export default AddQuote;
