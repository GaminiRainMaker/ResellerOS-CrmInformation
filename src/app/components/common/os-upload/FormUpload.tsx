import {Upload} from 'antd';
import Image from 'next/image';
import {useState} from 'react';
import HeaderLogo from '../../../../../public/assets/static/UploadFile.svg';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import FormUploadCard from './FormUploadCard';

const {Dragger} = Upload;

const FormUpload = () => {
  const [fileData, setFileData] = useState<any>([]);

  //   const props: UploadProps = {
  //     name: 'file',
  //     multiple: true,
  //     onChange(info) {
  //       const fileList = [...info.fileList];
  //       setFileData(fileList);
  //     },
  //   };

  const beforeUpload = (file: File) => {
    console.log('fileData', file);
    setFileData([...fileData, file]);

    // convertFileToBase64(file)
    //   .then((base64String) => {
    //     // sendDataToNanonets(base64String, file);
    //     setFileData([...fileData, file]);
    //   })
    //   .catch((error) => {
    //     message.error('Error converting file to base64', error);
    //   });
    // return false;
  };

  console.log('fileData', fileData);
  return (
    <Row>
      <FormUploadCard
        uploadFileData={fileData}
        setUploadFileData={setFileData}
      />
      <Dragger beforeUpload={beforeUpload} showUploadList={false} multiple>
        <Space>
          <Image src={HeaderLogo} alt="HeaderLogo" />
          UploadFile
        </Space>
      </Dragger>
    </Row>
  );
};

export default FormUpload;
