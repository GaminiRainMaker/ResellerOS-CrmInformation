import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import {Button, Divider, Form, Upload} from 'antd';
import {useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsInput from '@/app/components/common/os-input';
import {formatStatus} from '@/app/utils/CONSTANTS';
import OsButton from '@/app/components/common/os-button';
import {UploadOutlined} from '@ant-design/icons';

const AddDocument: FC<any> = ({form, setShowDocumentModalButton}) => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [extractedStrings, setExtractedStrings] = useState([]);
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

  const handleFileUpload = (uploadedData: any) => {
    if (!uploadedData.file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      try {
        const workbook = XLSX.read(data, {type: 'array'});
        processWorkbook(workbook);
      } catch (error) {
        console.log(
          'Error reading the file. Please make sure the file is a valid Excel file.',
        );
      }
    };
    reader.readAsArrayBuffer(uploadedData.file);
  };

  const processWorkbook = (workbook: any) => {
    const extracted: any = [];
    const regex = /\{([^}]+)\}/g;

    workbook.SheetNames.forEach((sheetName: any) => {
      const sheet = workbook.Sheets[sheetName];
      const csvData = XLSX.utils.sheet_to_csv(sheet);
      const lines = csvData.split(/\r\n|\n/);

      lines.forEach((line) => {
        let match;
        while (
          (match = regex.exec(line)) !== null &&
          !extracted?.includes(
            match[1].replace('$', '').split(':')[0].split('|')[0],
          )
        ) {
          extracted.push(match[1].replace('$', '').split(':')[0].split('|')[0]);
        }
      });
    });

    setExtractedStrings(extracted);
  };

  return (
    <GlobalLoader loading={FormstackLoading || GeneralSettingLoading}>
      <br />

      {!FormstackDataOptions ? (
        <>
          {extractedStrings?.length > 0 ? (
            <div style={{height: '50vh', overflow: 'auto'}}>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <Col>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 3/Medium"
                    >
                      Your File Header
                    </Typography>
                  </Row>
                  <Divider />
                  {extractedStrings?.map((item: any) => (
                    <Row style={{marginTop: '6px'}}>
                      <OsInput disabled value={formatStatus(item)} />
                    </Row>
                  ))}
                </Col>

                <Col>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 3/Medium"
                    >
                      Quote Header
                    </Typography>
                  </Row>
                  <Divider />
                  {extractedStrings?.map((item: any, indexOfCol: number) => (
                    <Row style={{marginTop: '6px'}}>
                      <CommonSelect
                        onChange={(e) => {
                          // syncTableToLineItems(item, e, indexOfCol);
                        }}
                        allowClear
                        // onClear={() => handleChange(item?.newVal)}
                        defaultValue={item?.newVal?.toString()?.toUpperCase()}
                        style={{width: '250px'}}
                        options={[]}
                      />
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <OsButton
                  text="Sync And Save"
                  style={{
                    width: '100%',
                  }}
                  buttontype="PRIMARY"
                  // clickHandler={syncTableDataNew}
                />
              </Row>
            </div>
          ) : (
            <>
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
                      label={
                        <Typography name="Body 4/Medium">Document</Typography>
                      }
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
                    <Upload
                      // accept=".csv"
                      beforeUpload={() => false} // Prevent automatic upload
                      onChange={handleFileUpload}
                    >
                      <Button icon={<UploadOutlined />}>Upload CSV</Button>
                    </Upload>
                    <OSDraggerStyle
                      showUploadList={false}
                      multiple
                      onChange={handleFileUpload}
                      disabled
                    >
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
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
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
            </>
          )}
        </>
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
