/* eslint-disable @typescript-eslint/indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-await-in-loop */
import OsModal from '@/app/components/common/os-modal';
import {
  convertFileToBase64,
  getLineItemsWithNonRepitive,
  getResultedValue,
  getValuesOFLineItemsThoseNotAddedBefore,
} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import {usePathname, useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {
  getBulkProductIsExisting,
  insertProductsInBulk,
} from '../../../../../redux/actions/product';
import {
  getQuoteById,
  getQuotesByDateFilter,
  insertQuote,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteFile} from '../../../../../redux/actions/quoteFile';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsButton from '../os-button';
import OsUpload from '../os-upload';
import {AddQuoteInterface, FormattedData} from './types';
import {queryLineItemSyncingForSalesForce} from '../../../../../redux/actions/LineItemSyncing';

const AddQuote: FC<AddQuoteInterface> = ({
  uploadFileData,
  setUploadFileData,
  buttonText,
  uploadForm,
  setShowToggleTable,
  showToggleTable,
  Quotecolumns,
  isGenerateQuote,
  existingGenerateQuoteId,
  quoteDetails,
  isGenerateQuotePage = false,
  opportunityId,
  customerId,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {userInformation} = useAppSelector((state) => state.user);
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [form] = Form.useForm();
  let pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [finalLoading, setFinalLoading] = useState<boolean>(false);
  const [existingQuoteId, setExistingQuoteId] = useState<number>();
  const [typeOfAddQuote, setTypeOfAddQuote] = useState<number>(1);
  const [allValuesForManual, setAllValuesForManual] = useState<boolean>(false);

  const [lineItemSyncingData, setLineItemSyncingData] = useState<any>();

  const [query, setQuery] = useState<{
    searchValue: string;
    asserType: boolean;
    salesforce: boolean;
  }>({
    searchValue: '',
    asserType: false,
    salesforce: false,
  });
  useEffect(() => {
    if (existingQuoteId || existingGenerateQuoteId) {
      const dddd = existingQuoteId ?? existingGenerateQuoteId;
      form?.setFieldValue('existingQuoteId', dddd);
    }
    if (existingGenerateQuoteId) {
      setExistingQuoteId(existingGenerateQuoteId);
    }
  }, [existingQuoteId, existingGenerateQuoteId]);

  const beforeUpload = (file: File) => {
    const obj: any = {...file};
    let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
      ? uploadExcelFileToAws
      : uploadToAws;

    convertFileToBase64(file)
      .then((base64String: string) => {
        obj.base64 = base64String;
        obj.file = file;
        setLoading(true);
        dispatch(pathUsedToUpload({document: base64String})).then(
          (payload: any) => {
            const pdfUrl = payload?.payload?.data?.Location;
            obj.pdf_url = pdfUrl;
            setLoading(false);
          },
        );
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
    const quotesArr: any = [];
    let singleAddOnQuoteId: any;
    let newArrWithManual: any = [];
    let newArrWithoutManual: any = [];
    let countOfExportFiles: number = 0;

    if (updatedArr && updatedArr?.length > 0) {
      updatedArr?.map((items: any) => {
        if (
          items?.manualquote ||
          (items?.model_id === 'a02fffb7-5221-44a2-8eb1-85781a0ecd67' &&
            !items?.file?.type.includes('spreadsheetml'))
        ) {
          if (
            items?.model_id === 'a02fffb7-5221-44a2-8eb1-85781a0ecd67' &&
            !items?.file?.type.includes('spreadsheetml')
          ) {
            countOfExportFiles = countOfExportFiles + 1;
          }
          let newObj = {
            ...items,
            file_name: items?.file?.name,
            type_of_file: items?.manualquote ? 'manual' : 'export',
          };
          newArrWithManual?.push(newObj);
        } else {
          newArrWithoutManual?.push(items);
        }
      });
    }
    try {
      setFinalLoading(true);
      setLoading(true);
      for (let i = 0; i < newArrWithoutManual.length; i++) {
        let quoteLineItemArr: any = [];
        const lineItemData: FormattedData = {};
        const nanoNetsResult = newArrWithoutManual[i]?.data?.result
          ? newArrWithoutManual[i]?.data?.result
          : newArrWithoutManual[i]?.lineItems;
        let quoteObj: any = {};
        const lineItems: any = newArrWithoutManual[i]?.lineItems
          ? newArrWithoutManual[i]?.lineItems
          : [];
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

          quoteObj = {
            ...quoteItem,
            nanonets_id: result?.id,
            quote_config_id: newArrWithoutManual[i]?.quote_config_id ?? 18,
            pdf_url: newArrWithoutManual[i]?.pdf_url,
            user_id: userInformation.id,
            customer_id: customerId,
            opportunity_id: opportunityId,
            organization: userInformation.organization,
            status: 'Drafts',
            quoteFileObj: [
              {
                file_name: newArrWithoutManual[i]?.file?.name,
                pdf_url: newArrWithoutManual[i]?.pdf_url,
                quote_config_id: newArrWithoutManual[i]?.quote_config_id ?? 18,
                nanonets_id: result?.id,
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
          let newObj = {
            ...quotesArr[i],
            organization: userInformation?.organization,
            // quote_name: Date.now(),
          };
          const response = await dispatch(insertQuote([newObj]));
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
          singleAddOnQuoteId = quotesArr[i]?.id;
          const quoteFile = {
            ...quotesArr[i].quoteFileObj[k],
            quote_id: quotesArr[i]?.id,
          };
          const insertedQuoteFile = await dispatch(insertQuoteFile(quoteFile));
          // ===============To get LineItems WIth non- repeative objects
          let newArrValues = getLineItemsWithNonRepitive(
            quotesArr[i].quoteFileObj[k]?.lineItems,
          );

          const lineItem = quotesArr[i].quoteFileObj[k]?.lineItems;
          let allProductCodes: any = [];
          let allProductCodeDataa: any = [];
          lineItem?.map((itemsPro: any) => {
            allProductCodes?.push(
              itemsPro?.product_code
                ? itemsPro?.product_code?.replace(/\s/g, '')
                : 'NEWCODE0123',
            );
          });
          let valuessOfAlreayExist = await dispatch(
            getBulkProductIsExisting(allProductCodes),
          );
          if (valuessOfAlreayExist?.payload?.length > 0) {
            valuessOfAlreayExist?.payload?.map((items: any) => {
              allProductCodeDataa?.push(items);
            });
            // allProductCodeDataa = valuessOfAlreayExist?.payload;
          }

          if (valuessOfAlreayExist?.payload?.length > 0) {
            // ======To get items that are  non added Values==============
            let newInsertionData = getValuesOFLineItemsThoseNotAddedBefore(
              lineItem,
              allProductCodeDataa,
            );

            if (newInsertionData?.length > 0) {
              await dispatch(insertProductsInBulk(newInsertionData))?.then(
                (payload: any) => {
                  // console.log(
                  //   '3598329982',
                  //   // lineItem,
                  //   // allProductCodeDataa,
                  //   payload,
                  // );
                  // return;
                  payload?.payload?.map((itemsBulk: any) => {
                    allProductCodeDataa?.push(itemsBulk);
                  });
                },
              );
            }
          } else {
            await dispatch(insertProductsInBulk(newArrValues))?.then(
              (payload: any) => {
                payload?.payload?.map((itemsBulk: any) => {
                  allProductCodeDataa?.push(itemsBulk);
                });
              },
            );
          }

          console.log('354353243243', allProductCodeDataa, lineItem);
          return;
          if (lineItem) {
            lineItem?.map((itemssProduct: any) => {
              let productCode = itemssProduct?.product_code
                ? itemssProduct?.product_code?.replace(/\s/g, '')
                : 'NEWCODE0123';
              let itemsToAdd = allProductCodeDataa?.find(
                (productItemFind: any) =>
                  productItemFind?.product_code?.replace(/\s/g, '') ===
                  productCode,
              );
              const obj1: any = {
                quote_id: quotesArr[i]?.id,
                quote_file_id: insertedQuoteFile?.payload?.id,
                product_id: itemsToAdd?.id,
                product_code: itemsToAdd?.product_code,
                line_amount: itemsToAdd?.line_amount,
                list_price: itemsToAdd?.list_price,
                description: itemsToAdd?.description,
                quantity: itemsToAdd?.quantity,
                adjusted_price: itemsToAdd?.adjusted_price,
                line_number: itemsToAdd?.line_number,
                organization: userInformation.organization,
              };
              finalLineItems?.push(obj1);
            });
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
        await dispatch(insertQuoteLineItem(finalLineItems));
      }
      if (finalOpportunityArray && syncTableData?.length > 0) {
        await dispatch(insertOpportunityLineItem(finalOpportunityArray));
      }
      if (pathname !== '/allQuote') {
        setFinalLoading(false);
        setLoading(false);
      }
    } catch (err) {
      setFinalLoading(false);
      setLoading(false);
      console.log('object', err);
    }
    await dispatch(getQuotesByDateFilter({}));
    setShowModal(false);
    setUploadFileData([]);

    if ((singleQuote || quoteId) && newArrWithManual?.length > 0) {
      let latestestFIleId: any;
      let quoteIdForManualss: any;
      if (newArrWithoutManual?.length === 0) {
        let newObj = {
          distributor_name: newArrWithManual?.[0]?.distributor_name,
          oem_name: newArrWithManual?.[0]?.oem_name,
          file_name: newArrWithManual?.[0]?.file_name,
          user_id: userInformation.id,
          customer_id: customerId,
          opportunity_id: opportunityId,
          organization: userInformation.organization,
          status: 'Drafts',
        };
        const response = await dispatch(insertQuote([newObj]));
        quoteIdForManualss = response?.payload?.data[0]?.id;
      }

      for (let i = 0; i < newArrWithManual.length; i++) {
        let itemss = newArrWithManual[i];

        const quoteFile = {
          file_name: itemss?.file_name,
          quote_id: quoteId
            ? quoteId
            : singleAddOnQuoteId
              ? singleAddOnQuoteId
              : quoteIdForManualss,
          is_verified: false,
          manual_file: true,
          pdf_url: itemss?.pdf_url,
          training_work: itemss?.training_work,
          distributor_name: itemss?.distributor_name,
          oem_name: itemss?.oem_name,
          type_of_file: itemss?.type_of_file,
        };
        const insertedQuoteFile = await dispatch(
          insertQuoteFile(quoteFile),
        )?.then((payload: any) => {
          latestestFIleId = payload?.payload?.id;
        });
      }
      return;
      if (countOfExportFiles > 0) {
        router.push(
          `/fileEditor?id=${quoteId ? quoteId : singleAddOnQuoteId ? singleAddOnQuoteId : quoteIdForManualss}&fileId=${null}&quoteExist=false&manualFlow=true`,
        );
      } else {
        router.push(
          `/manualFileEditor?id=${quoteId ? quoteId : singleAddOnQuoteId ? singleAddOnQuoteId : quoteIdForManualss}&fileId=${null}&manualFlow=true`,
        );
      }
    }
    if (newArrWithManual?.length === 0) {
      router.push(
        `/generateQuote?id=${quotesArr[0]?.id}&isView=${getResultedValue()}`,
      );
      if (isGenerateQuotePage) {
        location.reload();
      }
    }
    if (!singleQuote) {
      let latestQuoteId: any;
      let latestQuoteFIleId: any;
      for (let i = 0; i < newArrWithManual.length; i++) {
        let itemss = newArrWithManual[i];
        let newObj = {
          ...itemss,
          organization: userInformation?.organization,
          user_id: userInformation?.id,
          status: 'Drafts',
          customer_id: customerId,
          opportunity_id: opportunityId,
        };
        const response = await dispatch(insertQuote([newObj]))?.then(
          async (payload: any) => {
            latestQuoteId = payload?.payload?.data?.[0]?.id;
            const quoteFile = {
              file_name: itemss?.file_name,
              quote_id: payload?.payload?.data?.[0]?.id,
              is_verified: false,
              manual_file: true,
              pdf_url: itemss?.pdf_url,
              training_work: itemss?.training_work,
              distributor_name: itemss?.distributor_name,
              oem_name: itemss?.oem_name,
              type_of_file: itemss?.type_of_file,
            };
            const insertedQuoteFile = await dispatch(
              insertQuoteFile(quoteFile),
            )?.then((payloadFile: any) => {
              latestQuoteFIleId = payloadFile?.payload?.id;
            });
          },
        );
      }
      return;
      setLoading(false);
      if (newArrWithManual?.length > 0) {
        if (countOfExportFiles > 0) {
          router.push(
            `/fileEditor?id=${latestQuoteId}&fileId=${null}&quoteExist=false&manualFlow=true`,
          );
        } else {
          router.push(
            `/manualFileEditor?id=${latestQuoteId}&fileId=${null}&manualFlow=true`,
          );
        }
        // router.push(
        //   `/fileEditor?id=${latestQuoteId}&fileId=${latestQuoteFIleId}&quoteExist=false`,
        // );
        // router.push(`/manualFileEditor?id=${latestQuoteId}`);
      }
    }

    form.resetFields(['customer_id', 'opportunity_id']);
  };
  useEffect(() => {
    form.resetFields([
      'customer_id',
      'opportunity_id',
      'oem_name',
      'distributor_name',
      'file_name',
    ]);
    setUploadFileData([]);
  }, [typeOfAddQuote]);
  const addQuoteManually = async (
    customerId: string,
    opportunityId: string,
    oem: string,
    distributer: string,
    fileName: string,
  ) => {};

  const resetFields = () => {
    setShowModal(false);
    setUploadFileData([]);
    setShowToggleTable && setShowToggleTable(false);
    setExistingQuoteId(0);
    form.resetFields(['customer_id', 'opportunity_id']);
  };

  useEffect(() => {
    dispatch(queryLineItemSyncingForSalesForce(query))?.then((payload: any) => {
      let approvedOne = payload?.payload?.filter(
        (items: any) => items?.status === 'Approved',
      );
      setLineItemSyncingData(approvedOne);
    });
  }, []);

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
        disabledButton={
          typeOfAddQuote === 1
            ? !(uploadFileData?.length > 0)
            : allValuesForManual
        }
        destroyOnClose
        body={
          <OsUpload
            beforeUpload={beforeUpload}
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
            addQuoteLineItem={addQuoteLineItem}
            addQuoteManually={addQuoteManually}
            form={form}
            cardLoading={loading}
            setShowToggleTable={setShowToggleTable}
            showToggleTable={showToggleTable}
            Quotecolumns={Quotecolumns}
            existingQuoteId={existingQuoteId}
            setExistingQuoteId={setExistingQuoteId}
            isGenerateQuote={isGenerateQuote}
            quoteDetails={quoteDetails}
            typeOfAddQuote={typeOfAddQuote}
            setTypeOfAddQuote={setTypeOfAddQuote}
            setAllValuesForManual={setAllValuesForManual}
            opportunityDetailId={opportunityId}
            customerDetailId={customerId}
            lineItemSyncingData={lineItemSyncingData}
          />
        }
        width={1000}
        primaryButtonText={
          typeOfAddQuote === 1
            ? 'Generate Single Quote'
            : 'Generate Manually Quote'
        }
        thirdButtonText={
          typeOfAddQuote === 2
            ? null
            : !existingQuoteId
              ? 'Save & Generate Individual Quotes'
              : null
        }
        open={showModal}
        onOk={() => {
          form?.setFieldValue('singleQuote', true);
          form.submit();
        }}
        thirdButtonfunction={() => {
          form?.setFieldValue('singleQuote', false);
          form.submit();
        }}
        onCancel={() => {
          resetFields();
        }}
      />
    </>
  );
};

export default AddQuote;
