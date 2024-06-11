import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Input, Select, Table} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {useState} from 'react';

const {Option} = Select;

interface RowData {
  key: string;
  serialNumber: string;
  fieldName: string;
  operator: string;
  valueType: string;
  value: string;
}

const GreenStatusFile: React.FC = () => {
  const [token] = useThemeToken();
  const [dataSource, setDataSource] = useState<RowData[]>([]);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newRow: RowData = {
      key: count.toString(),
      serialNumber: (dataSource.length + 1).toString(),
      fieldName: '',
      operator: '',
      valueType: 'input',
      value: '',
    };
    setDataSource([...dataSource, newRow]);
    setCount(count + 1);
  };

  const handleDelete = (key: string) => {
    const newDataSource = dataSource.filter((item) => item?.key !== key);
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
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        const newItem = {...item, [column]: value};
        if (column === 'valueType' && value === 'input') {
          newItem.value = ''; // Clear value when switching to input
        }
        return newItem;
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  const columns: ColumnsType<RowData> = [
    {
      title: 'S No.',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
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
        >
          <Option value="field1">Field 1</Option>
          <Option value="field2">Field 2</Option>
          <Option value="field3">Field 3</Option>
        </CommonSelect>
      ),
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
        >
          <Option value="equal">Equal</Option>
          <Option value="less_than">Less Than</Option>
          <Option value="greater_than">Greater Than</Option>
        </CommonSelect>
      ),
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
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) =>
        record.valueType === 'input' ? (
          <Input
            value={text}
            placeholder="Enter value"
            onChange={(e) =>
              handleInputChange(e.target.value, record.key, 'value')
            }
          />
        ) : (
          <CommonSelect
            allowClear
            value={text}
            placeholder="Select Fields"
            onChange={(value) => handleInputChange(value, record.key, 'value')}
            style={{width: '100%', height: '34px'}}
            mode="multiple"
          >
            <Option value="formula1">Formula 1</Option>
            <Option value="formula2">Formula 2</Option>
            <Option value="formula3">Formula 3</Option>
          </CommonSelect>
        ),
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
    },
  ];

  return (
    <>
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
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowKey="key"
                  />
                  <OsButton
                    text="Add Field"
                    buttontype="PRIMARY"
                    icon={<PlusIcon width={24} />}
                    clickHandler={handleAdd}
                    style={{marginBottom: 16}}
                  />
                </Space>
              ),
            },
          ]}
        />
      </Space>
    </>
  );
};

export default GreenStatusFile;
