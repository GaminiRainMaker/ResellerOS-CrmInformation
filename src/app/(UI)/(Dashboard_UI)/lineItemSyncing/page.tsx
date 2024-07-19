'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryLineItemSyncing} from '../../../../../redux/actions/LineItemSyncing';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {formatDate} from '@/app/utils/base';

const LineItemSyncing = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const {data: LineItemSyncingData, loading} = useAppSelector(
    (state) => state.LineItemSyncing,
  );

  const [query, setQuery] = useState<{
    quote_name: string | null;
    pdf_header: string | null;
    quote_header: string | null;
  }>({
    quote_name: null,
    pdf_header: null,
    quote_header: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  const UserDataColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Name
        </Typography>
      ),
      dataIndex: 'quote_id',
      key: 'quote_id',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/generateQuote?id=${record?.Quote?.id}&inReviewQuote=${false}`,
            );
          }}
        >
          {record?.Quote?.file_name ??
            formatDate(record?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Header
        </Typography>
      ),
      dataIndex: 'pdf_header',
      key: 'pdf_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Header
        </Typography>
      ),
      dataIndex: 'quote_header',
      key: 'quote_header',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string) => (
        <span style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </span>
      ),
    },
  ];

  useEffect(() => {
    dispatch(queryLineItemSyncing(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
  };

  const uniqueQuoteName = Array?.from(
    new Set(
      LineItemSyncingData?.map(
        (item: any) =>
          item?.Quote?.file_name ??
          formatDate(item?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM'),
      ),
    ),
  );
  const uniquePdfHeader = Array?.from(
    new Set(LineItemSyncingData?.map((item: any) => item?.pdf_header)),
  );

  const uniqueQuoteHeader = Array?.from(
    new Set(LineItemSyncingData?.map((item: any) => item?.quote_header)),
  );

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              LineItems Syncing
            </Typography>
          </Col>
        </Row>
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Row justify={'space-between'}>
            <Col />
            <Col>
              {' '}
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Quote Name</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        quote_name: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        quote_name: e,
                      });
                    }}
                    value={query?.quote_name}
                  >
                    {uniqueQuoteName?.map((quote_name: any) => (
                      <Option key={quote_name} value={quote_name}>
                        {quote_name}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Pdf Header</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        pdf_header: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        pdf_header: e,
                      });
                    }}
                    value={query?.pdf_header}
                  >
                    {uniquePdfHeader?.map((pdf_header: any) => (
                      <Option key={pdf_header} value={pdf_header}>
                        {pdf_header}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Quote Header</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        quote_header: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        quote_header: e,
                      });
                    }}
                    value={query?.quote_header}
                  >
                    {uniqueQuoteHeader?.map((quote_header: any) => (
                      <Option key={quote_header} value={quote_header}>
                        {quote_header}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>

                <div
                  style={{
                    marginTop: '15px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color={
                      query?.quote_name ||
                      query?.pdf_header ||
                      query?.quote_header
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
                    onClick={() => {
                      setQuery({
                        quote_name: null,
                        pdf_header: null,
                        quote_header: null,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            </Col>
          </Row>

          <OsTable
            locale={locale}
            columns={UserDataColumns}
            dataSource={LineItemSyncingData}
            scroll
            loading={loading}
          />
        </div>
      </Space>
    </>
  );
};

export default LineItemSyncing;
