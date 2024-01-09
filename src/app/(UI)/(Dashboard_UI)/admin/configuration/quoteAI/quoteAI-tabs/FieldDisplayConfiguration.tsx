'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Row, Space} from 'antd';
import {useEffect, useState} from 'react';
import {
  getAllTableColumn,
  updateTableColumnById,
} from '../../../../../../../../redux/actions/tableColumn';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {TabContainerStyle} from './styled-components';

const FieldDisplayConfiguration = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: tableColumnData, loading} = useAppSelector(
    (state) => state.tableColumn,
  );
  const [selectedTable, setSelectedTable] = useState<String>();
  const [tableColumnDataShow, setTableColumnDataShow] = useState<any>();

  const [updateColumn, setUpdateColumn] = useState<any>();

  useEffect(() => {
    dispatch(getAllTableColumn(''));
  }, []);

  const updateTableColumnValues = async () => {
    for (let i = 0; i < updateColumn?.length; i++) {
      const dataItems = updateColumn[i];
      dispatch(updateTableColumnById(dataItems));
    }
    setTimeout(() => {
      dispatch(getAllTableColumn(''));
    }, 1000);
  };

  useEffect(() => {
    let filteredArray: any = [];
    if (tableColumnData && selectedTable) {
      filteredArray = tableColumnData?.filter(
        (item: any) => item?.table_name?.includes(selectedTable),
      );
    }

    setTableColumnDataShow(filteredArray);
  }, [selectedTable]);

  const commonMethodForChecks = (ids: any, names: any, valuess: any) => {
    const previousArray = updateColumn?.length > 0 ? [...updateColumn] : [];
    if (previousArray?.length > 0) {
      const indexOfCurrentId = previousArray?.findIndex(
        (item: any) => item?.id === ids,
      );
      if (indexOfCurrentId === -1) {
        const newObj: any = {
          id: ids,
          [names]: valuess,
        };
        previousArray?.push(newObj);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // previousArray?.[indexOfCurrentId]?.names = valuess;
        let newObj = previousArray[indexOfCurrentId];
        newObj = {
          ...newObj,
          [names]: valuess,
        };
        previousArray?.splice(indexOfCurrentId, 1);
        previousArray?.push(newObj);
      }
    } else {
      const newObj: any = {
        id: ids,
        [names]: valuess,
      };
      previousArray?.push(newObj);
    }
    setUpdateColumn(previousArray);
  };
  const FieldDisplayConfigurationFields = [
    {
      title: 'S No.',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text: any, record: any) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const sno =
          // eslint-disable-next-line no-unsafe-optional-chaining
          record?.id -
          // eslint-disable-next-line no-unsafe-optional-chaining
          tableColumnDataShow?.[
            // eslint-disable-next-line no-unsafe-optional-chaining
            tableColumnDataShow?.length - tableColumnDataShow?.length
          ]?.id +
          1;
        return <>{sno}</>;
      },
    },
    {
      title: 'Field Name',
      dataIndex: 'field_name',
      key: 'field_name',
      width: 313,
    },
    {
      title: 'Required',
      dataIndex: 'is_required',
      key: 'is_required',
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            commonMethodForChecks(record?.id, 'is_required', e.target?.checked);
          }}
        />
      ),
      width: 313,
    },
    {
      title: 'Editable',
      dataIndex: 'is_editable',
      key: 'is_editable',
      render: (text: any, record: any) => (
        <Checkbox
          defaultChecked={text}
          onChange={(e) => {
            commonMethodForChecks(record?.id, 'is_editable', e.target?.checked);
          }}
        />
      ),
      width: 313,
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (text: any, record: any) => (
        <Switch
          defaultChecked={text}
          size="default"
          onChange={(e) => {
            commonMethodForChecks(record?.id, 'is_active', e);
          }}
        />
      ),
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
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
          }}
        >
          <OsCollapseAdmin
            items={[
              {
                key: '1',
                label: (
                  <Typography name="Body 2/Medium">Select Tab </Typography>
                ),
                children: (
                  <Space
                    size={24}
                    direction="vertical"
                    style={{
                      width: '100%',
                      background: 'white',
                      borderRadius: '12px',
                    }}
                  >
                    <Typography name="Body 4/Medium">Select Tab</Typography>
                    <CommonSelect
                      placeholder="Select"
                      options={[
                        {
                          label: 'Input Details',
                          value: 'Input Details',
                        },
                        {
                          label: 'Profitability',
                          value: 'Profitability',
                        },
                        {
                          label: 'Rebates',
                          value: 'Rebates',
                        },
                        {
                          label: 'Validation',
                          value: 'Validation',
                        },
                      ]}
                      onChange={(e) => {
                        setSelectedTable(e);
                      }}
                      style={{width: '100%'}}
                    />
                  </Space>
                ),
              },
            ]}
          />
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
                label: (
                  <Typography name="Body 2/Medium">Selected Fields</Typography>
                ),
                children: (
                  <Space size={24} direction="vertical" style={{width: '100%'}}>
                    <OsTable
                      loading={false}
                      tableSelectionType="checkbox"
                      columns={FieldDisplayConfigurationFields}
                      dataSource={tableColumnDataShow}
                      pageSize={{
                        pageSize: 3,
                      }}
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
        <OsButton
          text="Save"
          buttontype="PRIMARY"
          clickHandler={updateTableColumnValues}
          loading={loading}
        />
      </footer>
    </TabContainerStyle>
  );
};
export default FieldDisplayConfiguration;
