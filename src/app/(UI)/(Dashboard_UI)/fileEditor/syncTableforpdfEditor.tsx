/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import {FC, useEffect, useState} from 'react';

import {Divider} from '@/app/components/common/antd/Divider';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {formatStatus, quoteLineItemColumnForSync} from '@/app/utils/CONSTANTS';
import {
  getLineItemsWithNonRepitive,
  getValuesOFLineItemsThoseNotAddedBefore,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {Col, Row, notification} from 'antd';
import {RedirectType, useRouter, useSearchParams} from 'next/navigation';
import {
  getContractInBulkByProductCode,
  getContractProductByProductCode,
} from '../../../../../redux/actions/contractProduct';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {
  getBulkProductIsExisting,
  insertProduct,
  insertProductsInBulk,
} from '../../../../../redux/actions/product';
import {insertProfitability} from '../../../../../redux/actions/profitability';
import {updateQuoteJsonAndManual} from '../../../../../redux/actions/quote';
import {quoteFileVerification} from '../../../../../redux/actions/quoteFile';
import {
  deleteQuoteLineItemsByQuoteId,
  insertQuoteLineItem,
} from '../../../../../redux/actions/quotelineitem';
import {
  getRebatesByProductCode,
  getRebatesInBulkByProductCode,
} from '../../../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../../../redux/actions/rebateQuoteLineitem';
import {insertValidation} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

interface EditPdfDataInterface {
  setMergedVaalues?: any;
  mergedValue?: any;
  setNanonetsLoading?: any;
  nanonetsLoading?: any;
}
const SyncTableData: FC<EditPdfDataInterface> = ({
  setMergedVaalues,
  mergedValue,
  setNanonetsLoading,
  nanonetsLoading,
}) => {
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const [syncedNewValue, setNewSyncedValue] = useState<any>();
  const {quoteFileById} = useAppSelector((state) => state.quoteFile);
  const {data: syncTableData, loading: syncDataLoading} = useAppSelector(
    (state) => state.syncTable,
  );
  const [token] = useThemeToken();
  const [syncTableQuoteLItemValues, setSyncTableQuoteLItemValues] =
    useState<any>(quoteLineItemColumnForSync);
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const getQuoteFileId = searchParams.get('fileId');

  const router = useRouter();

  const mergeedColumn: any = [];

  useEffect(() => {
    let dsfdsfds = [
      {
        'LINE NO .': '1',
        adjusted_price: '$ 31,302.32',
        description:
          'PowerTower PT549 Server\nDell Federal Systems L.P. c / o Dell USA L.P. -\n422 - BRSR',
        list_price: '$ 21,114.59 OM',
        product_code: '422 - BRSI',
        quantity: '2',
      },
      {
        'LINE NO .': '2',
        adjusted_price: '$ 0.00',
        description:
          'Dell Hardware Limited Warranty Plus On - Site\nService\nDell Federal Systems L.P. c / o Dell USA L.P. -\n796-5225',
        list_price: '$ 0.00 OM',
        product_code: '796-5228',
        quantity: '2',
      },
      {
        'LINE NO .': '3',
        adjusted_price: '$ 0.00',
        description:
          'ProSupport : Next Business Day On - Site Service\nAfter Problem Diagnosis , 3 Years\nDell Federal Systems L.P. c / o Dell USA L.P. -\n796-6291',
        list_price: '$ 0.00 OM',
        product_code: '796-6299',
        quantity: '2',
      },
    ];

    let Jsojdsfdsfs = JSON?.stringify(dsfdsfds);
    console.log('345345345345', Jsojdsfdsfs);
  }, []);
  const keys = mergedValue?.length > 0 && Object.keys(mergedValue?.[0]);

  if (keys) {
    keys?.map((item: any) => {
      if (item && !item?.toLowerCase()?.includes('line')) {
        mergeedColumn?.push(item);
      }
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

      if (NewFilterOption) {
        newSyncTableData?.push({
          preVal: mergeItem,
          newVal: NewFilterOption?.value,
          key: indexMerge,
        });

        const newOptions: any = [...newSyncOptionChecks];

        const indexOFItem = newOptions?.findIndex(
          (itemV: any) => itemV?.value === NewFilterOption?.value,
        );
        newOptions?.splice(indexOFItem, 1);
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
    const dataaa = {id: Number(getQuoteID), fileId: Number(getQuoteFileId)};
    dispatch(deleteQuoteLineItemsByQuoteId(dataaa));
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

    const newrrLineItems: any = [];
    const rebateDataArray: any = [];
    const contractProductArray: any = [];
    if (alllArrayValue) {
      const data = {
        quote_json: JSON?.stringify(alllArrayValue),
        id: Number(getQuoteID),
      };
      await dispatch(updateQuoteJsonAndManual(data));

      let newArrValues = getLineItemsWithNonRepitive(alllArrayValue);

      let allProductCodes: any = [];
      let allProductCodeDataa: any = [];
      const allReabatesWithProductCodeData: any = [];
      const allContractWithProductCodeData: any = [];
      alllArrayValue?.map((itemsPro: any) => {
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
          alllArrayValue,
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

      if (alllArrayValue) {
        for (let i = 0; i < alllArrayValue?.length; i++) {
          let itemsOfProduct = alllArrayValue[i];
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
              quote_file_id: quoteFileById?.[0]?.id
                ? quoteFileById?.[0]?.id
                : getQuoteFileId,
              quote_id: Number(getQuoteID),
              product_id: itemsToAdd?.id,
              product_code: itemsToAdd?.product_code,
              // line_amount: useRemoveDollarAndCommahook(
              //   itemsOfProduct?.line_amount,
              // ),
              list_price: useRemoveDollarAndCommahook(itemsToAdd?.list_price),
              description: itemsToAdd?.description,
              quantity: useRemoveDollarAndCommahook(itemsToAdd?.quantity),
              adjusted_price: useRemoveDollarAndCommahook(
                itemsToAdd?.adjusted_price,
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
    dispatch(
      quoteFileVerification({
        id: quoteFileById?.[0]?.id ? quoteFileById?.[0]?.id : getQuoteFileId,
      }),
    );
    setNanonetsLoading(false);
    router?.push(`/generateQuote?id=${Number(getQuoteID)}`);
  };
  const handleChange = (value: string) => {
    const newInsertOptions = quoteLineItemColumnForSync?.find(
      (itemss: any) => itemss?.value === value,
    );
    const newArr =
      syncTableQuoteLItemValues?.length > 0
        ? [...syncTableQuoteLItemValues]
        : [];

    newArr?.push(newInsertOptions);

    setTimeout(() => {
      setSyncTableQuoteLItemValues(newArr);
    }, 1000);
  };

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
                  onClear={() => handleChange(item?.newVal)}
                  defaultValue={item?.newVal?.toString()?.toUpperCase()}
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
            loading={syncDataLoading}
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
