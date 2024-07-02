import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {convertFileToBase64} from '@/app/utils/base';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {message} from 'antd';
import {FC, useState} from 'react';
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../../../redux/actions/upload';
import {useAppDispatch} from '../../../../../../../redux/hook';
import UploadCard from './UploadCard';

const Attachments: FC<any> = ({
  uploadFileData,
  setUploadFileData,
  addNewAttachment,
  form,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [bufferLoading, setBufferLoading] = useState<boolean>(false);

  const beforeUpload = async (file: File) => {
    const obj: any = {...file};
    let pathUsedToUpload = file?.type?.split('.')?.includes('spreadsheetml')
      ? uploadExcelFileToAws
      : uploadToAws;

    convertFileToBase64(file)
      .then((base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;
        setBufferLoading(true);
        dispatch(pathUsedToUpload({document: base64String})).then(
          (payload: any) => {
            const doc_url = payload?.payload?.data?.Location;
            obj.doc_url = doc_url;
            setBufferLoading(false);
          },
        );
        setUploadFileData((fileData: any) => [...fileData, obj]);
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
  };

  return (
    <GlobalLoader loading={bufferLoading}>
      <OSDraggerStyle
        beforeUpload={beforeUpload}
        showUploadList={false}
        multiple
      >
        <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
        <Typography
          name="Body 4/Medium"
          color={token?.colorPrimaryText}
          as="div"
        >
          <Typography
            name="Body 4/Medium"
            style={{textDecoration: 'underline', cursor: 'pointer'}}
            color={token?.colorPrimary}
          >
            Click to Upload
          </Typography>{' '}
          or Drag and Drop
        </Typography>
        <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
          XLS, PDF.
        </Typography>
      </OSDraggerStyle>
      <UploadCard
        uploadFileData={uploadFileData}
        setUploadFileData={setUploadFileData}
        addNewAttachment={addNewAttachment}
        form={form}
      />
    </GlobalLoader>
  );
};

export default Attachments;
