'use client';

import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {opportunityOptions, quoteOptions} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Row, Space} from 'antd';
import {useEffect, useState} from 'react';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {
  deleteSyncTableRow,
  getAllSyncTable,
  insertUpdateSyncTable,
} from '../../../../../../../../redux/actions/syncTable';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {TabContainerStyle} from './styled-components';

const SyncQuoteField = () => {
  const [token] = useThemeToken();

  const dispatch = useAppDispatch();
  const {data: syncTableData, loading} = useAppSelector(
    (state) => state.syncTable,
  );

  const [updatedColumnforQuoteSync, setUpdatedColumnforQuoteSync] =
    useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  const [quoteFilteredOption, setQuoteOptions] = useState<any>();
  const [opportunityFilteredOption, setOpportunityOIptions] = useState<any>();

  useEffect(() => {
    const quoteLine: any = [];
    const opportunity: any = [];

    // eslint-disable-next-line array-callback-return
    updatedColumnforQuoteSync?.map((item: any) => {
      if (
        item?.reciver_table_col !== undefined &&
        item?.sender_table_col !== undefined
      ) {
        opportunity?.push(item?.reciver_table_col);
        quoteLine?.push(item?.sender_table_col);
      }
    });
    const quoteFiltered = quoteOptions?.filter(
      (item) => !quoteLine.includes(item?.value),
    );
    const opportunityFiltered = opportunityOptions?.filter(
      (item) => !opportunity.includes(item?.value),
    );

    setOpportunityOIptions(opportunityFiltered);
    setQuoteOptions(quoteFiltered);
  }, [updatedColumnforQuoteSync]);

  const deleteRowSync = (id: any) => {
    dispatch(deleteSyncTableRow(id));
    setTimeout(() => {
      dispatch(getAllSyncTable('Quote'));
    }, 1000);
  };

  useEffect(() => {
    dispatch(getAllSyncTable('Quote'));
  }, []);

  useEffect(() => {
    setUpdatedColumnforQuoteSync(syncTableData);
  }, [syncTableData]);

  const updateTableColumnValues = async () => {
    for (let i = 0; i < updatedColumnforQuoteSync?.length; i++) {
      const dataItems = updatedColumnforQuoteSync[i];
      dispatch(insertUpdateSyncTable(dataItems));
    }
    setTimeout(() => {
      dispatch(getAllSyncTable('Quote'));
    }, 1000);
  };
  const commonMethodForChecks = (
    ids: any,
    names: any,
    valuess: any,
    keys: any,
  ) => {
    const previousArray =
      updatedColumnforQuoteSync?.length > 0
        ? [...updatedColumnforQuoteSync]
        : [];
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
    setUpdatedColumnforQuoteSync(previousArray);
  };

  const addNewRow = () => {
    const newArr =
      updatedColumnforQuoteSync?.length > 0
        ? [...updatedColumnforQuoteSync]
        : [];
    newArr?.push({
      // eslint-disable-next-line no-unsafe-optional-chaining
      key:
        updatedColumnforQuoteSync?.length > 0
          ? // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/indent
            updatedColumnforQuoteSync?.length + 1
          : 0,
      sender_table_name: 'Quote',
      reciver_table_name: 'Opportunity',
      organization: userInformation?.organization,
    });
    setUpdatedColumnforQuoteSync(newArr);
  };
  const SyncQuoteFields = [
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
          Quote
        </Typography>
      ),
      dataIndex: 'product_code',
      key: 'product_code',
      render: (text: string, record: any) => (
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
          options={record?.id ? quoteOptions : quoteFilteredOption}
        />
      ),
      width: 470,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
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
          options={record?.id ? opportunityOptions : opportunityFilteredOption}
        />
      ),
      width: 470,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Active
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
                label: <Typography name="Body 2/Medium">Sync Quote</Typography>,
                children: (
                  <Space size={24} direction="vertical" style={{width: '100%'}}>
                    <OsTableWithOutDrag
                      loading={false}
                      // rowSelection={rowSelection}
                      tableSelectionType="checkbox"
                      columns={SyncQuoteFields}
                      dataSource={updatedColumnforQuoteSync}
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
export default SyncQuoteField;
