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
import useDebounceHook from '../hooks/useDebounceHook';
import useThemeToken from '../hooks/useThemeToken';
import OsCustomerSelect from '../os-customer-select';
import GlobalLoader from '../os-global-loader';
import OsOpportunitySelect from '../os-opportunity-select';
import CommonSelect from '../os-select';
import OsTable from '../os-table';
import Typography from '../typography';
import UploadCard from './UploadCard';
import {OSDraggerStyle} from './styled-components';
import {Option} from 'antd/es/mentions';

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
  const [query, setQuery] = useState<{
    customer: string | null;
    opportunity: string | null;
  }>({
    customer: null,
    opportunity: null,
  });
  const searchQuery = useDebounceHook(query, 500);
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

  const uniqueCustomer = Array.from(
    new Set(
      getExistingQuoteFilterData?.map(
        (getExistingQuoteFilterDataItem: any) =>
          getExistingQuoteFilterDataItem?.Customer?.id,
      ),
    ),
  ).map((id) => {
    const getExistingQuoteFilterDataItem = getExistingQuoteFilterData.find(
      (item: any) => item?.Customer?.id === id,
    );
    return {
      label: getExistingQuoteFilterDataItem?.Customer?.name,
      value: getExistingQuoteFilterDataItem?.Customer?.id,
    };
  });

  const uniqueOpportunity = Array.from(
    new Set(
      getExistingQuoteFilterData?.map(
        (getExistingQuoteFilterDataItem: any) =>
          getExistingQuoteFilterDataItem?.Opportunity?.id,
      ),
    ),
  ).map((id) => {
    const getExistingQuoteFilterDataItem = getExistingQuoteFilterData.find(
      (item: any) => item?.Opportunity?.id === id,
    );
    return {
      label: getExistingQuoteFilterDataItem?.Opportunity?.title,
      value: getExistingQuoteFilterDataItem?.Opportunity?.id,
    };
  });

  useEffect(() => {
    dispatch(getQuotesByExistingQuoteFilter(searchQuery));
  }, [searchQuery]);

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

        {!showToggleTable ? (
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
                />
              </Col>
            </Row>
          </Form>
        ) : (
          <Row justify="space-between" gutter={[16, 16]} align="middle">
            <Col span={11}>
              <Typography name="Body 4/Medium">Customer</Typography>
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select here"
                showSearch
                onSearch={(e) => {
                  setQuery({
                    ...query,
                    customer: e,
                  });
                }}
                onChange={(e) => {
                  setQuery({
                    ...query,
                    customer: e,
                  });
                }}
                value={query?.customer}
              >
                {uniqueCustomer?.map((customer: any) => (
                  <Option key={customer?.value} value={customer?.value}>
                    {customer?.label}
                  </Option>
                ))}
              </CommonSelect>
            </Col>
            <Col span={11}>
              <Typography name="Body 4/Medium">Opportunity</Typography>
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select here"
                showSearch
                onSearch={(e) => {
                  setQuery({
                    ...query,
                    opportunity: e,
                  });
                }}
                onChange={(e) => {
                  setQuery({
                    ...query,
                    opportunity: e,
                  });
                }}
                value={query?.opportunity}
              >
                {uniqueOpportunity?.map((customer: any) => (
                  <Option key={customer?.value} value={customer?.value}>
                    {customer?.label}
                  </Option>
                ))}
              </CommonSelect>
            </Col>

            <Col
              style={{
                marginTop: '20px',
              }}
              span={2}
            >
              <Typography
                cursor="pointer"
                name="Button 1"
                color={
                  query?.opportunity || query?.customer ? '#0D0D0D' : '#C6CDD5'
                }
                onClick={() => {
                  setQuery({
                    opportunity: null,
                    customer: null,
                  });
                }}
              >
                Reset
              </Typography>
            </Col>
          </Row>
        )}

        {!isGenerateQuote && (
          <Space size={30} direction="horizontal" align="center">
            <Typography name="Body 4/Medium">Select Existing Quote?</Typography>
            <Switch size="default" onChange={onToggleChange} />
          </Space>
        )}

        {!isGenerateQuote && (
          <>
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
