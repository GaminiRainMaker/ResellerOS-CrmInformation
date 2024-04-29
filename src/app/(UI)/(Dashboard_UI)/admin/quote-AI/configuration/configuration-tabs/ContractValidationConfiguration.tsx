'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {
  ContractStatusOptions,
  LogicOptions,
  OperatorsOptions,
  dummyData,
} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';
import {TabContainerStyle} from './styled-components';

const ContractValidationConfiguration = () => {
  const [token] = useThemeToken();
  const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
  const [isSelectLogic, setIsSelectLogic] = useState<boolean>(false);

  const ContractConfigurationFields = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          S No.
        </Typography>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Field Name
        </Typography>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {}}
          options={[]}
        />
      ),
      width: 313,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Operator
        </Typography>
      ),
      dataIndex: 'Operator',
      key: 'Operator',
      render: (text: string) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {}}
          options={OperatorsOptions}
        />
      ),
      width: 313,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Value
        </Typography>
      ),
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {}}
          options={[]}
        />
      ),
      width: 313,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Active
        </Typography>
      ),
      dataIndex: 'active',
      key: 'active',
      render: (text: string) => <Switch size="default" onChange={() => {}} />,
      width: 77,
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 33,
      render: (text: string, record: any) => (
        <TrashIcon
          height={24}
          width={24}
          color={token.colorError}
          style={{cursor: 'pointer'}}
          onClick={() => {
            // setDeleteIds([record?.id]);
            // setShowModalDelete(true);
          }}
        />
      ),
    },
  ];

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
                    options={LogicOptions}
                    onChange={(e) => {
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
          <Space
            size={24}
            direction="vertical"
            style={{
              width: '100%',
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginTop: '30px',
            }}
          >
            <OsCollapseAdmin
              items={[
                {
                  key: '1',
                  label: <Typography name="Body 2/Medium">Fields</Typography>,
                  children: (
                    <Space
                      size={24}
                      direction="vertical"
                      style={{width: '100%'}}
                    >
                      <OsTable
                        loading={false}
                        tableSelectionType="checkbox"
                        columns={ContractConfigurationFields}
                        dataSource={[]}
                        scroll
                        tablePageSize={50}
                        scrolly={165}
                      />
                      <div style={{width: 'max-content', float: 'right'}}>
                        <OsButton
                          text="Add Field"
                          buttontype="PRIMARY"
                          icon={<PlusIcon width={24} />}
                          clickHandler={() => {}}
                        />
                      </div>
                    </Space>
                  ),
                },
              ]}
            />
          </Space>
        </Col>
      </Row>
      <footer
        style={{
          width: 'max-content',
          float: 'right',
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
      >
        <OsButton text="Save" buttontype="PRIMARY" clickHandler={() => {}} />
      </footer>
    </TabContainerStyle>
  );
};
export default ContractValidationConfiguration;
