'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {ContractStatusOptions, LogicOptions} from '@/app/utils/CONSTANTS';
import {useEffect, useState} from 'react';
import {getContractConfiguartion} from '../../../../../../../../../redux/actions/contractConfiguration';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../redux/hook';
import {TabContainerStyle} from '../styled-components';
import GreenStatusFile from './GreenStatusFile';

const ContractValidationConfiguration = () => {
  const dispatch = useAppDispatch();
  const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
  const [isSelectLogic, setIsSelectLogic] = useState<boolean>(false);
  const [contractStatus, setContractStatus] = useState<string>('');
  const [selectedLogic, setSelectedLogic] = useState<string>('');
  const {data: contractConfigurationData} = useAppSelector(
    (state) => state.contractConfiguration,
  );

  const matchingObjects = contractConfigurationData?.filter(
    (item: any) => item?.contract_status === contractStatus,
  );

  useEffect(() => {
    dispatch(getContractConfiguartion(''));
  }, []);

  return (
    <TabContainerStyle>
      <Row>
        <Col span={24}>
          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
            }}
          >
            <Space
              size={36}
              direction="vertical"
              style={{
                width: '100%',
                background: 'white',
                borderRadius: '12px',
              }}
            >
              <Row justify="space-between">
                <Col>
                  <Typography name="Body 2/Medium">
                    Contract Configuration{' '}
                  </Typography>
                </Col>
                <Col>
                  <Space size={8}>
                    <Typography name="Body 3/Regular">Active</Typography>
                    <Switch size="default" onChange={() => {}} />
                  </Space>
                </Col>
              </Row>

              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Contract Status</Typography>
                <CommonSelect
                  placeholder="Select"
                  style={{width: '100%'}}
                  options={ContractStatusOptions}
                  onChange={(e) => {
                    setIsSelectStatus(true);
                    setIsSelectLogic(false);
                    setContractStatus(e);
                  }}
                />
              </Space>
              {isSelectStatus && (
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Logic</Typography>
                  <CommonSelect
                    placeholder="Select"
                    style={{width: '100%'}}
                    defaultValue={matchingObjects?.[0]?.logic}
                    allowClear
                    options={LogicOptions}
                    onChange={(e) => {
                      setSelectedLogic(e);
                      if (e === 'custom_logic') setIsSelectLogic(true);
                      else setIsSelectLogic(false);
                    }}
                  />
                </Space>
              )}

              {isSelectLogic && (
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Custom</Typography>
                  <OsInput placeholder="Select" style={{width: '100%'}} />
                </Space>
              )}
            </Space>
          </Space>

          {contractStatus && (
            <GreenStatusFile initialData={matchingObjects?.[0]} />
          )}
        </Col>
      </Row>
    </TabContainerStyle>
  );
};
export default ContractValidationConfiguration;
