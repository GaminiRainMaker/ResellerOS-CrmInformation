import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  ContractOperatorsOptions,
  formatStatus,
  quotLineItemsColumnsSync,
} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Input, Select, Table} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {useEffect, useState} from 'react';
import {
  getContractConfiguartion,
  insertUpdateContractConfiguartion,
} from '../../../../../../../../../redux/actions/contractConfiguration';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../redux/hook';
import {RowData, StatusFileProps} from '../configuration.interface';

const {Option} = Select;

const StatusFile: React.FC<StatusFileProps> = ({
  initialData,
  contractStatus,
  customLogic,
  customInputLogic,
  isActive,
}) => {
  const [token] = useThemeToken();
  const [dataSource, setDataSource] = useState<RowData[]>([]);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector((state) => state.contractConfiguration);
  const [fieldTypes, setFieldTypes] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (initialData?.json?.length > 0) {
      loadInitialData(initialData.json);
    } else {
      loadInitialData('');
    }
  }, [initialData]);

  const handleAdd = () => {
    const newRow: RowData = {
      key: count.toString(),
      serialNumber: (dataSource.length + 1).toString(),
      fieldName: '',
      operator: '',
      valueType: '',
      value: '',
    };
    setDataSource([...dataSource, newRow]);
    setCount(count + 1);
  };

  const handleDelete = (key: string) => {
    const newDataSource = dataSource?.filter((item) => item?.key !== key);
    setDataSource(
      newDataSource?.map((item, index) => ({
        ...item,
        serialNumber: (index + 1).toString(),
      })),
    );
  };

  const handleInputChange = (
    value: string,
    key: string,
    column: keyof RowData,
  ) => {
    const newDataSource = dataSource?.map((item) => {
      if (item.key === key) {
        const newItem = {...item, [column]: value};
        if (column === 'valueType' && value === 'input') {
          newItem.value = '';
        }
        if (column === 'fieldName') {
          const selectedField = quotLineItemsColumnsSync.find(
            (field) => field.value === value,
          );
          setFieldTypes({
            ...fieldTypes,
            [key]: selectedField?.type || '',
          });
          newItem.value = '';
        }
        return newItem;
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  const loadInitialData = (initialFieldData: any) => {
    if (initialFieldData) {
      const parsedData = JSON?.parse(initialFieldData[0]);
      setDataSource(
        parsedData?.map((item: any, index: any) => ({
          ...item,
          key: index.toString(),
          serialNumber: (index + 1).toString(),
        })),
      );
      setCount(initialFieldData.length);
    } else {
      setDataSource([]);
    }
  };

  const getFieldOptions = (type: string) => {
    return quotLineItemsColumnsSync
      .filter((field) => field?.type === type)
      .map((field) => (
        <Option key={field.value} value={field.value}>
          {field.label}
        </Option>
      ));
  };

  const columns: ColumnsType<RowData> = [
    {
      title: 'S No.',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      width: 90,
    },
    {
      title: 'Field Name',
      dataIndex: 'fieldName',
      key: 'fieldName',
      render: (text, record) => (
        <CommonSelect
          allowClear
          value={text}
          placeholder="Select Field"
          onChange={(value) =>
            handleInputChange(value, record.key, 'fieldName')
          }
          style={{width: '100%', height: '34px'}}
          options={quotLineItemsColumnsSync}
        />
      ),
      width: 250,
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
      render: (text, record) => (
        <CommonSelect
          allowClear
          placeholder="Select Operator"
          value={text}
          onChange={(value) => handleInputChange(value, record.key, 'operator')}
          style={{width: '100%', height: '34px'}}
          options={ContractOperatorsOptions}
        />
      ),
      width: 220,
    },
    {
      title: 'Value Type',
      dataIndex: 'valueType',
      key: 'valueType',
      render: (text, record) => (
        <CommonSelect
          allowClear
          value={text}
          placeholder="Select Value Type"
          onChange={(value) =>
            handleInputChange(value, record.key, 'valueType')
          }
          style={{width: '100%', height: '34px'}}
        >
          <Option value="input">Input</Option>
          <Option value="formula">Formula</Option>
        </CommonSelect>
      ),
      width: 180,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => {
        let newArrr: any = [];
        if (record.valueType !== 'input' && text?.length > 0) {
          text?.map((items: any) => {
            if (items !== '' && items !== null && items !== undefined) {
              newArrr?.push(formatStatus(items));
            }
          });
        }
        let valueToShow = record.valueType === 'input' ? text : newArrr;
        return (
          <>
            {record.valueType === 'input' ? (
              <Input
                value={formatStatus(text)}
                placeholder="Enter value"
                onChange={(e) =>
                  handleInputChange(e.target.value, record.key, 'value')
                }
              />
            ) : (
              <CommonSelect
                allowClear
                value={valueToShow}
                placeholder="Select Fields"
                onChange={(value) => {
                  handleInputChange(value, record.key, 'value');
                }}
                style={{width: '100%', height: 'auto'}}
                mode="multiple"
              >
                {getFieldOptions(fieldTypes[record.key] || '')}
              </CommonSelect>
            )}
          </>
        );
      },

      width: 250,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span style={{display: 'flex', justifyContent: 'center'}}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => handleDelete(record.key)}
          />
        </span>
      ),
      width: 180,
    },
  ];

  const handleSave = () => {
    let obj = {
      id: initialData?.id,
      logic: customLogic ?? initialData?.logic,
      contract_status: contractStatus ?? initialData?.contract_status,
      custom_input:
        customLogic === 'custom_logic'
          ? (customInputLogic ?? initialData?.custom_input)
          : '',
      is_active: isActive ?? initialData?.is_active,
      json: [JSON?.stringify(dataSource)],
    };
    if (obj) {
      dispatch(insertUpdateContractConfiguartion(obj)).then((d: any) => {
        if (d?.payload) {
          dispatch(getContractConfiguartion(''));
        }
      });
    }
  };

  return (
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
              <Space size={24} direction="vertical" style={{width: '100%'}}>
                <Row justify={'space-between'}>
                  <Col>
                    <OsButton
                      text="Add Field"
                      buttontype="PRIMARY"
                      icon={<PlusIcon width={24} />}
                      clickHandler={handleAdd}
                      style={{marginBottom: 16}}
                    />{' '}
                  </Col>
                  <Col>
                    <OsButton
                      loading={loading}
                      text="Save"
                      buttontype="PRIMARY"
                      clickHandler={handleSave}
                      style={{marginBottom: 16}}
                    />
                  </Col>
                </Row>
                <Table
                  style={{boxShadow: ' 5px 5px 5px 5px grey'}}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  rowKey="key"
                />
              </Space>
            ),
          },
        ]}
      />
    </Space>
  );
};

export default StatusFile;
