'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {formatDate, getResultedValue} from '@/app/utils/base';
import {HotTable} from '@handsontable/react';
import {ArrowDownTrayIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useRef, useState} from 'react';
import {updateProfitabilityById} from '../../../../../redux/actions/profitability';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {updateQuoteLineItemById} from '../../../../../redux/actions/quotelineitem';
import {updateRebateQuoteLineItemById} from '../../../../../redux/actions/rebateQuoteLineitem';
import {updateValidationById} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {registerAllModules} from 'handsontable/registry';

registerAllModules();

const UpdateGenerateQuote = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getUserID = searchParams.get('id');
  const {quoteById, loading} = useAppSelector((state) => state.quote);
  const {concernQuoteLineItemData} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [inputData, setInputData] = useState<any>(concernQuoteLineItemData);
  const router = useRouter();
  const hotRef = useRef(null);

  useEffect(() => {
    dispatch(getQuoteById(Number(getUserID)));
  }, []);

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push(
              `/generateQuote?id=${getUserID}&isView=${getResultedValue()}`,
            );
          }}
        >
          All Quotes
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography name="Body 2/Medium" color={token?.colorInfoBorder}>
          Update Quote Line Items
        </Typography>
      ),
    },
    {
      key: '3',
      title: (
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {quoteById?.file_name ??
            formatDate(quoteById?.createdAt, 'MM/DD/YYYY')}
        </Typography>
      ),
    },
  ];

  const InputDetailQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_number: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 80,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 130,
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, product_code: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, quantity: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 80,
    },
    {
      title: 'MSRP',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 150,
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, list_price: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 150,
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, adjusted_price: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 150,
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_amount: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setInputData((prev: any) =>
              prev?.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, description: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
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
            // onClick={() => {
            //   setSelectedRowIds([record?.id]);
            //   setIsDeleteInputDetailModal(true);
            // }}
          />
        </Space>
      ),
    },
  ];

  const generateUpdateObject = (resultItem: any) => ({
    line_number: resultItem?.line_number,
    product_code: resultItem?.product_code,
    quantity: resultItem?.quantity,
    adjusted_price: resultItem?.adjusted_price,
    line_amount: resultItem?.line_amount,
    list_price: resultItem?.list_price,
    description: resultItem?.description,
  });

  const updateEntityById = (
    updateAction: any,
    entityToUpdate: any,
    resultItem: any,
  ) => {
    if (entityToUpdate) {
      const obj = {
        id: entityToUpdate?.id,
        ...generateUpdateObject(resultItem),
      };
      dispatch(updateAction(obj));
    }
  };

  const updateData = () => {
    inputData.forEach((resultItem: any) => {
      updateEntityById(
        updateQuoteLineItemById,
        quoteById?.QuoteLineItems.find(
          (item: any) => item.id === resultItem.id,
        ),
        resultItem,
      );
      updateEntityById(
        updateProfitabilityById,
        quoteById?.Profitabilities.find(
          (item: any) => item.quoteline_item_id === resultItem.id,
        ),
        resultItem,
      );
      updateEntityById(
        updateRebateQuoteLineItemById,
        quoteById?.RebatesQuoteLineItems.find(
          (item: any) => item.quoteline_item_id === resultItem.id,
        ),
        resultItem,
      );
      updateEntityById(
        updateValidationById,
        quoteById?.Validations.find(
          (item: any) => item.quoteline_item_id === resultItem.id,
        ),
        resultItem,
      );
    });
    router?.push(`/generateQuote?id=${getUserID}&isView=${getResultedValue()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Space size={24} direction="vertical">
        <Row justify="space-between" align="middle">
          <Col>
            <OsBreadCrumb items={menuItems} />
          </Col>
          <Col>
            <Space size={8} direction="horizontal">
              <OsButton
                loading={loading}
                text="Save"
                buttontype="SECONDARY"
                clickHandler={() => {
                  updateData();
                }}
              />

              <OsButton
                buttontype="PRIMARY_ICON"
                clickHandler={() => {}}
                icon={<ArrowDownTrayIcon width={24} />}
              />
            </Space>
          </Col>
        </Row>
        <Row style={{overflow: 'auto'}}>
          <Col span={24}>
            <HotTable
              data={inputData}
              ref={hotRef}
              colWidths={200}
              columnHeaderHeight={40}
              height="auto"
              // colHeaders={InputDetailQuoteLineItemcolumns}
              width="auto"
              minSpareRows={0}
              autoWrapRow
              autoWrapCol
              licenseKey="non-commercial-and-evaluation"
              dropdownMenu
              hiddenColumns={{
                indicators: true,
              }}
              contextMenu
              multiColumnSorting
              filters
              rowHeaders
              allowInsertRow={false}
              allowInsertColumn
              // afterGetColHeader={alignHeaders}
              // beforeRenderer={() => {
              //   addClassesToRows('', '', '', '', '', '', quoteItems);
              // }}
              // afterRemoveRow={(change, source) => {
              //   deleteRowsItems(source, change);
              // }}
              // afterChange={(change: any, source) => {
              //   if (change) {
              //     updateRowsValue(
              //       change?.[0]?.[0],
              //       change?.[0]?.[1],
              //       change?.[0]?.[3],
              //     );
              //   }
              // }}
              navigableHeaders
            />
          </Col>
        </Row>
      </Space>
    </Suspense>
  );
};

export default UpdateGenerateQuote;
