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
import {HyperFormula} from 'hyperformula';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {convertFileToBase64} from '@/app/utils/base';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {message, Space} from 'antd';
import 'handsontable/dist/handsontable.min.css';
import {registerAllModules} from 'handsontable/registry';
import dynamic from 'next/dynamic';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  fetchAndParseExcel,
  getPDFFileData,
} from '../../../../../redux/actions/auth';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../redux/actions/upload';
import {useAppDispatch} from '../../../../../redux/hook';
import {addClassesToRows, alignHeaders} from '../fileEditor/hooksCallbacks';
import './styles.css';
import {queryLineItemSyncingForSalesForce} from '../../../../../redux/actions/LineItemSyncing';

registerAllModules();

const EditorFile = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const excelFile = searchParams.get('excel');

  const [showModalForAI, setShowModalForAI] = useState<boolean>(false);
  const [UploadedFileData, setUploadedFileData] = useState<any>();
  const [UploadedFileDataColumn, setUploadedFileDataColumn] = useState<any>();

  const [lineItemSyncingData, setLineItemSyncingData] = useState<any>();


  const [query, setQuery] = useState<{
    searchValue: string;
    asserType: boolean;
    salesforce: boolean;
    lifeboatsalesforce: boolean;
  }>({
    searchValue: '',
    asserType: false,
    salesforce: false,
    lifeboatsalesforce: false,
  });
  useEffect(() => {
    dispatch(queryLineItemSyncingForSalesForce(query))?.then((payload: any) => {
      let approvedOne = payload?.payload?.filter(
        (items: any) => items?.status === 'Approved',
      );
      setLineItemSyncingData(approvedOne);
    });
  }, []);

  useEffect(() => {
    const updateLineItemColumnArr: any = [];
    // let newObj = { data: "QuoteId", readOnly: true }
    const keysss =
      UploadedFileData?.length > 0 && Object.keys(UploadedFileData?.[0]);
    if (keysss) {
      keysss?.map((item: any) => {
        updateLineItemColumnArr?.push(formatStatus(item));
      });
    }
    setUploadedFileDataColumn(updateLineItemColumnArr);
  }, [UploadedFileData]);

  const mapNewArrMappedValues = (newArr: any, newMapped: any) => {
    let result: any = [];

    // Iterate over each mapping in newMapped
    newMapped.forEach((mapping: any) => {
      // Check each sub-array in newArr to see if it contains the preVal
      newArr.forEach((arr: any) => {
        if (arr.includes(mapping.preVal)) {
          // Get the index of the preVal
          const index = arr.indexOf(mapping.preVal);
          // Loop through the rest of the array to find the next non-null value
          for (let i = index + 1; i < arr.length; i++) {
            if (arr[i] !== null) {
              // Add the new key-value pair to the result
              let obj: any = {};
              obj[mapping.newVal] = arr[i];
              result.push(obj);
              break; // Exit the loop after finding the first non-null value
            }
          }
        }
      });
    });

    return result;
  };

  const beforeUpload = async (file: File) => {
    const obj: any = {...file};
    let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
      ? uploadExcelFileToAws
      : uploadToAws;

    convertFileToBase64(file)
      .then((base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;
        dispatch(pathUsedToUpload({document: base64String})).then(
          (payload: any) => {
            // const doc_url = payload?.payload?.data?.Location;
            const doc_url = payload?.payload?.data;
            let pathToGo =
              excelFile === 'true' ? fetchAndParseExcel : getPDFFileData;
            let objName = excelFile === 'true' ? 'Url' : 'pdfUrl';
            if (doc_url) {
              dispatch(pathToGo({[objName]: doc_url}))?.then((payload: any) => {
                if (excelFile === 'true') {
                  // this is  a check arrr
                  let newArrCheck = [
                    'line #',
                    'partnumber',
                    'manufacturer',
                    'description',
                    'listprice',
                    'gsaprice',
                    'Cost',
                    'quantity',
                    'Type',
                    'openmarket',
                    'productcode',
                    'listprice',
                  ];
                  const normalize = (str: any) => {
                    return str
                      ?.toString()
                      ?.toLowerCase()
                      .replace(/[\s_]+/g, ' ')
                      .trim();
                  };

                  // Normalize the newArrCheck values
                  let normalizedCheckArr = newArrCheck.map(normalize);
                  // check for best matching row
                  let maxMatches = 0;
                  let bestRowIndex = -1;

                  for (let i = 0; i < payload?.payload.length; i++) {
                    let currentRow = payload?.payload[i];
                    let matchCount = 0;

                    for (let item of currentRow) {
                      let normalizedItem = normalize(item);
                      // Check if normalizedItem matches any normalized check item
                      if (
                        normalizedCheckArr.some(
                          (checkItem) =>
                            normalizedItem === normalize(checkItem),
                        )
                      ) {
                        matchCount++;
                      }
                    }

                    if (matchCount > maxMatches) {
                      maxMatches = matchCount;
                      bestRowIndex = i;
                    }
                  }

                  // trim the arrr for valid lineItems

                  const isNullOrEmptyRow = (row: any) => {
                    return row.every(
                      (item: any) => item === null || item === '',
                    );
                  };

                  let indexFrom = -1;

                  // Find the index of the first row that is null or empty
                  for (let i = 0; i < payload?.payload?.length; i++) {
                    if (
                      isNullOrEmptyRow(payload?.payload[i]) &&
                      bestRowIndex + 3 < i
                    ) {
                      indexFrom = i;
                      break;
                    }
                  }

                  // Slice the array from the found index
                  let quoteHeaderChecks = payload?.payload?.slice(
                    0,
                    bestRowIndex ? bestRowIndex : 20,
                  );
                  let newMapped = [
                    {preVal: 'Quote #', newVal: 'Quote #'},
                    {preVal: 'Quote Date', newVal: 'Quote Date'},
                    {preVal: 'Expiration Date', newVal: 'Expiration Date'},
                    {preVal: 'Payment Terms', newVal: 'Payment Terms'},
                    {preVal: 'Distributor', newVal: 'Distributor'},
                    {preVal: 'QUOTE NO:', newVal: 'QUOTE NO:'},
                    {preVal: 'QUOTE DATE:', newVal: 'QUOTE DATE:'},
                    {preVal: 'QUOTE EXPIRES:', newVal: 'QUOTE EXPIRES:'},
                    {preVal: 'SHIPPING:', newVal: 'SHIPPING:'},
                    {preVal: 'TOTAL PRICE:', newVal: 'TOTAL PRICE:'},
                  ];

                  let mappedQuoteHeaders = mapNewArrMappedValues(
                    quoteHeaderChecks,
                    newMapped,
                  );
                  console.log(
                    '32432432',
                    quoteHeaderChecks,
                    mappedQuoteHeaders,
                  );

                  let result =
                    indexFrom > 0
                      ? payload?.payload?.slice(bestRowIndex + 1, indexFrom - 1)
                      : payload?.payload?.slice(
                          bestRowIndex + 1,
                          payload?.payload?.length - 1,
                        );

                  let requiredOutput = result
                    ?.map((subArray: any) =>
                      subArray.filter((item: any) => item !== null),
                    )
                    .filter((subArray: any) => subArray.length > 0);

                  let headerKeys = payload?.payload[bestRowIndex]?.filter(
                    (items: any) => items !== null,
                  );
                  let modifiedArr = headerKeys?.map((item: any) =>
                    item.replace(/\s+/g, '').replace(/[.]/g, ''),
                  );
                  // replace the syncing valueesss ========================

                  let syncedHeaderValue = modifiedArr
                    .map((item: any) => {
                      // Clean up the item by removing spaces and special characters
                      const cleanedItem = item
                        .trim()
                        .replace(/[^A-Za-z]/g, '')
                        .substring(0, 4)
                        .toLowerCase();

                      // Find the matching quoteHeader
                      const match = lineItemSyncingData?.find(
                        (obj: any) =>
                          obj.pdf_header.toLowerCase().substring(0, 4) ===
                          cleanedItem,
                      );

                      // Return the expected value if a match is found, otherwise return undefined
                      return match ? match.quote_header : item;
                    })
                    .filter(Boolean); // Remove any undefined values

                  // end of above
                  // Transform newArr into an array of objects
                  let resultantValues = requiredOutput.map((row: any) => {
                    let obj: any = {};
                    syncedHeaderValue.forEach((header: any, index: any) => {
                      obj[header] = row[index] === '' ? null : row[index]; // Convert empty strings to null
                    });
                    return obj;
                  });

                  setUploadedFileData(resultantValues);
                } else {
                  if (payload?.payload?.analyzeResult?.tables?.length > 0) {
                    // if (fileDataa2?.[0]?.analyzeResult?.tables?.length > 0) {

                    let mainItem = payload?.payload?.analyzeResult?.tables;
                    let globalArr: any = [];

                    for (let i = 0; i < mainItem?.length; i++) {
                      let innerIntems = mainItem[i];
                      if (innerIntems?.cells?.[0]?.kind === 'columnHeader') {
                        let result: any = [];

                        // Step 1: Extract headers from column headers
                        let headers: any = {};
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
                              result[row.rowIndex - 1][
                                headers[row.columnIndex]
                              ] = row.content; // Assign content for the matching column
                            }
                          }
                        });
                        globalArr?.push(result);
                      }
                    }

                    if (globalArr && globalArr?.length > 1) {
                      const flattenedArray = globalArr?.flat();

                      const uniqueKeys = Array.from(
                        new Set(
                          flattenedArray.flatMap((obj: any) =>
                            Object.keys(obj),
                          ),
                        ),
                      );
                      const resultArray = flattenedArray.map((obj: any) => {
                        const newObj: any = {};
                        uniqueKeys.forEach((key: any) => {
                          newObj[key] = obj[key] !== undefined ? obj[key] : '';
                        });

                        return newObj;
                      });
                      const transformObjects = (arr: any) => {
                        const transformedArray = arr.map(
                          (obj: any, index: number) => {
                            if (obj[''] !== undefined) {
                              obj[`emptyHeader ${index}`] = obj[''];
                              delete obj[''];
                            }
                            return obj;
                          },
                        );
                        return transformedArray;
                      };

                      // Apply transformation
                      let result = transformObjects(resultArray);
                      const cleanKeys = (obj: any) => {
                        const cleanedObj: any = {};
                        // Iterate over each key-value pair in the object
                        for (const [key, value] of Object.entries(obj)) {
                          // Remove special characters (e.g., periods, spaces) from the key
                          const cleanedKey: any = key.replace(/[^\w]/g, '');
                          cleanedObj[cleanedKey] = value;
                        }
                        return cleanedObj;
                      };

                      const cleanArray = (arr: any) => {
                        // Apply the cleanKeys function to each object in the array
                        return arr.map(cleanKeys);
                      };

                      // Clean the array
                      let cleanedArr = cleanArray(result);

                      // setMergedVaalues(cleanedArr);
                      // setFinalArrayForMerged(cleanedArr);
                      setUploadedFileData(cleanedArr);
                    } else {
                      setUploadedFileData(globalArr?.[0]);
                    }
                  }
                }
                setShowModalForAI(false);
              });
            }
            obj.doc_url = doc_url;
          },
        );
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
  };

  let newArrColumn = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
  ];

  return (
    <GlobalLoader loading={false}>
      <Row justify="space-between">
        <Col>
          <OsButton
            text={excelFile === 'true' ? 'Upload Excel' : 'Upload Pdf'}
            buttontype="PRIMARY"
            clickHandler={() => {
              setShowModalForAI(true);
            }}
          />
        </Col>
      </Row>
      {UploadedFileData && UploadedFileData?.length > 0 && (
        <HotTable
          data={UploadedFileData}
          colWidths={[
            300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,
            300, 300, 300,
          ]}
          height="auto"
          formulas={{
            engine: HyperFormula,
          }}
          stretchH="all"
          colHeaders={UploadedFileDataColumn}
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
          allowInsertRow
          // allowInsertColumn={true}
          afterGetColHeader={alignHeaders}
          beforeRenderer={() => {
            addClassesToRows('', '', '', '', '', '', UploadedFileData);
          }}
          afterRemoveRow={(change, source) => {}}
          afterChange={(change: any, source) => {}}
        />
      )}

      <OsModal
        // loading={loading}
        body={
          <>
            {' '}
            <Space size={24} direction="vertical" style={{width: '100%'}}>
              <OSDraggerStyle
                beforeUpload={beforeUpload}
                showUploadList={false}
                multiple
                accept={excelFile === 'true' ? '.xls,.xlsx' : '.pdf'}
              >
                <FolderArrowDownIcon
                  width={24}
                  color={token?.colorInfoBorder}
                />
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                  as="div"
                >
                  <Typography
                    name="Body 4/Medium"
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                    color={token?.colorPrimary}
                  >
                    Click to Upload
                  </Typography>{' '}
                  or Drag and Drop
                </Typography>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  XLS, PDF.
                </Typography>
              </OSDraggerStyle>
              {/* <UploadCard
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
          /> */}
            </Space>
          </>
        }
        width={600}
        open={showModalForAI}
        onCancel={() => {
          setShowModalForAI(false);
        }}
        footerPadding={30}
      />
    </GlobalLoader>
  );
};
export default EditorFile;
