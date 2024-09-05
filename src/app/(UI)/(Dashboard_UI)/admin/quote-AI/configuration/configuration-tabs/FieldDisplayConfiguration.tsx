/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

// import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {TrashIcon} from '@heroicons/react/24/outline';
import {FC, useEffect, useState} from 'react';
import {
  getAllTableColumn,
  updateTableColumnById,
} from '../../../../../../../../redux/actions/tableColumn';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {TabContainerStyle} from './styled-components';
import {Checkbox} from 'antd';

const FieldDisplayConfiguration: FC<any> = () => {
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
    dispatch(getAllTableColumn(''));
    // setTimeout(() => {
    //   dispatch(getAllTableColumn(''));
    // }, 1000);
  };

  useEffect(() => {
    let filteredArray: any = [];
    if (tableColumnData && selectedTable && tableColumnData?.length > 0) {
      filteredArray = tableColumnData?.filter((item: any) =>
        item?.table_name?.includes(selectedTable),
      );
    }
    setTableColumnDataShow(filteredArray);
  }, [selectedTable, tableColumnData]);

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

  const FiledDisplayConfigurationUniqueItem = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Required
        </Typography>
      ),
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
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Editable
        </Typography>
      ),
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
  ];

  const FieldDisplayConfigurationFields = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          S No.
        </Typography>
      ),
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: any, record: any, index: number) => {
        const sno =
          record?.id -
          tableColumnDataShow?.[
            tableColumnDataShow?.length - tableColumnDataShow?.length
          ]?.id +
          1;
        return <>{index + 1}</>;
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Field Name
        </Typography>
      ),
      dataIndex: 'field_name',
      key: 'field_name',
      width: 313,
    },
  ];

  const thirdFieldDisplayConfigurationFields = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Active
        </Typography>
      ),
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

  const allColumns = [
    ...FieldDisplayConfigurationFields,
    ...(selectedTable !== 'Rebates' && selectedTable !== 'Input Details'
      ? FiledDisplayConfigurationUniqueItem
      : []),
    ...thirdFieldDisplayConfigurationFields,
  ];

  console.log('selectedTableselectedTable', selectedTable);

  return (
    <>
      <TabContainerStyle>
        <Row>
          <Col span={24}>
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
                        <CommonSelect
                          placeholder="Select"
                          options={[
                            {
                              label: 'Review Quotes',
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
                      <Typography name="Body 2/Medium">
                        Select Fields
                      </Typography>
                    ),
                    children: (
                      <Space
                        size={24}
                        direction="vertical"
                        style={{width: '100%'}}
                      >
                        {tableColumnDataShow && (
                          <OsTableWithOutDrag
                            loading={false}
                            tableSelectionType="checkbox"
                            columns={allColumns}
                            dataSource={tableColumnDataShow}
                            defaultPageSize={10}
                            scrolly={200}
                          />
                        )}
                      </Space>
                    ),
                  },
                ]}
              />
            </Space>
          </Col>
        </Row>
      </TabContainerStyle>
      <footer
        style={{
          width: 'max-content',
          float: 'right',
          position: 'absolute',
          bottom: '0%',
          right: '10px',
        }}
      >
        <Row>
          <Col>
            <OsButton
              text="Save"
              buttontype="PRIMARY"
              clickHandler={updateTableColumnValues}
              loading={loading}
            />
          </Col>
        </Row>
      </footer>
    </>
  );
};
export default FieldDisplayConfiguration;
