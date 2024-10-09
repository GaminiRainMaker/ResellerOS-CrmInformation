/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import { Divider } from '@/app/components/common/antd/Divider';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  SaleForceQuoteLineItemColumnSync,
  formatStatus,
  quoteLineItemColumnForSync,
} from '@/app/utils/CONSTANTS';
import {
  getLineItemsWithNonRepitive,
  getValuesOFLineItemsThoseNotAddedBefore,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import { Col, Row, Select, notification } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import {
  insertLineItemSyncing,
  insertLineItemSyncingForSalesForce,
} from '../../../../../redux/actions/LineItemSyncing';
import {
  addSalesForceDataa,
  addSalesForceDataaForAccount,
} from '../../../../../redux/actions/auth';
import { getContractInBulkByProductCode } from '../../../../../redux/actions/contractProduct';
import { insertOpportunityLineItem } from '../../../../../redux/actions/opportunityLineItem';
import {
  getBulkProductIsExisting,
  insertProductsInBulk,
} from '../../../../../redux/actions/product';
import { insertProfitability } from '../../../../../redux/actions/profitability';
import { updateQuoteJsonAndManual } from '../../../../../redux/actions/quote';
import { quoteFileVerification } from '../../../../../redux/actions/quoteFile';
import { insertQuoteLineItem } from '../../../../../redux/actions/quotelineitem';
import { getRebatesInBulkByProductCode } from '../../../../../redux/actions/rebate';
import { insertRebateQuoteLineItem } from '../../../../../redux/actions/rebateQuoteLineitem';
import { insertValidation } from '../../../../../redux/actions/validation';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';

type DataItem = {
  preVal: string;
  newVal: string;
  key: number;
};

type UpdatedDataItem = {
  pdf_header: string;
  quote_header: string;
  status: string;
  quote_file_id: number;
  is_salesforce: boolean;
  assert_mapping: boolean;
};
type SalesUpdatedDataItem = {
  pdf_header: string;
  quote_header: string;
  status: string;
  is_salesforce: boolean;
};

interface EditPdfDataInterface {
  setMergedVaalues?: any;
  mergedValue?: any;
  setNanonetsLoading?: any;
  nanonetsLoading?: any;
  routingConditions?: any;
  currentFileId?: any;
  manualFlow?: any;
  checkForNewFileForSalesForce?: any;
  currentFileName?: any;
  lineItemSyncingData?: any;
  CurrentFileId?: any;
  currentFileData?: any;
  accoutSyncOptions?: any;
}
const SyncTableData: FC<EditPdfDataInterface> = ({
  setMergedVaalues,
  mergedValue,
  setNanonetsLoading,
  nanonetsLoading,
  routingConditions,
  currentFileId,
  manualFlow,
  checkForNewFileForSalesForce,
  currentFileName,
  lineItemSyncingData,
  CurrentFileId,
  currentFileData,
  accoutSyncOptions,
}) => {
  const dispatch = useAppDispatch();
  const { userInformation } = useAppSelector((state) => state.user);
  const [syncedNewValue, setNewSyncedValue] = useState<any>();
  const { quoteFileById } = useAppSelector((state) => state.quoteFile);

  const { data: syncTableData, loading: syncDataLoading } = useAppSelector(
    (state) => state.syncTable,
  );

  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const getQuoteFileId = searchParams.get('fileId');

  const salesToken = searchParams.get('key');
  const salesForceFiledId = searchParams.get('file_Id');
  const SaleQuoteId = searchParams.get('quote_Id');
  const salesFOrceManual = searchParams.get('manual');
  const fullStackManul = searchParams.get('manualFlow');
  const salesFOrceAccoutId = searchParams.get('AccountId');
  const salesFOrceAccoutFlow = searchParams.get('accoutFlow');
  const salesForceUrl = searchParams.get('instance_url');

  const ApprovedQuoteMappingData: any =
    lineItemSyncingData &&
    lineItemSyncingData?.filter(
      (LineItemSyncingItem: any) => LineItemSyncingItem?.status === 'Approved',
    );
  const [syncTableQuoteLItemValues, setSyncTableQuoteLItemValues] =
    useState<any>(
      SaleQuoteId
        ? SaleForceQuoteLineItemColumnSync
        : quoteLineItemColumnForSync,
      // ,
    );

  const router = useRouter();
  const mergeedColumn: any = [];
  const keys = mergedValue?.length > 0 && Object.keys(mergedValue?.[0]);

  if (keys) {
    keys?.map((item: any) => {
      // if (item && !item?.toLowerCase()?.includes('line')) {
      mergeedColumn?.push(item ? item : 'emptyHeader');
      // }
    });
  }
  useEffect(() => {
    if ((salesFOrceAccoutFlow && salesFOrceAccoutFlow === 'true') || salesForceUrl) {
      setSyncTableQuoteLItemValues(accoutSyncOptions);
    }
  }, [accoutSyncOptions]);

  useEffect(() => {
    const newSyncTableData =
      syncedNewValue?.length > 0 ? [...syncedNewValue] : [];
    let newSyncOptionChecks =
      salesFOrceAccoutFlow === 'true' || salesForceUrl
        ? accoutSyncOptions
        : syncTableQuoteLItemValues;

    mergeedColumn?.map((mergeItem: string, indexMerge: number) => {
      const NewFilterOption = newSyncOptionChecks?.find((item: any) =>
        item?.label
          ?.toString()
          ?.toLowerCase()
          ?.includes(mergeItem?.toLowerCase()),
      );

      const NewFilterOptionForAdminAproved = ApprovedQuoteMappingData?.find(
        (item: any) =>
          item?.pdf_header
            ?.toString()
            ?.toLowerCase()
            ?.includes(mergeItem?.toLowerCase()),
      );

      if (NewFilterOption || NewFilterOptionForAdminAproved) {
        newSyncTableData?.push({
          preVal: mergeItem,
          newVal: NewFilterOptionForAdminAproved
            ? NewFilterOptionForAdminAproved?.quote_header
            : NewFilterOption?.value,
          key: indexMerge,
        });


        // return;
        const newOptions: any = [...newSyncOptionChecks];

        // newOptions?.splice(indexOFItem, 1);
        // setSyncTableQuoteLItemValues(newOptions);
        newSyncOptionChecks = newOptions;
      } else {
        newSyncTableData?.push({
          preVal: mergeItem,
          newVal: '',
          key: indexMerge,
        });
      }
      // if(mergeItem)
    });

    setSyncTableQuoteLItemValues(newSyncOptionChecks);
    setNewSyncedValue(newSyncTableData);
  }, []);
  const syncTableToLineItems = (
    preValue: string,
    newSyncValue: string,
    keyInd: number,
  ) => {
    const newSyncTableData =
      syncedNewValue?.length > 0 ? [...syncedNewValue] : [];

    const indexOfPre = newSyncTableData?.findIndex(
      (item: any) => item?.key === keyInd,
    );
    const syncOtions =
      syncTableQuoteLItemValues?.length > 0
        ? [...syncTableQuoteLItemValues]
        : [];

    const indexOFItem = syncOtions?.findIndex(
      (itemV: any) => itemV?.value === newSyncValue,
    );
    syncOtions?.splice(indexOFItem, 1);

    setSyncTableQuoteLItemValues(syncOtions);

    if (indexOfPre === -1) {
      newSyncTableData?.push({
        preVal: preValue,
        newVal: newSyncValue,
        key: keyInd,
      });
    } else {
      let newObj = newSyncTableData[indexOfPre];
      newObj = {
        ...newObj,
        newVal: newSyncValue,
      };
      newSyncTableData[indexOfPre] = newObj;
    }
    setNewSyncedValue(newSyncTableData);
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

  const syncTableDataNew = async () => {
    const alllArrayValue: any = [];

    if (mergeedColumn?.length !== syncedNewValue?.length) {
      notification.open({
        message: 'Please sync All Items',
        type: 'error',
      });
      return;
    }

    setNanonetsLoading(true);

    const updatedData: UpdatedDataItem[] =
      syncedNewValue &&
      syncedNewValue?.length > 0 &&
      syncedNewValue
        ?.filter((item: DataItem) => item.newVal !== '')
        .map(
          ({ preVal, newVal }: DataItem): UpdatedDataItem => ({
            pdf_header: preVal,
            quote_header: newVal,
            status: 'Pending',
            quote_file_id:
              fullStackManul === 'true'
                ? currentFileData?.id
                : salesFOrceManual === 'true'
                  ? currentFileData?.FileId
                  : Number(getQuoteFileId),
            is_salesforce:
              SaleQuoteId || salesFOrceAccoutFlow === 'true' ? true : false,
            assert_mapping: salesFOrceAccoutFlow === 'true' ? true : false,
          }),
        );

    if (updatedData && !SaleQuoteId) {
      dispatch(insertLineItemSyncing(updatedData));
    } else if (updatedData && SaleQuoteId) {
      const NewupdatedData: SalesUpdatedDataItem[] =
        syncedNewValue &&
        syncedNewValue?.length > 0 &&
        syncedNewValue
          ?.filter((item: DataItem) => item.newVal !== '')
          .map(
            ({ preVal, newVal }: DataItem): SalesUpdatedDataItem => ({
              pdf_header: preVal,
              quote_header: newVal,
              status: 'Pending',
              is_salesforce: SaleQuoteId ? true : false,
            }),
          );

      dispatch(insertLineItemSyncingForSalesForce(NewupdatedData));
    }

    mergedValue?.map((obj: any) => {
      const newObj: any = {};
      syncedNewValue?.forEach((mapping: any) => {
        if (mapping?.preVal in obj) {
          newObj[mapping?.newVal] = obj[mapping?.preVal];
        }
      });
      Object.entries(obj).forEach(([key, value]) => {
        if (!syncedNewValue?.some((mapping: any) => mapping?.preVal === key)) {
          newObj[key] = value;
        }
      });
      alllArrayValue?.push(newObj);
    });

    function cleanObject(obj: any) {
      let cleanedObj: any = {};
      // Iterate through the keys of the object
      // currentFileName
      Object.keys(obj).forEach((key) => {
        // Only add to the cleaned object if key is not empty and value is defined
        if (key !== '' && obj[key] !== undefined && obj[key] !== '') {
          cleanedObj[key] = obj[key];
        }
      });
      return cleanedObj;
    }

    // Map over newArr and apply cleanObject to each element
    let requiredOutput = alllArrayValue.map((obj: any) => cleanObject(obj));
    let newArrWIthFileName: any = [];
    requiredOutput?.map((items: any) => {
      let newObj = {
        ...items,
      };
      if (salesFOrceAccoutFlow === 'true') {
        newObj.AccountId = salesFOrceAccoutId;
      } else {
        (newObj.rosquoteai__File_Name__c = currentFileData?.file_name),
          (newObj.rosquoteai__SF_File_Id__c =
            salesFOrceManual === 'true'
              ? currentFileData?.FileId
              : salesForceFiledId);
      }
      let string = items?.rosquoteai__Product_Code__c?.trim();

      delete newObj.rosquoteai__Product_Code__c;

      // Remove any remaining spaces and newlines within the string
      let newProductCode = string && string.replace(/\s+/g, '');
      if (newProductCode) {
        newObj.rosquoteai__Product_Code__c = newProductCode;
      }
      newArrWIthFileName?.push(newObj);
      // newArrWIthFileName?.push({
      //   ...items,
      //   file_name: currentFileData?.file_name,
      //   file_id:
      //     salesFOrceManual === 'true'
      //       ? currentFileData?.FileId
      //       : salesForceFiledId,
      // });
    });

    if (
      (SaleQuoteId && newArrWIthFileName?.length > 0) ||
      (salesFOrceAccoutFlow === 'true' && newArrWIthFileName?.length > 0)
    ) {
      const findProduct = syncedNewValue?.find(
        (items: any) => items?.newVal === 'rosquoteai__Product_Code__c',
      );
      const findName = syncedNewValue?.find(
        (items: any) => items?.newVal === 'Name',
      );

      if (
        (!findName || findName === undefined) &&
        salesFOrceAccoutFlow === 'true'
      ) {
        notification.open({
          message:
            ' Assert Name is madatory. Please Sync  Assert Name to Proceed',
          type: 'error',
        });
        setNanonetsLoading(false);
        return;
      }
      if (
        (!findProduct || findProduct === undefined) &&
        salesFOrceAccoutFlow !== 'true'
      ) {
        notification.open({
          message:
            'Product Code is madatory. Please Sync Product Code to Proceed',
          type: 'error',
        });
        setNanonetsLoading(false);
        return;
      }
      // let cleanObjecto = (obj: any) => {
      //   let cleanedObj: any = {};
      //   // Iterate through the keys of the object
      //   // currentFileName
      //   Object.keys(obj).forEach((key) => {
      //     // Only add to the cleaned object if key is not empty and value is defined
      //     if (key !== '' && obj[key] !== undefined && obj[key] !== '') {
      //       cleanedObj[key] = obj[key];
      //     }
      //   });
      //   return cleanedObj;
      // }
      if (salesFOrceAccoutFlow === 'true') {

        // let requiredOutput = newArrWIthFileName.map((obj: any) => cleanObjecto(obj));


        let newdata = {
          token: salesToken,
          AccountId: salesFOrceAccoutId,
          urls: salesForceUrl,
          lineItem: newArrWIthFileName,
        };

        await dispatch(addSalesForceDataaForAccount(newdata))?.then(
          (payload: any) => {
            let messgaeForApi = payload?.payload?.message;
            notification.open({
              message: messgaeForApi,
              type: 'info',
            });
            if (salesFOrceManual === 'false') {
              notification.open({
                message: 'Please close the  window',
                type: 'info',
              });
            }
          },
        );

        setNanonetsLoading(false);
        return;
      } else {
        let newdata = {
          token: salesToken,
          // documentId: salesForceFiledId,
          urls: salesForceUrl,
          QuoteId: SaleQuoteId,
          FileId:
            salesFOrceManual === 'true'
              ? currentFileData?.FileId
              : salesForceFiledId,
          // FileId: '0Q09I0000002Bc5SAE',
          action: 'ExportFileToTable',
          lineItem: newArrWIthFileName,
        };

        await dispatch(addSalesForceDataa(newdata))?.then((payload: any) => {
          let messgaeForApi = payload?.payload?.message;
          notification.open({
            message: messgaeForApi,
            type: 'info',
          });
          if (salesFOrceManual === 'false') {
            notification.open({
              message: 'Please close the review quotes window',
              type: 'info',
            });
          }
        });

        setNanonetsLoading(false);
        if (salesFOrceManual === 'true') {
          setTimeout(() => {
            checkForNewFileForSalesForce();
          }, 2000);
        }
        return;
      }
    }
    const newrrLineItems: any = [];
    const rebateDataArray: any = [];
    const contractProductArray: any = [];
    if (requiredOutput) {
      const data = {
        quote_json: JSON?.stringify(requiredOutput),
        id: Number(getQuoteID),
      };
      await dispatch(updateQuoteJsonAndManual(data));

      let newArrValues = getLineItemsWithNonRepitive(requiredOutput);

      let allProductCodes: any = [];
      let allProductCodeDataa: any = [];
      const allReabatesWithProductCodeData: any = [];
      const allContractWithProductCodeData: any = [];
      requiredOutput?.map((itemsPro: any) => {
        allProductCodes?.push(
          itemsPro?.product_code
            ? itemsPro?.product_code?.replace(/\s/g, '')
            : 'NEWCODE0123',
        );
      });
      let valuessOfAlreayExist = await dispatch(
        getBulkProductIsExisting(allProductCodes),
      );

      if (valuessOfAlreayExist?.payload) {
        allProductCodeDataa = valuessOfAlreayExist?.payload;
      }

      if (valuessOfAlreayExist?.payload?.length > 0) {
        // ======To get items that are  non added Values==============
        let newInsertionData = getValuesOFLineItemsThoseNotAddedBefore(
          requiredOutput,
          allProductCodeDataa,
        );

        if (newInsertionData?.length > 0) {
          let newArrrForConcat: any = [...allProductCodeDataa];
          await dispatch(insertProductsInBulk(newInsertionData))?.then(
            (payload: any) => {
              payload?.payload?.map((itemsBulk: any) => {
                newArrrForConcat?.push(itemsBulk);
              });
            },
          );
          allProductCodeDataa = newArrrForConcat;
        }
      } else {
        let newArrrForConcat: any = [...allProductCodeDataa];
        await dispatch(insertProductsInBulk(newArrValues))?.then(
          (payload: any) => {
            payload?.payload?.map((itemsBulk: any) => {
              newArrrForConcat?.push(itemsBulk);
            });
          },
        );
        allProductCodeDataa = newArrrForConcat;
      }

      await dispatch(getRebatesInBulkByProductCode(allProductCodes))?.then(
        (payload: any) => {
          payload?.payload?.map((items: any) => {
            allReabatesWithProductCodeData?.push(items);
          });
        },
      );

      await dispatch(getContractInBulkByProductCode(allProductCodes))?.then(
        (payload: any) => {
          payload?.payload?.map((items: any) => {
            allContractWithProductCodeData?.push(items);
          });
        },
      );

      if (requiredOutput) {
        for (let i = 0; i < requiredOutput?.length; i++) {
          let itemsOfProduct = requiredOutput[i];

          if (itemsOfProduct) {
            let productCode = itemsOfProduct?.product_code
              ? itemsOfProduct?.product_code?.replace(/\s/g, '')
              : 'NEWCODE0123';
            let itemsToAdd = allProductCodeDataa?.find(
              (productItemFind: any) =>
                productItemFind?.product_code?.replace(/\s/g, '') ===
                productCode,
            );
            const obj1: any = {
              quote_file_id:
                fullStackManul === 'true'
                  ? currentFileData?.id
                  : salesFOrceManual === 'true'
                    ? currentFileData?.FileId
                    : getQuoteFileId
                      ? getQuoteFileId
                      : quoteFileById?.[0]?.id
                        ? quoteFileById?.[0]?.id
                        : getQuoteFileId,
              quote_id: Number(getQuoteID),
              product_id: itemsToAdd?.id,
              product_code: itemsToAdd?.product_code,
              // line_amount: useRemoveDollarAndCommahook(
              //   itemsOfProduct?.line_amount,
              // ),
              list_price: useRemoveDollarAndCommahook(
                itemsOfProduct?.list_price,
              ),
              description: itemsOfProduct?.description,
              quantity: useRemoveDollarAndCommahook(itemsOfProduct?.quantity),
              adjusted_price: useRemoveDollarAndCommahook(
                itemsOfProduct?.adjusted_price,
              ),
              line_number: itemsToAdd?.line_number,
              organization: userInformation.organization,
            };

            let findRebateIndex = allReabatesWithProductCodeData?.findIndex(
              (itemReb: any) =>
                itemsToAdd.product_code === itemReb.product_code,
            );
            if (findRebateIndex !== -1) {
              rebateDataArray?.push({
                ...obj1,
                rebate_id: allReabatesWithProductCodeData?.[findRebateIndex].id,
                percentage_payout:
                  allReabatesWithProductCodeData?.[findRebateIndex]
                    ?.percentage_payout,
              });
            }
            let findContractIndex = allContractWithProductCodeData?.findIndex(
              (itemReb: any) =>
                itemsToAdd.product_code === itemReb.product_code,
            );
            if (findContractIndex !== -1) {
              contractProductArray?.push({
                ...obj1,
                contract_product_id:
                  allContractWithProductCodeData?.[findContractIndex]?.id,
                // quote_file_id:
              });
            }

            newrrLineItems?.push(obj1);
          }
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
          (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
          {},
        );
        finalOpportunityArray?.push(singleObjects);
      });
    }
    if (newrrLineItems && newrrLineItems.length > 0) {
      dispatch(insertQuoteLineItem(newrrLineItems)).then(async (d: any) => {
        if (rebateDataArray && rebateDataArray.length > 0) {
          const data = genericFun(d?.payload, rebateDataArray);
          dispatch(insertRebateQuoteLineItem(data));
        }
        // if (contractProductArray && contractProductArray.length > 0) {
        //   const data = genericFun(d?.payload, contractProductArray);
        //   dispatch(insertValidation(data));
        // }

        if (newrrLineItems && newrrLineItems.length > 0) {
          const data = genericFun(d?.payload, newrrLineItems);

          await dispatch(insertProfitability(data));

          if (data) {
            dispatch(insertValidation(data));
          }
          if (finalOpportunityArray && syncTableData?.length > 0) {
            dispatch(insertOpportunityLineItem(finalOpportunityArray));
          }
          let fileIdLatest = searchParams.get('fileId');
          await dispatch(
            quoteFileVerification({
              id:
                fullStackManul === 'true'
                  ? currentFileData?.id
                  : fileIdLatest
                    ? fileIdLatest
                    : quoteFileById?.[0]?.id
                      ? quoteFileById?.[0]?.id
                      : fileIdLatest,
            }),
          );

          routingConditions();
          // Added to add lineItems to validations

        }
      });
    }



    setNanonetsLoading(false);
  };

  const handleChange = () => {
    // This defines which option we are using salesforce or full stack
    let optionsTOAdd = SaleQuoteId
      ? salesFOrceAccoutFlow === 'true' || salesForceUrl
        ? accoutSyncOptions
        : SaleForceQuoteLineItemColumnSync
      : quoteLineItemColumnForSync;
    let newArrOfOptions: any = [];
    // This defines the options already added to the synced values
    syncedNewValue?.map((items: any) => {
      if (items?.newVal) {
        newArrOfOptions?.push(items?.newVal);
      }
    });
    let newArrOfOptionsToNotUsed = [...optionsTOAdd];
    // This will remove the options value those are already added in sync
    if (newArrOfOptions?.length > 0) {
      newArrOfOptions?.map((item: string) => {
        const findIndex = newArrOfOptionsToNotUsed?.findIndex(
          (itemss: any) => itemss?.value === item,
        );
        if (findIndex !== -1) {
          newArrOfOptionsToNotUsed?.splice(findIndex, 1);
        }
      });
    }
    // setTimeout used to rerender data in the options with updating the state
    setTimeout(() => {
      setSyncTableQuoteLItemValues(newArrOfOptionsToNotUsed);
    }, 100);
  };

  useEffect(() => {
    handleChange();
  }, [syncedNewValue]);
  return (
    <>
      <GlobalLoader loading={nanonetsLoading}>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <Col>
            <Row style={{ marginTop: '6px' }}>
              {' '}
              <Typography
                style={{ marginLeft: '10px' }}
                align="center"
                name="Body 3/Medium"
              >
                Your Pdf Header
              </Typography>
            </Row>
            <Divider />
            {mergeedColumn?.map((item: any) => (
              <Row style={{ marginTop: '6px' }}>
                <OsInput disabled value={formatStatus(item)} />
              </Row>
            ))}
          </Col>

          <Col>
            <Row style={{ marginTop: '6px' }}>
              {' '}
              <Typography
                style={{ marginLeft: '10px' }}
                align="center"
                name="Body 3/Medium"
              >
                Quote Line Item Header
              </Typography>
            </Row>
            <Divider />
            {syncedNewValue?.map((item: any, indexOfCol: number) => {
              let newLabel = syncTableQuoteLItemValues?.find(
                (items: any) =>
                  items?.value?.toString()?.toUpperCase() ===
                  item?.newVal?.toString()?.toUpperCase(),
              );

              return (
                <Row style={{ marginTop: '6px' }}>
                  <CommonSelect
                    onChange={(e) => {
                      syncTableToLineItems(item, e, indexOfCol);
                    }}
                    allowClear
                    onClear={() => {
                      if (!item?.newVal) {
                        return;
                      }
                      if (item?.newVal) {
                        handleChange();
                      }
                    }}
                    defaultValue={formatStatus(
                      newLabel?.label?.toString()?.toUpperCase(),
                    )}
                    // value={formatStatus(
                    //   newLabel?.label?.toString()?.toUpperCase(),
                    // )}
                    style={{ width: '250px' }}
                    options={
                      salesFOrceAccoutFlow === 'true' || salesForceUrl
                        ? accoutSyncOptions
                        : syncTableQuoteLItemValues
                    }
                  />
                </Row>
              );
            })}
          </Col>
        </Row>
        <Row
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <OsButton
            loading={nanonetsLoading}
            text="Sync And Save"
            style={{
              width: '100%',
            }}
            buttontype="PRIMARY"
            clickHandler={syncTableDataNew}
          />
        </Row>
      </GlobalLoader>
    </>
  );
};

export default SyncTableData;
