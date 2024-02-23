import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {UploadCardAvatarStyle, UploadCardColStyle} from './styled-components';

const FormUploadCard: FC<any> = ({uploadFileData, setUploadFileData}) => {
  const [token] = useThemeToken();

  const removeFile = (uid: number | undefined | string) => {
    const filtered = uploadFileData.filter(
      (p: any) => p?.uid !== uid,
    );
    setUploadFileData(filtered);
  };

  return (
    <Row justify="start" style={{gap: '12px'}}>
      {uploadFileData?.map((item: any) => (
        <UploadCardColStyle key={item?.id}>
          <Space direction="vertical">
            <Image src={PdfImg} alt="PdfImg" />
            <Typography name="Body 4/Medium">
              {item?.name}
            </Typography>
          </Space>
          <UploadCardAvatarStyle
            colorErrorBg={token?.colorErrorBg}
            icon={
              <TrashIcon
                width={20}
                color={token?.colorError}
                onClick={() => {
                  removeFile(item?.uid);
                }}
              />
            }
          />
        </UploadCardColStyle>
      ))}
    </Row>
  );
};

export default FormUploadCard;
