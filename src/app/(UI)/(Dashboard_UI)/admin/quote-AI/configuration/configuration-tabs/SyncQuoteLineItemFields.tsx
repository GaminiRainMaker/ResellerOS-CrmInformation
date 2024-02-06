'use client';

import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {quoteAndOpportunityLineItemOptions} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Row, Space, Table} from 'antd';
import {useEffect, useState} from 'react';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {TabContainerStyle} from './styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {
  getAllSyncTable,
  insertUpdateSyncTable,
  deleteSyncTableRow,
} from '../../../../../../../../redux/actions/syncTable';
import {getUserByTokenAccess} from '../../../../../../../../redux/actions/user';

const SyncQuoteLineItemField = () => {
  const [token] = useThemeToken();

  const dispatch = useAppDispatch();
  const {data: syncTableData, loading} = useAppSelector(
    (state) => state.syncTable,
  );

  const [updateColumn, setUpdateColumn] = useState<any>();
  const [quoteLineItemFilteredOption, setQuoteLineItemFilteredOption] =
    useState<any>();
  const [
    opportunityLineItemFilteredOption,
    setOpportunityeLineItemFilteredOption,
  ] = useState<any>();
  const {data: userDetails} = useAppSelector((state) => state.user);

  useEffect(() => {
    const quoteLine: any = [];
    const opportunity: any = [];

    // eslint-disable-next-line array-callback-return
    updateColumn?.map((item: any) => {
      if (
        item?.reciver_table_col !== undefined &&
        item?.sender_table_col !== undefined
      ) {
        opportunity?.push(item?.reciver_table_col);
        quoteLine?.push(item?.sender_table_col);
      }
    });
    const quoteLineItemOptionFiltered =
      quoteAndOpportunityLineItemOptions?.filter(
        (item) => !quoteLine.includes(item?.value),
      );
    const opportunityLineItemOptionFiltered =
      quoteAndOpportunityLineItemOptions?.filter(
        (item) => !opportunity.includes(item?.value),
      );

    setOpportunityeLineItemFilteredOption(opportunityLineItemOptionFiltered);
    setQuoteLineItemFilteredOption(quoteLineItemOptionFiltered);
  }, [updateColumn]);

  useEffect(() => {
    dispatch(getUserByTokenAccess(''));
  }, []);

  const deleteRowSync = (id: any) => {
    dispatch(deleteSyncTableRow(id));
    setTimeout(() => {
      dispatch(getAllSyncTable('QuoteLineItem'));
    }, 1000);
  };

  useEffect(() => {
    dispatch(getAllSyncTable('QuoteLineItem'));
  }, []);
  useEffect(() => {
    setUpdateColumn(syncTableData);
  }, [syncTableData]);

  const updateTableColumnValues = async () => {
    for (let i = 0; i < updateColumn?.length; i++) {
      const dataItems = updateColumn[i];
      dispatch(insertUpdateSyncTable(dataItems));
    }
    setTimeout(() => {
      dispatch(getAllSyncTable('QuoteLineItem'));
    }, 1000);
  };

  const commonMethodForChecks = (
    ids: any,
    names: any,
    valuess: any,
    keys: any,
  ) => {
    const previousArray: any =
      updateColumn?.length > 0 ? [...updateColumn] : [];
    if (previousArray?.length > 0) {
      let indexOfCurrentId: any;
      if (ids) {
        indexOfCurrentId = previousArray?.findIndex(
          (item: any) => item?.id === ids,
        );
      } else {
        indexOfCurrentId = previousArray?.findIndex(
          (item: any) => item?.key === keys,
        );
      }

      if (indexOfCurrentId === -1) {
        let newObj: any;
        if (ids) {
          newObj = {
            id: ids,
            [names]: valuess,
          };
        } else {
          newObj = {
            key: keys,
            [names]: valuess,
          };
        }
        previousArray?.push(newObj);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // previousArray?.[indexOfCurrentId]?.names = valuess;
        let newObj = previousArray[indexOfCurrentId];
        newObj = {
          ...newObj,
          [names]: valuess,
        };
        previousArray[indexOfCurrentId] = newObj;
      }
    } else {
      let newObj: any;
      if (ids) {
        newObj = {
          id: ids,
          [names]: valuess,
        };
      } else {
        newObj = {
          key: keys,
          [names]: valuess,
        };
      }
      previousArray?.push(newObj);
    }
    setUpdateColumn(previousArray);
  };

  const addNewRow = () => {
    const newArr = updateColumn?.length > 0 ? [...updateColumn] : [];
    newArr?.push({
      // eslint-disable-next-line no-unsafe-optional-chaining
      key: updateColumn?.length > 0 ? updateColumn?.length + 1 : 0,
      sender_table_name: 'QuoteLineItem',
      reciver_table_name: 'OpportunityLineItem',
      organization: userDetails?.organization,
    });
    setUpdateColumn(newArr);
  };

  const SyncQuoteLineItemFields = [
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
          Quote Line Item Fields
        </Typography>
      ),
      dataIndex: 'product_code',
      key: 'product_code',
      render: (text: string, record: any) => (
        <>
          {' '}
          <CommonSelect
            style={{width: '100%', height: '36px'}}
            placeholder="Select"
            value={record?.sender_table_col}
            onChange={(e) => {
              if (record?.id) {
                commonMethodForChecks(record?.id, 'sender_table_col', e, '');
              } else {
                commonMethodForChecks(
                  '',
                  // eslint-disable-next-line no-unsafe-optional-chaining

                  'sender_table_col',
                  e,
                  record?.key,
                );
              }
            }}
            options={opportunityLineItemFilteredOption}
          />
        </>
      ),
      width: 470,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity Line Item Fields
        </Typography>
      ),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string, record: any) => (
        <CommonSelect
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          value={record?.reciver_table_col}
          onChange={(e) => {
            if (record?.id) {
              commonMethodForChecks(
                record?.id,
                'reciver_table_col',
                e,
                record?.key,
              );
            } else {
              commonMethodForChecks(
                // eslint-disable-next-line no-unsafe-optional-chaining
                '',
                'reciver_table_col',
                e,
                record?.key,
              );
            }
          }}
          options={quoteLineItemFilteredOption}
        />
      ),
      width: 470,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Active{' '}
        </Typography>
      ),
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      render: (text: string, record: any) => (
        <Switch
          size="default"
          defaultChecked={record?.is_required}
          onChange={(e) => {
            if (record?.id) {
              commonMethodForChecks(record?.id, 'is_required', e, record?.key);
            } else {
              commonMethodForChecks(
                // eslint-disable-next-line no-unsafe-optional-chaining
                '',
                'is_required',
                e,
                record?.key,
              );
            }
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
            deleteRowSync(record?.id);
          }}
        />
      ),
    },
  ];

  return (
    <TabContainerStyle>
      <Row>
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
          <OsCollapseAdmin
            items={[
              {
                key: '1',
                label: (
                  <Typography name="Body 2/Medium">
                    Sync Quote Line Item
                  </Typography>
                ),
                children: (
                  <Space size={24} direction="vertical" style={{width: '100%'}}>
                    <OsTableWithOutDrag
                      loading={false}
                      // rowSelection={rowSelection}
                      tableSelectionType="checkbox"
                      columns={SyncQuoteLineItemFields}
                      dataSource={updateColumn}
                      scroll
                    />
                    <div style={{width: 'max-content', float: 'right'}}>
                      <OsButton
                        text="Add Field"
                        buttontype="PRIMARY"
                        icon={<PlusIcon width={24} />}
                        clickHandler={addNewRow}
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
export default SyncQuoteLineItemField;
