import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import axios from 'axios';
import {useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {insertAttachmentDocument} from '../../../../../redux/actions/attachmentDocument';
import {getAllFormStack} from '../../../../../redux/actions/formStackSync';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';2
import {
  uploadExcelFileToAws,
  uploadToAws,
} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
const DownloadFile: FC<any> = ({form, objectForSyncingValues}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
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

    let resultValues: any = {};
    for (let key in formattedData) {
      resultValues[key] = objectForSyncingValues[formattedData[key]]
        ? objectForSyncingValues[formattedData[key]]
        : 'empty';
    }
    try {
      setLoading(true);
      let pathName =
        type === 'download'
          ? `https://www.webmerge.me/merge/${data?.value}/${data?.key}?downoad=1`
          : `https://www.webmerge.me/merge/${data?.value}/${data?.key}`;
      if (data && GeneralSettingData?.api_key) {
        const response = await axios.post(
          pathName,
          {
            ...resultValues,
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

          let obj: any;

          const blobToBase64 = (blobs: any) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsDataURL(blobs);
            });
          };
          let pathUsedToUpload =
            blob?.type === 'application/octet-stream'
              ? uploadExcelFileToAws
              : uploadToAws;
          const base64String = await blobToBase64(blob);
          dispatch(pathUsedToUpload({document: base64String})).then(
            (payload: any) => {
              const pdfUrl = payload?.payload?.data?.Location;
              if (pdfUrl) {
                let newObjForAttach: any = {
                  doc_url: pdfUrl,
                  quote_id: getQuoteID,
                  type: 'Customer Quote',
                };
                dispatch(insertAttachmentDocument(newObjForAttach));
              }
            },
          );
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

  return (
    <>
      <GlobalLoader
        loading={formStackSyncLoading || GeneralSettingLoading || loading}
      >
        {FormstackDataOptions ? (
          <Form layout="vertical" requiredMark={false} form={form}>
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
            <br />
            {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" />}
            <br />

            {pdfUrl && (
              <Row justify={'end'}>
                <OsButton
                  text="Download"
                  buttontype="PRIMARY"
                  clickHandler={() => dowloadFunction(selectedDoc, 'download')}
                />
              </Row>
            )}
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
    </>
  );
};

export default DownloadFile;
