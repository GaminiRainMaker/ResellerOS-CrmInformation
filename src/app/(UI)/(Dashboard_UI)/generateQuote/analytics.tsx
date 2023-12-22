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

const GenerateQuoteAnalytics: FC<any> = ({
  quoteLineItemByQuoteID,
  amountData,
}) => {
  const [token] = useThemeToken();
  const [totalGrossValue, setTotalGrossValue] = useState<any>();
  const [totalRebateAmount, setTotalRebateAmount] = useState<any>();
  const {profitability} = useAppSelector((state) => state.profitability);
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
    profitability?.map((item: any) => {
      if (item?.gross_profit) {
        grossProfit += item?.gross_profit ? item?.gross_profit : 0;
      }
      if (item?.gross_profit_percentage) {
        grossProfitPercentage += item?.gross_profit_percentage
          ? item?.gross_profit_percentage
          : 0;
      }
    });
    setTotalGrossValue({
      GrossProfit: grossProfit,
      GrossProfitPercentage: grossProfitPercentage,
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
      primary: `$${amountData?.AdjustPrice}`,
      secondry: 'Quote Total',
      icon: <TagIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: `$${amountData?.LineAmount}`,
      secondry: 'Total Cost',
      icon: <CurrencyDollarIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: `$${abbreviate(totalGrossValue?.GrossProfit ?? 0)}`,
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
      primary: `${abbreviate(totalGrossValue?.GrossProfitPercentage ?? 0)} %`,
      secondry: 'Total GP%',
      icon: <ReceiptPercentIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 6,
      primary: `${abbreviate(totalRebateAmount?.totalRebateAmountData ?? 0)} %`,
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
