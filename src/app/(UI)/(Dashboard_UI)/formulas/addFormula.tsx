'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useAppDispatch} from '../../../../../redux/hook';
import {Form} from 'antd';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import {useEffect, useState} from 'react';
import {queryOEM} from '../../../../../redux/actions/oem';
import {queryDistributor} from '../../../../../redux/actions/distributor';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {Istok_Web} from 'next/font/google';
import {formatStatus} from '@/app/utils/CONSTANTS';

const AddFormula: React.FC<any> = ({
  drawer,
  form,
  onFinish,
  setSelectValue,
  selectValue,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [loadingFormula, setLoadingFormula] = useState<boolean>(false);

  const [distributerOPtions, setDistributerOptions] = useState<any>();

  const [oemOptions, setOemOptions] = useState<any>();

  const getOptionsData = async () => {
    setLoadingFormula(true);
    await dispatch(queryOEM({}))?.then((payload: any) => {
      let newArrForOem: any = [];
      payload?.payload?.map((items: any) => {
        let newObj: any = {
          label: formatStatus(items?.oem),
          value: items?.id,
        };
        newArrForOem?.push(newObj);
      });
      setOemOptions(newArrForOem);
    });
    await dispatch(queryDistributor({}))?.then((payload: any) => {
      let newArrForDistributor: any = [];
      payload?.payload?.map((items: any) => {
        let newObj: any = {
          label: formatStatus(items?.distributor),
          value: items?.id,
        };
        newArrForDistributor?.push(newObj);
      });
      setDistributerOptions(newArrForDistributor);
    });
    setLoadingFormula(false);
  };
  useEffect(() => {
    getOptionsData();
  }, []);

  return (
    <>
      <GlobalLoader loading={loadingFormula}>
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
              Add New Formula
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
                  label={<Typography name="Body 4/Medium">Title</Typography>}
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Title is required!',
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
                  label={<Typography name="Body 4/Medium">Formula</Typography>}
                  name="formula"
                  rules={[
                    {
                      required: true,
                      message: 'Formula is required!',
                    },
                    // {
                    //   pattern: /^[A-Za-z\s]+$/,
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
                    <Typography name="Body 4/Medium">Description</Typography>
                  }
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required!',
                    },
                    // {
                    //   pattern: /^[A-Za-z\s]+$/,
                    //   message: 'Please enter valid text.',
                    // },
                  ]}
                >
                  <OsInput placeholder="Enter Text" />
                </SelectFormItem>{' '}
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Active</Typography>}
                  name="is_active"
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    defaultValue={selectValue?.is_active?.toString()}
                    options={[
                      {label: 'Yes', value: 'true'},
                      {label: 'No', value: 'false'},
                    ]}
                    onChange={(e) => {
                      if (e === 'true') {
                        setSelectValue({
                          ...selectValue,
                          is_active: true,
                        });
                      } else {
                        setSelectValue({
                          ...selectValue,
                          is_active: false,
                        });
                      }
                    }}
                  />
                </SelectFormItem>{' '}
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">Distributer</Typography>
                  }
                  name="distributor_id"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'formula is required!',
                  //   },
                  //   // {
                  //   //   pattern: /^[A-Za-z\s]+$/,
                  //   //   message: 'Please enter valid text.',
                  //   // },
                  // ]}
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    defaultValue={selectValue?.distributor_id}
                    options={distributerOPtions}
                    onChange={(e) => {
                      setSelectValue({
                        ...selectValue,
                        distributor_id: e,
                      });
                    }}
                  />
                </SelectFormItem>{' '}
              </Col>
              <Col sm={24} md={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Oem</Typography>}
                  name="oem_id"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'formula is required!',
                  //   },
                  //   // {
                  //   //   pattern: /^[A-Za-z\s]+$/,
                  //   //   message: 'Please enter valid text.',
                  //   // },
                  // ]}
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    defaultValue={selectValue?.oem_id}
                    options={oemOptions}
                    onChange={(e) => {
                      setSelectValue({
                        ...selectValue,
                        oem_id: e,
                      });
                    }}
                  />
                </SelectFormItem>{' '}
              </Col>
            </Row>
          </Space>
        </Form>
      </GlobalLoader>
    </>
  );
};

export default AddFormula;
