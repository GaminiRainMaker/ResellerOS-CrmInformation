/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import '@handsontable/pikaday/css/pikaday.css';
import {HotTable} from '@handsontable/react';
import {useEffect, useRef, useState} from 'react';
import './styles.css';

import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {updateTables} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import {notification} from 'antd';
import Typography from 'antd/es/typography/Typography';
import {useRouter, useSearchParams} from 'next/navigation';
import {addClassesToRows, alignHeaders} from './hooksCallbacks';

import 'handsontable/dist/handsontable.min.css';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {getQuoteLineItemByQuoteId} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import SyncTableData from './syncTableforpdfEditor';

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const hotRef = useRef(null);
  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const [quoteItems, setQuoteItems] = useState<any>();
  const [mergedValue, setMergedVaalues] = useState<any>();
  const router = useRouter();
  const ExistingQuoteItemss = searchParams.get('quoteExist');
  const {concernQuoteLineItemData} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const {userInformation} = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateLineItemsValue, setUpdateLineItemsValue] = useState<any>();
  const [missingId, setMissingId] = useState<number[]>([]);

  useEffect(() => {
    const newArrr: any = [];
    if (concernQuoteLineItemData?.quoteLineItems) {
      concernQuoteLineItemData?.quoteLineItems?.map((itemsss: any) => {
        if (itemsss) {
          const newObj: any = {...itemsss};
          delete newObj.Product;
          delete newObj.Quote;
          delete newObj.quote_id;
          delete newObj.user_id;
          delete newObj.quote_config_id;
          delete newObj.product_id;
          delete newObj.customer_id;
          delete newObj.is_deleted;
          newArrr?.push(newObj);
        }
      });

      setUpdateLineItemsValue(newArrr);
    }
  }, [concernQuoteLineItemData]);

  useEffect(() => {
    const missingIds = concernQuoteLineItemData?.quoteLineItems
      .filter(
        (item1: any) =>
          !updateLineItemsValue?.some((item2: any) => item1.id === item2.id),
      )
      .map((item: any) => item.id);
    setMissingId(missingIds);
  }, [updateLineItemsValue]);

  useEffect(() => {
    if (ExistingQuoteItemss === 'true') {
      dispatch(getQuoteLineItemByQuoteId(Number(getQUoteId))).then((d: any) => {
        if (d?.payload) {
          // const dataa: any = JSON?.parse(d?.payload?.quote_json?.[0]);
          setQuoteItems(d?.payload);
          const allHeaderValue: any = [];
        }
      });
    } else {
      const quoteJson = concernQuoteLineItemData?.quoteJson;
      if (quoteJson) {
        const dataa: any = JSON.parse(quoteJson);
        const newArray = dataa?.length > 0 ? [...dataa] : [];
        setQuoteItems(newArray);
        const allHeaderValue: any = [];
      }
    }
  }, [ExistingQuoteItemss]);

  const updateRowsValueforTable = (
    indexOFTable: number,
    rowIndex: number,
    keyValue: string,
    changedValue: any,
  ) => {
    const changedArr = quoteItems?.map((itemTop: any, indexOfTop: number) => {
      if (indexOfTop === indexOFTable) {
        return itemTop?.map((itemInner: any, indexInner: number) => {
          if (indexInner === rowIndex) {
            return {
              ...itemInner,
              [keyValue]: changedValue,
            };
          }
          return itemInner;
        });
      }
      return itemTop;
    });
    setQuoteItems(changedArr);
  };
  const deleteRowsItemsForTable = (
    indexOFTable: number,
    indexOfDeletion: number,
    NumberOf: number,
  ) => {
    const newArrr = quoteItems?.length > 0 ? [...quoteItems] : [];
    newArrr?.[indexOFTable || 0]
      .slice(0, indexOfDeletion)
      .concat(newArrr?.[indexOFTable || 0].slice(indexOfDeletion + NumberOf));

    setQuoteItems(newArrr);
  };

  const mergeTableData = () => {
    const myAllKey: any = [];
    quoteItems?.map((itemOfMain: any) => {
      const keys = itemOfMain?.length > 0 && Object.keys(itemOfMain?.[0]);
      if (keys) {
        keys?.map((item: any) => {
          if (item && !myAllKey?.includes(item)) {
            myAllKey?.push(item);
          }
        });
      }
    });

    const newArrOfObjectForMerged: any = [];
    quoteItems?.map((itemOFMainQuote: any, indexOfMain: number) => {
      const newObj: any = {};
      itemOFMainQuote?.map((innerMainItem: any) => {
        myAllKey?.map((keyItem: string, indexoddd: number) => {
          if (!innerMainItem[keyItem]) {
            newObj[keyItem] = '';
          } else {
            newObj[keyItem] = innerMainItem?.[keyItem];
          }
        });
        newArrOfObjectForMerged?.push(newObj);
      });
    });

    setMergedVaalues(newArrOfObjectForMerged);
  };

  const deleteTable = (indexOfTable: number) => {
    const newTableData: any = quoteItems?.length > 0 ? [...quoteItems] : [];
    newTableData?.splice(indexOfTable, 1);

    setQuoteItems(newTableData);
    setTimeout(() => {
      if (newTableData?.length === 1) {
        mergeTableData();
      }
    }, 100);
  };
  // ============================= After Merged Value Update Delete ==================

  const updateRowsValue = (
    rowIndex: number,
    keyValue: string,
    changedValue: any,
  ) => {
    const changedArr = mergedValue?.map((itemTop: any, indexOfTop: number) => {
      if (indexOfTop === rowIndex) {
        return {
          ...itemTop,
          [keyValue]: changedValue,
        };
      }
      return itemTop;
    });
    setMergedVaalues(changedArr);
  };
  const deleteRowsItems = (indexOfDeletion: number, NumberOf: number) => {
    const newArrr = mergedValue?.length > 0 ? [...mergedValue] : [];
    newArrr
      ?.slice(0, indexOfDeletion)
      .concat(newArrr?.slice(indexOfDeletion + NumberOf));

    setMergedVaalues(newArrr);
  };

  const mergeedColumn: any = [];
  const keys =
    ExistingQuoteItemss === 'true'
      ? quoteItems?.length > 0 && Object.keys(quoteItems?.[0])
      : mergedValue?.length > 0 && Object.keys(mergedValue?.[0]);
  if (keys) {
    keys?.map((item: any) => {
      if (item) {
        mergeedColumn?.push(formatStatus(item));
      }
    });
  }
  // ======================================== FOr Update LineItems=====================================

  const updateRowsValueForLineItems = (
    rowIndex: number,
    keyValue: string,
    changedValue: any,
  ) => {
    if (keyValue === 'id') {
      notification.open({
        message: 'Cannot Update Id',
        type: 'error',
      });
      return;
    }
    const changedArr = updateLineItemsValue?.map(
      (itemTop: any, indexOfTop: number) => {
        if (indexOfTop === rowIndex) {
          return {
            ...itemTop,
            [keyValue]: changedValue,
          };
        }
        return itemTop;
      },
    );
    setUpdateLineItemsValue(changedArr);
  };
  const deleteRowsItemsForLineItemsa = (
    indexOfDeletion: number,
    NumberOf: number,
  ) => {
    const newArrr =
      updateLineItemsValue?.length > 0 ? [...updateLineItemsValue] : [];
    newArrr
      ?.slice(0, indexOfDeletion)
      .concat(newArrr?.slice(indexOfDeletion + NumberOf));

    setUpdateLineItemsValue(newArrr);
  };

  const updateLineItemColumn: any = [];
  const keysss =
    updateLineItemsValue?.length > 0 && Object.keys(updateLineItemsValue?.[0]);
  if (keysss) {
    keysss?.map((item: any) => {
      if (item) {
        updateLineItemColumn?.push(formatStatus(item));
      }
    });
  }

  const updateData = () => {
    updateTables(
      concernQuoteLineItemData,
      updateLineItemsValue,
      userInformation,
      dispatch,
      missingId,
      true,
    );

    router?.push(`/generateQuote?id=${getQUoteId}`);
  };
  return (
    <>
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '80vh',
          overflow: 'auto',
        }}
      >
        {ExistingQuoteItemss === 'true' ? (
          <>
            {' '}
            <Space
              size={50}
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginRight: '50px',
                // top: '10',
                position: 'fixed',

                right: '0',
                bottom: '0',
                marginBottom: '20px',
              }}
            >
              {' '}
              <OsButton
                text="Save LineItems"
                buttontype="PRIMARY"
                clickHandler={updateData}
              />
            </Space>
            <HotTable
              data={updateLineItemsValue}
              colWidths={200}
              columnHeaderHeight={40}
              height="auto"
              colHeaders={updateLineItemColumn}
              width="auto"
              minSpareRows={0}
              autoWrapRow
              autoWrapCol
              licenseKey="non-commercial-and-evaluation"
              dropdownMenu
              hiddenColumns={{
                indicators: true,
              }}
              contextMenu
              multiColumnSorting
              filters
              rowHeaders
              allowInsertRow={false}
              allowInsertColumn
              afterGetColHeader={alignHeaders}
              beforeRenderer={() => {
                addClassesToRows('', '', '', '', '', '', quoteItems);
              }}
              afterRemoveRow={(change, source) => {
                deleteRowsItemsForLineItemsa(source, change);
              }}
              afterChange={(change: any, source) => {
                console.log('56456456', change);
                if (change) {
                  updateRowsValueForLineItems(
                    change?.[0]?.[0],
                    change?.[0]?.[1],
                    change?.[0]?.[3],
                  );
                }
              }}
              navigableHeaders
            />
          </>
        ) : (
          <>
            {mergedValue?.length > 0 ? (
              <>
                <Space
                  onClick={(e) => {
                    e?.preventDefault();
                    setShowModal(true);
                  }}
                  size={50}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginRight: '50px',
                    // top: '10',
                    position: 'fixed',

                    right: '0',
                    bottom: '0',
                    marginBottom: '20px',
                  }}
                >
                  {' '}
                  <OsButton
                    text="Sync Table"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      setShowModal(true);
                    }}
                  />
                </Space>

                <HotTable
                  data={mergedValue}
                  colWidths={200}
                  columnHeaderHeight={40}
                  height="auto"
                  colHeaders={mergeedColumn}
                  width="auto"
                  minSpareRows={0}
                  autoWrapRow
                  autoWrapCol
                  licenseKey="non-commercial-and-evaluation"
                  dropdownMenu
                  hiddenColumns={{
                    indicators: true,
                  }}
                  contextMenu
                  multiColumnSorting
                  filters
                  rowHeaders
                  allowInsertRow={false}
                  allowInsertColumn
                  afterGetColHeader={alignHeaders}
                  beforeRenderer={() => {
                    addClassesToRows('', '', '', '', '', '', quoteItems);
                  }}
                  afterRemoveRow={(change, source) => {
                    deleteRowsItems(source, change);
                  }}
                  afterChange={(change: any, source) => {
                    console.log('433223423', change, source);
                    if (change) {
                      updateRowsValue(
                        change?.[0]?.[0],
                        change?.[0]?.[1],
                        change?.[0]?.[3],
                      );
                    }
                  }}
                  navigableHeaders
                />
              </>
            ) : (
              <>
                <Space
                  size={50}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginRight: '50px',
                    // top: '10',
                    position: 'fixed',

                    right: '0',
                    bottom: '0',
                    marginBottom: '20px',
                  }}
                >
                  {' '}
                  <OsButton
                    text="Merge Table"
                    buttontype="PRIMARY"
                    clickHandler={mergeTableData}
                  />
                </Space>
                {console.log(quoteItems, 'quoteItemsquoteItems')}
                {quoteItems &&
                  quoteItems?.map((itemss: any, indexOFTable: number) => {
                    const allHeaderValue: any = [];
                    const keysData = itemss && Object?.keys(itemss);
                    if (keysData) {
                      keysData?.map((item: any) => {
                        if (item) {
                          allHeaderValue?.push(formatStatus(item));
                        }
                      });
                    }
                    return (
                      <>
                        <Space direction="horizontal" style={{width: '100%'}}>
                          <Typography onClick={mergeTableData}>
                            Table {indexOFTable + 1}
                          </Typography>
                          <TrashIcon
                            style={{color: 'red', width: '20px'}}
                            onClick={() => {
                              deleteTable(indexOFTable);
                            }}
                          />
                        </Space>
                        <HotTable
                          data={quoteItems}
                          colWidths={[
                            200, 200, 400, 200, 200, 200, 200, 200, 200, 200,
                            200, 200, 200, 200, 200, 200,
                          ]}
                          height="auto"
                          colHeaders={allHeaderValue}
                          width="auto"
                          minSpareRows={0}
                          autoWrapRow
                          autoWrapCol
                          licenseKey="non-commercial-and-evaluation"
                          dropdownMenu
                          hiddenColumns={{
                            indicators: true,
                          }}
                          contextMenu
                          multiColumnSorting
                          filters
                          rowHeaders
                          allowInsertRow={false}
                          allowInsertColumn={false}
                          afterGetColHeader={alignHeaders}
                          beforeRenderer={() => {
                            addClassesToRows(
                              '',
                              '',
                              '',
                              '',
                              '',
                              '',
                              quoteItems,
                            );
                          }}
                          afterRemoveRow={(change, source) => {
                            deleteRowsItemsForTable(
                              indexOFTable,
                              change,
                              source,
                            );
                          }}
                          afterChange={(change: any, source) => {
                            if (change) {
                              updateRowsValueforTable(
                                indexOFTable,
                                change?.[0]?.[0],
                                change?.[0]?.[1],
                                change?.[0]?.[3],
                              );
                            }
                          }}
                          navigableHeaders
                        />
                      </>
                    );
                  })}
              </>
            )}
          </>
        )}
      </div>
      <OsModal
        // loading={loading}
        body={
          <SyncTableData
            mergedValue={mergedValue}
            setMergedVaalues={setMergedVaalues}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
      />
    </>
  );
};
export default EditorFile;
