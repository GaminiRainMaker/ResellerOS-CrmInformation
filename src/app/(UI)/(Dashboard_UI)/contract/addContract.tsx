'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {useAppDispatch} from '../../../../../redux/hook';

const AddContract: React.FC<any> = ({setContractObject, contractObject}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

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
          Add New Contract
        </Typography>
      </Row>

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: '24px 40px 20px 40px'}}
      >
        <Row justify="space-between" gutter={[24, 24]}>
          <Col sm={24} md={12}>
            Name
            <OsInput
              value={contractObject?.name}
              onChange={(e: any) => {
                setContractObject({...contractObject, name: e?.target?.value});
              }}
            />
          </Col>

          <Col sm={24} md={12}>
            {' '}
            Contract Type
            <OsInput
              value={contractObject?.contract_type_record}
              onChange={(e: any) => {
                setContractObject({
                  ...contractObject,
                  contract_type_record: e?.target?.value,
                });
              }}
            />
          </Col>
          <Col sm={24} md={12}>
            Owner
            <OsInput
              value={contractObject?.owner}
              onChange={(e: any) => {
                setContractObject({...contractObject, owner: e?.target?.value});
              }}
            />
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default AddContract;
