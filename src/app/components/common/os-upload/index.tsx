/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {sendDataToNanonets} from '@/app/utils/base';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
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

const OsUpload: React.FC<any> = ({
  beforeUpload,
  uploadFileData,
  setUploadFileData,
  addQuoteLineItem,
  form,
  cardLoading,
  setShowToggleTable,
  showToggleTable,
  Quotecolumns,
  existingQuoteId,
  setExistingQuoteId,
  isGenerateQuote,
  quoteDetails,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState([]);
  const [customerValue, setCustomerValue] = useState<number>();
  const [opportunityValue, setOpportunityValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const {getExistingQuoteFilterData, loading: quoteLoading} = useAppSelector(
    (state) => state.quote,
  );
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

  const onFinish = async () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    const singleQuote = form.getFieldValue('singleQuote');
    const newArr = [];
    setLoading(true);
    for (let i = 0; i < uploadFileData.length; i++) {
      let obj: any = {...uploadFileData[i]};
      if (!obj?.distributor_id && !obj?.oem_id) {
        obj.error = true;
      } else {
        obj.error = false;
      }
      if (!obj.error) {
        // eslint-disable-next-line no-await-in-loop
        const response: any = await sendDataToNanonets(
          obj?.model_id,
          obj?.file,
        );
        obj = {...obj, ...response};
      }

      newArr.push(obj);
    }
    setLoading(false);
    const index = newArr.findIndex((item) => item.error);
    if (index > -1) {
      setUploadFileData(newArr);
    } else {
      addQuoteLineItem(customerId, opportunityId, newArr, singleQuote);
    }
  };

  const onToggleChange = (checked: boolean) => {
    setShowToggleTable(checked);
    if (!checked) {
      setExistingQuoteId(0);
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
        opportunity: opportunityValue,
      }),
    );
  }, [customerValue, opportunityValue]);

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
        {!isGenerateQuote && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={[16, 16]}>
              <Col sm={24} md={12}>
                <OsCustomerSelect
                  setCustomerValue={setCustomerValue}
                  customerValue={customerValue}
                  isAddNewCustomer
                />
              </Col>

              <Col sm={24} md={12}>
                <OsOpportunitySelect
                  form={form}
                  customerValue={customerValue}
                  isAddNewOpportunity
                  setOpportunityValue={setOpportunityValue}
                />
              </Col>
            </Row>
          </Form>
        )}

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
                loading={quoteLoading}
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
