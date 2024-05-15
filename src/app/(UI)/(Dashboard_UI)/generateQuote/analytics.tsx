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
import {useAppSelector} from '../../../../../redux/hook';

const GenerateQuoteAnalytics: FC<any> = ({amountData}) => {
  const [token] = useThemeToken();
  const [totalValues, setTotalValues] = useState<any>();
  const [totalRebateAmount, setTotalRebateAmount] = useState<any>();
  // const [totalCost, setTotalCost] = useState<number>(0);
  const {profitability} = useAppSelector((state) => state.profitability);
  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
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
    let grossProfit: any = 0;
    let grossProfitPercentage: any = 0;
    let exitPrice: number = 0;
    let adjustedPrice: number = 0;
    profitability?.map((item: any) => {
      if (item?.gross_profit) {
        grossProfit += item?.gross_profit ? item?.gross_profit : 0;
      }
      if (item?.gross_profit_percentage) {
        grossProfitPercentage += item?.gross_profit_percentage
          ? item?.gross_profit_percentage
          : 0;
      }
      if (item?.exit_price) {
        exitPrice += item?.exit_price ? item?.exit_price : 0;
      }
      if (item?.adjusted_price !== undefined && item?.quantity !== undefined) {
        let temp: any;
        temp =
          Number(item?.adjusted_price) *
          (item?.quantity ? Number(item?.quantity) : 1);
        adjustedPrice += temp;
      }
    });
    setTotalValues({
      GrossProfit: grossProfit,
      GrossProfitPercentage: grossProfitPercentage,
      ExitPrice: exitPrice,
      AdjustedPrice: adjustedPrice,
    });
  }, [JSON.stringify(profitability)]);

  const analyticsData = [
    {
      key: 1,
      primary: quoteLineItemByQuoteID?.length,
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
      primary: `$${abbreviate(totalValues?.AdjustedPrice ?? 0)}`,
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
      {analyticsData?.map((item) => (
        <Col>
          <TableNameColumn
            primaryText={item?.primary}
            secondaryText={item?.secondry}
            fallbackIcon={item?.icon}
            iconBg={item?.iconBg}
          />
        </Col>
      ))}
    </Row>
  );
};

export default GenerateQuoteAnalytics;
