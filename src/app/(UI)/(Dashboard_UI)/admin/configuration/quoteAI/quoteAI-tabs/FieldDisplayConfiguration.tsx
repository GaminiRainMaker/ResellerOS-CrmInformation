'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {dummyData} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Row, Space} from 'antd';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {TabContainerStyle} from './styled-components';
import {getAllTableColumn} from '../../../../../../../../redux/actions/tableColumn';

const FieldDisplayConfiguration = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: tableColumnData, loading} = useAppSelector(
    (state) => state.tableColumn,
  );
  const [selectedTable, setSelectedTable] = useState<String>();
  const [tableColumnDataShow, setTableColumnDataShow] = useState<[]>();

  const [updateColumn, setUpdateColumn] = useState<any>();
  useEffect(() => {
    dispatch(getAllTableColumn(''));
  }, []);

  useEffect(() => {
    let filteredArray: any = [];
    if (tableColumnData && selectedTable) {
      filteredArray = tableColumnData?.filter(
        (item: any) => item?.table_name?.includes(selectedTable),
      );
    }

    setTableColumnDataShow(filteredArray);
  }, [selectedTable]);
  console.log('43535', updateColumn);

  const FieldDisplayConfigurationFields = [
    {
      title: 'S No.',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Field Name',
      dataIndex: 'field_name',
      key: 'field_name',
      // render: (text: string) => (
      //   <CommonSelect
      //     style={{width: '100%', height: '36px'}}
      //     placeholder="Select"
      //     defaultValue={text}
      //     onChange={(v) => {}}
      //     options={[]}
      //   />
      // ),
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
            if (e.target?.checked) {
              setUpdateColumn({
                ...updateColumn,
                is_required: true,
                id: record?.id,
              });
            } else {
              setUpdateColumn({
                ...updateColumn,
                is_required: false,
              });
            }
          }}
        />
      ),
      width: 313,
    },
    {
      title: 'Editable',
      dataIndex: 'is_editable',
      key: 'is_editable',
      render: (text: any) => <Checkbox defaultChecked={text} />,
      width: 313,
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (text: any) => (
        <Switch defaultChecked={text} size="default" onChange={() => {}} />
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
                      // rowSelection={rowSelection}
                      tableSelectionType="checkbox"
                      columns={FieldDisplayConfigurationFields}
                      dataSource={dummyData}
                      scroll
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
        <OsButton text="Save" buttontype="PRIMARY" clickHandler={() => {}} />
      </footer>
    </TabContainerStyle>
  );
};
export default FieldDisplayConfiguration;
