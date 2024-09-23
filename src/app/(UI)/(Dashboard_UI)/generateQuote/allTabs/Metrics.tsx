'use client';

import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsPieChart from '@/app/components/common/os-piechart';
import Typography from '@/app/components/common/typography';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../redux/hook';
import { Col, Row } from '@/app/components/common/antd/Grid';

const Matrix: FC<any> = ({ selectedFilter }) => {
  const [token] = useThemeToken();
  const { data: profitabilityDataByQuoteId } = useAppSelector(
    (state) => state.profitability,
  );
  const [finalData, setFinalData] = useState<any>();
  const filterDataByValue = (data: any, filterValue: string) => {
    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name;
      if (filterValue === 'Product Family') {
        name = item?.Product?.product_family || 'Unassigned';
      } else if (filterValue === 'Pricing Method') {
        name = item?.pricing_method || 'Unassigned';
      } else if (filterValue === 'File Name') {
        name = item?.QuoteLineItem?.QuoteFile?.file_name;
      } else if (filterValue === 'Vendor/Disti') {
        name =
          item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Distributor
            ?.distribu;
      } else if (filterValue === 'OEM') {
        name = item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Oem?.oem;
      }
      if (name) {
        const convertToTitleCase = (input: string) => {
          if (!input) {
            return '';
          }
          return input
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char?.toUpperCase());
        };

        if (name?.includes('_') || name === name?.toLowerCase()) {
          name = convertToTitleCase(name);
        }

        if (!groupedData[name]) {
          groupedData[name] = { name: name, QuoteLineItem: [] };
        }
        groupedData[name]?.QuoteLineItem?.push(item);
      }
    });
    setFinalData(Object.values(groupedData));
  };
  useEffect(() => {
    filterDataByValue(profitabilityDataByQuoteId, selectedFilter);
  }, [selectedFilter, profitabilityDataByQuoteId]);

  const colorPalette: { [key: string]: string } = {
    Unassigned: token?.colorInfo,
    'List Percentage': token?.colorInfo,
    'Professional Services': '#2B759A',
    'Cost Dollar': '#2B759A',
    'List Dollar': '#495D79',
    Subscriptions: '#31576F',
    'Cost Percentage': '#31576F',
    Products: token?.colorPrimary,
    Manual: token?.colorPrimary,
    Maintenance: token?.colorTextDisabled,
    Gp: token?.colorTextDisabled,
  };
  const randomColors: string[] = [
    token?.colorPrimary,
    token?.colorInfo,
    token?.colorTextDisabled,
    '#2B759A',
    '#495D79',
    '#31576F',
  ];
  let colorIndex = 0;
  const getPieCellColor = (name: string) => {
    if (!colorPalette[name]) {
      colorPalette[name] = randomColors[colorIndex];
      colorIndex = (colorIndex + 1) % randomColors.length;
    }
    return colorPalette[name];
  };
  const [sectionData, setSectionData] = useState<any[]>([
    {
      id: 101,
      name: 'Revenue by Product Category',
      pieData: [],
    },
    {
      id: 102,
      name: 'Profit by Product Category',
      pieData: [],
    },
  ]);

  useEffect(() => {
    if (finalData && finalData.length > 0) {
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

      finalData?.forEach((element: any) => {
        let totalRevenueValue = 0;
        let totalProfitValue = 0;
        let revenue = 0;
        let profitValue = 0;
        element?.QuoteLineItem?.forEach((QuoteLineItemData: any) => {
          const { exit_price, gross_profit } = QuoteLineItemData;
          if (QuoteLineItemData?.Bundle) {
            revenue =
              Number(exit_price) ?? 1 *
              Number(QuoteLineItemData?.Bundle?.quantity) ?? 1;
            profitValue =
              Number(gross_profit) ?? 1 *
              Number(QuoteLineItemData?.Bundle?.quantity) ?? 1;
          } else {
            revenue = Number(exit_price) ?? 1;
            profitValue = Number(gross_profit) ?? 1;
          }
          totalRevenueValue += revenue;
          totalProfitValue += profitValue;
        });

        if (totalRevenueValue > 0) {
          tempArrRevenue.push({
            id: element.name,
            name: element.name,
            value: totalRevenueValue ?? 0,
            color: getPieCellColor(element.name) ?? '',
          });
        }

        if (totalProfitValue > 0) {
          tempArrProfit.push({
            id: element.name,
            name: element.name,
            value: totalProfitValue ?? 0,
            color: getPieCellColor(element.name) ?? '',
          });
        }
      });

      setSectionData((prev) =>
        prev.map((prevItem) => {
          if (prevItem.name === 'Revenue by Product Category') {
            return { ...prevItem, pieData: tempArrRevenue };
          } else {
            return { ...prevItem, pieData: tempArrProfit };
          }
        }),
      );
    }
  }, [finalData]);

  const style: React.CSSProperties = {
    padding: '18px',
    background: '#f6f7f8',
    borderRadius: '12px',
  };

  return (
    <>
      {finalData?.length > 0 ? (
        <Row gutter={[16, 16]} justify={'space-between'}>
          {sectionData &&
            sectionData?.map((item) => {
              let word = item?.name?.split(' ')[0].toLowerCase();
              return (
                <Col key={item.id} md={24} lg={24} xl={12} xxl={12}>
                  <div style={style}>
                    <Space direction="vertical">
                      <Typography name="Body 1/Regular">{item.name}</Typography>
                      {item.pieData?.length > 0 && (
                        <Typography name="Body 3/Regular">
                          {selectedFilter ? `(${selectedFilter})` : '(--)'}
                        </Typography>
                      )}
                    </Space>
                    {item.pieData?.length > 0 ? (
                      <OsPieChart data={item.pieData} />
                    ) : (
                      <EmptyContainer
                        title={`There is no ${word} available for ${selectedFilter ? `(${selectedFilter})` : '(--)'}`}
                        MetricsIcon
                      />
                    )}
                  </div>
                </Col>
              );
            })}
        </Row>
      ) : (
        <EmptyContainer
          title={
            selectedFilter
              ? 'There is no data to show on Metrics'
              : 'Please Select Grouping to view Metrics'
          }
          MetricsIcon
        />
      )}
    </>
  );
};

export default Matrix;
