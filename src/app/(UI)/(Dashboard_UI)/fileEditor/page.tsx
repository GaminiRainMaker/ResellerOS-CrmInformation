/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@handsontable/pikaday/css/pikaday.css';
import './styles.css';
import {HotTable} from '@handsontable/react';

import {formatStatus} from '@/app/utils/CONSTANTS';
import {useSearchParams} from 'next/navigation';
import {Space} from '@/app/components/common/antd/Space';
import Typography from 'antd/es/typography/Typography';
import {TrashIcon} from '@heroicons/react/24/outline';
import OsModal from '@/app/components/common/os-modal';
import OsButton from '@/app/components/common/os-button';
import {alignHeaders, addClassesToRows} from './hooksCallbacks';

import 'handsontable/dist/handsontable.min.css';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {useAppDispatch} from '../../../../../redux/hook';
import SyncTableData from './syncTableforpdfEditor';
import {getQuoteLineItemByQuoteId} from '../../../../../redux/actions/quotelineitem';
import UpdateGenerateQuote from '../updation/page';

const EditorFile = () => {
  const hotRef = useRef(null);
  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const [quoteItems, setQuoteItems] = useState<any>();
  const [mergedValue, setMergedVaalues] = useState<any>();
  const ExistingQuoteItemss = searchParams.get('quoteExist');

  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
      dispatch(getQuoteById(Number(getQUoteId))).then((d: any) => {
        if (d?.payload) {
          const dataa: any = JSON?.parse(d?.payload?.quote_json?.[0]);
          setQuoteItems(dataa.values);
          const allHeaderValue: any = [];
        }
      });
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
            newObj[keyItem] = `value${indexOfMain}`;
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
          <UpdateGenerateQuote />
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
                  ref={hotRef}
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
                          ref={hotRef}
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
