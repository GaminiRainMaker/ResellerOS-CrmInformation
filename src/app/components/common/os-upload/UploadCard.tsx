import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {Avatar} from '../antd/Avatar';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';

const UploadCard: FC<any> = ({fileList}) => {
  const [token] = useThemeToken();
  return (
    <Row justify="start" style={{gap: '12px'}}>
      {fileList.map((item: string) => (
        <Col
          style={{
            display: 'flex',
            width: '192px',
            height: '164px',
            padding: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            background: '#F8FAFB',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          <Space direction="vertical">
            <Image src={PdfImg} alt="PdfImg" />
            <Typography name="Body 4/Medium">{item}</Typography>
          </Space>
          <Avatar
            style={{
              position: 'absolute',
              top: '0%',
              right: '0%',
              cursor: 'pointer',
              borderRadius: '12px',
              background: token?.colorErrorBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={
              <TrashIcon
                width={20}
                color={token?.colorError}
                onClick={() => {
                  console.log('fdsdsdfs');
                }}
              />
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default UploadCard;
