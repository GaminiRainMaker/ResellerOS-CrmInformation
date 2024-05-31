import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useRouter} from 'next/navigation';
import {FC, useEffect} from 'react';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const AddDocument: FC<any> = ({form, setShowDocumentModalButton}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {data: FormstackData, loading: FormstackLoading} = useAppSelector(
    (state) => state.formstack,
  );
  const {data: generalSettingData, loading: GeneralSettingLoading} =
    useAppSelector((state) => state.gereralSetting);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  useEffect(() => {
    let obj = {
      username: generalSettingData?.api_key,
      password: generalSettingData?.secret_key,
    };
    if (obj) {
      dispatch(queryAllDocuments(obj));
    }
  }, [generalSettingData]);

  const FormstackDataOptions =
    FormstackData &&
    FormstackData.length > 0 &&
    FormstackData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.name}
        </Typography>
      ),
    }));

    
  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log('onFinish', values);
  };

  return (
    <GlobalLoader loading={FormstackLoading || GeneralSettingLoading}>
      <br />
      {FormstackDataOptions ? (
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onFinish}
        >
          {setShowDocumentModalButton(true)}
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
                />
              </SelectFormItem>
            </Col>

            <Col span={24}>
              <OSDraggerStyle showUploadList={false} multiple>
                <FolderArrowDownIcon
                  width={24}
                  color={token?.colorInfoBorder}
                />
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                  as="div"
                >
                  <Typography
                    name="Body 4/Medium"
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                    color={token?.colorPrimary}
                    hoverOnText
                  >
                    Click to Upload
                  </Typography>{' '}
                  or Drag and Drop
                </Typography>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  XLS, PDF.
                </Typography>
              </OSDraggerStyle>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          {setShowDocumentModalButton(false)}
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
        </>
      )}
    </GlobalLoader>
  );
};

export default AddDocument;
