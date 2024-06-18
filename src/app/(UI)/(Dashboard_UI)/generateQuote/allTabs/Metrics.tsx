/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsPieChart from '@/app/components/common/os-piechart';
import Typography from '@/app/components/common/typography';
import {totalRevenue, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';

// const Matrix: FC<any> = ({familyFilter}) => {
const Matrix: FC<any> = ({familyFilter}) => {
  const [token] = useThemeToken();
  const [sectionData, setSectionData] = useState<
    {
      id: number | string;
      name: string;
      filterOption: string;
      pieData: {
        id: number | string;
        name: string;
        value: number;
        color: string;
      }[];
    }[]
  >([
    {
      id: 101,
      name: 'Revenue by Product Category',
      filterOption: familyFilter?.selectedFilter
        ? familyFilter?.selectedFilter
        : '',
      pieData: [
        {id: 1001, name: 'Unassigned', value: 400, color: token?.colorInfo},
        {
          id: 1002,
          name: 'Professional Services',
          value: 300,
          color: token?.colorBorderSecondary,
        },
        {id: 1003, name: 'Subscriptions', value: 300, color: '#9AB8D8'},
        {
          id: 1004,
          name: 'Products',
          value: 200,
          color: token?.colorPrimary,
        },
        {
          id: 1005,
          name: 'Maintenances',
          value: 200,
          color: token?.colorTextDisabled,
        },
      ],
    },
    {
      id: 102,
      name: 'Profit by Product Category',
      filterOption: familyFilter?.selectedFilter
        ? familyFilter?.selectedFilter
        : '',
      pieData: [
        {id: 1001, name: 'Unassigned', value: 400, color: token?.colorInfo},
        {
          id: 1002,
          name: 'Professional Services',
          value: 300,
          color: token?.colorBorderSecondary,
        },
        {id: 1003, name: 'Subscriptions', value: 300, color: '#9AB8D8'},
        {
          id: 1004,
          name: 'Products',
          value: 200,
          color: token?.colorPrimary,
        },
        {
          id: 1005,
          name: 'Maintenances',
          value: 200,
          color: token?.colorTextDisabled,
        },
      ],
    },
  ]);

  console.log('3543532432532', familyFilter);

  const getPieCellColor = (name: string) => {
    if (name === 'Unassigned') return token?.colorInfo;
    if (name === 'Professional Services') return token?.colorBorderSecondary;
    if (name === 'Subscriptions') return '#9AB8D8';
    if (name === 'Products') return token?.colorPrimary;
    if (name === 'Maintenances') return token?.colorTextDisabled;
  };
  console.log('familyFilterfamilyFilter1111', familyFilter);
  useEffect(() => {
    if (familyFilter.length > 0) {
      const tempArrRevenue: {
        id: number | string;
        name: string;
        value: number;
        color: string;
      }[] = [];
      const tempArrProfit: {
        id: number | string;
        name: string;
        value: number;
        color: string;
      }[] = [];

      familyFilter.forEach((element: any) => {
        let totalRevenueValue = 0;
        let totalProfitValue = 0;
        element?.QuoteLineItem?.map((QuoteLineItemData: any) => {
          const {line_amount, quantity, list_price} =
            QuoteLineItemData?.Product;

          const revenue = totalRevenue(
            useRemoveDollarAndCommahook(line_amount),
            Number(quantity),
          );
          const ProfitValue =
            useRemoveDollarAndCommahook(line_amount) -
            useRemoveDollarAndCommahook(list_price);
          totalRevenueValue += revenue;
          totalProfitValue += ProfitValue;
        });

        totalRevenueValue > 0 &&
          tempArrRevenue.push({
            id: 1,
            name: element.name,
            value: Math.floor(totalRevenueValue) ?? 0,
            color: getPieCellColor(element.name) ?? '',
          });

        totalProfitValue > 0 &&
          tempArrProfit.push({
            id: 1,
            name: element.name,
            value: Math.floor(totalProfitValue) ?? 0,
            color: getPieCellColor(element.name) ?? '',
          });
      });
      setSectionData((prev) =>
        prev.map((prevItem) => {
          if (prevItem.name === 'Revenue by Product Category') {
            return {...prevItem, pieData: tempArrRevenue};
          }
          return {...prevItem, pieData: tempArrProfit};
        }),
      );
    }
  }, [familyFilter]);

  return (
    <>
      {familyFilter?.familyFilter?.length > 0 ? (
        <Row gutter={[24, 24]} justify="space-between">
          {sectionData.map((item) => (
            <div
              style={{
                padding: '18px',
                background: '#f6f7f8',
                borderRadius: '12px',
              }}
              key={item.id}
            >
              <Col>
                <Space direction="vertical">
                  <Typography name="Body 1/Regular">{item.name}</Typography>
                  <Typography name="Body 3/Regular">
                    {familyFilter?.selectedFilter
                      ? `(${familyFilter?.selectedFilter})`
                      : ''}
                  </Typography>
                </Space>

                <OsPieChart data={item.pieData} />
              </Col>
            </div>
          ))}
        </Row>
      ) : (
        <EmptyContainer
          title="Please Select Grouping to view Metrics"
          MetricsIcon
        />
      )}
    </>
  );
};

export default Matrix;
