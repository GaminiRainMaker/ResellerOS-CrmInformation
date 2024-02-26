import {TrashIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC} from 'react';
import PdfImg from '../../../../../public/assets/static/pdf.svg';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';
import {
  UploadCardAvatarStyle,
  FormUploadCardColStyle,
} from './styled-components';

const FormUploadCard: FC<any> = ({uploadFileData, setUploadFileData}) => {
  const [token] = useThemeToken();

  const removeFile = (uid: number | undefined | string) => {
    const filtered = uploadFileData.filter((p: any) => p?.uid !== uid);
    setUploadFileData(filtered);
  };

  return (
    <Row justify="start" style={{gap: '12px'}}>
      {uploadFileData?.map((item: any) => (
        <FormUploadCardColStyle key={item?.id}>
          <Space style={{width: '100%'}}>
            <Image src={PdfImg} alt="PdfImg" />
            <Space direction="vertical" size={0} style={{textAlign: 'initial'}}>
              <Typography as="div" name="Body 4/Medium" color={token?.colorPrimaryText}>
                {item?.name}
              </Typography>
              <Typography name="Body 4/Medium">23MB</Typography>
            </Space>
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
        </FormUploadCardColStyle>
      ))}
    </Row>
  );
};

export default FormUploadCard;
