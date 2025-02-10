/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
import {Col, Row} from '@/app/components/common/antd/Grid';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {
  CurrencyDollarIcon,
  QueueListIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC, useEffect, useState} from 'react';
import MoneyRecive from '../../../../../public/assets/static/money-recive.svg';
import MoneySend from '../../../../../public/assets/static/money-send.svg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {updateQuoteById} from '../../../../../redux/actions/quote';
import {useSearchParams} from 'next/navigation';

const GenerateQuoteAnalytics: FC<any> = ({totalValues, setTotalValues}) => {
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const dispatch = useAppDispatch();
  const [totalRebateAmount, setTotalRebateAmount] = useState<any>();
  const {data: profitabilityDataByQuoteId} = useAppSelector(
    (state) => state.profitability,
  );
  const {rebateQuoteLine} = useAppSelector(
    (state) => state.rebateQuoteLineItem,
  );
  const {abbreviate} = useAbbreviationHook(0);

  useEffect(() => {
    let rebateAmount: any = 0;
    rebateQuoteLine?.map((item: any) => {
      if (item?.rebate_amount) {
        rebateAmount += item?.rebate_amount ? item?.rebate_amount : 0;
      }
    });
    setTotalRebateAmount({
      totalRebateAmountData: rebateAmount,
    });
  }, [JSON.stringify(rebateQuoteLine)]);

  useEffect(() => {
    let grossProfit = 0;
    let bundleGrossProfit = 0;
    let grossProfitPercentage = 0;
    let exitPrice = 0;
    let bundleExitPrice = 0;
    let BundleAdjustedPrice = 0;
    let adjustedPrice = 0;
    if (profitabilityDataByQuoteId && profitabilityDataByQuoteId.length > 0) {
      const uniqueBundleIds = new Set();
      profitabilityDataByQuoteId.forEach((item: any) => {
        if (item?.bundle_id && !uniqueBundleIds.has(item.bundle_id)) {
          uniqueBundleIds.add(item.bundle_id);
          if (item?.Bundle?.gross_profit) {
            bundleGrossProfit += Number(item.Bundle.gross_profit);
          }
          if (item?.Bundle?.extended_price) {
            bundleExitPrice += Number(item.Bundle.extended_price);
          }
        } else if (!item?.bundle_id) {
          if (item?.gross_profit) {
            grossProfit += item.gross_profit;
          }
          if (item?.exit_price) {
            exitPrice += item.exit_price;
          }
          if (
            item?.adjusted_price !== undefined &&
            item?.quantity !== undefined
          ) {
            let temp: any;
            temp =
              Number(item?.adjusted_price) *
              (item?.quantity ? Number(item?.quantity) : 1);
            adjustedPrice += temp;
          }
        }

        if (item?.bundle_id) {
          if (
            item?.adjusted_price !== undefined &&
            item?.quantity !== undefined
          ) {
            let temp: any;
            temp =
              Number(item?.adjusted_price) *
              (item?.quantity ? Number(item?.quantity) : 1);
            BundleAdjustedPrice +=
              Number(temp) ?? 1 * Number(item.Bundle.quantity) ?? 1;
          }
        }
      });
    }
    let totalGrossProfit = grossProfit + bundleGrossProfit;
    let totalExitPrice = exitPrice + bundleExitPrice;

    if (totalExitPrice > 0) {
      grossProfitPercentage = (totalGrossProfit / totalExitPrice) * 100;
    }


    setTotalValues({
      GrossProfit: totalGrossProfit,
      GrossProfitPercentage: grossProfitPercentage,
      ExitPrice: totalExitPrice,
      TotalCost: adjustedPrice + BundleAdjustedPrice,
    });
  }, [JSON.stringify(profitabilityDataByQuoteId), profitabilityDataByQuoteId]);

  const [analyticsData, setAnalyticsData] = useState<any>();

  useEffect(() => {
    const analyticsDataa = [
      {
        key: 1,
        primary: profitabilityDataByQuoteId
          ? profitabilityDataByQuoteId?.length
          : 0,
        secondry: 'Line Items',
        icon: <QueueListIcon width={24} color={token?.colorInfo} />,
        iconBg: token?.colorInfoBgHover,
      },
      {
        key: 2,
        primary: `$${abbreviate(totalValues?.ExitPrice ?? 0)}`,
        secondry: 'Quote Total',
        icon: <TagIcon width={24} color={token?.colorSuccess} />,
        iconBg: token?.colorSuccessBg,
      },
      {
        key: 3,
        primary: `$${abbreviate(totalValues?.TotalCost ?? 0)}`,
        secondry: 'Total Cost',
        icon: <CurrencyDollarIcon width={24} color={token?.colorLink} />,
        iconBg: token?.colorLinkActive,
      },
      {
        key: 4,
        primary: `$${abbreviate(totalValues?.GrossProfit ?? 0)}`,
        secondry: 'Total GP',
        icon: (
          <Image
            src={MoneyRecive}
            alt="MoneyRecive"
            style={{cursor: 'pointer', height: '24px', width: '24px'}}
          />
        ),
        iconBg: token?.colorErrorBg,
      },
      {
        key: 5,
        primary: `${abbreviate(totalValues?.GrossProfitPercentage ?? 0)} %`,
        secondry: 'Total GP%',
        icon: <ReceiptPercentIcon width={24} color={token?.colorWarning} />,
        iconBg: token?.colorWarningBg,
      },
      {
        key: 6,
        primary: `$${abbreviate(totalRebateAmount?.totalRebateAmountData ?? 0)}`,
        secondry: 'Rebate Total',
        icon: (
          <Image
            src={MoneySend}
            alt="MoneySend"
            style={{cursor: 'pointer', height: '24px', width: '24px'}}
          />
        ),
        iconBg: token?.colorInfoHover,
      },
    ];
    setAnalyticsData(analyticsDataa);
  }, [
    JSON.stringify(profitabilityDataByQuoteId),
    profitabilityDataByQuoteId,
    totalValues,
  ]);

  useEffect(() => {
    if (totalValues && getQuoteID) {
      dispatch(
        updateQuoteById({
          quote_total: totalValues?.ExitPrice,
          total_cost: totalValues?.TotalCost,
          id: Number(getQuoteID),
        }),
      );
    }
  }, [totalValues]);


  return (
    <Row
      justify="space-between"
      style={{
        padding: '36px 24px',
        background: token?.colorBgContainer,
        borderRadius: '12px',
      }}
      gutter={[0, 16]}
    >
      {analyticsData?.map((item: any) => (
        <Col>
          <TableNameColumn
            primaryText={item?.primary}
            secondaryText={item?.secondry}
            fallbackIcon={item?.icon}
            iconBg={item?.iconBg}
            isNotification={false}
          />
        </Col>
      ))}
    </Row>
  );
};

export default GenerateQuoteAnalytics;
