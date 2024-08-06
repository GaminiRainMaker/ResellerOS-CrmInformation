/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import '@handsontable/pikaday/css/pikaday.css';
const HotTable = dynamic(() => import('@handsontable/react'), {
  ssr: false,
});

// import {HotTable} from '@handsontable/react';
import {useEffect, useState} from 'react';
import './styles.css';

import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {
  getResultedValue,
  sendDataToNanonets,
  updateTables,
} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Col, Row, notification} from 'antd';
import Typography from 'antd/es/typography/Typography';
import {useRouter, useSearchParams} from 'next/navigation';
import {addClassesToRows, alignHeaders} from './hooksCallbacks';

import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import 'handsontable/dist/handsontable.min.css';
import {
  queryLineItemSyncing,
  queryLineItemSyncingForSalesForce,
} from '../../../../../redux/actions/LineItemSyncing';
import {
  addSalesForceDataa,
  getSalesForceDataaForEditAsItIs,
  getSalesForceFileData,
} from '../../../../../redux/actions/auth';
import {
  UpdateQuoteFileById,
  getQuoteFileById,
} from '../../../../../redux/actions/quoteFile';
import {getQuoteLineItemByQuoteIdForEditTable} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import SyncTableData from './syncTableforpdfEditor';
import dynamic from 'next/dynamic';

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const getQuoteFileId = searchParams.get('fileId');
  const [quoteItems, setQuoteItems] = useState<any>([]);
  const [mergedValue, setMergedVaalues] = useState<any>();
  const router = useRouter();
  const ExistingQuoteItemss = searchParams.get('quoteExist');
  const {userInformation} = useAppSelector((state) => state.user);
  const {quoteFileById} = useAppSelector((state) => state.quoteFile);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateLineItemsValue, setUpdateLineItemsValue] = useState<any>();
  const [missingId, setMissingId] = useState<number[]>([]);
  const [returnBackModal, setReturnModalBack] = useState<boolean>(false);
  const [nanonetsLoading, setNanonetsLoading] = useState<boolean>(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState<boolean>(false);
  const [showUpdateColumnModal, setShowUpdateColumnModal] =
    useState<boolean>(false);
  const [newHeaderName, setNewHeaderName] = useState<any>();
  const [oldColumnName, setOldColumnName] = useState<any>();
  const salesToken = searchParams.get('key');
  const SaleQuoteId = searchParams.get('quote_Id');
  const EditSalesLineItems = searchParams.get('editLine');
  const salesForceUrl = searchParams.get('instance_url');
  const salesForceFiledId = searchParams.get('file_Id');
  const [lineItemSyncingData, setLineItemSyncingData] = useState<any>();
  const isView = getResultedValue(userInformation);

  // quoteId,instance_url,fileId
  // ============================== SalesForce Implementations ======================================

  const fetchSaleForceDataa = async () => {
    if (getQuoteFileId) {
      return;
    }
    setNanonetsLoading(true);

    if (EditSalesLineItems === 'true') {
      // Work In Case of Edit Data As It Is
      let newdata = {
        token: salesToken,
        // documentId: salesForceFiledId,
        urls: salesForceUrl,
        QuoteId: SaleQuoteId,
        FileId: salesForceFiledId,
      };
      dispatch(getSalesForceDataaForEditAsItIs(newdata))?.then(
        (payload: any) => {
          setUpdateLineItemsValue(payload?.payload);
          setNanonetsLoading(false);
          return;
        },
      );
      return;
    }

    // Work in case of export to tables
    let data = {
      token: salesToken,
      FileId: salesForceFiledId,
      urls: salesForceUrl,
      quoteId: null,
    };
    dispatch(getSalesForceFileData(data))?.then(async (payload: any) => {
      setNanonetsLoading(true);
      const binaryString = atob(payload?.payload?.body);

      // Convert binary string to an array of bytes
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob object from the bytes array
      const blob = new Blob([bytes]);

      // Create a File object from the Blob (optional)
      const finalFile = new File([blob], payload?.payload?.title);

      // const finalFile = new File([u8arr], payload?.payload?.title);

      const response = await sendDataToNanonets(
        'a02fffb7-5221-44a2-8eb1-85781a0ecd67',
        finalFile,
      );

      const newArrrrAll: any = [];
      if (response) {
        for (let i = 0; i < response?.data?.result?.length; i++) {
          const itemss: any = response?.data?.result[i];

          const newItemsssadsd = itemss?.prediction?.filter(
            (item: any) => item,
          );
          const newAllgetOArr: any = [];
          newItemsssadsd?.map((itemNew: any) => {
            let formattedArray1: any = [];

            const formattedData1: any = {};
            if (itemNew?.cells) {
              const titles = itemNew?.cells.filter(
                (innerCell: any) => innerCell.row === 1,
              );

              itemNew?.cells.forEach((item: any) => {
                const rowNum = item.row;
                if (rowNum === 1) {
                  return;
                }
                if (!formattedData1[rowNum]) {
                  formattedData1[rowNum] = {};
                }
                formattedData1[rowNum][
                  item.label?.toLowerCase()
                    ? item.label?.toLowerCase()
                    : titles.find((titleRow: any) => titleRow.col === item.col)
                        .text
                ] = item.label?.toLowerCase()
                  ? item.label?.toLowerCase()?.includes('Price')
                  : titles
                        .find((titleRow: any) => titleRow.col === item.col)
                        .text?.includes('Price')
                    ? item?.text
                        ?.toString()
                        .match(/\d+(\.\d+)?/g)
                        ?.map(Number)
                        ?.toString()
                        .match(/\d+(\.\d+)?/g)
                        ?.map(Number)
                        ?.toString()
                    : item.text;
              });
            }
            formattedArray1 = Object.values(formattedData1);

            newAllgetOArr?.push(formattedArray1);
            newArrrrAll?.push(formattedArray1);

            setNanonetsLoading(false);
          });
        }
      }
      if (newArrrrAll) {
        let newUpdatedArr: any = [];
        newArrrrAll?.map((items: any, index: number) => {
          const replaceKeyInObject = (obj: any, oldKey: any, newKey: any) => {
            const {[oldKey]: oldValue, ...rest} = obj; // Extract old value and rest of the object
            return {
              [newKey]: oldValue, // Create a new object with new key and old value
              ...rest, // Spread the rest of the properties
            };
          };

          // Transform the array
          let newArrssr = items.map((item: any) =>
            replaceKeyInObject(item, '', `emptyHeader${index + 1}`),
          );
          newUpdatedArr?.push(newArrssr);
        });

        setQuoteItems(newUpdatedArr);
      }
    });
  };

  useEffect(() => {
    if (salesForceUrl && !getQuoteFileId) {
      fetchSaleForceDataa();
    } else {
      if (ExistingQuoteItemss === 'true') {
        let newObj = {
          id: Number(getQUoteId),
          fileId: Number(getQuoteFileId),
        };
        dispatch(getQuoteLineItemByQuoteIdForEditTable(newObj)).then(
          (d: any) => {
            if (d?.payload) {
              console.log('d?.payload', d?.payload);
              // const dataa: any = JSON?.parse(d?.payload?.quote_json?.[0]);
              setQuoteItems(d?.payload);
            }
          },
        );
      } else if (quoteFileById?.pdf_url) {
        setNanonetsLoading(true);
        fetch(quoteFileById?.pdf_url)
          .then((res) => res.blob())
          .then(async (file) => {
            const finalFile = new File([file], quoteFileById?.file_name, {
              type: file.type,
            });

            const response = await sendDataToNanonets(
              'a02fffb7-5221-44a2-8eb1-85781a0ecd67',
              finalFile,
            );

            const newArrrrAll: any = [];
            if (response) {
              for (let i = 0; i < response?.data?.result?.length; i++) {
                const itemss: any = response?.data?.result[i];

                const newItemsssadsd = itemss?.prediction?.filter(
                  (item: any) => item,
                );
                const newAllgetOArr: any = [];
                newItemsssadsd?.map((itemNew: any) => {
                  let formattedArray1: any = [];

                  const formattedData1: any = {};
                  if (itemNew?.cells) {
                    const titles = itemNew?.cells.filter(
                      (innerCell: any) => innerCell.row === 1,
                    );
                    const strifndfs = (str: any) => {
                      const losadsd = str
                        ?.toString()
                        .match(/\d+(\.\d+)?/g)
                        ?.map(Number)
                        ?.toString()
                        .match(/\d+(\.\d+)?/g)
                        ?.map(Number);
                    };

                    itemNew?.cells.forEach((item: any) => {
                      const rowNum = item.row;
                      if (rowNum === 1) {
                        return;
                      }
                      if (!formattedData1[rowNum]) {
                        formattedData1[rowNum] = {};
                      }
                      formattedData1[rowNum][
                        item.label?.toLowerCase()
                          ? item.label?.toLowerCase()
                          : titles.find(
                              (titleRow: any) => titleRow.col === item.col,
                            ).text
                      ] = item.label?.toLowerCase()
                        ? item.label?.toLowerCase()?.includes('Price')
                        : titles
                              .find(
                                (titleRow: any) => titleRow.col === item.col,
                              )
                              .text?.includes('Price')
                          ? item?.text
                              ?.toString()
                              .match(/\d+(\.\d+)?/g)
                              ?.map(Number)
                              ?.toString()
                              .match(/\d+(\.\d+)?/g)
                              ?.map(Number)
                              ?.toString()
                          : item.text;
                    });
                  }
                  formattedArray1 = Object.values(formattedData1);
                  newAllgetOArr?.push(formattedArray1);
                  newArrrrAll?.push(formattedArray1);

                  setNanonetsLoading(false);
                });
              }
            }
            if (newArrrrAll) {
              let newUpdatedArr: any = [];
              newArrrrAll?.map((items: any, index: number) => {
                const replaceKeyInObject = (
                  obj: any,
                  oldKey: any,
                  newKey: any,
                ) => {
                  const {[oldKey]: oldValue, ...rest} = obj; // Extract old value and rest of the object
                  return {
                    [newKey]: oldValue, // Create a new object with new key and old value
                    ...rest, // Spread the rest of the properties
                  };
                };

                // Transform the array
                let newArrssr = items.map((item: any) =>
                  replaceKeyInObject(item, '', `emptyHeader${index + 1}`),
                );
                newUpdatedArr?.push(newArrssr);
              });

              setQuoteItems(newUpdatedArr);
            }
          });
      }
    }
  }, [ExistingQuoteItemss, quoteFileById]);

  useEffect(() => {
    if (quoteItems?.length === 1) {
      mergeTableData(quoteItems);
    }
  }, [quoteItems]);
  useEffect(() => {
    const newArrr: any = [];
    if (quoteItems && quoteItems.length > 0) {
      quoteItems?.map((itemsss: any) => {
        if (itemsss) {
          const newObj: any = {...itemsss};
          newObj.cost = itemsss?.list_price;
          delete newObj?.list_price;

          newArrr?.push(newObj);
        }
      });
      setUpdateLineItemsValue(newArrr);
    }
  }, [quoteFileById]);

  useEffect(() => {
    if (!salesForceUrl) {
      dispatch(queryLineItemSyncing({}))?.then((payload: any) => {
        setLineItemSyncingData(payload?.payload);
      });
    } else {
      dispatch(queryLineItemSyncingForSalesForce({}))?.then((payload: any) => {
        setLineItemSyncingData(payload?.payload);
      });
    }
  }, []);

  // EditSalesLineItems

  useEffect(() => {
    if (quoteFileById?.QuoteLineItems) {
      const missingIds = quoteFileById?.QuoteLineItems.filter(
        (item1: any) =>
          !updateLineItemsValue?.some((item2: any) => item1.id === item2.id),
      ).map((item: any) => item.id);
      setMissingId(missingIds);
    }
  }, [updateLineItemsValue]);

  useEffect(() => {
    if (!salesForceUrl) {
      dispatch(getQuoteFileById(Number(getQuoteFileId)))?.then(
        (payload: any) => {
          if (payload?.payload === null) {
            setReturnModalBack(true);
          }
        },
      );
    }
  }, [getQuoteFileId]);

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
  const mergeTableData = (quoteItemsData: any) => {
    const flattenedArray = quoteItemsData?.flat();

    const uniqueKeys = Array.from(
      new Set(flattenedArray.flatMap((obj: any) => Object.keys(obj))),
    );
    const resultArray = flattenedArray.map((obj: any) => {
      const newObj: any = {};
      uniqueKeys.forEach((key: any) => {
        newObj[key] = obj[key] !== undefined ? obj[key] : '';
      });

      return newObj;
    });
    const transformObjects = (arr: any) => {
      const transformedArray = arr.map((obj: any, index: number) => {
        if (obj[''] !== undefined) {
          obj[`emptyHeader ${index}`] = obj[''];
          delete obj[''];
        }
        return obj;
      });
      return transformedArray;
    };

    // Apply transformation
    let result = transformObjects(resultArray);
    setMergedVaalues(result);
  };

  const deleteTable = (indexOfTable: number) => {
    const newTableData: any = quoteItems?.length > 0 ? [...quoteItems] : [];
    newTableData?.splice(indexOfTable, 1);

    setQuoteItems(newTableData);
    setTimeout(() => {
      if (newTableData?.length === 1) {
        const transformObjects = (arr: any) => {
          const transformedArray = arr.map((obj: any, index: number) => {
            if (obj[''] !== undefined) {
              obj[`emptyHeader ${index}`] = obj[''];
              delete obj[''];
            }
            return obj;
          });
          return transformedArray;
        };

        // Apply transformation
        let result = transformObjects(newTableData?.[0]);
        mergeTableData(result);
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
        mergeedColumn?.push(item);
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
  const updateLineItemColumnData: any = [];
  const keysss =
    updateLineItemsValue?.length > 0 && Object.keys(updateLineItemsValue?.[0]);
  if (keysss) {
    keysss?.map((item: any) => {
      if (item) {
        if (
          item === 'id' ||
          item === 'quote_id' ||
          item === 'organization' ||
          item === 'Id' ||
          item === 'quoteId' ||
          item === 'product_id'
        ) {
          const dataObj = {data: item, readOnly: true};
          updateLineItemColumnData?.push(dataObj);
        } else {
          const dataObj = {data: item};
          updateLineItemColumnData?.push(dataObj);
        }
        updateLineItemColumn?.push(formatStatus(item));
      }
    });
  }

  const updateData = async () => {
    notification.open({
      message: 'Kindly wait a moment while we wrap things up.',
      type: 'info',
    });

    if (EditSalesLineItems === 'true') {
      let newdata = {
        token: salesToken,
        // documentId: salesForceFiledId,
        urls: salesForceUrl,
        QuoteId: SaleQuoteId,
        FileId: salesForceFiledId,
        action: 'EditDataAsIs',
        lineItem: updateLineItemsValue,
      };

      dispatch(addSalesForceDataa(newdata))?.then((payload: any) => {});
      setNanonetsLoading(false);
      return;
    }

    await updateTables(
      getQUoteId,
      quoteFileById,
      updateLineItemsValue,
      userInformation,
      dispatch,
      missingId,
      true,
      Number(getQUoteId),
    );

    router?.push(`/generateQuote?id=${getQUoteId}&tab=2&isView=${isView}`);
  };

  const CancelEditing = () => {
    const data = {
      issue_type: null,
      affected_columns: null,
      id: getQuoteFileId,
    };
    dispatch(UpdateQuoteFileById(data));
    router?.push(`/generateQuote?id=${getQUoteId}&isView=${isView}`);
  };

  const syncShow = (value: string) => {
    if (value === 'sync') {
      setShowModal(true);
    }
    if (value === 'cancel') {
      CancelEditing();
    }
  };
  const checkForNewFile = async () => {
    router.push(`/generateQuote?id=${Number(getQUoteId)}&isView=${isView}`);
  };

  const AddNewCloumnToMergedTable = async (value: any) => {
    let newArr: any = [...mergedValue];
    let resultantArr: any = [];

    newArr?.map((items: any) => {
      resultantArr?.push({...items, [value]: ''});
    });
    setMergedVaalues(resultantArr);
    setShowAddColumnModal(false);
    setNewHeaderName('');
  };

  const UpdateTheColumnName = async (type: any, old: string, newVal: any) => {
    let newArr: any = [...mergedValue];
    const renameKey = (arr: any, oldKey: any, newKey: any) => {
      return arr.map((obj: any) => {
        // Create a new object preserving the order of keys
        let newObj: any = {};
        for (let key of Object.keys(obj)) {
          if (key === oldKey) {
            // Rename the old key to new key
            newObj[newKey] = obj[key];
          } else {
            // Copy the other keys as they are
            newObj[key] = obj[key];
          }
        }
        return newObj;
      });
    };
    let updatedArr = renameKey(newArr, old, newVal);
    setMergedVaalues(updatedArr);
    notification.open({
      message: `Column header ${old} sucessfully changed to ${newVal}.`,
      type: 'success',
    });
    setOldColumnName('');
    setNewHeaderName('');

    if (type === 'close') {
      setShowUpdateColumnModal(false);
    }
  };
  const [existingColumnOptions, setExistingColumnName] = useState<any>();
  useEffect(() => {
    let newArr: any = [];
    mergeedColumn?.map((items: any) => {
      newArr?.push({label: items, value: items});
    });
    setExistingColumnName(newArr);
  }, [mergeedColumn]);

  return (
    <GlobalLoader loading={nanonetsLoading}>
      {ExistingQuoteItemss === 'true' || EditSalesLineItems === 'true' ? (
        <>
          <div
            style={{
              position: 'relative',
              maxHeight: '75vh',
              overflow: 'auto',
            }}
          >
            <HotTable
              data={updateLineItemsValue}
              colWidths={200}
              columnHeaderHeight={40}
              height="auto"
              colHeaders={updateLineItemColumn}
              columns={updateLineItemColumnData}
              width="auto"
              minSpareRows={0}
              autoWrapRow
              autoWrapCol
              licenseKey="non-commercial-and-evaluation"
              dropdownMenu
              hiddenColumns={{
                indicators: true,
                columns: salesForceUrl ? [0, 1] : [0, 1],
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
                if (change) {
                  updateRowsValueForLineItems(
                    change?.[0]?.[0],
                    change?.[0]?.[1],
                    change?.[0]?.[3],
                  );
                }
              }}
              // navigableHeaders
            />
          </div>
          <br />
          <Space
            onClick={(e) => {
              e?.preventDefault();
            }}
            size={25}
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginRight: '50px',
              right: '0',
              bottom: '0',
              marginBottom: '20px',
            }}
          >
            {!salesForceUrl && (
              <OsButton
                text="Cancel"
                buttontype="SECONDARY"
                clickHandler={CancelEditing}
              />
            )}
            <OsButton
              text="Save LineItems"
              buttontype="PRIMARY"
              clickHandler={updateData}
            />
          </Space>{' '}
        </>
      ) : (
        <>
          {mergedValue?.length > 0 ? (
            <>
              <div
                style={{
                  position: 'relative',
                  maxHeight: '75vh',
                  overflow: 'auto',
                }}
              >
                {(ExistingQuoteItemss === 'false' ||
                  EditSalesLineItems === 'false') && (
                  <Space
                    onClick={(e) => {
                      e?.preventDefault();
                    }}
                    size={25}
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginRight: '50px',
                      right: '0',
                      bottom: '0',
                      marginBottom: '20px',
                    }}
                  >
                    <OsButton
                      text="Update Column Name"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        setShowUpdateColumnModal(true);
                      }}
                    />
                    <OsButton
                      text="Add New Column"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        setShowAddColumnModal(true);
                      }}
                    />
                  </Space>
                )}
                <HotTable
                  data={mergedValue}
                  allowRemoveColumn
                  dropdownMenu
                  colWidths={200}
                  columnHeaderHeight={40}
                  height="auto"
                  colHeaders={mergeedColumn}
                  width="auto"
                  minSpareRows={0}
                  autoWrapRow
                  autoWrapCol
                  licenseKey="non-commercial-and-evaluation"
                  hiddenColumns={{
                    indicators: true,
                  }}
                  contextMenu
                  multiColumnSorting
                  filters
                  rowHeaders
                  allowInsertRow
                  allowInsertColumn
                  afterGetColHeader={alignHeaders}
                  beforeRenderer={() => {
                    addClassesToRows('', '', '', '', '', '', quoteItems);
                  }}
                  afterRemoveRow={(change, source) => {
                    deleteRowsItems(source, change);
                  }}
                  afterChange={(change: any, source) => {
                    if (change) {
                      updateRowsValue(
                        change?.[0]?.[0],
                        change?.[0]?.[1],
                        change?.[0]?.[3],
                      );
                    }
                  }}
                  // navigableHeaders
                />
              </div>
              <br />
              <Space
                onClick={(e) => {
                  e?.preventDefault();
                }}
                size={25}
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginRight: '50px',
                  right: '0',
                  bottom: '0',
                  marginBottom: '20px',
                }}
              >
                {!salesForceUrl && (
                  <OsButton
                    text="Cancel"
                    buttontype="SECONDARY"
                    clickHandler={() => {
                      syncShow('cancel');
                    }}
                  />
                )}
                <OsButton
                  text="Sync Table"
                  buttontype="PRIMARY"
                  clickHandler={() => {
                    syncShow('sync');
                  }}
                />
              </Space>
            </>
          ) : (
            <div style={{position: 'absolute', width: '100%'}}>
              <div
                style={{
                  position: 'relative',
                  maxHeight: '75vh',
                  overflow: 'auto',
                }}
              >
                {quoteItems &&
                  quoteItems?.map((itemss: any, indexOFTable: number) => {
                    const allHeaderValue: any = [];
                    const keysData = itemss?.[0] && Object?.keys(itemss?.[0]);
                    if (keysData) {
                      keysData?.map((item: any) => {
                        if (item) {
                          allHeaderValue?.push(formatStatus(item));
                        }
                      });
                    }
                    return (
                      <div>
                        <Space direction="horizontal" style={{width: '100%'}}>
                          <Typography
                            onClick={() => mergeTableData(quoteItems)}
                          >
                            Table {indexOFTable + 1}
                          </Typography>
                          <TrashIcon
                            style={{color: 'red', width: '20px'}}
                            onClick={() => {
                              deleteTable(indexOFTable);
                            }}
                          />
                        </Space>
                        <div style={{overflow: 'auto'}}>
                          <HotTable
                            data={itemss}
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
                            fillHandle
                            dropdownMenu={true}
                            hiddenColumns={{
                              indicators: true,
                            }}
                            contextMenu
                            multiColumnSorting
                            filters
                            rowHeaders
                            allowInsertRow
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
                            // navigableHeaders
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              {quoteItems && (
                <>
                  <br />
                  <Space
                    size={25}
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginRight: '50px',
                      right: '0',
                      bottom: '0',
                      marginBottom: '20px',
                    }}
                  >
                    {' '}
                    {!salesForceUrl && (
                      <OsButton
                        text="Cancel"
                        buttontype="SECONDARY"
                        clickHandler={(e: void) => {
                          CancelEditing();
                        }}
                      />
                    )}
                    <OsButton
                      text="Merge Table"
                      buttontype="PRIMARY"
                      clickHandler={() => mergeTableData(quoteItems)}
                    />
                  </Space>
                </>
              )}
            </div>
          )}
        </>
      )}
      {showModal && (
        <OsModal
          // loading={loading}
          body={
            <SyncTableData
              mergedValue={mergedValue}
              setMergedVaalues={setMergedVaalues}
              setNanonetsLoading={setNanonetsLoading}
              nanonetsLoading={nanonetsLoading}
              routingConditions={checkForNewFile}
              manualFlow={false}
              lineItemSyncingData={lineItemSyncingData}
            />
          }
          width={600}
          open={showModal}
          onCancel={() => {
            setShowModal((p) => !p);
          }}
        />
      )}
      {!salesForceUrl && (
        <OsModal
          body={
            <Row style={{width: '100%', padding: '15px'}}>
              <Space
                style={{width: '100%'}}
                size={24}
                direction="vertical"
                align="center"
              >
                <Space direction="vertical" align="center" size={1}>
                  <Typography style={{fontSize: '20px', textAlign: 'center'}}>
                    {
                      'This file is already updated. Please review the other file on Review Quotes'
                    }
                  </Typography>
                </Space>

                <Space size={12}>
                  <OsButton
                    // loading={loading}
                    text="Return to Review Quotes"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      router?.push(
                        `/generateQuote?id=${Number(getQUoteId)}&isView=${isView}`,
                      );
                    }}
                  />
                </Space>
              </Space>
            </Row>
          }
          width={600}
          onCancel={() => {
            router?.push(
              `/generateQuote?id=${Number(getQUoteId)}&isView=${isView}`,
            );
          }}
          open={returnBackModal}
          // open={false}
        />
      )}
      <OsModal
        title="Update  Column Name"
        bodyPadding={30}
        body={
          <Row gutter={[16, 24]} justify="space-between">
            <Col span={12}>
              <CommonSelect
                style={{width: '100%'}}
                value={oldColumnName}
                placeholder="Please select the column header name"
                options={existingColumnOptions}
                onChange={(e: any) => {
                  setNewHeaderName('');
                  setOldColumnName(e);
                }}
              />
            </Col>
            <Col span={12}>
              <OsInput
                style={{width: '100%'}}
                placeholder="Please add new column header name"
                value={newHeaderName}
                onChange={(e: any) => {
                  setNewHeaderName(e?.target?.value);
                }}
              />
            </Col>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {' '}
              <div style={{marginRight: '30px'}}>
                <OsButton
                  // style={{marginRight: '100px'}}
                  disabled={
                    newHeaderName?.length > 0 && oldColumnName?.length > 0
                      ? false
                      : true
                  }
                  text="Update"
                  buttontype="SECONDARY"
                  clickHandler={() => {
                    UpdateTheColumnName('open', oldColumnName, newHeaderName);
                  }}
                />{' '}
              </div>
              <OsButton
                disabled={
                  newHeaderName?.length > 0 && oldColumnName?.length > 0
                    ? false
                    : true
                }
                text="Update & Close"
                buttontype="PRIMARY"
                clickHandler={() => {
                  UpdateTheColumnName('close', oldColumnName, newHeaderName);
                }}
              />
            </div>
          </Row>
        }
        width={900}
        open={showUpdateColumnModal}
        onCancel={() => {
          setShowUpdateColumnModal(false);
          setNewHeaderName('');
          setOldColumnName('');
        }}
      />
      <OsModal
        title="Add New Column"
        bodyPadding={30}
        body={
          <Row gutter={[16, 24]} justify="space-between">
            <Col span={21}>
              <OsInput
                style={{width: '100%'}}
                placeholder="Please add the column header name"
                onChange={(e: any) => {
                  setNewHeaderName(e?.target?.value);
                }}
              />
            </Col>
            <OsButton
              disabled={newHeaderName?.length > 0 ? false : true}
              text="Add"
              buttontype="PRIMARY"
              clickHandler={() => {
                AddNewCloumnToMergedTable(newHeaderName);
              }}
            />
          </Row>
        }
        width={900}
        open={showAddColumnModal}
        onCancel={() => {
          setShowAddColumnModal(false);
        }}
      />
    </GlobalLoader>
  );
};
export default EditorFile;
