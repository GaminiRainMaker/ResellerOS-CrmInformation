import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import Typography from '@/app/components/common/typography';
import {useRouter} from 'next/navigation';

const DealRegDetail = () => {
  const [token] = useThemeToken();
  const router = useRouter();

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/allQuote');
          }}
        >
          All Quotes
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            // router?.push(`/generateQuote?id=${getQuoteID}`);
          }}
        >
          hgdhfs
          {/* {quoteLineItemByQuoteID?.[0]?.Quote?.createdAt ?? ''} */}
        </Typography>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <OsBreadCrumb items={menuItems} />
        </Col>
      </Row>
    </div>
  );
};

export default DealRegDetail;
