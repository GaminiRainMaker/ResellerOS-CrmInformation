import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {
  customerColumnsSync,
  formatStatus,
  opportunityColumnsSync,
  quotLineItemsColumnsSync,
  quoteColumns,
} from '@/app/utils/CONSTANTS';
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Button, Form} from 'antd';
import {useRouter} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

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
  const [selectDropdownType, setSelectDropdownType] = useState<string>('Quote');
  const [columnSelectOptions, setColumnSelectOptions] = useState<any>([]);

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

  const buttonActiveStyle = {
    background: token.colorPrimaryBg,
    borderColor: token.colorPrimaryBg,
  };

  const buttonInactiveStyle = {
    borderColor: token.colorPrimaryBg,
  };

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

  useEffect(() => {
    switch (selectDropdownType) {
      case 'Quote Line Item':
        setColumnSelectOptions(quotLineItemsColumnsSync);
        break;
      case 'Customer':
        setColumnSelectOptions(customerColumnsSync);
        break;
      case 'Opportunity':
        setColumnSelectOptions(opportunityColumnsSync);
        break;
      default:
        setColumnSelectOptions(quoteColumns);
    }
  }, [selectDropdownType]);

  return (
    <GlobalLoader loading={FormstackLoading || GeneralSettingLoading}>
      {FormstackDataOptions ? (
        <>
          {extractedStrings?.length > 0 ? (
            <Row
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                height: '50vh',
                overflow: 'auto',
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

              <Col span={16}>
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
                    <br />
                    <CommonSelect
                      style={{width: '100%'}}
                      placeholder="Select Columns"
                      allowClear
                      options={columnSelectOptions}
                      dropdownRender={(menu) => (
                        <>
                          <Space
                            direction="vertical"
                            style={{padding: '9px 0px 0px 16px'}}
                          >
                            <Typography
                              color={token?.colorPrimaryText}
                              name="Body 3/Regular"
                            >
                              Select by:
                            </Typography>
                            <Space>
                              <Button
                                onClick={() => {
                                  setSelectDropdownType('Quote');
                                }}
                                style={
                                  selectDropdownType === 'Quote'
                                    ? buttonActiveStyle
                                    : buttonInactiveStyle
                                }
                              >
                                <Typography
                                  name="Body 4/Regular"
                                  color={
                                    token[
                                      selectDropdownType === 'Quote'
                                        ? 'colorPrimaryHover'
                                        : 'colorPrimaryBorder'
                                    ]
                                  }
                                  cursor="pointer"
                                >
                                  Quote
                                </Typography>
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectDropdownType('Quote Line Item');
                                }}
                                style={
                                  selectDropdownType === 'Quote Line Item'
                                    ? buttonActiveStyle
                                    : buttonInactiveStyle
                                }
                              >
                                <Typography
                                  name="Body 4/Regular"
                                  color={
                                    token[
                                      selectDropdownType === 'Quote Line Item'
                                        ? 'colorPrimaryHover'
                                        : 'colorPrimaryBorder'
                                    ]
                                  }
                                  cursor="pointer"
                                >
                                  Quote Line Item
                                </Typography>
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectDropdownType('Customer');
                                }}
                                style={
                                  selectDropdownType === 'Customer'
                                    ? buttonActiveStyle
                                    : buttonInactiveStyle
                                }
                              >
                                <Typography
                                  name="Body 4/Regular"
                                  color={
                                    token[
                                      selectDropdownType === 'Customer'
                                        ? 'colorPrimaryHover'
                                        : 'colorPrimaryBorder'
                                    ]
                                  }
                                  cursor="pointer"
                                >
                                  Customer
                                </Typography>
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectDropdownType('Opportunity');
                                }}
                                style={
                                  selectDropdownType === 'Opportunity'
                                    ? buttonActiveStyle
                                    : buttonInactiveStyle
                                }
                              >
                                <Typography
                                  name="Body 4/Regular"
                                  color={
                                    token[
                                      selectDropdownType === 'Opportunity'
                                        ? 'colorPrimaryHover'
                                        : 'colorPrimaryBorder'
                                    ]
                                  }
                                  cursor="pointer"
                                >
                                  Opportunity
                                </Typography>
                              </Button>
                            </Space>
                          </Space>
                          <Divider style={{margin: '5px'}} />
                          {menu}
                        </>
                      )}
                    />
                  </Row>
                ))}
              </Col>
            </Row>
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
                    <OSDraggerStyle
                      showUploadList={false}
                      multiple
                      onChange={handleFileUpload}
                      beforeUpload={() => false}
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
