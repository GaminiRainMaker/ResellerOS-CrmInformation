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
import {fetchAndParseExcel} from '../../../../../redux/actions/auth';
import {uploadExcelFileToAws} from '../../../../../redux/actions/upload';

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
  lineItemSyncingData,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState([]);
  const [customerValue, setCustomerValue] = useState<number>();
  const [opportunityValue, setOpportunityValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
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

  const beforeUploadData = async (file: File) => {
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
                  // this is  a check arrr
                  // let newArrCheck = [
                  //     'line #',
                  //     'partnumber',
                  //     'manufacturer',
                  //     'description',
                  //     'listprice',
                  //     'gsaprice',
                  //     'Cost',
                  //     'quantity',
                  //     'Type',
                  //     'openmarket',
                  //     'productcode',
                  //     'listprice',
                  // ];
                  let newArrCheck: any = [];

                  if (lineItemSyncingData && lineItemSyncingData?.length > 0) {
                    lineItemSyncingData?.map((items: any) => {
                      newArrCheck?.push(items?.pdf_header);
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
                  let modifiedArr = headerKeys.map((item: any) =>
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
                      const match = lineItemSyncingData.find(
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
    return {
      lineItems: resultantValues,
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
        if (obj?.file?.type.includes('spreadsheetml')) {
          const dataa = await beforeUploadData(obj?.file);

          obj = {...obj, ...dataa};
        } else {
          // eslint-disable-next-line no-await-in-loop
          const response: any = await sendDataToNanonets(
            obj?.model_id,
            obj?.file,
          );

          obj = {...obj, ...response};
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
          onFinish={onFinish}
        >
          {!isGenerateQuote && !opportunityDetailId && (
            <Row gutter={[16, 16]}>
              <Col sm={24} md={12}>
                <OsCustomerSelect
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
