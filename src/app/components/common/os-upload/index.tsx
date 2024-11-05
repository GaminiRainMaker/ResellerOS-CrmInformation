/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {convertFileToBase64, sendDataToNanonets} from '@/app/utils/base';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {getQuotesByExistingQuoteFilter} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import {Switch} from '../antd/Switch';
import useThemeToken from '../hooks/useThemeToken';
import OsCustomerSelect from '../os-customer-select';
import GlobalLoader from '../os-global-loader';
import OsOpportunitySelect from '../os-opportunity-select';
import OsTable from '../os-table';
import Typography from '../typography';
import UploadCard from './UploadCard';
import {OSDraggerStyle} from './styled-components';
import {
  fetchAndParseExcel,
  getPDFFileData,
} from '../../../../../redux/actions/auth';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../redux/actions/upload';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';

const OsUpload: React.FC<any> = ({
  beforeUpload,
  uploadFileData,
  setUploadFileData,
  addQuoteLineItem,
  addQuoteManually,
  form,
  cardLoading,
  setShowToggleTable,
  showToggleTable,
  Quotecolumns,
  existingQuoteId,
  setExistingQuoteId,
  isGenerateQuote,
  quoteDetails,
  typeOfAddQuote,
  setTypeOfAddQuote,
  opportunityDetailId,
  customerDetailId,

  setAdvancedUpload,
  advancedUpload,
  lineItemSyncingData,
  setAdvancedSetting,
  AdvancedSetting,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState([]);
  const [customerValue, setCustomerValue] = useState<number>();
  const [opportunityValue, setOpportunityValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [AdvancedSetting, setAdvancedSetting] = useState<boolean>(false);

  const {getExistingQuoteFilterData, getExistingQuoteFilterLoading} =
    useAppSelector((state) => state.quote);
  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  useEffect(() => {
    if (quoteDetails && Object.keys(quoteDetails).length > 0) {
      form?.setFieldsValue({
        customer_id: quoteDetails.customer_id,
        opportunity_id: quoteDetails.opportunity_id,
      });
      setCustomerValue(quoteDetails.customer_id);
    }
  }, [quoteDetails]);
  useEffect(() => {
    setLoading(true);
    dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
      setAdvancedSetting(payload?.payload?.advanced_excel);
    });
    setLoading(false);
  }, []);

  const beforeUploadDataForExcel = async (file: File) => {
    const obj: any = {...file};
    let resultantValues: any;
    let uploadedUrl: any;
    await convertFileToBase64(file)
      .then(async (base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;
        await dispatch(uploadExcelFileToAws({document: base64String})).then(
          async (payload: any) => {
            const doc_url = payload?.payload?.data?.Location;
            uploadedUrl = payload?.payload?.data?.Location;
            if (doc_url) {
              await dispatch(fetchAndParseExcel({Url: doc_url}))?.then(
                (payload: any) => {
                  let newArrCheck: any = [];

                  if (lineItemSyncingData && lineItemSyncingData?.length > 0) {
                    lineItemSyncingData?.map((items: any) => {
                      let resultString = items?.pdf_header?.replace(/\s+/g, '');
                      newArrCheck?.push(resultString);
                    });
                  }
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
                          (checkItem: any) =>
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
                  let result =
                    indexFrom > 0
                      ? payload?.payload?.slice(bestRowIndex + 1, indexFrom)
                      : payload?.payload?.slice(
                          bestRowIndex + 1,
                          payload?.payload?.length,
                        );

                  let requiredOutput = result
                    ?.map((subArray: any) =>
                      subArray.filter((item: any) => item !== null),
                    )
                    .filter((subArray: any) => subArray.length > 0);
                  // let headerKeys: any = payload?.payload[bestRowIndex];

                  let headerKeys: any = [];
                  payload?.payload[bestRowIndex]?.filter((items: any) => {
                    if (items !== null && !headerKeys?.includes(items)) {
                      headerKeys?.push(items);
                    }
                  });

                  // return;

                  let modifiedArr = headerKeys.map((item: any) => {
                    if (item) {
                      return item.replace(/\s+/g, '').replace(/[.]/g, '');
                    } else {
                      return null;
                    }
                  });

                  // replace the syncing valueesss ========================

                  let syncedHeaderValue = headerKeys
                    .map((item: any) => {
                      // Clean up the item by removing spaces and special characters
                      const cleanedItem =
                        item !== null
                          ? item
                              .trim()
                              .replace(/[^A-Za-z]/g, '')
                              .substring(0, 4)
                              .toLowerCase()
                          : null;

                      // Find the matching quoteHeader
                      // let resultString = items?.pdf_header?.replace(/\s+/g, '');
                      const match = lineItemSyncingData.find(
                        (obj: any) => obj.pdf_header === item,
                        // (obj.pdf_header
                        //   ?.replace(/\s+/g, '')
                        //   ?.toLowerCase()
                        //   .substring(0, 4) === cleanedItem &&
                        //   item?.toString()?.toLowerCase() !== 'partner'),
                      );
                      return match ? match.quote_header : item;
                    })
                    .filter(Boolean); // Remove any undefined values

                  // end of above
                  // Transform newArr into an array of objects

                  resultantValues = requiredOutput.map((row: any) => {
                    let obj: any = {};
                    syncedHeaderValue.forEach((header: any, index: any) => {
                      obj[header] = row[index] === '' ? null : row[index]; // Convert empty strings to null
                    });
                    return obj;
                  });
                },
              );
            }
          },
        );
      })
      .catch((error: any) => {
        message.error('Error converting file to base64', error);
      });

    function containsLetterAndNumber(str: string): boolean {
      // const hasLetter = /[a-zA-Z]/.test(str);
      // const hasDigit = /\d/.test(str);
      const hasHyphen = /-/.test(str);
      return hasHyphen;
    }

    let requiredResult = resultantValues?.filter(
      (items: any) =>
        items?.product_code &&
        items?.product_code !== undefined &&
        items?.product_code !== null &&
        containsLetterAndNumber(items?.product_code),
    );

    return {
      lineItems: requiredResult,
      file_name: file?.name,
      pdf_url: uploadedUrl,
    };
  };

  const beforeUploadDataForPdf = async (file: File) => {
    const obj: any = {...file};
    let resultantValues: any;
    let uploadedUrl: any;
    await convertFileToBase64(file)
      .then(async (base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;

        await dispatch(uploadToAws({document: base64String})).then(
          async (payload: any) => {
            const doc_url = payload?.payload?.data?.Location;
            uploadedUrl = payload?.payload?.data?.Location;
            if (doc_url) {
              await dispatch(getPDFFileData({pdfUrl: doc_url}))?.then(
                (payload: any) => {
                  let newArrCheck: any = [];

                  if (lineItemSyncingData && lineItemSyncingData?.length > 0) {
                    lineItemSyncingData?.map((items: any) => {
                      let resultString = items?.pdf_header?.replace(/\s+/g, '');
                      newArrCheck?.push(resultString);
                    });
                  }

                  let mainItem = payload?.payload?.analyzeResult?.tables;
                  let globalArr: any = [];

                  let resultTantArrr: any = [];

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
                            result[row.rowIndex - 1][headers[row.columnIndex]] =
                              row.content; // Assign content for the matching column
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
                        flattenedArray.flatMap((obj: any) => Object.keys(obj)),
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
                    // setUploadedFileData(cleanedArr);
                    resultTantArrr = [...cleanedArr];
                  } else {
                    resultTantArrr = [...globalArr?.[0]];
                  }
                  console.log('35435324234', resultTantArrr);

                  resultTantArrr?.map((obj: any) => {
                    const newObj: any = {};
                    lineItemSyncingData?.forEach((mapping: any) => {
                      if (mapping?.preVal in obj) {
                        newObj[mapping?.newVal] = obj[mapping?.preVal];
                      }
                    });
                    Object.entries(obj).forEach(([key, value]) => {
                      if (
                        !lineItemSyncingData?.some(
                          (mapping: any) => mapping?.preVal === key,
                        )
                      ) {
                        newObj[key] = value;
                      }
                    });
                    resultantValues?.push(newObj);
                  });

                  // resultantValues = resultTantArrr.map((row: any) => {
                  //   let obj: any = {};
                  //   syncedHeaderValue.forEach((header: any, index: any) => {
                  //     obj[header] = row[index] === '' ? null : row[index]; // Convert empty strings to null
                  //   });
                  //   return obj;
                  // });
                },
              );
            }
          },
        );
      })
      .catch((error: any) => {
        message.error('Error converting file to base64', error);
      });

    function containsLetterAndNumber(str: string): boolean {
      // const hasLetter = /[a-zA-Z]/.test(str);
      // const hasDigit = /\d/.test(str);
      const hasHyphen = /-/.test(str);
      return hasHyphen;
    }

    let requiredResult = resultantValues?.filter(
      (items: any) =>
        items?.product_code &&
        items?.product_code !== undefined &&
        items?.product_code !== null &&
        containsLetterAndNumber(items?.product_code),
    );
    console.log('43543534532', resultantValues);
    return;
    return {
      lineItems: requiredResult,
      file_name: file?.name,
      pdf_url: uploadedUrl,
    };
  };

  const onFinish = async () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    const singleQuote = form.getFieldValue('singleQuote');
    const OemName = form.getFieldValue('oem_name');
    const DistributerName = form.getFieldValue('distributor_name');
    const fileName = form.getFieldValue('file_name');
    const newArr = [];
    setLoading(true);

    for (let i = 0; i < uploadFileData.length; i++) {
      let obj: any = {...uploadFileData[i]};

      if (obj?.manualquote) {
        if (!obj?.distributor_name && !obj?.oem_name) {
          obj.error = true;
        } else {
          obj.error = false;
        }
      } else {
        if (!obj?.distributor_id && !obj?.oem_id) {
          obj.error = true;
        } else {
          obj.error = false;
        }
      }

      if (
        !obj.error &&
        obj?.model_id &&
        (obj?.model_id !== 'a02fffb7-5221-44a2-8eb1-85781a0ecd67' ||
          obj?.file?.type.includes('spreadsheetml'))
      ) {
        // if (obj?.file?.type.includes('spreadsheetml')) {
        //   const dataa = await beforeUploadDataForExcel(obj?.file);

        //   obj = {...obj, ...dataa};
        // } else {
        // eslint-disable-next-line no-await-in-loop
        const response: any = await sendDataToNanonets(
          obj?.model_id,
          obj?.file,
        );

        obj = {...obj, ...response};
        // }
      }

      newArr.push(obj);
    }
    setLoading(false);
    const index = newArr.findIndex((item) => item.error);

    if (index > -1) {
      setUploadFileData(newArr);
    } else if (opportunityDetailId) {
      addQuoteLineItem(
        customerDetailId,
        opportunityDetailId,
        newArr,
        singleQuote,
      );
    } else {
      addQuoteLineItem(customerId, opportunityId, newArr, singleQuote);
    }
  };

  const onToggleChange = (checked: boolean) => {
    setShowToggleTable(checked);
    if (!checked) {
      setExistingQuoteId();
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setExistingQuoteId(Number(selectedRowKeys));
    },
  };

  const onFinishAdvanced = async () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    const singleQuote = form.getFieldValue('singleQuote');
    const OemName = form.getFieldValue('oem_name');
    const DistributerName = form.getFieldValue('distributor_name');
    const fileName = form.getFieldValue('file_name');
    const newArr = [];
    setLoading(true);

    for (let i = 0; i < uploadFileData.length; i++) {
      let obj: any = {...uploadFileData[i]};

      if (obj?.manualquote) {
        if (!obj?.distributor_name && !obj?.oem_name) {
          obj.error = true;
        } else {
          obj.error = false;
        }
      } else {
        if (!obj?.distributor_id && !obj?.oem_id) {
          obj.error = true;
        } else {
          obj.error = false;
        }
      }

      if (
        !obj.error &&
        obj?.model_id &&
        (obj?.model_id !== 'a02fffb7-5221-44a2-8eb1-85781a0ecd67' ||
          obj?.file?.type.includes('spreadsheetml'))
      ) {
        if (obj?.file?.type.includes('spreadsheetml')) {
          const dataa = await beforeUploadDataForExcel(obj?.file);
          console.log('43534324324', dataa);

          obj = {...obj, ...dataa};
        } else {
          const dataa = await beforeUploadDataForPdf(obj?.file);

          obj = {...obj, ...dataa};
        }
      }

      newArr.push(obj);
    }
    setLoading(false);
    const index = newArr.findIndex((item) => item.error);

    if (index > -1) {
      setUploadFileData(newArr);
    } else if (opportunityDetailId) {
      addQuoteLineItem(
        customerDetailId,
        opportunityDetailId,
        newArr,
        singleQuote,
      );
    } else {
      addQuoteLineItem(customerId, opportunityId, newArr, singleQuote);
    }
  };

  useEffect(() => {
    dispatch(
      getQuotesByExistingQuoteFilter({
        customer: customerValue,
        opportunity: opportunityValue ?? opportunityDetailId,
      }),
    );
  }, [customerValue, opportunityValue, opportunityDetailId]);
  return (
    <GlobalLoader loading={cardLoading || loading}>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <OSDraggerStyle
          beforeUpload={beforeUpload}
          showUploadList={false}
          multiple
        >
          <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
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
          <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
            XLS, PDF.
          </Typography>
        </OSDraggerStyle>
        <UploadCard
          uploadFileData={uploadFileData}
          setUploadFileData={setUploadFileData}
        />

        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={AdvancedSetting ? onFinishAdvanced : onFinish}
        >
          {!isGenerateQuote && !opportunityDetailId && (
            <Row gutter={[16, 16]}>
              <Col sm={24} md={12}>
                <OsCustomerSelect
                  form={form}
                  setCustomerValue={setCustomerValue}
                  customerValue={customerValue}
                  isAddNewCustomer
                  isRequired={existingQuoteId ? false : true}
                />
              </Col>

              <Col sm={24} md={12}>
                <OsOpportunitySelect
                  form={form}
                  customerValue={customerValue}
                  isAddNewOpportunity
                  setOpportunityValue={setOpportunityValue}
                  isRequired={existingQuoteId ? false : true}
                />
              </Col>
            </Row>
          )}
        </Form>

        {!isGenerateQuote && (
          <>
            <Space size={30} direction="horizontal" align="center">
              <Typography name="Body 4/Medium">
                Select Existing Quote?
              </Typography>
              <Switch size="default" onChange={onToggleChange} />
            </Space>

            {showToggleTable && (
              <OsTable
                loading={getExistingQuoteFilterLoading}
                rowSelection={rowSelection}
                tableSelectionType="radio"
                columns={Quotecolumns}
                dataSource={getExistingQuoteFilterData}
                scroll
              />
            )}
          </>
        )}
      </Space>
    </GlobalLoader>
  );
};
export default OsUpload;
