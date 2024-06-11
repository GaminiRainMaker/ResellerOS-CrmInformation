'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useAppDispatch} from '../../../../../redux/hook';
import CommonSelect from '@/app/components/common/os-select';

const AddContractProduct: React.FC<any> = ({
  setContractObject,
  contractObject,
  optionsForContract,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

  //   contract_id: req.body.contract_id ,product_name: req.body.product_name ,contract_price: req.body.contract_price,clin_type: req.body.clin_type
  return (
    <>
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

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Row justify="space-between" gutter={[24, 24]}>
          <Col sm={24} md={12}>
            Product Name
            <OsInput
              value={contractObject?.product_name}
              onChange={(e: any) => {
                setContractObject({
                  ...contractObject,
                  product_name: e?.target?.value,
                });
              }}
            />
          </Col>

          <Col sm={24} md={12}>
            {' '}
            Contract Price
            <OsInput
              value={contractObject?.contract_price}
              onChange={(e: any) => {
                setContractObject({
                  ...contractObject,
                  contract_price: e?.target?.value,
                });
              }}
            />
          </Col>
          <Col sm={24} md={12}>
            Clin Type
            <OsInput
              value={contractObject?.clin_type}
              onChange={(e: any) => {
                setContractObject({
                  ...contractObject,
                  clin_type: e?.target?.value,
                });
              }}
            />
          </Col>
          <Col sm={24} md={12}>
            Contract
            <div>
              {' '}
              <CommonSelect
                style={{width: '100%'}}
                options={optionsForContract || []}
                value={contractObject?.contract_id}
                onChange={(e: any) => {
                  setContractObject({
                    ...contractObject,
                    contract_id: e,
                  });
                }}
              />
            </div>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default AddContractProduct;
