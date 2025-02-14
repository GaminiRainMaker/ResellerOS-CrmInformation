/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import {HyperFormula} from 'hyperformula';

// import {HotTable} from '@handsontable/react';
import {Suspense, useEffect, useState} from 'react';
import './styles.css';

import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';

import {
  changeTheALpabetsFromFormula,
  formatStatus,
} from '@/app/utils/CONSTANTS';
import {
  checkFunctionInArray,
  concatenateAfterFirstWithSpace,
  convertToBoolean,
  encryptForSalesforce,
  getLineItemsWithNonRepitive,
  getResultedValue,
  getValuesOFLineItemsThoseNotAddedBefore,
  sendDataToNanonets,
  updateTables,
} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Col, Row, notification} from 'antd';

import {useRouter, useSearchParams} from 'next/navigation';
import {addClassesToRows, alignHeaders} from './hooksCallbacks';

import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import 'handsontable/dist/handsontable.min.css';
import {queryLineItemSyncingForSalesForce} from '../../../../../redux/actions/LineItemSyncing';
import {
  addSalesForceDataa,
  getSalesForceDataaForEditAsItIs,
  getSalesForceFileData,
  getPDFFileData,
  getPDFFileDataByAzureForSales,
} from '../../../../../redux/actions/auth';
import {
  UpdateQuoteFileById,
  getQuoteFileById,
  getQuoteFileByIdForFormulas,
  getfileByQuoteIdWithManual,
} from '../../../../../redux/actions/quoteFile';
import {
  getQuoteLineItemByQuoteIdForEditTable,
  insertQuoteLineItem,
} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import SyncTableData from './syncTableforpdfEditor';
import dynamic from 'next/dynamic';

import {registerAllModules} from 'handsontable/registry';
import {
  getAllFormulasByDistributorAndOem,
  getFormulaByFormulaAndOemDist,
  insertFormula,
} from '../../../../../redux/actions/formulas';
import Typography from '@/app/components/common/typography';
import {
  getBulkProductIsExisting,
  insertProductsInBulk,
} from '../../../../../redux/actions/product';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';

const HotTable = dynamic(() => import('@handsontable/react'), {
  ssr: false,
});

registerAllModules();

const EditorFile = () => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const getQUoteId = searchParams.get('id');
  const getQuoteFileId = searchParams.get('fileId');
  const [quoteItems, setQuoteItems] = useState<any>([]);
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [mergedValue, setMergedVaalues] = useState<any>();
  const router = useRouter();
  const ExistingQuoteItemss = searchParams.get('quoteExist');
  const {userInformation} = useAppSelector((state) => state.user);
  // const {quoteFileById} = useAppSelector((state) => state.quoteFile);
  const [quoteFileById, setQuoteFileById] = useState<any>();
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
  const [oldColumnName1, setOldColumnName1] = useState<any>();
  const [typeOfFormula, setTypeOfFormula] = useState<any>();

  const fullStackManul = searchParams.get('manualFlow');
  const [lineItemSyncingData, setLineItemSyncingData] = useState<any>();
  const [formulaOptions, setFormulaOptions] = useState<any>();
  const [formulaSelected, setFormulaSelected] = useState<any>();
  const [showApplyFormula, setShowApplyFormula] = useState<boolean>(false);

  const [accoutSyncOptions, setAccoutSyncOptions] = useState<any>();

  const [openAddNewFormulaModal, setOpenAddNewFormulaModal] =
    useState<boolean>(false);
  const [valueOfNewFormula, setValueOfNewFormula] = useState<any>();

  const [fileData, setFileData] = useState<any>({});
  const [decliendFormulas, setDecliendFormulas] = useState<any>();
  const [finalArrForMerged, setFinalArrayForMerged] = useState<any>();
  const [currentFIle, setCurrentFile] = useState<any>();

  const {isCanvas, isDecryptedRecord, navigationKey} = useAppSelector(
    (state) => state.canvas,
  );

  // Initialize variables with default values
  let salesForceinstanceUrl: string | undefined;
  let salesForceToken: string | undefined;
  let salesForceParamsId: string | any;
  let salesFOrceAccoutId: string | undefined;
  let salesFOrceAccoutFlow: string | undefined | any;
  let salesForceEDitDAta: string | any;
  let salesForceFiledId: string | any;
  let salesFOrceManual: boolean | any;
  let SaleQuoteId: string | any;
  let EditSalesLineItems: boolean | any;

  if (isCanvas && isDecryptedRecord) {
    const {client, context} = isDecryptedRecord as any;

    salesForceinstanceUrl = client?.instanceUrl;
    salesForceToken = client?.oauthToken;

    const {environment} = context || {};
    const {parameters} = environment || {};

    salesForceParamsId = parameters?.recordId;
    salesFOrceAccoutId = parameters?.AccountId;
    salesFOrceAccoutFlow = convertToBoolean(parameters?.accoutFlow);
    salesForceEDitDAta = convertToBoolean(parameters?.editLine);
    salesForceFiledId = parameters?.file_Id;
    salesFOrceManual = convertToBoolean(parameters?.manual);
    SaleQuoteId = parameters?.quote_Id;
    EditSalesLineItems = convertToBoolean(parameters?.editLine);
  }

  const [query, setQuery] = useState<{
    searchValue: string;
    asserType: boolean;
    salesforce: boolean;
    lifeboatsalesforce: boolean;
  }>({
    searchValue: '',
    asserType: false,
    salesforce: !!salesForceinstanceUrl,
    lifeboatsalesforce: !!salesForceinstanceUrl,
  });

  const getQuoteFileByIdForFormulads = async () => {
    await dispatch(getQuoteFileByIdForFormulas(getQuoteFileId))?.then(
      (payload: any) => {
        setFileData(payload?.payload?.QuoteConfiguration);
      },
    );
  };

  useEffect(() => {
    dispatch(getAllFormulasByDistributorAndOem(fileData || {}))?.then(
      (payload: any) => {
        const newArr: any = [];
        payload?.payload?.map((items: any) => {
          if (items?.is_active) {
            const newObj = {
              label: items?.title,
              value: items?.formula,
            };

            newArr?.push(newObj);
          }
        });
        setFormulaOptions(newArr);
      },
    );
  }, [fileData]);
  // quoteId,instance_url,fileId
  // ============================== SalesForce Implementations ======================================

  const fetchSaleForceDataa = async () => {
    if (getQuoteFileId) {
      return;
    }
    setNanonetsLoading(true);

    if (EditSalesLineItems === 'true' || EditSalesLineItems === true) {
      // Work In Case of Edit Data As It Is
      const newdata = {
        token: salesForceToken,
        // documentId: salesForceFiledId,
        urls: salesForceinstanceUrl,
        QuoteId: SaleQuoteId,
        FileId: salesForceFiledId,
      };
      dispatch(getSalesForceDataaForEditAsItIs(newdata))?.then(
        (payload: any) => {
          if (payload?.payload?.qliFields) {
            const keysss = Object.keys(payload?.payload?.qliFields);
            const arrOfOptions: any = [];
            if (keysss) {
              keysss?.map((items: any) => {
                arrOfOptions?.push({
                  label: payload?.payload[items],
                  value: items,
                });
              });
            }

            setAccoutSyncOptions(arrOfOptions);
          }
          if (payload?.payload) {
            //   payload?.payload?.map((items: any) => {
            //     let sortedKeys = Object.keys(items).sort();
            //     // Create a new object with sorted keys
            //     let sortedObj: any = {};
            //     sortedKeys.forEach(key => {
            //       sortedObj[key] = items[key];
            //     });
            //     newSortedArr?.push(sortedObj)
            //   })
          }
          setUpdateLineItemsValue(payload?.payload);
          setNanonetsLoading(false);
        },
      );
      return;
    }

    // Work in case of export to tables
    const dataSingle = {
      token: salesForceToken,
      FileId: salesForceFiledId,
      urls: salesForceinstanceUrl,
      quoteId: null,
      file_type: null,
    };
    const data = {
      token: salesForceToken,
      FileId: null,
      urls: salesForceinstanceUrl,
      quoteId: SaleQuoteId,
      file_type: 'ExportFileToTable',
    };

    const pathTOGo = data;
    salesFOrceManual === true || salesFOrceManual === 'true'
      ? data
      : dataSingle;
    dispatch(getSalesForceFileData(pathTOGo))?.then(async (payload: any) => {
      if (!payload?.payload?.body) {
        if (salesFOrceManual === 'false' || !salesFOrceManual) {
          notification?.open({
            message: 'Please close the modal!. All the files are updated',
            type: 'info',
          });
          return;
        }

        const newObj = {
          token: salesForceToken,
          FileId: null,
          urls: salesForceinstanceUrl,
          quoteId: SaleQuoteId,
          file_type: 'Manual',
        };
        dispatch(getSalesForceFileData(newObj))?.then((payload: any) => {
          if (!payload?.payload?.body) {
            notification?.open({
              message: 'Please close the modal!. All the files are updated',
              type: 'info',
            });
          }

          if (payload?.payload?.body) {
            window.history.replaceState(
              null,
              '',
              `/manualFileEditor?quote_Id=${SaleQuoteId}&key=${salesForceToken}&instance_url=${salesForceinstanceUrl}&file_Id=${null}&editLine=false&manual=true`,
            );
            location?.reload();
          }
        });
        setNanonetsLoading(false);
        return;
        setMergedVaalues([]);
      }

      if (payload?.payload) {
        const newObjFromSalesFOrce = JSON.parse(payload?.payload?.qliFields);
        const keysss = Object.keys(newObjFromSalesFOrce);
        const arrOfOptions: any = [];

        if (keysss) {
          keysss?.map((items: any) => {
            arrOfOptions?.push({
              label: newObjFromSalesFOrce[items],
              value: items,
            });
          });
        }

        setAccoutSyncOptions(arrOfOptions);
      }
      setCurrentFile({
        file_name: payload?.payload?.title,
        FileId: payload?.payload?.fileId,
      });
      setNanonetsLoading(true);

      dispatch(
        getPDFFileDataByAzureForSales({base64Pdf: payload?.payload?.body}),
      )?.then((payload: any) => {
        const newArrCheck: any = [];

        if (lineItemSyncingData && lineItemSyncingData?.length > 0) {
          lineItemSyncingData?.map((items: any) => {
            const resultString = items?.pdf_header?.replace(/\s+/g, '');
            newArrCheck?.push(resultString);
          });
        }

        const mainItem = payload?.payload?.analyzeResult?.tables;
        const globalArr: any = [];
        // console.log('35435324234', mainItem);

        const resultTantArrr: any = [];

        for (let i = 0; i < mainItem?.length; i++) {
          const innerIntems = mainItem[i];
          if (innerIntems?.cells?.[0]?.kind === 'columnHeader') {
            const result: any = [];

            // Step 1: Extract headers from column headers
            const headers: any = {};
            innerIntems?.cells.forEach((item: any) => {
              if (item.kind === 'columnHeader') {
                headers[item.columnIndex] = item.content; // Store headers by their column index
              }
            });

            // Step 2: Create the output based on the headers and rows
            innerIntems?.cells.forEach((row: any) => {
              if (row.rowIndex > 0) {
                // Skip the header row
                // Check if we need to push a new object
                if (!result[row.rowIndex - 1]) {
                  result[row.rowIndex - 1] = {}; // Initialize a new object for this row
                }

                // Assign content to the respective header using columnIndex
                if (row.columnIndex in headers) {
                  result[row.rowIndex - 1][headers[row.columnIndex]] =
                    row.content; // Assign content for the matching column
                }
              }
            });

            globalArr?.push(result);
          }
        }
        setQuoteItems(globalArr);
        setNanonetsLoading(false);
      });
    });
  };

  useEffect(() => {
    if (salesForceinstanceUrl && !getQuoteFileId) {
      fetchSaleForceDataa();
    } else {
      getQuoteFileByIdForFormulads();
      if (ExistingQuoteItemss === 'true') {
        setNanonetsLoading(true);
        const newObj = {
          id: Number(getQUoteId),
          fileId: Number(getQuoteFileId),
        };
        dispatch(getQuoteLineItemByQuoteIdForEditTable(newObj)).then(
          (d: any) => {
            if (d?.payload) {
              if (d?.payload?.length < 50) {
                setNanonetsLoading(false);
              }
              // const dataa: any = JSON?.parse(d?.payload?.quote_json?.[0]);
              setQuoteItems(d?.payload);
            }
          },
        );
      } else if (quoteFileById?.pdf_url) {
        setNanonetsLoading(true);

        dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
          if (payload?.payload?.advanced_excel || true) {
            dispatch(getPDFFileData({pdfUrl: quoteFileById?.pdf_url}))?.then(
              (payload: any) => {
                const newArrCheck: any = [];

                if (lineItemSyncingData && lineItemSyncingData?.length > 0) {
                  lineItemSyncingData?.map((items: any) => {
                    const resultString = items?.pdf_header?.replace(/\s+/g, '');
                    newArrCheck?.push(resultString);
                  });
                }

                const mainItem = payload?.payload?.analyzeResult?.tables;
                const globalArr: any = [];
                // console.log('35435324234', mainItem);

                const resultTantArrr: any = [];

                for (let i = 0; i < mainItem?.length; i++) {
                  const innerIntems = mainItem[i];
                  if (innerIntems?.cells?.[0]?.kind === 'columnHeader') {
                    const result: any = [];

                    // Step 1: Extract headers from column headers
                    const headers: any = {};
                    innerIntems?.cells.forEach((item: any) => {
                      if (item.kind === 'columnHeader') {
                        headers[item.columnIndex] = item.content; // Store headers by their column index
                      }
                    });

                    // Step 2: Create the output based on the headers and rows
                    innerIntems?.cells.forEach((row: any) => {
                      if (row.rowIndex > 0) {
                        // Skip the header row
                        // Check if we need to push a new object
                        if (!result[row.rowIndex - 1]) {
                          result[row.rowIndex - 1] = {}; // Initialize a new object for this row
                        }

                        // Assign content to the respective header using columnIndex
                        if (row.columnIndex in headers) {
                          result[row.rowIndex - 1][headers[row.columnIndex]] =
                            row.content; // Assign content for the matching column
                        }
                      }
                    });

                    globalArr?.push(result);
                  }
                }
                setQuoteItems(globalArr);
                setNanonetsLoading(false);
              },
            );
          } else {
            setNanonetsLoading(true);
            fetch(quoteFileById?.pdf_url, {
              method: 'GET',
              mode: 'no-cors', // Disables CORS checks
            })
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
                                    (titleRow: any) =>
                                      titleRow.col === item.col,
                                  )
                                  .text?.includes('Price')
                              ? item?.text
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
                  const newUpdatedArr: any = [];
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
                    const newArrssr = items.map((item: any) =>
                      replaceKeyInObject(item, '', `emptyHeader${index + 1}`),
                    );
                    newUpdatedArr?.push(newArrssr);
                  });

                  setQuoteItems(newUpdatedArr);
                }
              });
          }
        });
      }
    }
  }, [ExistingQuoteItemss, quoteFileById, salesForceinstanceUrl]);

  const newArrForAlpa = [
    'A :',
    'B :',
    'C :',
    'D :',
    'E :',
    'F :',
    'G :',
    'H :',
    'I :',
    'J :',
    'K :',
    'L :',
    'M :',
    'N :',
    'O :',
    'P :',
    'Q :',
    'R :',
    'S :',
    'T :',
    'U :',
    'V :',
    'W :',
    'X :',
    'Y :',
    'Z :',
  ];
  const newArrForAlpaForFormulas = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  useEffect(() => {
    if (quoteItems?.length === 1) {
      mergeTableData(quoteItems);
    }
  }, [quoteItems]);

  // useEffect(() => {
  //   dispatch(getAllFormulas())?.then((payload: any) => {
  //     let newArr: any = [];
  //     payload?.payload?.map((items: any) => {
  //       if (items?.is_active) {
  //         let newObj = {
  //           label: items?.title,
  //           value: items?.formula,
  //         };

  //         newArr?.push(newObj);
  //       }
  //     });
  //     setFormulaOptions(newArr);
  //   });
  // }, []);
  useEffect(() => {
    const newArrr: any = [];
    if (quoteItems && quoteItems.length > 0) {
      quoteItems?.map((itemsss: any) => {
        if (itemsss) {
          const newObj: any = {...itemsss};
          newObj.MSRP = itemsss?.list_price;
          newObj.cost = itemsss?.adjusted_price;

          delete newObj?.adjusted_price;
          delete newObj?.list_price;

          newArrr?.push(newObj);
        }
      });

      setUpdateLineItemsValue(newArrr);
      setNanonetsLoading(false);
    }
  }, [quoteFileById, quoteItems]);

  useEffect(() => {
    dispatch(queryLineItemSyncingForSalesForce(query))?.then((payload: any) => {
      setLineItemSyncingData(payload?.payload);
    });
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
    if (!salesForceinstanceUrl) {
      if (fullStackManul === 'true') {
        const data = {
          id: getQUoteId,
          type_of_file: 'export',
        };
        dispatch(getfileByQuoteIdWithManual(data))?.then((payload: any) => {
          if (payload?.payload === null) {
            // setReturnModalBack(true);
          } else {
            setQuoteFileById(payload?.payload);
            setCurrentFile(payload?.payload);
          }
        });
      } else {
        dispatch(getQuoteFileById(Number(getQuoteFileId)))?.then(
          (payload: any) => {
            if (payload?.payload === null) {
              // setReturnModalBack(true);
            } else {
              setQuoteFileById(payload?.payload);
              setCurrentFile(payload?.payload);
            }
          },
        );
      }
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
    const result = transformObjects(resultArray);
    function cleanKeys(obj: any) {
      const cleanedObj: any = {};
      // Iterate over each key-value pair in the object
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(obj)) {
        // Remove special characters (e.g., periods, spaces) from the key
        // Issue with inconsistent row with data value solution
        const cleanedKey: any = key.replace(/[^\w]/g, '');

        cleanedObj[
          EditSalesLineItems
            ? key.replace(/\.$/, '')
            : cleanedKey.replace(/\.$/, '')
        ] = value;
      }
      return cleanedObj;
    }

    function cleanArray(arr: any) {
      // Apply the cleanKeys function to each object in the array
      return arr.map(cleanKeys);
    }

    // Clean the array
    const cleanedArr = cleanArray(result);

    setMergedVaalues(cleanedArr);
    setFinalArrayForMerged(cleanedArr);
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
        const result = transformObjects(newTableData?.[0]);
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
    if (changedValue?.includes('=')) {
      const result = changeTheALpabetsFromFormula(changedValue);
      const newObj: any = {formula: result};
      if (fileData?.distributor_id) {
        newObj.distributor_id = fileData?.distributor_id;
      } else if (fileData?.oem_id) {
        newObj.oem_id = fileData?.oem_id;
      }
      dispatch(getFormulaByFormulaAndOemDist(newObj))?.then((payload: any) => {
        if (payload?.payload === null) {
          const isExist = checkFunctionInArray(decliendFormulas, changedValue);
          if (!isExist) {
            setValueOfNewFormula(changedValue);
            setOpenAddNewFormulaModal(true);
          }
        }
      });
    }
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
  const [mergeedColumn, setMergeedColumn] = useState<any>();
  const [updateLineItemColumn, setUpdateLineItemColumn] = useState<any>();
  const [updateLineItemColumnData, setUpdateLineItemColumnData] =
    useState<any>();
  useEffect(() => {
    const updateLineItemColumnArr: any = [];
    // let newObj = { data: "QuoteId", readOnly: true }
    const updateLineItemColumnDataArr: any = [];
    const keysss =
      updateLineItemsValue?.length > 0 &&
      Object.keys(updateLineItemsValue?.[0]);
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
            updateLineItemColumnDataArr?.push(dataObj);
          } else {
            const dataObj = {data: item};
            updateLineItemColumnData?.push(dataObj);
          }
          if (salesForceinstanceUrl) {
            const cleanedString = item.replace(/^rosquoteai__|__c$/g, '');
            const finalResult = cleanedString.replace(/_/g, ' ');
            updateLineItemColumnArr?.push(formatStatus(finalResult));
          } else {
            updateLineItemColumnArr?.push(formatStatus(item));
          }
        }
      });
    }
    setUpdateLineItemColumn(updateLineItemColumnArr);
    setUpdateLineItemColumnData(updateLineItemColumnDataArr);
  }, [updateLineItemsValue]);
  useEffect(() => {
    const mergeedColumnArr: any = [];
    const keys =
      ExistingQuoteItemss === 'true'
        ? quoteItems?.length > 0 && Object.keys(quoteItems?.[0])
        : mergedValue?.length > 0 && Object.keys(mergedValue?.[0]);
    if (keys) {
      keys?.map((item: any) => {
        if (item) {
          mergeedColumnArr?.push(item);
        }
      });
    }

    const minLength = Math.min(mergeedColumnArr.length, newArrForAlpa.length);

    const result = new Array(minLength)
      .fill(null)
      .map((_, index) => `${newArrForAlpa[index]} ${mergeedColumnArr[index]}`);
    setMergeedColumn(result);
  }, [ExistingQuoteItemss, quoteItems, mergedValue]);

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

  const updateData = async () => {
    notification.open({
      message: 'Kindly wait a moment while we wrap things up.',
      type: 'info',
    });

    const finalLineItems: any = [];
    const newArrFOrUpdation: any = [];
    const newArrForAddition: any = [];

    if (EditSalesLineItems === 'true' || EditSalesLineItems === true) {
      const newArrWithFileId: any = [];
      updateLineItemsValue?.map((itemss: any) => {
        const newObj = {
          ...itemss,
          rosquoteai__SF_File_Id__c: salesForceFiledId,
        };
        newArrWithFileId?.push(newObj);
      });

      const jsonstring = JSON.stringify(newArrWithFileId);
      const newSalesEncryptedData = encryptForSalesforce(
        jsonstring,
        'CghhpgRahZKN0P8SaquPX/k30H+v2QWcKpcH42H9q0w=',
      );

      const newdata = {
        token: salesForceToken,
        // documentId: salesForceFiledId,
        urls: salesForceinstanceUrl,
        QuoteId: SaleQuoteId,
        FileId: salesForceFiledId,
        action: 'EditDataAsIs',
        lineItem: newSalesEncryptedData,
      };
      // file_id
      await dispatch(addSalesForceDataa(newdata))?.then((payload: any) => {
        notification?.open({
          message: payload?.payload?.message,
          type: 'success',
        });
      });
      notification?.open({message: 'Please Close the Modal', type: 'info'});
      setNanonetsLoading(false);
      return;
    }

    if (updateLineItemsValue && updateLineItemsValue?.length > 0) {
      updateLineItemsValue?.map((items: any) => {
        if (items?.id === null) {
          const newObj = {
            ...items,
          };
          newObj.adjusted_price = items?.cost;
          newObj.list_price = items?.MSRP;
          delete newObj.id;
          delete newObj.MSRP;
          delete newObj.cost;
          newArrForAddition?.push(newObj);
        } else {
          newArrFOrUpdation?.push(items);
        }
      });
    }

    if (newArrForAddition && newArrForAddition?.length > 0) {
      const lineItem = newArrForAddition;
      const allProductCodes: any = [];
      let allProductCodeDataa: any = [];
      lineItem?.map((itemsPro: any) => {
        allProductCodes?.push(
          itemsPro?.product_code
            ? itemsPro?.product_code?.replace(/\s/g, '')
            : 'NEWCODE0123',
        );
      });
      const valuessOfAlreayExist = await dispatch(
        getBulkProductIsExisting(allProductCodes),
      );
      if (valuessOfAlreayExist?.payload?.length > 0) {
        allProductCodeDataa = valuessOfAlreayExist?.payload;
      }
      const newArrValues = getLineItemsWithNonRepitive(newArrForAddition);

      if (valuessOfAlreayExist?.payload?.length > 0) {
        // ======To get items that are  non added Values==============
        const newInsertionData = getValuesOFLineItemsThoseNotAddedBefore(
          lineItem,
          allProductCodeDataa,
        );

        if (newInsertionData?.length > 0) {
          await dispatch(insertProductsInBulk(newInsertionData))?.then(
            (payload: any) => {
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

      if (lineItem) {
        lineItem?.map((itemssProduct: any) => {
          const productCode = itemssProduct?.product_code
            ? itemssProduct?.product_code?.replace(/\s/g, '')
            : 'NEWCODE0123';
          const itemsToAdd = allProductCodeDataa?.find(
            (productItemFind: any) =>
              productItemFind?.product_code?.replace(/\s/g, '') === productCode,
          );
          const obj1: any = {
            quote_id: getQUoteId,
            quote_file_id: getQuoteFileId,
            product_id: itemsToAdd?.id,
            product_code: itemsToAdd?.product_code,
            line_amount: itemsToAdd?.line_amount,
            list_price: itemssProduct?.list_price,
            description: itemsToAdd?.description,
            quantity: itemsToAdd?.quantity,
            adjusted_price: itemssProduct?.adjusted_price,
            line_number: itemsToAdd?.line_number,
            organization: userInformation.organization,
          };
          finalLineItems?.push(obj1);
        });
      }

      await dispatch(insertQuoteLineItem(finalLineItems))?.then(
        (payload: any) => {
          if (payload?.payload && payload?.payload?.length > 0) {
            payload?.payload?.map((items: any) => {
              const newObj = {
                ...items,
              };
              newObj.cost = items?.adjusted_price;
              newObj.MSRP = items?.list_price;
              newArrFOrUpdation?.push(newObj);
            });
          }
        },
      );
    }

    await updateTables(
      getQUoteId,
      quoteFileById,
      newArrFOrUpdation,
      userInformation,
      dispatch,
      missingId,
      true,
      Number(getQUoteId),
    );

    router?.push(
      `/generateQuote?id=${getQUoteId}&tab=2&isView=${getResultedValue()}`,
    );
  };
  const CancelEditing = () => {
    const data = {
      issue_type: null,
      affected_columns: null,
      id: getQuoteFileId,
    };
    dispatch(UpdateQuoteFileById(data));
    router?.push(
      `/generateQuote?id=${getQUoteId}&isView=${getResultedValue()}`,
    );
    window.history.replaceState(
      null,
      '',
      `/generateQuote?id=${getQUoteId}&isView=${getResultedValue()}`,
    );
    location?.reload();
  };

  const syncShow = (value: string) => {
    if (value === 'sync') {
      setShowModal(true);
    }
    if (value === 'cancel') {
      CancelEditing();
    }
  };

  const checkForNewFileForSalesForce = async () => {
    // notification?.open({
    //   message: 'The Line Items are created! Please close the modal!',
    // });

    if (salesFOrceManual === 'false' || salesFOrceManual === false) {
      notification?.open({
        message: 'Please close the modal!. All the files are updated',
        type: 'info',
      });
      setNanonetsLoading(false);
    } else {
      const data = {
        token: salesForceToken,
        FileId: null,
        urls: salesForceinstanceUrl,
        quoteId: SaleQuoteId,
        file_type: 'ExportFileToTable',
      };

      dispatch(getSalesForceFileData(data))?.then(async (payload: any) => {
        if (!payload?.payload?.body) {
          const newObj = {
            token: salesForceToken,
            FileId: null,
            urls: salesForceinstanceUrl,
            quoteId: SaleQuoteId,
            file_type: 'Manual',
          };
          dispatch(getSalesForceFileData(newObj))?.then((payload: any) => {
            if (!payload?.payload?.body) {
              notification?.open({
                message: 'Please close the modal!. All the files are updated',
                type: 'info',
              });
            }
            if (payload?.payload?.body) {
              router.replace(
                `/manualFileEditor?quote_Id=${SaleQuoteId}&key=${salesForceToken}&instance_url=${salesForceinstanceUrl}&file_Id=${null}&editLine=false&manual=true`,
              );
              // window.history.replaceState(
              //   null,
              //   '',
              //   `/manualFileEditor?quote_Id=${SaleQuoteId}&key=${salesForceToken}&instance_url=${salesForceinstanceUrl}&file_Id=${null}&editLine=false&manual=true`,
              // );
              // location?.reload();
            }
          });
        } else if (payload?.payload?.body) {
          setShowApplyFormula(false);
          setShowAddColumnModal(false);
          setShowModal(false);
          setShowUpdateColumnModal(false);
          setOpenAddNewFormulaModal(false);
          setAccoutSyncOptions(false);
          setMergedVaalues('');
          setMergeedColumn([]);
          setQuoteItems([]);

          fetchSaleForceDataa();
          // router.replace(
          //   `/fileEditor?quote_Id=${SaleQuoteId}&key=${salesForceToken}&instance_url=${salesForceinstanceUrl}&file_Id=${null}&editLine=false&manual=true`,
          // );
        }
      });
    }
  };

  const checkForNewFile = async () => {
    if (fullStackManul === 'false') {
      window.history.replaceState(
        null,
        '',
        `/generateQuote?id=${Number(getQUoteId)}&isView=${getResultedValue()}`,
      );
      location?.reload();
    } else {
      const data = {
        id: getQUoteId,
        type_of_file: 'export',
      };
      await dispatch(getfileByQuoteIdWithManual(data))?.then(
        async (payload: any) => {
          if (payload?.payload && payload?.payload !== null) {
            location?.reload();
          }
          if (payload?.payload === null) {
            const dataNew = {
              id: getQUoteId,
              type_of_file: 'manual',
            };
            await dispatch(getfileByQuoteIdWithManual(dataNew))?.then(
              (payload: any) => {
                if (payload?.payload === null) {
                  window.history.replaceState(
                    null,
                    '',
                    `/generateQuote?id=${Number(getQUoteId)}&isView=${getResultedValue()}`,
                  );
                  location?.reload();
                } else {
                  window.history.replaceState(
                    null,
                    '',
                    `/manualFileEditor?id=${getQUoteId}&fileId=${null}&manualFlow=true`,
                  );
                  location?.reload();
                }
              },
            );
          }
        },
      );
    }

    setShowModal(false);
  };

  const AddNewCloumnToMergedTable = async (value: any) => {
    const newArr: any = [...mergedValue];
    const resultantArr: any = [];

    newArr?.map((items: any) => {
      resultantArr?.push({...items, [value]: ''});
    });
    setMergedVaalues(resultantArr);
    setShowAddColumnModal(false);
    setNewHeaderName('');
  };

  const UpdateTheColumnName = async (type: any, old: string, newVal: any) => {
    const newArr: any = [...mergedValue];
    const renameKey = (arr: any, oldKey: any, newKey: any) =>
      arr.map((obj: any) => {
        // Create a new object preserving the order of keys
        const newObj: any = {};
        for (const key of Object.keys(obj)) {
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

    const result = concatenateAfterFirstWithSpace(old);
    const updatedArr = renameKey(newArr, result, newVal);

    setMergedVaalues(updatedArr);
    notification.open({
      message: `Column header ${old} successfully changed to ${newVal}.`,
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
    const newArr: any = [];
    mergeedColumn?.map((items: any) => {
      newArr?.push({label: items, value: items});
    });
    setExistingColumnName(newArr);
  }, [mergeedColumn]);

  const applyFormula = (formulaTemplate: any, oldName: any, newName: any) => {
    const keys = Object.keys(mergedValue?.[0]);
    const newArrrUpadted = mergedValue?.length > 0 ? [...mergedValue] : [];

    const resulsst = concatenateAfterFirstWithSpace(oldName);
    // Find the index of the key 'ap'
    const index = keys.indexOf(resulsst);
    const indexToApply = index;
    // Alpabet extration
    const columnLetter = newArrForAlpaForFormulas[indexToApply];

    // Generate the new array with the computed property

    function generateObjectsWithFormula(
      arr: any,
      formulaTemplate: any,
      columnLetter: any,
      newName: any,
    ) {
      return arr.map((item: any, index: any) => {
        // Create the cell reference for the formula using the specified column letter
        const cellReference = `${columnLetter}${index + 1}`;
        // Generate the formula by replacing `B1` with the actual cell reference
        const formula = formulaTemplate.replace(/N1/g, cellReference);

        // Return a new object with the computed property
        return {
          ...item,
          [newName]: formula,
        };
      });
    }

    // Generate the new array with the computed property
    const result = generateObjectsWithFormula(
      newArrrUpadted,
      formulaTemplate,
      columnLetter,
      newName,
    );
    setMergedVaalues(result);
    setOldColumnName('');
    setOldColumnName1('');
    setNewHeaderName('');
    setFormulaSelected('');

    setShowApplyFormula(false);
  };

  const applyformulaforSumAverage = (
    formulaTemplate: any,
    FromMap: any,
    newColumnName: any,
    MapTo: any,
  ) => {
    let newArrr = [...mergedValue];
    const keys = Object.keys(mergedValue?.[0]);
    // =====================for from map
    const index = keys.indexOf(FromMap);
    const indexToApply = index;
    // Alpabet extration
    const column1 = newArrForAlpaForFormulas[indexToApply];
    // ====================for toMap========

    const indexNew = keys.indexOf(MapTo);
    const indexToApplynew = indexNew;
    // Alpabet extration
    const column2 = newArrForAlpaForFormulas[indexToApplynew];

    // Function to extract function name from the formula
    function extractFunctionName(formula: any) {
      const regex = /^=(\w+)\(/;
      const match = formula.match(regex);
      return match ? match[1] : null;
    }

    // Function to generate the formula based on function name and row index
    function generateFormula(
      functionName: any,
      rowIndex: any,
      col1: any,
      col2: any,
    ) {
      // Construct formula based on function name, row index, and column letters
      return `=${functionName}(${col1}${rowIndex}:${col2}${rowIndex})`;
    }

    // Extract the function name from the formula template
    const functionName = extractFunctionName(formulaTemplate);

    // Update array with new column and formula
    newArrr = newArrr.map((item, index) => {
      // Formula is based on the index (1-based)
      const rowIndex = index + 1;
      const formula = generateFormula(functionName, rowIndex, column1, column2);
      // Return the updated object
      return {
        ...item,
        [newColumnName]: formula,
      };
    });

    // Output the updated array
    setMergedVaalues(newArrr);
    setOldColumnName('');
    setOldColumnName1('');
    setNewHeaderName('');
    setFormulaSelected('');
    setShowApplyFormula(false);
  };

  const afterFormulasValuesUpdate = (changes: any) => {
    // setFinalArrayForMerged(changes);
    // if (!runSriptToGetValues) {

    const newArrr = [...mergedValue];
    // const newArrr = [...mergedValue];

    const getPropertyNames = (obj: any) => Object.keys(obj);
    changes.forEach((update: any) => {
      const col = update.address?.col;
      const row = update.address?.row;
      const value: any = update?.newValue;

      const stringValue = String(value);
      if (row < newArrr.length) {
        const propertyNames = getPropertyNames(newArrr[row]);
        if (col >= 0 && col < propertyNames.length) {
          const propertyName = propertyNames[col];
          newArrr[row] = {
            ...newArrr[row],
            [propertyName]: stringValue,
          };
        }
      }
    });
    // Check if newArrr is different from mergedValue before updating state
    if (JSON.stringify(newArrr) !== JSON.stringify(finalArrForMerged)) {
      // setMergedVaalues(newArrr);
      setFinalArrayForMerged(newArrr);
    }
    // =SUM(A1:G1)

    // }
  };

  const addFormulaTOStoredFormulas = async (value: any) => {
    const result = changeTheALpabetsFromFormula(value);
    const newObj: any = {formula: result};
    if (fileData?.distributor_id) {
      newObj.distributor_id = fileData?.distributor_id;
    } else if (fileData?.oem_id) {
      newObj.oem_id = fileData?.oem_id;
    }
    await dispatch(insertFormula(newObj));
    setValueOfNewFormula('');
    setOpenAddNewFormulaModal(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalLoader loading={nanonetsLoading}>
        <Space size={0} style={{marginBottom: '20px'}}>
          {' '}
          <Typography name="Body 1/Bold">{currentFIle?.file_name}</Typography>
        </Space>

        {(ExistingQuoteItemss === 'true' ||
          EditSalesLineItems === 'true' ||
          EditSalesLineItems === true) &&
        updateLineItemsValue?.length > 0 ? (
          <>
            <div
              style={
                {
                  // position: 'relative',
                  // maxHeight: '75vh',
                  // overflow: 'auto',
                }
              }
            >
              <HotTable
                data={updateLineItemsValue}
                colWidths={200}
                columnHeaderHeight={40}
                height="auto"
                colHeaders={updateLineItemColumn}
                // columns={z}
                width="auto"
                minSpareRows={0}
                autoWrapRow
                autoWrapCol
                licenseKey="non-commercial-and-evaluation"
                dropdownMenu
                hiddenColumns={{
                  indicators: true,
                  columns: salesForceinstanceUrl ? [0, 1] : [0, 1],
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
              {!salesForceinstanceUrl && (
                <OsButton
                  text="Cancel"
                  buttontype="SECONDARY"
                  clickHandler={CancelEditing}
                />
              )}
              <OsButton
                text="Save Line Items"
                buttontype="PRIMARY"
                clickHandler={updateData}
              />
            </Space>{' '}
          </>
        ) : (
          <>
            {(ExistingQuoteItemss === 'false' ||
              (salesForceinstanceUrl &&
                (EditSalesLineItems === 'false' ||
                  EditSalesLineItems === false))) && (
              <>
                {mergedValue && mergedValue?.length > 0 ? (
                  <>
                    <div
                      style={{
                        position: 'relative',
                        maxHeight: '75vh',
                        overflow: 'auto',
                      }}
                    >
                      {(ExistingQuoteItemss === 'false' ||
                        EditSalesLineItems === 'false' ||
                        !EditSalesLineItems) && (
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
                            text="Apply Formula"
                            buttontype="PRIMARY"
                            clickHandler={() => {
                              setShowApplyFormula(true);
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
                        formulas={{
                          engine: HyperFormula as unknown as any,
                        }}
                        afterFormulasValuesUpdate={afterFormulasValuesUpdate}
                        stretchH="all"
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
                      {!salesForceinstanceUrl && (
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
                          // addNewValueForChangesHit();
                        }}
                      />
                    </Space>
                  </>
                ) : (
                  <div style={{position: 'absolute', width: '100%'}}>
                    <div
                      style={
                        {
                          // position: 'relative',
                          // maxHeight: '75vh',
                          // overflow: 'auto',
                        }
                      }
                    >
                      {quoteItems &&
                        quoteItems?.map((itemss: any, indexOFTable: number) => {
                          const allHeaderValue: any = [];
                          const keysData =
                            itemss?.[0] && Object?.keys(itemss?.[0]);
                          if (keysData) {
                            keysData?.map((item: any) => {
                              if (item) {
                                allHeaderValue?.push(formatStatus(item));
                              }
                            });
                          }

                          return (
                            <div>
                              <Space
                                direction="horizontal"
                                style={{width: '100%'}}
                              >
                                <Typography
                                  name="Body 3/Regular"
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

                              <div>
                                <HotTable
                                  data={itemss}
                                  colWidths={[
                                    200, 200, 400, 200, 200, 200, 200, 200, 200,
                                    200, 200, 200, 200, 200, 200, 200,
                                  ]}
                                  height="auto"
                                  colHeaders={allHeaderValue}
                                  width="auto"
                                  minSpareRows={0}
                                  formulas={{
                                    engine: HyperFormula as unknown as any,
                                  }}
                                  stretchH="all"
                                  autoWrapRow
                                  autoWrapCol
                                  licenseKey="non-commercial-and-evaluation"
                                  fillHandle
                                  dropdownMenu
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
                          {!salesForceinstanceUrl && (
                            <OsButton
                              text="Cancel"
                              buttontype="SECONDARY"
                              clickHandler={(e: void) => {
                                CancelEditing();
                              }}
                            />
                          )}
                          {quoteItems?.length > 0 && (
                            <OsButton
                              text="Merge Table"
                              buttontype="PRIMARY"
                              clickHandler={() => mergeTableData(quoteItems)}
                            />
                          )}
                        </Space>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
        {showModal && (
          <OsModal
            // loading={loading}
            body={
              <SyncTableData
                mergedValue={finalArrForMerged}
                setMergedVaalues={setMergedVaalues}
                setNanonetsLoading={setNanonetsLoading}
                nanonetsLoading={nanonetsLoading}
                routingConditions={checkForNewFile}
                checkForNewFileForSalesForce={checkForNewFileForSalesForce}
                manualFlow={false}
                lineItemSyncingData={lineItemSyncingData}
                CurrentFileId={currentFIle}
                currentFileData={currentFIle}
                accoutSyncOptions={accoutSyncOptions}
              />
            }
            width={600}
            open={showModal}
            onCancel={() => {
              setShowModal((p) => !p);
            }}
          />
        )}
        {!salesForceinstanceUrl && (
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
                    <Typography
                      name="Body 3/Regular"
                      style={{fontSize: '20px', textAlign: 'center'}}
                    >
                      This file is already updated. Please review the other file
                      on Review Quotes
                    </Typography>
                  </Space>

                  <Space size={12}>
                    <OsButton
                      // loading={loading}
                      text="Return to Review Quotes"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        router?.push(
                          `/generateQuote?id=${Number(getQUoteId)}&isView=${getResultedValue()}`,
                        );
                        CancelEditing();
                      }}
                    />
                  </Space>
                </Space>
              </Row>
            }
            width={600}
            onCancel={() => {
              router?.push(
                `/generateQuote?id=${Number(getQUoteId)}&isView=${getResultedValue()}`,
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
                <Typography name="Body 3/Regular">Select column</Typography>
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
                <Typography name="Body 3/Regular">Column New name</Typography>

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
                      !(newHeaderName?.length > 0 && oldColumnName?.length > 0)
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
                    !(newHeaderName?.length > 0 && oldColumnName?.length > 0)
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
                disabled={!(newHeaderName?.length > 0)}
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

        <OsModal
          title="Store New Formula "
          bodyPadding={30}
          body={
            <Row style={{width: '100%', padding: '15px'}}>
              <Space
                style={{width: '100%'}}
                size={24}
                direction="vertical"
                align="center"
              >
                <Space direction="vertical" align="center" size={1}>
                  <Typography name="Body 2/Regular">
                    Store New Formula
                  </Typography>
                  <Typography name="Body 3/Regular">
                    Would you like to save this formula to our stored
                    collection?
                  </Typography>
                </Space>

                <Space size={12}>
                  <OsButton
                    text="No"
                    buttontype="SECONDARY"
                    clickHandler={() => {
                      const newArrr: any =
                        decliendFormulas?.length > 0
                          ? [...decliendFormulas]
                          : [];

                      newArrr?.push(valueOfNewFormula);
                      setDecliendFormulas(newArrr);
                      setValueOfNewFormula('');
                      setOpenAddNewFormulaModal(false);
                    }}
                  />
                  <OsButton
                    text="Yes, Add"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      addFormulaTOStoredFormulas(valueOfNewFormula);
                    }}
                  />
                </Space>
              </Space>
            </Row>
          }
          width={700}
          open={openAddNewFormulaModal}
          onCancel={() => {
            setOpenAddNewFormulaModal(false);
          }}
        />

        <OsModal
          title="Apply Formula"
          bodyPadding={30}
          body={
            <Row gutter={[16, 24]} justify="space-between">
              <Col span={24}>
                <Typography name="Body 1/Regular"> Formula</Typography>
                <CommonSelect
                  style={{width: '100%'}}
                  value={formulaSelected}
                  placeholder="Please select the formula"
                  options={formulaOptions}
                  onChange={(e: any, label: any) => {
                    setNewHeaderName('');
                    setOldColumnName('');
                    setFormulaSelected(e);
                    setTypeOfFormula(label?.label);
                  }}
                />
              </Col>
              {formulaSelected && (
                <>
                  {' '}
                  <Col span={12}>
                    <Typography name="Body 3/Regular">
                      {typeOfFormula?.toString()?.toLowerCase() !== 'split'
                        ? 'Apply formula from'
                        : 'Apply formula on'}
                    </Typography>

                    <CommonSelect
                      style={{width: '100%'}}
                      value={oldColumnName}
                      placeholder={
                        typeOfFormula?.toString()?.toLowerCase() === 'split'
                          ? 'Please select the column header name'
                          : 'Please select the column you want to map from'
                      }
                      options={existingColumnOptions}
                      onChange={(e: any) => {
                        setNewHeaderName('');
                        setOldColumnName(e);
                      }}
                    />
                  </Col>
                  {typeOfFormula?.toString()?.toLowerCase() !== 'split' && (
                    <Col span={12}>
                      <Typography name="Body 3/Regular">
                        {typeOfFormula?.toString()?.toLowerCase() !== 'split'
                          ? 'Apply formula to'
                          : 'Apply formula on'}
                      </Typography>

                      {/* <Typography name='Body 3/Regular' > New column name</Typography> */}

                      <CommonSelect
                        style={{width: '100%'}}
                        value={oldColumnName1}
                        placeholder="Please select the column to you want to map"
                        options={existingColumnOptions}
                        onChange={(e: any) => {
                          setNewHeaderName('');
                          setOldColumnName1(e);
                        }}
                      />
                    </Col>
                  )}
                  <Col
                    span={
                      typeOfFormula?.toString()?.toLowerCase() === 'split'
                        ? 12
                        : 24
                    }
                  >
                    <Typography name="Body 3/Regular">
                      {' '}
                      New column name
                    </Typography>

                    <OsInput
                      style={{width: '100%'}}
                      placeholder="Please add new column header name"
                      value={newHeaderName}
                      onChange={(e: any) => {
                        setNewHeaderName(e?.target?.value);
                      }}
                    />
                  </Col>
                </>
              )}

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
                      !(newHeaderName?.length > 0 && oldColumnName?.length > 0)
                    }
                    text="Apply"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      if (
                        typeOfFormula?.toString()?.toLowerCase() === 'split'
                      ) {
                        applyFormula(
                          formulaSelected,
                          oldColumnName,
                          newHeaderName,
                        );
                      } else {
                        applyformulaforSumAverage(
                          formulaSelected,
                          oldColumnName,
                          newHeaderName,
                          oldColumnName1,
                        );
                      }
                    }}
                  />{' '}
                </div>
              </div>
            </Row>
          }
          width={900}
          open={showApplyFormula}
          onCancel={() => {
            setShowApplyFormula(false);
            setFormulaSelected('');
            setNewHeaderName('');
            setOldColumnName('');
          }}
        />
      </GlobalLoader>
    </Suspense>
  );
};
export default EditorFile;
