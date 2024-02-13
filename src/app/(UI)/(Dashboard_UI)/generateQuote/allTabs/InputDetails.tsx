/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Space} from '@/app/components/common/antd/Space';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {FC, useEffect, useState} from 'react';
import {TrashIcon} from '@heroicons/react/24/outline';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {
  getQuoteLineItemByQuoteIdandBundleIdNull,
  updateQuoteLineItemForBundleId,
} from '../../../../../../redux/actions/quotelineitem';
import {getAllBundle} from '../../../../../../redux/actions/bundle';

const InputDetails: FC<any> = ({tableColumnDataShow}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [finalInputColumn, setFinalInputColumn] = useState<any>();
  const {quoteLineItemByQuoteID, loading} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] = useState<any>(
    quoteLineItemByQuoteID,
  );

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const deleteQuote = async (id: number) => {
    if (id) {
      const data = {
        Ids: [id],
        bundle_id: null,
      };
      await dispatch(updateQuoteLineItemForBundleId(data));
      // dispatch(getQuoteLineItemByQuoteIdandBundleIdNull(Number(getQuoteID)));
      // dispatch(getAllBundle(getQuoteID));
    }
  };

  const InputDetailQuoteLineItemcolumns = [
    {
      title: 'Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any, record: any) => (
        <OsInput
          disabled={renderEditableInput('Line')}
          style={{
            height: '36px',
          }}
          placeholder={text}
          value={
            !selectTedRowIds?.includes(record?.id)
              ? text * (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
              : quoteLineItemByQuoteData?.line_number
          }
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_number: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 130,
    },
    {
      title: 'Product Code',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 187,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={renderEditableInput('Qty')}
          // value={
          //   // eslint-disable-next-line no-unsafe-optional-chaining
          //   text *
          //   (!isEditable && record?.Bundle?.quantity
          //     ? record?.Bundle?.quantity
          //     : 1)
          // }
          placeholder={text}
          value={
            !selectTedRowIds?.includes(record?.id)
              ? text * (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
              : quoteLineItemByQuoteData?.quantity
          }
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, quantity: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 187,
    },
    {
      title: 'MSRP',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
      render: (text: any, record: any) => {
        let doubleVal: any;

        return <>{record?.Bundle?.quantity ? record?.Bundle?.quantity : 1}</>;
      },
    },
    {
      title: 'Cost',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 187,
      render: (text: any, record: any) => {
        const totalAddedPrice = record?.Product?.list_price
          ?.slice(1, record?.Product?.list_price?.length)
          .replace(',', '');
        // eslint-disable-next-line no-unsafe-optional-chaining
        const ExactPriceForOne = totalAddedPrice / record?.Product?.quantity;
        let bundleQuantity: any = 1;
        bundleQuantity = record?.Bundle ? record?.Bundle?.quantity : 1;
        const totalQuantity = record?.quantity * bundleQuantity;
        const TotalPrice = totalQuantity * ExactPriceForOne;

        return <>${TotalPrice}</>;
      },
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render(text: any, record: any) {
        return {
          props: {
            style: {
              background: selectTedRowIds?.includes(record?.id)
                ? '#E8EBEE'
                : ' ',
            },
          },
          children: (
            <CommonSelect
              disabled={renderEditableInput('Product Family')}
              style={{width: '200px'}}
              placeholder="Select"
              defaultValue={record?.Product?.product_family}
              options={selectDataForProduct}
              onChange={(e) => {
                const data = {id: record?.product_id, product_family: e};
                dispatch(updateProductFamily(data));
              }}
            />
          ),
        };
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
          />
          {/* <PopConfirm
            placement="top"
            title=""
            description="Are you sure you want to delete this Quote Line Item?"
            onConfirm={() => {
              deleteQuote(record?.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon
              height={24}
              width={24}
              color={token.colorError}
              style={{cursor: 'pointer'}}
            />
          </PopConfirm> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const newArr: any = [];
    InputDetailQuoteLineItemcolumns?.map((itemCol: any) => {
      let countForDel: any = 0;
      tableColumnDataShow?.filter((item: any) => {
        if (item?.field_name?.includes(itemCol?.title)) {
          newArr?.push(itemCol);
        } else if (itemCol?.title?.includes('Actions') && countForDel === 0) {
          newArr?.push(itemCol);
          // eslint-disable-next-line operator-assignment
          countForDel = countForDel + 1;
        }
      });
      // if (itemCol?.dataIndex?.includes('actions')) {
      //   newArr?.push(itemCol);
      // }
    });
    // actions
    setFinalInputColumn(newArr);
  }, [tableColumnDataShow]);

  return (
    <OsTableWithOutDrag
      loading={loading}
      columns={finalInputColumn}
      dataSource={quoteLineItemByQuoteData}
      scroll
    />
  );
};

export default InputDetails;
