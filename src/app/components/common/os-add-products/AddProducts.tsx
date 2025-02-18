'use client';

import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {Col, Form, Row, Space} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {FC, useEffect} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import OsInput from '../os-input';
import CommonSelect from '../os-select';
import Typography from '../typography';
import {OsAddProductInterface} from './os-add-products.interface';
import OsInputNumber from '../os-input/InputNumber';

const AddProducts: FC<OsAddProductInterface> = ({
  isDrawer = false,
  productData,
  onFinish,
  form,
}) => {
  const [token] = useThemeToken();

  useEffect(() => {
    form.resetFields();
  }, [productData]);

  return (
    <>
      {!isDrawer && (
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
            Add New Product
          </Typography>
        </Row>
      )}

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: !isDrawer ? '24px 40px 20px 40px' : ''}}
      >
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onFinish}
          initialValues={productData}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="product_name"
                rules={[
                  {
                    required: true,
                    message: 'Please select the product Name!',
                  },
                ]}
              >
                <OsInput placeholder="Write here!" />

                {/* <CommonSelect
                  style={{width: '100%'}}
                  placeholder="Select"
                  options={selectDataForProduct}
                /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Product Family"
                name="product_family"
                rules={[
                  {
                    required: true,
                    message: 'Please select the product family!',
                  },
                ]}
              >
                <CommonSelect
                  style={{width: '100%'}}
                  placeholder="Select"
                  options={selectDataForProduct}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Form.Item
                label="Product Code"
                name="product_code"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Product Code!',
                  },
                ]}
              >
                <OsInput placeholder="Write here!" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="List Price" name="list_price">
                <OsInputNumber
                  type="number"
                  style={{width: '100%'}}
                  placeholder="$ 000-000-0000"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Product Description" name="description">
                <TextArea
                  placeholder="Write description here!"
                  autoSize={{minRows: 2, maxRows: 8}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddProducts;
