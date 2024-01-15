/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsPieChart from '@/app/components/common/os-piechart';
import Typography from '@/app/components/common/typography';
import {totalRevenue, useRemoveDollarAndCommahook} from '@/app/utils/base';
import React, {FC, useEffect, useState} from 'react';

const Matrix: FC<any> = (familyFilter: any) => {
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
        : '--',
      pieData: [
        {id: 1001, name: 'Unassigned', value: 400, color: '#2364AA'},
        {id: 1002, name: 'Professional Services', value: 300, color: '#6C97C6'},
        {id: 1003, name: 'Subscriptions', value: 300, color: '#9AB8D8'},
        {id: 1004, name: 'Pricing method', value: 200, color: '#BBCFE5'},
        {id: 1005, name: 'Maintenances', value: 200, color: '#1C3557'},
      ],
    },
    {
      id: 102,
      name: 'Profit by Product Category',
      filterOption: familyFilter?.selectedFilter
        ? familyFilter?.selectedFilter
        : '--',
      pieData: [
        {id: 1001, name: 'Unassigned', value: 400, color: '#2364AA'},
        {id: 1002, name: 'Professional Services', value: 300, color: '#6C97C6'},
        {id: 1003, name: 'Subscriptions', value: 300, color: '#9AB8D8'},
        {id: 1004, name: 'Pricing method', value: 200, color: '#BBCFE5'},
        {id: 1005, name: 'Maintenances', value: 200, color: '#1C3557'},
      ],
    },
  ]);

  const getPieCellColor = (name: string) => {
    if (name === 'Unassigned') return '#2364AA';
    if (name === 'Professional Services') return '#6C97C6';
    if (name === 'Subscriptions') return '#9AB8D8';
    if (name === 'Pricing method') return '#BBCFE5';
    if (name === 'Maintenances') return '#1C3557';
  };

  useEffect(() => {
    if (familyFilter.familyFilter.length > 0) {
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

      familyFilter.familyFilter.forEach((element: any) => {
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

        tempArrRevenue.push({
          id: 1,
          name: element.name,
          value: Math.floor(totalRevenueValue) ?? 0,
          color: getPieCellColor(element.name) ?? '',
        });
        tempArrProfit.push({
          id: 1,
          name: element.name,
          value: Math.floor(totalProfitValue) ?? 0,
          color: getPieCellColor(element.name) ?? '',
        });
      });

      // setPieData(tempArr);

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
    <Row gutter={[24, 24]} justify="space-between">
      {sectionData.map((item) => (
        <div
          style={{
            padding: '12px',
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
                  : '--'}
              </Typography>
            </Space>

            <OsPieChart data={item.pieData} />
          </Col>
        </div>
      ))}
    </Row>
  );
};

export default Matrix;
