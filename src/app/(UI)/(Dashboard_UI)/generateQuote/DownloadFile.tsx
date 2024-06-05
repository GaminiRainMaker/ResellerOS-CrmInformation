import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsModal from '@/app/components/common/os-modal';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import axios from 'axios';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllFormStack} from '../../../../../redux/actions/formStackSync';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
const DownloadFile: FC<any> = ({form}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [pdfUrl, setPdfUrl] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<any>();
  const {loading: GeneralSettingLoading, data: GeneralSettingData} =
    useAppSelector((state) => state.gereralSetting);
  const {loading: formStackSyncLoading, data: formStackSyncData} =
    useAppSelector((state) => state.formStackSync);

  useEffect(() => {
    dispatch(getAllFormStack(''));
    dispatch(getAllGeneralSetting(''));
  }, []);

  const FormstackDataOptions =
    formStackSyncData &&
    formStackSyncData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.doc_id,
      key: FormstackDataItem.doc_key,
      data: FormstackDataItem.syncJson,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.doc_name}
        </Typography>
      ),
    }));

  const dowloadFunction = async (data: any, type: string) => {
    const dataItem = data?.data && JSON?.parse(data?.data);
    const formattedData: Record<string, string> = {};
    dataItem?.forEach((item: any) => {
      if (item.preVal !== 'created_by' && item.preVal !== 'quotelineitem') {
        formattedData[item.preVal] = item.newVal;
      }
    });
    try {
      setLoading(true);
      if (data && GeneralSettingData?.api_key) {
        const response = await axios.post(
          `https://www.webmerge.me/merge/${data?.value}/${data?.key}`,
          {
            ...formattedData,
            clientId: GeneralSettingData?.api_key,
            clientSecret: GeneralSettingData?.secret_key,
          },
          {
            responseType: 'blob',
          },
        );
        const blob = new Blob([response.data], {
          type: 'application/pdf',
        });
        if (type === 'preview') {
          const url123 = URL.createObjectURL(blob);
          setPdfUrl(url123);
          setShowPreviewModal(true);
        } else {
          const blob = new Blob([response.data], {
            type: 'application/octet-stream',
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'downloaded_file.pdf');
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
          console.log('File downloaded successfully!');
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error downloading file:', error);
    }
  };

  const onFinish = () => {
    const formData = form.getFieldsValue();
    console.log('Data', formData);
    // if (data && GeneralSettingData?.api_key) {
    //     const response = await axios.post(
    //       `https://www.webmerge.me/merge/${data?.value}/${data?.key}`,
    //       {
    //         ...formattedData,
    //         // quote_num: '45etrsdgsdf',
    //         clientId: GeneralSettingData?.api_key,
    //         clientSecret: GeneralSettingData?.secret_key,
    //       },
    //       {
    //         responseType: 'blob',
    //       },
    //     );
    //     const blob = new Blob([response.data], {
    //       type: 'application/octet-stream',
    //     });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'downloaded_file.pdf');
    //     document.body.appendChild(link);
    //     link.click();
    //     window.URL.revokeObjectURL(url);
    //     link.remove();
    //     console.log('File downloaded successfully!');
    //   }
    // }
  };

  return (
    <>
      <GlobalLoader
        loading={formStackSyncLoading || GeneralSettingLoading || loading}
      >
        {FormstackDataOptions ? (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={[16, 24]} justify="space-between">
              <Col span={24}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Document</Typography>}
                  name="document_id"
                  rules={[
                    {
                      required: true,
                      message: 'Document is required!',
                    },
                  ]}
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    placeholder="Select Document"
                    allowClear
                    options={FormstackDataOptions}
                    onChange={(e: any, data: any) => {
                      dowloadFunction(data, 'preview');
                      setSelectedDoc(data);
                    }}
                  />
                </SelectFormItem>
              </Col>
            </Row>
          </Form>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography
              name="Body 3/Bold"
              color={token?.colorLink}
              style={{marginBottom: '6px'}}
            >
              Note:
            </Typography>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
                <li>
                  You haven't provided the secret key and API yet, or the
                  provided keys are invalid. Please verify and update them.
                </li>
                <li>
                  You can{' '}
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLink}
                    style={{textDecoration: 'underline'}}
                    hoverOnText
                    onClick={() => {
                      router.push('/admin?tab=formstack');
                    }}
                  >
                    click here
                  </Typography>{' '}
                  to update the keys.
                </li>
              </ul>
            </Typography>
          </div>
        )}
      </GlobalLoader>
      <OsModal
        title="Preview"
        bodyPadding={30}
        loading={false}
        body={
          <div>
            <iframe src={pdfUrl} width="100%" height="500px" />
          </div>
        }
        width={900}
        open={showPreviewModal}
        onCancel={() => {
          setShowPreviewModal(false);
        }}
        primaryButtonText={'Download'}
        onOk={() => {
          dowloadFunction(selectedDoc, 'download');
        }}
      />
    </>
  );
};

export default DownloadFile;
