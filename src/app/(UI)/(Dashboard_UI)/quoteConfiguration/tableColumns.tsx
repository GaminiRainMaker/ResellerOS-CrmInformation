import {Space} from '@/app/components/common/antd/Space';
import OsDistributorSelect from '@/app/components/common/os-distributor-select';
import OsInput from '@/app/components/common/os-input';
import OsOemSelect from '@/app/components/common/os-oem-select';
import Typography from '@/app/components/common/typography';
import {TrashIcon} from '@heroicons/react/24/outline';
import {FormInstance, GlobalToken} from 'antd';

function getColumns(
  token: GlobalToken,
  setQuoteConfig: any,
  form: FormInstance<any> | undefined,
) {
  const columns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Distributor
        </Typography>
      ),
      dataIndex: 'distributor',
      key: 'distributor',
      width: 187,
      render: (text: string, record: any, index: number) => (
        <>
          <OsDistributorSelect
            name={`distributor_${index}`}
            distributorValue={record?.distributor_id}
            isAddNewDistributor
            height={38}
            isRequired
            form={form}
            onChange={(value: any) => {
              setQuoteConfig((prev: any) =>
                prev.map((prevItem: any, prevIndex: number) => {
                  if (prevIndex === index) {
                    return {
                      ...prevItem,
                      distributor_id: value,
                    };
                  }
                  return prevItem;
                }),
              );
            }}
          />
          {record.error && (
            <Typography name="Body 4/Regular" color={token?.colorError}>
              Duplicate Entry
            </Typography>
          )}
        </>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          OEM
        </Typography>
      ),
      dataIndex: 'oem',
      key: 'oem',
      width: 130,
      render: (text: string, record: any, index: number) => (
        <>
          <OsOemSelect
            name={`oem_${index}`}
            oemValue={record?.oem_id}
            isAddNewOem
            isRequired
            form={form}
            onChange={(value: any) => {
              setQuoteConfig((prev: any) =>
                prev.map((prevItem: any, prevIndex: any) => {
                  if (prevIndex === index) {
                    const obj = {
                      ...prevItem,
                      oem_id: value,
                    };

                    return obj;
                  }
                  return prevItem;
                }),
              );
            }}
          />
          {record.error && (
            <Typography name="Body 4/Regular" color={token?.colorError}>
              Duplicate Entry
            </Typography>
          )}
        </>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Model ID
        </Typography>
      ),
      dataIndex: 'model_id',
      key: 'model_id',
      width: 187,
      render: (text: string, record: any, index: number) => (
        <OsInput
          name={`model_${index}`}
          placeholder="Write here"
          style={{height: '38px'}}
          value={text}
          onChange={(e) => {
            setQuoteConfig((prev: any) =>
              prev.map((prevItem: any, prevIndex: number) => {
                if (prevIndex === index) {
                  return {
                    ...prevItem,
                    model_id: e?.target?.value,
                  };
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      key: 'actions',
      width: 54,
      render: (text: string, record: any, index: number) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setQuoteConfig((prev: any) =>
                prev.filter(
                  (prevItem: any, prevIndex: number) => prevIndex !== index,
                ),
              );
            }}
          />
        </Space>
      ),
    },
  ];

  return columns;
}

export default getColumns;
