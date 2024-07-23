/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import {Divider} from '@/app/components/common/antd/Divider';
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
import {Col, Row, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  insertLineItemSyncing,
  queryLineItemSyncing,
} from '../../../../../redux/actions/LineItemSyncing';
import {addSalesForceDataa} from '../../../../../redux/actions/auth';
import {getContractInBulkByProductCode} from '../../../../../redux/actions/contractProduct';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {
  getBulkProductIsExisting,
  insertProductsInBulk,
} from '../../../../../redux/actions/product';
import {insertProfitability} from '../../../../../redux/actions/profitability';
import {updateQuoteJsonAndManual} from '../../../../../redux/actions/quote';
import {quoteFileVerification} from '../../../../../redux/actions/quoteFile';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {getRebatesInBulkByProductCode} from '../../../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../../../redux/actions/rebateQuoteLineitem';
import {insertValidation} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

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
}) => {
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const [syncedNewValue, setNewSyncedValue] = useState<any>();
  const {quoteFileById} = useAppSelector((state) => state.quoteFile);

  const {data: syncTableData, loading: syncDataLoading} = useAppSelector(
    (state) => state.syncTable,
  );
  const {data: LineItemSyncingData} = useAppSelector(
    (state) => state.LineItemSyncing,
  );
  const ApprovedQuoteMappingData = LineItemSyncingData?.filter(
    (LineItemSyncingItem: any) => LineItemSyncingItem?.status === 'Approved',
  );

  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const getQuoteFileId = searchParams.get('fileId');

  const salesToken = searchParams.get('key');
  const salesForceFiledId = searchParams.get('file_Id');
  const SaleQuoteId = searchParams.get('quote_Id');
  const salesForceUrl = searchParams.get('instance_url');
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
    const newSyncTableData =
      syncedNewValue?.length > 0 ? [...syncedNewValue] : [];
    let newSyncOptionChecks = syncTableQuoteLItemValues;

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
        // console.log(
        //   'syncTableQuoteLItemValuessyncTableQuoteLItemValues',
        //   syncTableQuoteLItemValues,
        // );

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
          ({preVal, newVal}: DataItem): UpdatedDataItem => ({
            pdf_header: preVal,
            quote_header: newVal,
            status: 'Pending',
            quote_file_id: Number(getQuoteFileId),
          }),
        );

    if (updatedData && !SaleQuoteId) {
      dispatch(insertLineItemSyncing(updatedData));
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
        if (key !== '' && obj[key] !== undefined) {
          cleanedObj[key] = obj[key];
        }
      });
      return cleanedObj;
    }

    // Map over newArr and apply cleanObject to each element
    let requiredOutput = alllArrayValue.map((obj: any) => cleanObject(obj));
    let newArrWIthFileName: any = [];
    requiredOutput?.map((items: any) => {
      newArrWIthFileName?.push({
        ...items,
        file_name: manualFlow ? currentFileName : null,
        file_id: manualFlow ? currentFileId : null,
      });
    });

    if (SaleQuoteId && newArrWIthFileName?.length > 0) {
      const findProduct = syncedNewValue?.find(
        (items: any) => items?.newVal === 'product_code',
      );

      if (!findProduct || findProduct === undefined) {
        notification.open({
          message:
            'Product Code is madatory. Please Sync Product Code to Proceed',
          type: 'error',
        });
        setNanonetsLoading(false);
        return;
      }
      let newdata = {
        token: salesToken,
        // documentId: salesForceFiledId,
        urls: salesForceUrl,
        QuoteId: SaleQuoteId,
        FileId: manualFlow ? currentFileId : salesForceFiledId,
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
        if (!manualFlow) {
          notification.open({
            message: 'Please close the review quotes window',
            type: 'info',
          });
        }
      });

      setNanonetsLoading(false);
      if (manualFlow) {
        setTimeout(() => {
          checkForNewFileForSalesForce();
        }, 2000);
      }
      return;
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
            // console.log('4354354353454', itemsOfProduct, itemsToAdd);
            const obj1: any = {
              quote_file_id: getQuoteFileId
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
    let fileIdLatest = searchParams.get('fileId');
    dispatch(
      quoteFileVerification({
        id: fileIdLatest
          ? fileIdLatest
          : quoteFileById?.[0]?.id
            ? quoteFileById?.[0]?.id
            : fileIdLatest,
      }),
    );
    routingConditions();

    setNanonetsLoading(false);
  };

  const handleChange = () => {
    // This defines which option we are using salesforce or full stack
    let optionsTOAdd = SaleQuoteId
      ? SaleForceQuoteLineItemColumnSync
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
            <Row style={{marginTop: '6px'}}>
              {' '}
              <Typography
                style={{marginLeft: '10px'}}
                align="center"
                name="Body 3/Medium"
              >
                Your Pdf Header
              </Typography>
            </Row>
            <Divider />
            {mergeedColumn?.map((item: any) => (
              <Row style={{marginTop: '6px'}}>
                <OsInput disabled value={formatStatus(item)} />
              </Row>
            ))}
          </Col>

          <Col>
            <Row style={{marginTop: '6px'}}>
              {' '}
              <Typography
                style={{marginLeft: '10px'}}
                align="center"
                name="Body 3/Medium"
              >
                Quote LineItem Header
              </Typography>
            </Row>
            <Divider />
            {syncedNewValue?.map((item: any, indexOfCol: number) => (
              <Row style={{marginTop: '6px'}}>
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
                    item?.newVal?.toString()?.toUpperCase(),
                  )}
                  style={{width: '250px'}}
                  options={syncTableQuoteLItemValues}
                />
              </Row>
            ))}
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
