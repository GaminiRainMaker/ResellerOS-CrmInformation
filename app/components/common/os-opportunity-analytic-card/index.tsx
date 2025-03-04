import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsStatusWrapper from '../os-status';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {OsOpportunityAnalyicCardInterface} from './os-opportunity-analytic-card-interface';
import useAbbreviationHook from '../hooks/useAbbreviationHook';

const OpportunityAnalyticCard: FC<OsOpportunityAnalyicCardInterface> = ({
  OpportunityData,
  setOpen,
  setFormValue,
  setDeleteIds,
  setShowModalDelete,
}) => {
  const [token] = useThemeToken();
  const {abbreviate} = useAbbreviationHook(0);

  return (
    <Row
      gutter={[16, 16]}
      justify="space-between"
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '18px 12px',
      }}
    >
      <Col>
        <Space direction="vertical">
          <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
            Opportunity
          </Typography>
          <Typography name="Body 1/Medium">
            {OpportunityData?.title ?? '--'}
          </Typography>
        </Space>
      </Col>
      <Col>
        <Space size={56}>
          <Space direction="vertical">
            <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
              Customer Account
            </Typography>
            <Typography name="Body 3/Regular">
              {OpportunityData?.customer ?? '--'}
            </Typography>
          </Space>

          <Space direction="vertical">
            <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
              Amount
            </Typography>
            <Typography name="Body 3/Regular">
              $ {abbreviate(OpportunityData?.amount ?? 0)}
            </Typography>
          </Space>

          <Space direction="vertical">
            <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
              Total Quotes
            </Typography>
            <Typography name="Body 3/Regular">
              {OpportunityData?.quotes?.length ?? 0}
            </Typography>
          </Space>

          <Space direction="vertical">
            <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
              Stage
            </Typography>
            <OsStatusWrapper value={OpportunityData?.stages} />
          </Space>
        </Space>
      </Col>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Space size={24}>
          <AvatarStyled
            size={42}
            background={token?.colorInfoHover}
            icon={
              <PencilSquareIcon
                width={19}
                height={19}
                color={token?.colorLinkHover}
              />
            }
            onClick={() => {
              setOpen(true);
              setFormValue(OpportunityData?.opportunity?.[0]);
            }}
          />
          <AvatarStyled
            size={42}
            background={token?.colorErrorBg}
            icon={
              <TrashIcon width={19} height={19} color={token?.colorError} />
            }
            onClick={() => {
              setDeleteIds([OpportunityData?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default OpportunityAnalyticCard;
