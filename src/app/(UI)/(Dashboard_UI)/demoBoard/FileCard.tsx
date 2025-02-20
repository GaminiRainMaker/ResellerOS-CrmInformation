/* eslint-disable array-callback-return */
import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {DownloadOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import XlsImg from '../../../../../public/assets/static/xls.svg';

const FileCard: FC<any> = () => {
  const [token] = useThemeToken();

  const files = [
    {
      key: '1',
      name: 'Carahsoft - 100 lines',
      url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20pdf%20for%20Demo.pdf?sp=r&st=2025-02-13T07:46:02Z&se=2050-02-13T15:46:02Z&spr=https&sv=2022-11-02&sr=b&sig=nXYrFBVnsji7AVv8JTozYXhYuE82kGJ%2F7rwyCaOCByY%3D',
      type: 'PDF',
    },
    {
      key: '2',
      name: 'Arista',
      url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Arista%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:12Z&se=2050-02-13T15:47:12Z&spr=https&sv=2022-11-02&sr=b&sig=9cANEVPOmTYNVZeObq7I%2FaKSWyGuPVfZPh1eRPMkK%2BI%3D',
      type: 'PDF',
    },
    {
      key: '3',
      name: 'Carahsoft Excel Spreadsheet',
      url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Carahsoft%20Dell%20Sample%20Excel%20for%20Demo.xlsx?sp=r&st=2025-02-13T07:48:15Z&se=2050-02-13T15:48:15Z&spr=https&sv=2022-11-02&sr=b&sig=dl7%2Ba%2F9uiNjovUpPZL4Am%2FpvN%2Fu3k42R8tgS3LwOXUs%3D',
      type: 'XLSX',
    },
    {
      key: '4',
      name: 'Immix',
      url: 'https://prodresellerosstorage.blob.core.windows.net/prodreselleros/Immix%20Sample%20Quote%20for%20Demo.pdf?sp=r&st=2025-02-13T07:47:43Z&se=2050-02-13T15:47:43Z&spr=https&sv=2022-11-02&sr=b&sig=qbhxzYWEv98FknyOKlybFOE%2FWZW9mIG%2FA%2FaGDByFByQ%3D',
      type: 'PDF',
    },
  ];

  return (
    <>
      {files?.map((item: any, index: number) => (
        <div key={item?.key}>
          <Row
            key={item?.key}
            justify="space-between"
            gutter={[0, 16]}
            align={'middle'}
          >
            <Col span={16}>
              <Space size={12}>
                {item?.type === 'PDF' ? (
                  <Image src={PdfImg} alt="PdfImg" />
                ) : (
                  <Image src={XlsImg} alt="XlsImg" />
                )}
                <div
                  style={{
                    textWrap: 'wrap',
                    width: '150px',
                    fontWeight: '500px',
                    fontSize: '14px',
                  }}
                >
                  {formatStatus(item?.name)}
                </div>
              </Space>
            </Col>
            <Col span={8}>
              <a href={item?.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" icon={<DownloadOutlined />}>
                  Download
                </Button>
              </a>
            </Col>
          </Row>
          <Divider style={{margin: '0px', marginBottom:'5px'}} />
        </div>
      ))}
    </>
  );
};

export default FileCard;
