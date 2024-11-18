'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import CommonSelect from '@/app/components/common/os-select';
import {Form} from 'antd';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import {useEffect, useState} from 'react';
import {queryAllOrganizations} from '../../../../../redux/actions/user';
import React from 'react';
import {getAllProductForContract} from '../../../../../redux/actions/product';
import GlobalLoader from '@/app/components/common/os-global-loader';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';

const AddContractProduct: React.FC<any> = ({
  optionsForContract,
  onFinish,
  form,
  drawer,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<any>();
  const [loadingOption, setLoadingOptions] = useState<boolean>(false);
  const [productOptions, setProductOptions] = useState<any>([]);
  const [newSearchOptions, setNewSearchOptions] = useState<any>();
  const {userInformation, allOrganization} = useAppSelector(
    (state) => state.user,
  );

  const searchQuerDEbounce = useDebounceHook(searchQuery, 500);

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    dispatch(queryAllOrganizations(''));
  }, []);

  const selectOptions = allOrganization.map((option: any) => ({
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {capitalizeFirstLetter(option)}
      </Typography>
    ),
    value: option,
  }));

  const getOptionsData = async () => {
    setLoadingOptions(true);
    let ProductCodeArr: any = [];

    await dispatch(getAllProductForContract({query: searchQuery}))?.then(
      (payload: any) => {
        let newProductOptions: any = [];

        if (payload?.payload) {
          payload?.payload?.map((items: any) => {
            if (!ProductCodeArr?.includes(items?.product_code)) {
              newProductOptions?.push({
                label: items?.product_code,
                value: items.id,
              });
              ProductCodeArr?.push(items?.product_code);
            }
          });
        }
        setProductOptions(newProductOptions);
        setNewSearchOptions(newProductOptions);
      },
    );
    setLoadingOptions(false);
  };
  useEffect(() => {
    getOptionsData();
  }, []);
  useEffect(() => {
    if (searchQuery?.length > 0) {
      getOptionsData();
    }
  }, [searchQuerDEbounce]);
  return (
    <GlobalLoader loading={loadingOption}>
      {' '}
      <>
        {!drawer && (
          <Row
            justify="space-between"
            style={{
              padding: '24px 40px 20px 40px',
              backgroundColor: '#F0F4F7',
              borderRadius: '10px 10px 0px 0px',
            }}
            gutter={[0, 16]}
          >
            <Typography
              name="Body 1/Regular"
              align="left"
              color={token?.colorLinkHover}
            >
              Add New Contract Product
            </Typography>
          </Row>
        )}
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onFinish}
        >
          <Space
            size={16}
            direction="vertical"
            style={{
              width: '100%',
              padding: drawer ? '' : '24px 40px 20px 40px',
            }}
          >
            <Row justify="space-between" gutter={[24, 24]}>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Contract</Typography>}
                  name="contract_id"
                  rules={[
                    {
                      required: true,
                      message: 'Contract is required!',
                    },
                  ]}
                >
                  <CommonSelect
                    allowClear
                    style={{width: '100%'}}
                    options={optionsForContract || []}
                  />
                </SelectFormItem>
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">
                      Contract Product Name
                    </Typography>
                  }
                  name="contract_product_name"
                  rules={[
                    {
                      required: true,
                      message: 'Contract Product Name is required!',
                    },
                    // {
                    //   pattern: /^[A-Za-z\s]+$/,
                    //   message: 'Please enter valid text.',
                    // },
                  ]}
                >
                  <OsInput placeholder="Enter Text" />
                </SelectFormItem>
              </Col>

              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">Contract Price</Typography>
                  }
                  name="contract_price"
                  rules={[
                    {
                      required: true,
                      message: 'Contract Price is required!',
                    },
                    // {
                    //   // pattern: /^[0-9]$/,
                    //   message: 'Please enter valid text.',
                    // },
                  ]}
                >
                  <OsInput placeholder="Enter Text" />
                </SelectFormItem>{' '}
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">
                      {' '}
                      Product Number
                    </Typography>
                  }
                  name="product_number"
                  rules={[
                    {
                      required: true,
                      message: 'Product Number is required!',
                    },
                    // {
                    //   // pattern: /^[A-Za-z\s]+$/,
                    //   message: 'Please enter valid text.',
                    // },
                  ]}
                >
                  <OsInput placeholder="Enter Text" />
                </SelectFormItem>
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium"> Status</Typography>}
                  name="Status"
                  rules={[
                    {
                      required: true,
                      message: 'Status is required!',
                    },
                  ]}
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    options={[
                      {
                        value: 'New',
                        label: 'New',
                      },
                      {
                        value: 'Approved',
                        label: 'Approved',
                      },
                      {
                        value: 'Declined',
                        label: 'Declined',
                      },
                      {
                        value: 'Removed',
                        label: 'Removed',
                      },
                    ]}
                  />
                </SelectFormItem>
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Product</Typography>}
                  name="product_id"
                  rules={[
                    {
                      required: true,
                      message: 'Product is required!',
                    },
                  ]}
                >
                  {drawer ? (
                    <CommonSelect
                      showSearch
                      onSearch={(e: any) => {
                        setSearchQuery(e);
                      }}
                      value={searchQuery}
                      style={{width: '100%'}}
                      options={productOptions || []}
                    />
                  ) : (
                    <CommonSelect
                      onSearch={(e: any) => {
                        setSearchQuery(e);
                      }}
                      value={searchQuery}
                      showSearch
                      style={{
                        width: '100%',

                        // minHeight: '48px',
                        height: '48px',
                        overflow: 'auto',
                      }}
                      mode="multiple"
                      options={
                        searchQuery?.length > 0
                          ? newSearchOptions
                          : productOptions || []
                      }
                    />
                  )}
                </SelectFormItem>
              </Col>

              {userInformation?.Role === 'superAdmin' && (
                <Col sm={24} md={drawer ? 24 : 12}>
                  <SelectFormItem
                    label={
                      <Typography name="Body 4/Medium">Organization</Typography>
                    }
                    name="organization"
                    rules={[
                      {
                        required: true,
                        message: 'Organization is required!',
                      },
                    ]}
                  >
                    <CommonSelect
                      allowClear
                      style={{width: '100%'}}
                      options={selectOptions}
                      placeholder="Select Organization"
                    />
                  </SelectFormItem>{' '}
                </Col>
              )}
            </Row>
          </Space>
        </Form>
      </>
    </GlobalLoader>
  );
};

export default AddContractProduct;
