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
import StatusFile from './StatusFile';

const ContractValidationConfiguration = () => {
  const dispatch = useAppDispatch();
  const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
  const [isSelectLogic, setIsSelectLogic] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [contractStatus, setContractStatus] = useState<string>('');
  const [initialLogic, setInitialLogic] = useState<string>('');
  const [customInputLogic, setCustomInputLogic] = useState<string>('');
  const {data: contractConfigurationData} = useAppSelector(
    (state) => state.contractConfiguration,
  );

  const matchingObjects =
    contractConfigurationData &&
    contractConfigurationData?.filter(
      (item: any) => item?.contract_status === contractStatus,
    );

  useEffect(() => {
    dispatch(getContractConfiguartion(''));
  }, []);

  useEffect(() => {
    if (matchingObjects) {
      setInitialLogic(matchingObjects?.[0]?.logic);
      setIsActive(matchingObjects?.[0]?.is_active);
      setCustomInputLogic(matchingObjects?.[0]?.custom_input);
    }
  }, [contractStatus]);

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
                    <Switch
                      value={isActive}
                      size="default"
                      onChange={(e) => {
                        setIsActive(e);
                      }}
                    />
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
                    value={initialLogic}
                    allowClear
                    options={LogicOptions}
                    onChange={(e) => {
                      setInitialLogic(e);
                      if (e === 'custom_logic') setIsSelectLogic(true);
                      else setIsSelectLogic(false);
                    }}
                  />
                </Space>
              )}

              {(isSelectLogic || initialLogic === 'custom_logic') && (
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">Custom</Typography>
                  <OsInput
                    placeholder="Select"
                    style={{width: '100%'}}
                    value={customInputLogic}
                    onChange={(e) => {
                      setCustomInputLogic(e?.target?.value);
                    }}
                  />
                </Space>
              )}
            </Space>
          </Space>

          {contractStatus && (
            <StatusFile
              initialData={matchingObjects?.[0]}
              contractStatus={contractStatus}
              customLogic={initialLogic}
              customInputLogic={customInputLogic}
              isActive={isActive}
            />
          )}
        </Col>
      </Row>
    </TabContainerStyle>
  );
};
export default ContractValidationConfiguration;
