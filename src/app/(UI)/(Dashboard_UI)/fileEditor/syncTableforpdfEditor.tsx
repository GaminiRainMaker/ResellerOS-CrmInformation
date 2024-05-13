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
import {useRemoveDollarAndCommahook} from '@/app/utils/base';
import {Col, Row, notification} from 'antd';
import {RedirectType, useRouter, useSearchParams} from 'next/navigation';
import {getContractProductByProductCode} from '../../../../../redux/actions/contractProduct';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {
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
import {getRebatesByProductCode} from '../../../../../redux/actions/rebate';
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
      let newArrValues: any = [];
      alllArrayValue.forEach((itemsPro: any) => {
        newArrValues?.push({
          ...itemsPro,
          product_code: itemsPro?.product_code?.replace(/\s/g, ''),
          organization: userInformation.organization,
        });
      });

      let insertedProduct: any;
      if (newArrValues) {
        insertedProduct = await dispatch(insertProductsInBulk(newArrValues));
      }

      if (insertedProduct?.payload) {
        for (let i = 0; i < insertedProduct?.payload?.length; i++) {
          let itemsOfProduct = insertedProduct?.payload[i];
          if (itemsOfProduct) {
            const obj1: any = {
              quote_file_id: quoteFileById?.[0]?.id
                ? quoteFileById?.[0]?.id
                : getQuoteFileId,
              quote_id: Number(getQuoteID),
              product_id: itemsOfProduct?.id,
              product_code: itemsOfProduct?.product_code,
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
              line_number: itemsOfProduct?.line_number,
              organization: userInformation.organization,
            };

            const RebatesByProductCodData = await dispatch(
              getRebatesByProductCode(itemsOfProduct?.product_code),
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
              getContractProductByProductCode(itemsOfProduct?.product_code),
            );
            if (contractProductByProductCode?.payload?.id) {
              contractProductArray?.push({
                ...obj1,
                contract_product_id: contractProductByProductCode?.payload?.id,
                // quote_file_id:
              });
            }

            newrrLineItems?.push(obj1);
          }
        }
      }

      // for (let i = 0; i < alllArrayValue?.length; i++) {
      //   const items = alllArrayValue[i];
      //   const insertedProduct = await dispatch(
      //     insertProduct({
      //       ...items,
      //       organization: userInformation.organization,
      //     }),
      //   );

      //   if (insertedProduct?.payload?.id) {
      //     const obj1: any = {
      //       quote_file_id: quoteFileById?.[0]?.id
      //         ? quoteFileById?.[0]?.id
      //         : getQuoteFileId,
      //       quote_id: Number(getQuoteID),
      //       product_id: insertedProduct?.payload?.id,
      //       product_code: insertedProduct?.payload?.product_code,
      //       // line_amount: useRemoveDollarAndCommahook(
      //       //   insertedProduct?.payload?.line_amount,
      //       // ),
      //       list_price: useRemoveDollarAndCommahook(
      //         insertedProduct?.payload?.list_price,
      //       ),
      //       description: insertedProduct?.payload?.description,
      //       quantity: useRemoveDollarAndCommahook(
      //         insertedProduct?.payload?.quantity,
      //       ),
      //       adjusted_price: useRemoveDollarAndCommahook(
      //         insertedProduct?.payload?.adjusted_price,
      //       ),
      //       line_number: insertedProduct?.payload?.line_number,
      //       organization: userInformation.organization,
      //     };

      //     const RebatesByProductCodData = await dispatch(
      //       getRebatesByProductCode(insertedProduct?.payload?.product_code),
      //     );
      //     if (RebatesByProductCodData?.payload?.id) {
      //       rebateDataArray?.push({
      //         ...obj1,
      //         rebate_id: RebatesByProductCodData?.payload?.id,
      //         percentage_payout:
      //           RebatesByProductCodData?.payload?.percentage_payout,
      //       });
      //     }
      //     const contractProductByProductCode = await dispatch(
      //       getContractProductByProductCode(
      //         insertedProduct?.payload?.product_code,
      //       ),
      //     );
      //     if (contractProductByProductCode?.payload?.id) {
      //       contractProductArray?.push({
      //         ...obj1,
      //         contract_product_id: contractProductByProductCode?.payload?.id,
      //         // quote_file_id:
      //       });
      //     }

      //     newrrLineItems?.push(obj1);
      //   }
      // }
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
